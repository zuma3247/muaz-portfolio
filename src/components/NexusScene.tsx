import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { TextureLoader, MathUtils, DoubleSide, type Mesh, type InstancedMesh, type Group, Object3D, Matrix4 } from "three";
import { Users, PenTool, Cpu } from "lucide-react";
import type { QualityTier } from "../utils/detectQuality";

// ── Constants ────────────────────────────────────────────────────────────────

const TILT = 0.436; // 25 degrees in radians
const RADIUS = 3.0;
const MAX_Z = RADIUS * Math.sin(TILT); // ≈ 1.27
const ORBIT_SPEED = 0.25; // rad/s

function orbitPosition(theta: number, tilt: number, r: number): [number, number, number] {
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta) * Math.cos(tilt);
  const zRaw = r * Math.sin(theta) * Math.sin(tilt);
  return [x, y, Math.max(zRaw, -0.3)];
}

const CORE_DEFS = [
  { id: "leadership" as const, label: "LEADERSHIP", color: "#E3B53D", Icon: Users, angleRad: 0 },
  { id: "design" as const,     label: "DESIGN",     color: "#9B3DE3", Icon: PenTool, angleRad: (2 * Math.PI) / 3 },
  { id: "technology" as const, label: "TECHNOLOGY", color: "#3D8BE3", Icon: Cpu,     angleRad: (4 * Math.PI) / 3 },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function CameraDrift() {
  useFrame(({ clock, camera }) => {
    camera.position.x = Math.sin(clock.elapsedTime * 0.08) * 0.4;
    camera.position.y = Math.cos(clock.elapsedTime * 0.06) * 0.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function CentralComposite({ logoSrc, isLite }: { logoSrc: string; isLite: boolean }) {
  const meshRef = useRef<Mesh>(null!);
  const logoTexture = useLoader(TextureLoader, logoSrc);

  useFrame(() => {
    if (!isLite && meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      {/* Wireframe icosahedron */}
      <mesh ref={meshRef} position={[0, 0, -0.5]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#E36B3D" wireframe opacity={0.35} transparent />
      </mesh>

      {/* Inner point light for glow */}
      <pointLight color="#E36B3D" intensity={2.0} distance={5} decay={2} position={[0, 0, 0]} />

      {/* Logo billboard */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <mesh position={[0, 0, 1]}>
          <planeGeometry args={[2.4, 2.4]} />
          <meshBasicMaterial map={logoTexture} transparent alphaTest={0.01} side={DoubleSide} />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitalRing({ tiltRad }: { tiltRad: number }) {
  return (
    <mesh rotation={[tiltRad, 0, 0]}>
      <torusGeometry args={[RADIUS, 0.015, 8, 96]} />
      <meshBasicMaterial color="#E36B3D" opacity={0.25} transparent />
    </mesh>
  );
}

const _dummy = new Object3D();
const _matrix = new Matrix4();

function ParticleField({ count }: { count: number }) {
  const meshRef = useRef<InstancedMesh>(null!);

  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 4;
      pos.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return pos;
  }, [count]);

  // Set initial matrices
  useMemo(() => {
    if (!meshRef.current) return;
    positions.forEach(([x, y, z], i) => {
      _dummy.position.set(x, y, z);
      _dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, _dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);

  useFrame(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, _matrix);
      _dummy.position.setFromMatrixPosition(_matrix);
      _dummy.position.y += 0.005;
      if (_dummy.position.y > 8) _dummy.position.y = -8;
      _dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, _dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshBasicMaterial color="#E36B3D" opacity={0.35} transparent />
    </instancedMesh>
  );
}

interface OrbitingNodeProps {
  id: "leadership" | "design" | "technology";
  label: string;
  color: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  angleRad: number;
  tiltRad: number;
  onSelect: (id: "leadership" | "design" | "technology") => void;
}

function OrbitingNode({ id, label, color, Icon, angleRad, tiltRad, onSelect }: OrbitingNodeProps) {
  const groupRef = useRef<Group>(null!);
  const meshRef = useRef<Mesh>(null!);
  const angleRef = useRef(angleRad);
  const [hovered, setHovered] = useState(false);
  const [currentZ, setCurrentZ] = useState(0);

  useFrame((_, delta) => {
    angleRef.current += delta * ORBIT_SPEED;
    const [x, y, z] = orbitPosition(angleRef.current, tiltRad, RADIUS);
    groupRef.current.position.set(x, y, z);

    const opacity = MathUtils.mapLinear(z, -0.3, MAX_Z, 0.7, 1.0);
    const scale = MathUtils.mapLinear(z, -0.3, MAX_Z, 0.85, 1.1);
    groupRef.current.scale.setScalar(scale);
    if (meshRef.current) {
      (meshRef.current.material as any).opacity = opacity;
    }
    setCurrentZ(z);
  });

  const labelPos: [number, number, number] = currentZ < 0 ? [0, 1.2, 0] : [1.4, 0, 0];

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={() => onSelect(id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.6}
          transparent
          opacity={1}
        />
      </mesh>

      <Html
        center
        distanceFactor={6}
        position={labelPos}
        zIndexRange={[100, 0]}
        style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
      >
        <button
          aria-label={`Navigate to ${label}`}
          onClick={() => onSelect(id)}
          style={{
            pointerEvents: "auto",
            background: "rgba(16, 28, 54, 0.9)",
            border: `1px solid ${color}80`,
            borderRadius: "6px",
            padding: "6px 14px",
            color: color,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${color}80`)}
        >
          <Icon style={{ width: 14, height: 14 }} />
          {label}
        </button>
      </Html>
    </group>
  );
}

// ── Main NexusScene ──────────────────────────────────────────────────────────

interface NexusSceneProps {
  onCoreSelect: (core: "leadership" | "design" | "technology") => void;
  tier: QualityTier;
  logoSrc: string;
}

export function NexusScene({ onCoreSelect, tier, logoSrc }: NexusSceneProps) {
  const isLite = tier === "lite3d";
  const tiltRad = isLite ? 0.175 : TILT;
  const particleCount = tier === "full3d" ? 300 : 40;

  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 8] }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      frameloop={isLite ? "demand" : "always"}
      dpr={tier === "full3d" ? [1, 2] : 1}
    >
      <CameraDrift />
      <ambientLight intensity={0.3} />

      <CentralComposite logoSrc={logoSrc} isLite={isLite} />
      <OrbitalRing tiltRad={tiltRad} />
      <ParticleField count={particleCount} />

      {CORE_DEFS.map((def) => (
        <OrbitingNode
          key={def.id}
          {...def}
          tiltRad={tiltRad}
          onSelect={onCoreSelect}
        />
      ))}

      {tier === "full3d" && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.4}
            intensity={0.8}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
