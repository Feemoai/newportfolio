"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import EntryGate from "@/components/EntryGate";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Gallery from "@/components/Gallery";
import Chatbot from "@/components/Chatbot";
import Contact from "@/components/Contact";
import { useChatbot } from "@/hooks/useChatbot";

// Load canvas background client-side only (no SSR)
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

export default function Home() {
  const [entered, setEntered] = useState(false);
  const chatState = useChatbot();

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <EntryGate key="gate" onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entered && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Background />
            <Navbar onOpenChat={() => {
              document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
            }} />
            <main className="relative z-10">
              <Hero onOpenChat={() => {
                document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
              }} />
              <Projects />
              <Timeline />
              <Skills />
              <Gallery />
              <Chatbot chatState={chatState} />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
