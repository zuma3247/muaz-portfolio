import { motion } from "motion/react";
import logoImage from "figma:asset/b0989652989926fe92b786073197f74a529bda75.png";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0a0e1a] flex items-center justify-center p-8"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.img
        src={logoImage}
        alt="Logo"
        className="w-48 md:w-64 lg:w-80 h-auto"
        initial={{ 
          scale: 0.85, 
          opacity: 0, 
          y: 30, 
          filter: "drop-shadow(0 0 0px rgba(227, 107, 61, 0)) blur(4px)" 
        }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          filter: "drop-shadow(0 0 40px rgba(227, 107, 61, 0.5)) blur(0px)" 
        }}
        transition={{ 
          duration: 1.5, 
          ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for a smooth, premium feel
        }}
      />
    </motion.div>
  );
}
