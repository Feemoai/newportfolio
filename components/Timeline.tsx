"use client";
import { motion } from "framer-motion";
import { cv } from "@/data/cv";
import SectionLabel from "./ui/SectionLabel";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

const categoryIcon: Record<string, string> = {
  leadership: "◈",
  community: "◉",
  organization: "◎",
  volunteer: "○",
};

// Merge education + experience sorted by start_date desc
const timelineItems = [
  ...cv.education.map((e) => ({
    id: e.institution,
    title: e.degree,
    org: e.institution,
    start: e.start_date,
    end: e.end_date,
    description: e.status === "Ongoing" ? "Currently enrolled in this program." : `Completed with score: ${e.score?.value}/${e.score?.scale ?? 100}`,
    highlights: e.achievements ?? [],
    category: "education",
    icon: "▣",
  })),
  ...cv.experience.map((e) => ({
    id: `${e.organization}-${e.start_date}`,
    title: e.role,
    org: e.organization,
    start: e.start_date,
    end: e.end_date,
    description: e.description ?? "",
    highlights: e.highlights ?? [],
    category: e.category,
    icon: categoryIcon[e.category] ?? "○",
  })),
].sort((a, b) => (b.start ?? "").localeCompare(a.start ?? ""));

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>04 // Journey Path</SectionLabel>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2" />

          <div className="space-y-8">
            {timelineItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  className={`relative flex items-start ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                >
                  {/* Content Container */}
                  <div className={`flex-1 md:w-1/2 min-w-0 ${
                    isLeft ? "md:text-right md:pr-14" : "md:text-left md:pl-14"
                  } pl-12 md:pl-0`}>
                    <div
                      className="inline-block p-5 border border-white/[0.07] rounded-xl group hover:border-white/[0.15] transition-colors duration-300 w-full max-w-full md:w-auto"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      {/* Date */}
                      <p className="font-mono text-[10px] text-white/45 mb-2 tracking-wider">
                        {formatDate(item.start)} — {formatDate(item.end)}
                      </p>

                      {/* Role */}
                      <h3 className="font-semibold text-white/90 text-sm mb-0.5">{item.title}</h3>
                      <p className="text-white/60 text-xs font-mono mb-3">{item.org}</p>

                      {/* Description */}
                      {item.description && (
                        <p className="text-white/50 text-xs leading-relaxed mb-3">{item.description}</p>
                      )}

                      {/* Highlights */}
                      {item.highlights.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : "justify-start"}`}>
                          {item.highlights.map((h) => (
                            <span
                              key={h}
                              className="px-2 py-0.5 text-[9px] font-mono text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-full"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 flex items-center justify-center">
                    <motion.div
                      className="w-10 h-10 rounded-full border border-white/[0.1] bg-black flex items-center justify-center text-white/50 text-xs font-mono z-10"
                      whileInView={{ borderColor: "rgba(255,255,255,0.2)" }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 + 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
