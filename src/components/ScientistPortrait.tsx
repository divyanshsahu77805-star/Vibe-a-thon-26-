import { useState } from "react";
import { motion } from "framer-motion";
import type { Scientist } from "@/data/scientists";

interface ScientistPortraitProps {
  scientist: Scientist;
  size?: "sm" | "lg";
}

const ScientistPortrait = ({ scientist, size = "lg" }: ScientistPortraitProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = size === "lg"
    ? "w-28 h-28 sm:w-36 sm:h-36"
    : "w-12 h-12 sm:w-14 sm:h-14";

  return (
    <motion.div
      className={`relative ${sizeClasses} rounded-lg overflow-hidden flex-shrink-0 border-2 shadow-lg group`}
      style={{
        borderColor: "hsl(var(--leather-light))",
        background: "hsl(var(--paper-dark))",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      {/* Base layer — realistic B&W photo style */}
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: isHovered
            ? "grayscale(100%) contrast(1.2) brightness(1.05)"
            : "grayscale(100%) contrast(0.9) brightness(0.85) blur(1px)",
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${scientist.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Sketch/drawing overlay — visible by default, fades on hover */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${scientist.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(2.5) brightness(1.8)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Pencil texture overlay for sketch feel */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        animate={{ opacity: isHovered ? 0 : 0.6 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Vignette darkening effect for photo realism */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        animate={{
          opacity: isHovered ? 0.4 : 0,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Paper overlay — fades out on hover to reveal clean B&W photo */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        animate={{
          opacity: isHovered ? 0 : 0.25,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: "hsl(var(--paper) / 0.4)",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gold/40 z-30" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gold/40 z-30" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gold/40 z-30" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gold/40 z-30" />
    </motion.div>
  );
};

export default ScientistPortrait;
