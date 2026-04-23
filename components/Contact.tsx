"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, Globe, CheckCircle, ExternalLink as LinkedinIcon, Loader2 } from "lucide-react";
import { cv } from "@/data/cv";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
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

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: cv.personal.contacts.email,
    href: `mailto:${cv.personal.contacts.email}`,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "ahmad-fajril-falah",
    href: cv.personal.contacts.linkedin,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@feemoai",
    href: cv.personal.contacts.website,
  },
  {
    icon: Phone,
    label: "Phone",
    value: cv.personal.contacts.phone,
    href: `tel:${cv.personal.contacts.phone}`,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact: ${form.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const inputBase =
    "w-full bg-transparent text-white/80 text-sm font-mono outline-none placeholder-white/15 transition-all duration-300";

  const fieldWrapper = (id: string) =>
    `relative border-b transition-all duration-400 pb-3 ${
      focused === id ? "border-white/40" : "border-white/[0.08]"
    }`;

  return (
    <section id="contact" className="relative py-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>08 // Contact me</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: CTA text + socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Let&apos;s build
              <br />
              <span className="text-white/50">something</span>
              <br />
              together.
            </h2>
            <p className="text-white/55 text-sm leading-relaxed mb-10 max-w-sm">
              Fajril is open to collaborations, internships, freelance projects, and tech communities. Don&apos;t hesitate to reach out.
            </p>

            {/* Social links */}
            <div className="space-y-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-3 border-b border-white/[0.05] hover:border-white/20 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <div className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-white/50 group-hover:text-white/70 group-hover:border-white/20 transition-all">
                    <s.icon size={13} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-white/45 tracking-widest">{s.label}</p>
                    <p className="text-xs text-white/60 group-hover:text-white/90 transition-colors">{s.value}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] text-white/50">→</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="p-8 border border-white/[0.07] rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/[0.05]">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <span className="font-mono text-[10px] text-white/20 ml-2 tracking-wider">
                  compose_message.sh
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-7"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className={fieldWrapper("name")}>
                      <label className="block font-mono text-[10px] text-white/45 tracking-widest mb-2">
                        NAME
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        className={inputBase}
                      />
                    </div>

                    <div className={fieldWrapper("email")}>
                      <label className="block font-mono text-[10px] text-white/45 tracking-widest mb-2">
                        EMAIL
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="your@email.com"
                        className={inputBase}
                      />
                    </div>

                    <div className={fieldWrapper("message")}>
                      <label className="block font-mono text-[10px] text-white/45 tracking-widest mb-2">
                        MESSAGE
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="What would you like to discuss?"
                        className={`${inputBase} resize-none`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 bg-white/50 text-black font-mono text-sm tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSending ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                      {isSending ? "Sending..." : "Send Message"}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="text-emerald-400 mb-4" size={40} />
                    <h3 className="text-white font-semibold text-lg mb-2">Message Sent!</h3>
                    <p className="text-white/40 text-sm font-mono">Fajril will get back to you soon.</p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                      className="mt-8 text-xs font-mono text-white/50 hover:text-white/60 transition-colors"
                    >
                      ← Send another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="font-mono text-[10px] text-white/15 tracking-widest">
            © {new Date().getFullYear()} — Ahmad Fajril Falah
          </span>
          <span className="font-mono text-[10px] text-white/10 tracking-wider">
            sys://end_session — all rights reserved
          </span>
        </motion.div>
      </div>
    </section>
  );
}
