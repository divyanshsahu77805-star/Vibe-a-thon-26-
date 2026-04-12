import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-8 rounded-full border-2 overflow-hidden flex items-center transition-colors duration-500"
      style={{
        borderColor: "hsl(var(--gold) / 0.5)",
        background: isDark
          ? "linear-gradient(135deg, hsl(25 20% 12%), hsl(25 15% 18%))"
          : "linear-gradient(135deg, hsl(39 40% 85%), hsl(39 35% 78%))",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {/* Sliding knob */}
      <motion.div
        className="absolute w-6 h-6 rounded-full flex items-center justify-center shadow-md"
        animate={{
          x: isDark ? 26 : 2,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          background: isDark
            ? "linear-gradient(135deg, hsl(220 20% 25%), hsl(220 15% 35%))"
            : "linear-gradient(135deg, hsl(43 70% 55%), hsl(43 60% 45%))",
          boxShadow: isDark
            ? "0 0 8px rgba(100, 150, 255, 0.3)"
            : "0 0 8px rgba(200, 150, 50, 0.4)",
        }}
      >
        <span className="text-xs">{isDark ? "🌙" : "☀️"}</span>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
