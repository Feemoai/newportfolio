"use client";
import { motion } from "framer-motion";
import { cv } from "@/data/cv";
import { SkillItem } from "@/types/cv";
import SectionLabel from "./ui/SectionLabel";

const iconMap: Record<string, string> = {
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  ReactJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  TailwindCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  Canva: "https://cdn.worldvectorlogo.com/logos/canva-1.svg",
  "Adobe Photoshop": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
  CorelDRAW: "https://cdn.worldvectorlogo.com/logos/coreldraw-x7.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
};

function SkillBadge({ skill }: { skill: SkillItem }) {
  const icon = iconMap[skill.name];
  return (
    <div className="flex items-center justify-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl group hover:border-white/20 transition-all hover:bg-white/[0.05] h-12">
      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        {icon ? (
          <img src={icon} alt={skill.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
        ) : (
          <div className="w-full h-full rounded bg-white/10 flex items-center justify-center font-mono text-[8px] text-white/40">
            {skill.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <span className="font-mono text-xs text-white/50 group-hover:text-white transition-colors whitespace-nowrap leading-none mt-0.5">
        {skill.name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 30 }: { items: SkillItem[], direction?: "left" | "right", speed?: number }) {
  const doubledItems = [...items, ...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-2 select-none group">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      
      <div 
        className={`flex gap-4 items-center animate-marquee-${direction}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubledItems.map((skill, i) => (
          <SkillBadge key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const techStack = [...cv.skills.languages, ...cv.skills.frameworks];
  const toolsAndDesign = [...cv.skills.tools, ...cv.skills.design, ...cv.skills.web_development];

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>05 // Capability Skills</SectionLabel>
        
        <div className="space-y-6 mb-20">
          <MarqueeRow items={techStack} speed={30} />
          <MarqueeRow items={toolsAndDesign} direction="right" speed={35} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Achievements */}
           <motion.div
            className="p-8 border border-white/[0.07] rounded-2xl bg-white/[0.02] backdrop-blur-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-8">
              <span className="font-mono text-[9px] text-white/45 tracking-widest">[ACH]</span>
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">Notable Achievements</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cv.achievements.map((ach) => (
                <div key={ach.event} className="group p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all">
                  <span className="text-2xl block mb-3 grayscale group-hover:grayscale-0 transition-all">{ach.icon}</span>
                  <p className="text-xs font-bold text-white mb-1">{ach.title}</p>
                  <p className="text-[10px] text-white/40 font-mono leading-tight">{ach.event}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spoken Languages */}
          <motion.div
            className="p-8 border border-white/[0.07] rounded-2xl bg-white/[0.02] backdrop-blur-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-8">
              <span className="font-mono text-[9px] text-white/45 tracking-widest">[LANG]</span>
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">Linguistic Proficiency</span>
            </div>
            <div className="space-y-4">
              {cv.languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm text-white/70 font-medium">{lang.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-tighter mb-1">Status</span>
                    <span className={`px-3 py-1 text-[10px] font-mono rounded-full border ${
                      lang.level === "Native"
                        ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.05]"
                        : "text-white/40 border-white/[0.08]"
                    }`}>
                      {lang.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
