"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cv } from "@/data/cv";
import { MapPin, Mail, ExternalLink, ChevronDown } from "lucide-react";

const InstagramIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
  </svg>
);

interface HeroProps {
  onOpenChat: () => void;
}

const roles = ["Beginner", "Frontend Developer", "UI Designer", "Lifelong Learner"];

export default function Hero({ onOpenChat }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentRole, setCurrentRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [showPhoto, setShowPhoto] = useState(true);

  // Photo swapping timer
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPhoto((prev) => !prev);
    }, 5000); // Swap every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Dynamic typewriter logic for roles
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const nextCharTimeout = setTimeout(() => {
      const fullText = roles[roleIndex];
      
      if (!isDeleting) {
        setCurrentRole(fullText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        
        if (charIndex + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentRole(fullText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(nextCharTimeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-14 overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity, willChange: "transform" }} 
        className="w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16"
      >
        {/* Left: Identity */}
        <div className="flex-1 min-w-0">
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-emerald-500/30 bg-emerald-500/[0.06] rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-emerald-400 tracking-widest">
              ONLINE · AVAILABLE
            </span>
          </motion.div>

          {/* Hero title with Typewriter */}
          <div className="mb-6">
            <div className="flex flex-col">
              <div className="overflow-hidden h-[60px] md:h-[70px] lg:h-[80px]">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-none text-white/20"
                >
                  I am
                </motion.span>
              </div>
              
              <div className="mt-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight min-h-[1.2em]">
                  {cv.personal.full_name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xl md:text-2xl font-mono text-emerald-400/80">&gt;</span>
                  <span className="text-xl md:text-2xl font-mono text-white/60">
                    {currentRole}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-[2px] h-[0.7em] bg-emerald-400 ml-1 translate-y-0.5"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <motion.p
            className="text-lg md:text-xl text-white/65 mb-4 font-light max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            {cv.personal.headline}
          </motion.p>

          {/* Location */}
          <motion.div
            className="flex items-center gap-2 text-white/50 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <MapPin size={13} />
            <span className="font-mono text-xs tracking-wider">{cv.personal.location}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative px-7 py-3.5 bg-white text-black font-mono text-sm tracking-widest uppercase rounded-sm overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">View Projects</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={onOpenChat}
              className="px-7 py-3.5 border border-white/20 text-white/70 font-mono text-sm tracking-widest rounded-sm hover:border-white/50 hover:text-white transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              FeemoAI
            </motion.button>
          </motion.div>
        </div>

        {/* Right: floating glass card / Photo */}
        <motion.div
          className="flex-shrink-0 w-full lg:w-80 h-[380px]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
        >
          <AnimatePresence mode="wait">
            {showPhoto ? (
              <motion.div
                key="photo-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative h-full border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="/projects/fotoku.jpg" 
                  alt={cv.personal.full_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-sm tracking-widest">{cv.personal.full_name}</p>
                  <p className="text-white/50 text-[10px] font-mono tracking-tighter uppercase mt-0.5">Profile Visualization</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="info-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative h-full p-6 border border-white/[0.08] rounded-xl flex flex-col justify-between"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
              >
                <div>
                  {/* Card header */}
                  <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.06]">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-white">
                      AF
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{cv.personal.full_name}</p>
                      <p className="text-[10px] text-white/50 font-mono">{cv.personal.status.toLowerCase()}</p>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: "Organizations", value: cv.experience.length },
                      { label: "Projects", value: cv.projects.length },
                      { label: "Achievements", value: cv.achievements.length },
                      { label: "Skills", value: Object.values(cv.skills).flat().length },
                    ].map((stat) => (
                      <div key={stat.label} className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                        <p className="text-xl font-bold text-white">{stat.value}+</p>
                        <p className="text-[10px] text-white/50 font-mono mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact links */}
                <div className="space-y-2">
                  <a
                    href={`mailto:${cv.personal.contacts.email}`}
                    className="flex items-center gap-2 text-[11px] text-white/65 hover:text-white/80 transition-colors font-mono group"
                  >
                    <Mail size={11} />
                    <span className="truncate">{cv.personal.contacts.email}</span>
                    <ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href={cv.personal.contacts.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[11px] text-white/65 hover:text-white/80 transition-colors font-mono group"
                  >
                    <InstagramIcon size={11} />
                    <span>@feemoai</span>
                    <ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
