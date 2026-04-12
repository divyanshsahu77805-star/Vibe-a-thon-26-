import { useEffect, useRef, useState } from "react";

interface ParallaxPaperProps {
  children: React.ReactNode;
  className?: string;
}

const ParallaxPaper = ({ children, className = "" }: ParallaxPaperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const offsetX = (mouse.x - 0.5) * 20;
  const offsetY = (mouse.y - 0.5) * 20;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Parallax paper layers */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Coffee stain 1 */}
        <div className="coffee-stain" style={{ top: "10%", right: "15%" }} />
        {/* Coffee stain 2 */}
        <div className="coffee-stain" style={{ bottom: "20%", left: "10%", width: "80px", height: "80px" }} />
      </div>

      {/* Ink splatters layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          transform: `translate(${offsetX * 1.2}px, ${offsetY * 1.2}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div
          className="absolute w-3 h-3 rounded-full"
          style={{ background: "hsl(var(--ink) / 0.3)", top: "30%", left: "70%" }}
        />
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{ background: "hsl(var(--ink) / 0.2)", top: "60%", right: "20%" }}
        />
        <div
          className="absolute w-1 h-1 rounded-full"
          style={{ background: "hsl(var(--ink) / 0.25)", top: "45%", left: "25%" }}
        />
      </div>

      {/* Warm glow following cursor */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, hsl(39 60% 70% / 0.15) 0%, transparent 70%)",
          left: `${mouse.x * 100}%`,
          top: `${mouse.y * 100}%`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />

      {children}
    </div>
  );
};

export default ParallaxPaper;
