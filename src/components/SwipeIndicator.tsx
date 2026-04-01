import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SwipeIndicator() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none md:hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
        <ChevronLeft className="w-4 h-4 text-white animate-pulse" />
        <span className="text-white text-sm">Swipe</span>
        <ChevronRight className="w-4 h-4 text-white animate-pulse" />
      </div>
    </motion.div>
  );
}
