"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cv } from "@/data/cv";

const sections = [
  { id: "hero", label: "//home" },
  { id: "projects", label: "//vault" },
  { id: "timeline", label: "//journey" },
  { id: "skills", label: "//skills" },
  { id: "gallery", label: "//archive" },
  { id: "chat", label: "//chat" },
  { id: "contact", label: "//contact" },
];

interface NavbarProps {
  onOpenChat: () => void;
}

export default function Navbar({ onOpenChat }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // IntersectionObserver-style active section detection
      const sectionEls = sections.map((s) => document.getElementById(s.id));
      let current = "hero";
      sectionEls.forEach((el) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = el.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 h-14"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
    >
      <div
        className={`w-full h-full px-6 flex items-center justify-between transition-all duration-300 border-b ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-white/[0.06]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Left: system identity */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
          <span className="font-mono text-xs text-white/40 hidden sm:block">
            sys://
          </span>
          <span className="font-mono text-xs text-white/80 font-semibold tracking-widest uppercase">
            Feemoai
          </span>
          <span className="font-mono text-xs text-white/20 hidden md:block">
            &gt; status:{" "}
            <span className="text-emerald-400/80">{cv.personal.status.toLowerCase()}</span>
          </span>
        </div>

        {/* Center: nav tabs (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`relative px-3 py-1.5 font-mono text-[11px] tracking-widest transition-all duration-300 ${
                activeSection === s.id
                  ? "text-white"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              {activeSection === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 bg-white/[0.07] border border-white/10 rounded-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Right: clock + chat */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/20 hidden sm:block tabular-nums">
            {time}
          </span>
          <button
            onClick={onOpenChat}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-sm font-mono text-[11px] text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            FeemoAI
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/50 hover:text-white"
          >
            <div className="w-5 flex flex-col gap-1">
              <span
                className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden absolute top-14 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/[0.06] p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="w-full text-left py-3 px-4 font-mono text-xs text-white/50 hover:text-white border-b border-white/[0.04] last:border-0 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {s.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
