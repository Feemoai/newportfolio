"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Calendar, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { cv } from "@/data/cv";
import { Project } from "@/types/cv";
import SectionLabel from "./ui/SectionLabel";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden border border-white/[0.1] rounded-2xl bg-[#0a0a0a] shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white/60 hover:text-white hover:bg-black/60 transition-all border border-white/10"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 h-48 md:h-auto relative overflow-hidden bg-white/5">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
                    <Calendar size={12} />
                    {project.year}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                      FEATURED
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {project.longDescription || project.description}
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {project.keyFeatures && (
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest mb-3">
                      <CheckCircle2 size={14} className="text-emerald-500/50" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {project.keyFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-white/50">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/40 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest mb-3">
                    <Layers size={14} /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/[0.05]">
                {project.link !== "#" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all group"
                  >
                    View Project <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/50 font-semibold text-sm cursor-not-allowed">
                    Internal System
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FeaturedCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative border border-white/[0.06] rounded-xl cursor-pointer overflow-hidden flex flex-col h-full bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="p-7 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-tighter">
            {project.year} // Featured
          </span>
          <ArrowRight size={16} className="text-white/10 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400/80 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-white/55 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto flex items-center gap-4">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-[9px] font-mono text-white/50 bg-white/[0.02] border border-white/[0.05] rounded">
                {tech}
              </span>
            ))}
          </div>
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = cv.projects.filter((p) => p.featured);
  const others = cv.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>03 // The Vault</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featured.map((project, i) => (
            <FeaturedCard key={project.title} project={project} index={i} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {others.map((project, i) => (
            <motion.div
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="group relative p-6 border border-white/[0.05] rounded-xl overflow-hidden cursor-pointer flex items-center gap-6"
              style={{ background: "rgba(255,255,255,0.01)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }}
              whileHover={{ x: 8, background: "rgba(255,255,255,0.02)" }}
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                 <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="font-mono text-[10px] text-white/40">{project.year}</span>
                <h3 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors">{project.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-1 mt-1">{project.description}</p>
              </div>
              <ArrowRight size={16} className="text-white/10 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
