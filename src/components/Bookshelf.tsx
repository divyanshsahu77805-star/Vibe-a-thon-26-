import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scientists, type Scientist } from "@/data/scientists";

interface BookshelfProps {
  onSelectScientist: (scientist: Scientist) => void;
  selectedId: string | null;
}

const BookSpine = ({
  scientist,
  index,
  isSelected,
  isPulling,
  onClick,
}: {
  scientist: Scientist;
  index: number;
  isSelected: boolean;
  isPulling: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex-shrink-0 group"
      style={{ perspective: "800px" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
    >
      <motion.div
        className="relative w-16 sm:w-20 h-[280px] sm:h-[340px] rounded-r-sm shadow-lg flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${scientist.spineColor}, ${scientist.spineColor}dd)`,
          transformOrigin: "left center",
          boxShadow: isSelected
            ? `4px 0 20px ${scientist.spineAccent}66`
            : "2px 0 8px rgba(0,0,0,0.4)",
        }}
        animate={
          isPulling
            ? { rotateY: -25, x: 30, scale: 1.05 }
            : isSelected
            ? { rotateY: -45, x: 60, scale: 1.1 }
            : { rotateY: 0, x: 0, scale: 1 }
        }
        whileHover={!isSelected ? { rotateY: -8, x: 10 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* Gold edge trim */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: scientist.spineAccent }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-0.5"
          style={{ background: `${scientist.spineAccent}88` }}
        />

        {/* Top and bottom decoration */}
        <div
          className="absolute top-3 left-2 right-2 h-px"
          style={{ background: scientist.spineAccent }}
        />
        <div
          className="absolute bottom-3 left-2 right-2 h-px"
          style={{ background: scientist.spineAccent }}
        />

        {/* Scientist name rotated */}
        <span
          className="font-display text-xs sm:text-sm tracking-widest whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            color: scientist.spineAccent,
            textShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          {scientist.name}
        </span>

        {/* Embossed year at bottom */}
        <span
          className="absolute bottom-6 font-display text-[8px] sm:text-[10px] opacity-60"
          style={{
            writingMode: "vertical-rl",
            color: scientist.spineAccent,
          }}
        >
          {scientist.years.split("–")[0].replace("c. ", "")}
        </span>
      </motion.div>

      {/* Book top edge */}
      <div
        className="absolute -top-1 left-1 right-0 h-1 rounded-t-sm opacity-40"
        style={{ background: "hsl(var(--paper-dark))" }}
      />
    </motion.button>
  );
};

const Bookshelf = ({ onSelectScientist, selectedId }: BookshelfProps) => {
  const [pullingId, setPullingId] = useState<string | null>(null);

  const handleSelect = (scientist: Scientist) => {
    if (selectedId === scientist.id) return;
    setPullingId(scientist.id);
    setTimeout(() => {
      onSelectScientist(scientist);
      setPullingId(null);
    }, 400);
  };

  return (
    <div className="relative">
      {/* Shelf */}
      <div className="flex items-end justify-center gap-1 sm:gap-2 px-4 pb-4 overflow-x-auto">
        <AnimatePresence>
          {scientists.map((s, i) => (
            <BookSpine
              key={s.id}
              scientist={s}
              index={i}
              isSelected={selectedId === s.id}
              isPulling={pullingId === s.id}
              onClick={() => handleSelect(s)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Wooden shelf surface */}
      <div
        className="h-5 sm:h-6 rounded-sm shadow-md"
        style={{
          background: "linear-gradient(180deg, hsl(var(--wood-light)) 0%, hsl(var(--wood)) 40%, hsl(var(--leather)) 100%)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 hsl(var(--wood-light) / 0.5)",
        }}
      />
      {/* Shelf bracket shadow */}
      <div className="h-2 bg-gradient-to-b from-black/10 to-transparent" />
    </div>
  );
};

export default Bookshelf;
