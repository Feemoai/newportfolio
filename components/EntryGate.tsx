"use client";
import { motion, AnimatePresence } from "framer-motion";
import { cv } from "@/data/cv";

interface EntryGateProps {
  onEnter: () => void;
}

const chars = cv.personal.full_name.split("");

export default function EntryGate({ onEnter }: EntryGateProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Background radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* System boot label */}
        <motion.p
          className="mb-8 font-mono text-xs tracking-[0.4em] text-white/30 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          sys://init — identity.load
        </motion.p>

        {/* Name character reveal */}
        <div className="flex flex-wrap justify-center gap-[2px] mb-6">
          {chars.map((char, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.6 + i * 0.05,
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
              }}
              style={{ display: char === " " ? "inline-block" : undefined, width: char === " " ? "1rem" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Headline */}
        <motion.p
          className="mb-16 text-sm md:text-base text-white/50 tracking-widest font-mono uppercase text-center px-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {cv.personal.headline}
        </motion.p>

        {/* Enter button */}
        <motion.button
          onClick={onEnter}
          className="group relative px-10 py-4 border border-white/20 rounded-sm font-mono text-sm tracking-[0.3em] text-white/70 uppercase overflow-hidden transition-all duration-500 hover:border-white/50 hover:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow fill on hover */}
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 border border-white/10 rounded-sm"
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10">[ Enter Experience ]</span>
        </motion.button>

        {/* Footer hint */}
        <motion.p
          className="absolute bottom-10 text-xs font-mono text-white/20 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          Ahmad Fajril Falah · {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
