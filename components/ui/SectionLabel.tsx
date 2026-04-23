"use client";
import { motion } from "framer-motion";

export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-12"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
    >
      <span className="font-mono text-[10px] tracking-[0.4em] text-white/50 uppercase">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </motion.div>
  );
}
