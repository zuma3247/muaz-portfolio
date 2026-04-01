import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, Float, Edges, Environment, MeshTransmissionMaterial, Sparkles, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { TextureLoader, MathUtils, DoubleSide, type Mesh, type Group } from "three";
import { Users, PenTool, Cpu } from "lucide-react";
import type { QualityTier } from "../utils/detectQuality";

// ── Constants ────────────────────────────────────────────────────────────────

const TILT = 0.436; // 25 degrees in radians
const RADIUS = 3.5; // Slightly increased radius for breathing room
const MAX_Z = RADIUS * Math.sin(TILT); 
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

  useFrame((state) => {
    if (!isLite && meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, -0.5]}>
        <icosahedronGeometry args={[1.5, 0]} />
        {isLite ? (
          <meshStandardMaterial color="#0A1128" metalness={0.9} roughness={0.1} />
        ) : (
          <MeshTransmissionMaterial
            buffer={null!}
            color="#0A1128" // Dark navy tint
            attenuationColor="#E36B3D"
            attenuationDistance={5}
            thickness={1.5}
            roughness={0.05}
            transmission={1}
            ior={1.3}
            chromaticAberration={0.05}
            backside={true}
          />
        )}
        
        {/* Inner Glowing Core */}
        <mesh>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshBasicMaterial color="#E36B3D" toneMapped={false} />
          <pointLight color="#E36B3D" intensity={isLite ? 1.5 : 3} distance={10} />
        </mesh>

        <Edges scale={1.001} threshold={15} color="#3D8BE3" opacity={0.3} transparent />
      </mesh>
      
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <mesh position={[0, 0, 1.2]}>
          <planeGeometry args={[2.8, 2.8]} />
          <meshBasicMaterial map={logoTexture} transparent alphaTest={0.01} side={DoubleSide} />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitalRing({ tiltRad }: { tiltRad: number }) {
  return (
    <mesh rotation={[tiltRad, 0, 0]}>
      <torusGeometry args={[RADIUS, 0.008, 8, 128]} />
      <meshStandardMaterial color="#E36B3D" metalness={0.8} roughness={0.2} opacity={0.4} transparent />
    </mesh>
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
  const groupRef  = useRef<Group>(null!);
  const meshRef   = useRef<Mesh>(null!);
  const angleRef  = useRef(angleRad);
  const labelRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    angleRef.current += delta * ORBIT_SPEED;
    const [x, y, z] = orbitPosition(angleRef.current, tiltRad, RADIUS);

    groupRef.current.position.set(x, y, z);
    groupRef.current.scale.setScalar(MathUtils.mapLinear(z, -0.3, MAX_Z, 0.85, 1.15));

    if (meshRef.current) {
      (meshRef.current.material as any).opacity = MathUtils.mapLinear(z, -0.3, MAX_Z, 0.6, 1.0);
    }

    if (labelRef.current) {
      labelRef.current.style.transform = z < 0
        ? "translate(-50%, -220%)"   
        : "translate(30%, -50%)";    
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
        <sphereGeometry args={[0.35, 32, 32]} />
        <MeshTransmissionMaterial 
          color="#ffffff"
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
          transparent
        />
        
        {/* Glowing Inner Core causes massive bloom! */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
          <pointLight color={color} intensity={hovered ? 5 : 2} distance={RADIUS * 3} decay={2} />
        </mesh>
      </mesh>

      <Html
        center
        distanceFactor={6}
        zIndexRange={[100, 0]}
        style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
      >
        <div ref={labelRef} style={{ transform: "translate(30%, -50%)", transition: "transform 0.1s" }}>
          <button
            aria-label={`Navigate to ${label}`}
            onClick={() => onSelect(id)}
            style={{
              pointerEvents: "auto",
              background: "rgba(10, 14, 26, 0.7)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${color}${hovered ? 'ff' : '60'}`,
              borderRadius: "8px",
              padding: "8px 16px",
              color,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: hovered ? `0 0 15px ${color}40` : "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = color;
              e.currentTarget.style.boxShadow = `0 0 15px ${color}60`;
              e.currentTarget.style.background = "rgba(10, 14, 26, 0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${color}60`;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(10, 14, 26, 0.7)";
            }}
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
  const particleCount = tier === "full3d" ? 200 : 40;

  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 8.5] }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      frameloop={isLite ? "demand" : "always"}
      dpr={tier === "full3d" ? [1, 2] : 1}
    >
      <Environment preset="city" />
      <CameraDrift />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#3D8BE3" />

      {/* Main rotating assembly */}
      <group position={[0, -0.2, 0]}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <CentralComposite logoSrc={logoSrc} isLite={isLite} />
          <OrbitalRing tiltRad={tiltRad} />
          
          {CORE_DEFS.map((def) => (
            <OrbitingNode
              key={def.id}
              {...def}
              tiltRad={tiltRad}
              onSelect={onCoreSelect}
            />
          ))}
        </Float>
      </group>

      {/* Atmospheric Space Dust */}
      <Sparkles count={particleCount} scale={18} size={2.5} speed={0.4} color="#E36B3D" opacity={0.6} />
      <Stars radius={20} depth={50} count={isLite ? 500 : 2500} factor={4} saturation={0.5} fade speed={1} />

      {/* High-End Post-Processing */}
      {!isLite && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.5} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
