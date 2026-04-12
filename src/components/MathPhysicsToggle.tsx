import { motion } from "framer-motion";

interface MathPhysicsToggleProps {
  field: "math" | "physics";
  onToggle: (field: "math" | "physics") => void;
}

const MathPhysicsToggle = ({ field, onToggle }: MathPhysicsToggleProps) => {
  const isMath = field === "math";

  return (
    <div className="relative flex items-center gap-0 rounded-full overflow-hidden border border-border shadow-inner"
      style={{ background: "hsl(var(--paper-dark))" }}
    >
      {/* Sliding background */}
      <motion.div
        className="absolute top-0 bottom-0 w-1/2 rounded-full"
        animate={{ x: isMath ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          background: isMath
            ? "linear-gradient(135deg, hsl(var(--ink-math) / 0.2), hsl(var(--ink-math) / 0.1))"
            : "linear-gradient(135deg, hsl(var(--ink-physics) / 0.2), hsl(var(--ink-physics) / 0.1))",
          border: `1px solid ${isMath ? "hsl(var(--ink-math) / 0.3)" : "hsl(var(--ink-physics) / 0.3)"}`,
        }}
      />

      <button
        onClick={() => onToggle("math")}
        className={`relative z-10 px-4 py-1.5 text-xs font-display tracking-wider transition-colors duration-300 ${
          isMath ? "text-ink-math" : "text-ink-light"
        }`}
      >
        MATH
      </button>
      <button
        onClick={() => onToggle("physics")}
        className={`relative z-10 px-4 py-1.5 text-xs font-display tracking-wider transition-colors duration-300 ${
          !isMath ? "text-ink-physics" : "text-ink-light"
        }`}
      >
        PHYSICS
      </button>
    </div>
  );
};

export default MathPhysicsToggle;
