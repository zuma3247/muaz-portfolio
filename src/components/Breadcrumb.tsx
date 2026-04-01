import { motion } from "motion/react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; onClick?: () => void }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      className="flex items-center gap-2 text-sm mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      aria-label="Breadcrumb"
    >
      <Home className="w-4 h-4 text-burnt-orange" />
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-white/40" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-white/70 hover:text-burnt-orange transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-burnt-orange">{item.label}</span>
          )}
        </div>
      ))}
    </motion.nav>
  );
}
