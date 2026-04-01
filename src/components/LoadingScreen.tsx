import { motion } from "motion/react";
import logoImage from "figma:asset/b0989652989926fe92b786073197f74a529bda75.png";

interface LoadingScreenProps {
  onSkip: () => void;
}

export function LoadingScreen({ onSkip }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0a0e1a] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.img
          src={logoImage}
          alt="Loading"
          className="w-32 md:w-40 h-auto"
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              "drop-shadow(0 0 20px rgba(227, 107, 61, 0.4))",
              "drop-shadow(0 0 30px rgba(227, 107, 61, 0.6))",
              "drop-shadow(0 0 20px rgba(227, 107, 61, 0.4))",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Loading text */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {["L", "O", "A", "D", "I", "N", "G"].map((letter, index) => (
            <motion.span
              key={index}
              className="text-burnt-orange tracking-widest"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-navy/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-burnt-orange"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        {/* Skip button */}
        <motion.button
          onClick={onSkip}
          className="mt-4 px-6 py-2 glass rounded-full text-white/70 hover:text-burnt-orange hover:glow-orange transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
