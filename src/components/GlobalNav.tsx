import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, User, Briefcase, Mail, TrendingUp, PenTool, Cpu, Home, Award } from "lucide-react";
import logoImage from "figma:asset/b0989652989926fe92b786073197f74a529bda75.png";

interface GlobalNavProps {
  currentSection: string | null;
  onNavigate: (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => void;
}

export function GlobalNav({ currentSection, onNavigate }: GlobalNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isHub = currentSection === null;

  const navItems = [
    { id: "hub", label: "Home", icon: Home },
    { id: "about", label: "About Me", icon: User },
    { id: "work-experience", label: "Work Experience", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "leadership", label: "Leadership", icon: TrendingUp },
    { id: "design", label: "Design", icon: PenTool },
    { id: "technology", label: "Technology", icon: Cpu },
    { id: "websterleads", label: "WebsterLEADS", icon: Award },
  ];

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId as any);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Menu button - fixed position (hide on desktop when on hub, since hub has inline nav) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-8 right-8 z-50 w-14 h-14 rounded-full glass flex items-center justify-center hover:glow-orange transition-all ${isHub ? "md:hidden" : ""}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Navigation menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-40 w-80 max-w-[85vw] glass p-8 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Header */}
              <div className="mb-8 pt-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 p-1.5 flex items-center justify-center">
                    <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-white font-bold tracking-widest text-lg">MUAZ</span>
                </div>
                <h2 className="text-white tracking-wide mb-2">Navigation</h2>
                <p className="text-white/75 text-sm">Jump to any section</p>
              </div>

              {/* Navigation items */}
              <nav className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-burnt-orange/20 border border-burnt-orange/50"
                          : "glass hover:bg-white/5"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive
                            ? "bg-burnt-orange/30"
                            : "bg-burnt-orange/10"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-burnt-orange" : "text-white/85"
                          }`}
                        />
                      </div>
                      <span
                        className={`${
                          isActive ? "text-burnt-orange" : "text-white/90"
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full bg-burnt-orange"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Footer info */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/40 text-xs">
                  The Personal Nexus © 2025
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
