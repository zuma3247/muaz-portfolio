import { motion } from "motion/react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Users, PenTool, Cpu, User, Mail, Briefcase, Award } from "lucide-react";
import logoImage from "figma:asset/b0989652989926fe92b786073197f74a529bda75.png";
import { detectQualityTier, type QualityTier } from "../utils/detectQuality";

const NexusScene = lazy(() => import("./NexusScene").then(m => ({ default: m.NexusScene })));

interface NexusHubProps {
  onCoreSelect: (core: "leadership" | "design" | "technology") => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  onWorkExperienceClick: () => void;
  onWebsterLEADSClick: () => void;
}

// ── Legacy 2D Orbit (Framer Motion fallback) ─────────────────────────────────

function LegacyOrbit({ onCoreSelect }: { onCoreSelect: (core: "leadership" | "design" | "technology") => void }) {
  const [hoveredCore, setHoveredCore] = useState<string | null>(null);

  const cores = [
    { id: "leadership" as const, label: "LEADERSHIP", icon: Users,    color: "#E3B53D", angle: 0   },
    { id: "design" as const,     label: "DESIGN",     icon: PenTool,  color: "#9B3DE3", angle: 120 },
    { id: "technology" as const, label: "TECHNOLOGY", icon: Cpu,      color: "#3D8BE3", angle: 240 },
  ];

  return (
    <>
      {/* Ambient particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-burnt-orange/20 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Central logo + orbiting cores */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <motion.img
            src={logoImage}
            alt="Personal Nexus Logo"
            className="w-48 md:w-64 h-auto drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 30px rgba(227, 107, 61, 0.5))" }}
            animate={{
              scale: [1, 1.02, 1],
              filter: [
                "drop-shadow(0 0 30px rgba(227, 107, 61, 0.4))",
                "drop-shadow(0 0 40px rgba(227, 107, 61, 0.5))",
                "drop-shadow(0 0 30px rgba(227, 107, 61, 0.4))",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {cores.map((core, index) => {
            const isHovered = hoveredCore === core.id;
            const isDimmed = hoveredCore !== null && hoveredCore !== core.id;
            const Icon = core.icon;

            return (
              <motion.div
                key={core.id}
                className="absolute"
                style={{ left: "50%", top: "50%" }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: hoveredCore ? 30 : 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              >
                <motion.div
                  className="relative cursor-pointer"
                  style={{
                    x: Math.cos((core.angle * Math.PI) / 180) * 200,
                    y: Math.sin((core.angle * Math.PI) / 180) * 200,
                  }}
                  onHoverStart={() => setHoveredCore(core.id)}
                  onHoverEnd={() => setHoveredCore(null)}
                  onClick={() => onCoreSelect(core.id)}
                  animate={{ opacity: isDimmed ? 0.3 : 1, scale: isHovered ? 1.3 : 1 }}
                >
                  <motion.div
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg glass flex items-center justify-center"
                    animate={{
                      boxShadow: isHovered
                        ? `0 0 40px ${core.color}, 0 0 60px ${core.color}`
                        : `0 0 20px ${core.color}`,
                    }}
                  >
                    <Icon className="w-10 h-10 md:w-12 md:h-12" style={{ color: core.color }} />
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{ background: `radial-gradient(circle, ${core.color}40 0%, transparent 70%)` }}
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>

                  {/* Mobile label */}
                  <motion.div
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none md:hidden"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                  >
                    <div className="px-3 py-1 rounded bg-navy/90 border border-burnt-orange/50 text-xs" style={{ letterSpacing: "0.15em" }}>
                      <span style={{ color: core.color }}>{core.label}</span>
                    </div>
                  </motion.div>

                  {/* Desktop hover label */}
                  <motion.div
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none hidden md:block"
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10, rotate: -360 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      x: { duration: 0.2 },
                      rotate: { duration: 15, repeat: Infinity, ease: "linear", delay: index * 0.5 },
                    }}
                  >
                    <div className="px-4 py-2 rounded bg-navy/90 border border-burnt-orange/50" style={{ letterSpacing: "0.15em" }}>
                      <span style={{ color: core.color }}>{core.label}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
}

// ── CSS 3D Orbit (low-end mobile fallback) ────────────────────────────────────

function CSSOrbit({ onCoreSelect }: { onCoreSelect: (core: "leadership" | "design" | "technology") => void }) {
  const cores = [
    { id: "leadership" as const, label: "LEADERSHIP", icon: Users,   color: "#E3B53D", delay: "0s"   },
    { id: "design" as const,     label: "DESIGN",     icon: PenTool, color: "#9B3DE3", delay: "-5s"  },
    { id: "technology" as const, label: "TECHNOLOGY", icon: Cpu,     color: "#3D8BE3", delay: "-10s" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <img src={logoImage} alt="Personal Nexus Logo" className="w-48 h-auto" style={{ filter: "drop-shadow(0 0 30px rgba(227, 107, 61, 0.5))" }} />
      <div className="absolute" style={{ perspective: "600px", width: 400, height: 400 }}>
        {cores.map((core) => {
          const Icon = core.icon;
          return (
            <button
              key={core.id}
              onClick={() => onCoreSelect(core.id)}
              className="absolute w-20 h-20 rounded-lg glass flex flex-col items-center justify-center gap-1"
              style={{
                top: "50%", left: "50%", marginTop: -40, marginLeft: -40,
                border: `1px solid ${core.color}80`,
                animation: `cssOrbit 15s linear infinite`,
                animationDelay: core.delay,
              }}
            >
              <Icon style={{ color: core.color, width: 24, height: 24 }} />
              <span style={{ color: core.color, fontSize: 9, letterSpacing: "0.1em" }}>{core.label}</span>
            </button>
          );
        })}
      </div>
      <style>{`
        @keyframes cssOrbit {
          from { transform: rotateY(0deg) translateZ(180px) rotateY(0deg); }
          to   { transform: rotateY(360deg) translateZ(180px) rotateY(-360deg); }
        }
      `}</style>
    </div>
  );
}

// ── NexusHub ──────────────────────────────────────────────────────────────────

export function NexusHub({ onCoreSelect, onAboutClick, onContactClick, onWorkExperienceClick, onWebsterLEADSClick }: NexusHubProps) {
  const [tier, setTier] = useState<QualityTier>("dom2d");

  useEffect(() => {
    setTier(detectQualityTier());
  }, []);

  const navButtons = [
    { label: "About Me",        shortLabel: "About",         icon: User,     onClick: onAboutClick,          delay: 2.2 },
    { label: "Work Experience", shortLabel: "Work",          icon: Briefcase,onClick: onWorkExperienceClick,  delay: 2.4 },
    { label: "Contact",         shortLabel: "Contact",       icon: Mail,     onClick: onContactClick,         delay: 2.6 },
    { label: "WebsterLEADS",    shortLabel: "WebsterLEADS",  icon: Award,    onClick: onWebsterLEADSClick,    delay: 2.8 },
  ];

  return (
    <main className="relative w-full h-screen bg-[#0a0e1a] overflow-hidden grid-pattern">
      {/* Navigation buttons */}
      <nav
        className="absolute bottom-16 left-1/2 -translate-x-1/2 md:bottom-auto md:top-8 md:left-8 md:translate-x-0 z-40 flex gap-4"
        aria-label="Main navigation"
      >
        {navButtons.map(({ label, shortLabel, icon: Icon, onClick, delay }) => (
          <motion.div
            key={label}
            className="relative group/nav"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
          >
            <motion.button
              onClick={onClick}
              className="w-14 h-14 rounded-full glass flex items-center justify-center hover:glow-orange transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="w-6 h-6 text-white group-hover/nav:text-burnt-orange transition-colors" />
            </motion.button>
            {/* Mobile label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:hidden whitespace-nowrap pointer-events-none">
              <span className="text-white/85 text-xs">{shortLabel}</span>
            </div>
            {/* Desktop hover tooltip */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden md:block opacity-0 group-hover/nav:opacity-100 transition-opacity pointer-events-none">
              <div className="px-3 py-1 rounded bg-navy/90 border border-burnt-orange/50 whitespace-nowrap">
                <span className="text-white text-sm">{label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </nav>

      {/* 3D scene or fallback */}
      <div className="absolute inset-0">
        {tier === "dom2d" ? (
          <LegacyOrbit onCoreSelect={onCoreSelect} />
        ) : tier === "css3d" ? (
          <CSSOrbit onCoreSelect={onCoreSelect} />
        ) : (
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img
                  src={logoImage}
                  alt="Loading..."
                  className="w-48 opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            }
          >
            <NexusScene onCoreSelect={onCoreSelect} tier={tier} logoSrc={logoImage} />
          </Suspense>
        )}
      </div>

      {/* Instructions */}
      <motion.div
        className="absolute top-8 md:top-auto md:bottom-12 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-white/75 tracking-wider text-sm md:text-base">
          <span className="md:hidden">TAP TO EXPLORE</span>
          <span className="hidden md:inline">HOVER AND CLICK TO EXPLORE</span>
        </p>
      </motion.div>
    </main>
  );
}
