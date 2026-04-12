import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Scientist } from "@/data/scientists";
import Bookshelf from "@/components/Bookshelf";
import ScientistDetail from "@/components/ScientistDetail";
import ParallaxPaper from "@/components/ParallaxPaper";
import InkLoader from "@/components/InkLoader";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [selected, setSelected] = useState<Scientist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("custom-cursor");
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (loading) {
    return <InkLoader />;
  }

  return (
    <ParallaxPaper className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {/* Theme toggle — top right */}
        <div className="flex justify-end mb-2">
          <ThemeToggle />
        </div>

        {/* Header */}
        <motion.header
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs sm:text-sm tracking-[0.3em] text-ink-light/60 mb-2">
            SUBJECT: HISTORY OF SCIENCE · GRADE: S-TIER · SEMESTER: ALL
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
            THE SCIENCE LEGENDS ARCHIVE
          </h1>
          <p className="font-handwritten text-base sm:text-lg text-ink-light mt-2">
            — math × physics edition, vol. I —
          </p>
          <div className="mt-4 mx-auto h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent w-48 sm:w-64" />
          <p className="font-body text-xs sm:text-sm text-ink-light/70 mt-4 max-w-md mx-auto italic">
            ↓ pick a chad below. pick a field. prepare to feel things about differential equations. ↓
          </p>
        </motion.header>

        {/* Bookshelf / Index */}
        <motion.section
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Bookshelf
            onSelectScientist={setSelected}
            selectedId={selected?.id ?? null}
          />
        </motion.section>

        {/* Scientist Detail — Page Content */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.section
              key={selected.id}
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ScientistDetail scientist={selected} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!selected && (
          <motion.div
            className="text-center py-16 sm:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="font-handwritten text-xl sm:text-2xl text-ink-light/40">
              — TAP A LEGEND TO PULL THEIR FILE —
            </p>
            <motion.div
              className="mt-4 text-3xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              📚
            </motion.div>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="text-center py-6 border-t border-border/30">
          <p className="font-display text-xs tracking-widest text-ink-light/40">
            filed under: certified all-time legends ✦ drafted on ruled paper
          </p>
        </footer>
      </div>
    </ParallaxPaper>
  );
};

export default Index;
