import { motion } from "framer-motion";
import type { Scientist } from "@/data/scientists";

interface ScientistPortraitProps {
  scientist: Scientist;
  size?: "sm" | "lg";
}

const ScientistPortrait = ({ scientist, size = "lg" }: ScientistPortraitProps) => {
  const sizeClasses = size === "lg"
    ? "w-28 h-28 sm:w-36 sm:h-36 text-xl sm:text-2xl"
    : "w-12 h-12 sm:w-14 sm:h-14 text-[10px] sm:text-xs";

  return (
    <motion.div
      className={`relative ${sizeClasses} rounded-lg overflow-hidden flex-shrink-0 border-2 shadow-lg group flex items-center justify-center`}
      style={{
        borderColor: "hsl(var(--leather-light))",
        background: "hsl(var(--paper-dark))",
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Icon text */}
      <span
        className="font-display tracking-tight text-center leading-tight select-none"
        style={{ color: scientist.spineAccent }}
      >
        {scientist.icon}
      </span>

      {/* Corner decorations */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gold/40 z-30" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gold/40 z-30" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gold/40 z-30" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gold/40 z-30" />
    </motion.div>
  );
};

export default ScientistPortrait;
