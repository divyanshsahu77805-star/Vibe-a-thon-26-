import { useState } from "react";
import { motion } from "framer-motion";
import type { Scientist } from "@/data/scientists";

interface ScientistPortraitProps {
  scientist: Scientist;
}

const ScientistPortrait = ({ scientist }: ScientistPortraitProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden flex-shrink-0 border-2 shadow-lg group"
      style={{
        borderColor: "hsl(var(--leather-light))",
        background: "hsl(var(--paper-dark))",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      {/* Line drawing layer (on top, fades out on hover) */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${scientist.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(1.5) brightness(1.3)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Detailed portrait layer (below, revealed on hover) */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          filter: isHovered ? "sepia(40%) contrast(1.1)" : "sepia(80%) contrast(0.8) blur(2px)",
        }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${scientist.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Sketch reveal overlay effect */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        animate={{
          background: isHovered
            ? "linear-gradient(180deg, transparent 0%, transparent 100%)"
            : "linear-gradient(180deg, hsl(var(--paper) / 0.3) 0%, hsl(var(--paper) / 0.1) 100%)",
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Corner decorations */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gold/40" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gold/40" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gold/40" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gold/40" />
    </motion.div>
  );
};

export default ScientistPortrait;
