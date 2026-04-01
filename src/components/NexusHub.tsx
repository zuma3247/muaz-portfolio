import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Users, PenTool, Cpu, User, Mail, Briefcase, Award, ArrowRight } from "lucide-react";
import profileImage from "figma:asset/4818c55379a67e1e42d245e328dec518de1744b1.png";
import logoImage from "figma:asset/b0989652989926fe92b786073197f74a529bda75.png";
import { Footer } from "./Footer";

interface NexusHubProps {
  onCoreSelect: (core: "leadership" | "design" | "technology") => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  onWorkExperienceClick: () => void;
  onWebsterLEADSClick: () => void;
  onNavigate: (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => void;
}

const greetings = ["Hello!", "Assalamu Alaikum!", "Peace Be Upon You!"];

const cards = [
  {
    id: "leadership" as const,
    label: "Leadership",
    copy: "Building communities through empathy, initiative, and action.",
    icon: Users,
    color: "#E3B53D",
  },
  {
    id: "design" as const,
    label: "Design",
    copy: "Crafting visual experiences that communicate and connect.",
    icon: PenTool,
    color: "#9B3DE3",
  },
  {
    id: "technology" as const,
    label: "Technology",
    copy: "Building intuitive solutions that bring people together.",
    icon: Cpu,
    color: "#3D8BE3",
  },
];

function RotatingGreeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[1.4em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={greetings[index]}
          className="block whitespace-nowrap"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function NexusHub({
  onCoreSelect,
  onAboutClick,
  onContactClick,
  onWorkExperienceClick,
  onWebsterLEADSClick,
  onNavigate,
}: NexusHubProps) {
  const navButtons = [
    { label: "About", icon: User, onClick: onAboutClick },
    { label: "Work", icon: Briefcase, onClick: onWorkExperienceClick },
    { label: "Contact", icon: Mail, onClick: onContactClick },
    { label: "WebsterLEADS", icon: Award, onClick: onWebsterLEADSClick },
  ];

  return (
    <main className="relative w-full min-h-screen bg-[#0a0e1a] flex flex-col justify-center py-8">
      <div className="mx-auto max-w-6xl px-6 w-full">
        {/* Header row — desktop only */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 p-1.5 flex items-center justify-center">
              <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-white font-bold tracking-widest text-lg">MUAZ</span>
          </div>
          <nav className="flex items-center gap-3" aria-label="Main navigation">
            {navButtons.map(({ label, icon: Icon, onClick }, i) => (
              <motion.button
                key={label}
                onClick={onClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/80 text-sm hover:text-burnt-orange hover:border-burnt-orange/40 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
          {/* Left column — image + greeting + bio */}
          <motion.div
            className="flex flex-col justify-between gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Profile image */}
            <div className="w-32 h-32 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
              <img
                src={profileImage}
                alt="Muaz"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center flex-1 space-y-4">
              {/* Rotating greeting */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-tight">
                <RotatingGreeting />
              </h1>

              {/* Bio */}
              <div className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed max-w-md">
                <p>
                  I'm <span className="text-white font-medium">Muaz</span> — a Computer Science student with a designer's eye and a leader's mindset.
                </p>
                <p>
                  I'm passionate about creating technology that feels intuitive, looks beautiful, and brings people together.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column — cards */}
          <motion.div
            className="flex flex-col gap-4 justify-between h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.id}
                  onClick={() => onCoreSelect(card.id)}
                  className="group flex flex-1 items-center gap-5 p-5 rounded-xl glass border border-white/10 text-left hover:border-opacity-40 transition-all w-full min-h-[100px]"
                  style={{
                    "--card-color": card.color,
                  } as React.CSSProperties}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: card.color, transition: { duration: 0.15, ease: "easeOut" } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-1">
                    <h2
                      className="text-lg font-semibold mb-1 transition-colors group-hover:brightness-110"
                      style={{ color: card.color }}
                    >
                      {card.label}
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {card.copy}
                    </p>
                  </div>
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 transition-shadow"
                    style={{
                      background: `${card.color}15`,
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  <ArrowRight
                    className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-all group-hover:translate-x-1 shrink-0"
                  />
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
      
      <div className="mt-auto pt-16">
        <Footer onNavigate={onNavigate} />
      </div>
    </main>
  );
}
