import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  TextureLoader, MathUtils, DoubleSide,
  BufferGeometry, BufferAttribute, Points, PointsMaterial,
  type Mesh, type Group,
} from "three";
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
  { id: "leadership" as const, label: "LEADERSHIP", color: "#E3B53D", Icon: Users,   angleRad: 0 },
  { id: "design"     as const, label: "DESIGN",     color: "#9B3DE3", Icon: PenTool, angleRad: (2 * Math.PI) / 3 },
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
      <mesh ref={meshRef} position={[0, 0, -0.5]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#E36B3D" wireframe opacity={0.35} transparent />
      </mesh>
      <pointLight color="#E36B3D" intensity={2.0} distance={5} decay={2} position={[0, 0, 0]} />
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

// ── ParticleField: uses <points> + BufferGeometry — no per-frame matrix loop ──

function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<Points>(null!);

  // Build positions array once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 4;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  // Drift upward each frame — mutate the buffer attribute directly (no React state)
  useFrame(() => {
    if (!pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes.position as BufferAttribute;
    for (let i = 0; i < count; i++) {
      attr.array[i * 3 + 1] = (attr.array[i * 3 + 1] as number) + 0.005;
      if ((attr.array[i * 3 + 1] as number) > 8) {
        (attr.array as Float32Array)[i * 3 + 1] = -8;
      }
    }
    attr.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () => new PointsMaterial({ color: "#E36B3D", size: 0.04, transparent: true, opacity: 0.35 }),
    []
  );

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// ── OrbitingNode: label position driven by ref, no useState in render loop ──

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
  const groupRef  = useRef<Group>(null!);
  const meshRef   = useRef<Mesh>(null!);
  const angleRef  = useRef(angleRad);
  const labelRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    angleRef.current += delta * ORBIT_SPEED;
    const [x, y, z] = orbitPosition(angleRef.current, tiltRad, RADIUS);

    groupRef.current.position.set(x, y, z);
    groupRef.current.scale.setScalar(MathUtils.mapLinear(z, -0.3, MAX_Z, 0.85, 1.1));

    if (meshRef.current) {
      (meshRef.current.material as any).opacity = MathUtils.mapLinear(z, -0.3, MAX_Z, 0.7, 1.0);
    }

    // Move label div directly — no React state update
    if (labelRef.current) {
      labelRef.current.style.transform = z < 0
        ? "translate(-50%, -220%)"   // above node when behind
        : "translate(30%, -50%)";    // right of node when in front
    }
  });

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
        zIndexRange={[100, 0]}
        style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
      >
        {/* Wrapper div — its transform is mutated directly in useFrame */}
        <div ref={labelRef} style={{ transform: "translate(30%, -50%)" }}>
          <button
            aria-label={`Navigate to ${label}`}
            onClick={() => onSelect(id)}
            style={{
              pointerEvents: "auto",
              background: "rgba(16, 28, 54, 0.9)",
              border: `1px solid ${color}80`,
              borderRadius: "6px",
              padding: "6px 14px",
              color,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${color}80`)}
          >
            <Icon style={{ width: 14, height: 14 }} />
            {label}
          </button>
        </div>
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
