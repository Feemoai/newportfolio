"use client";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, RotateCcw, Bot, MessageSquare } from "lucide-react";
import { useChatbot } from "@/hooks/useChatbot";

// Markdown-lite renderer (bold only)
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white/90 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function MessageBubble({ msg }: { msg: ReturnType<typeof useChatbot>["messages"][0] }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
    >
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
          <Bot size={11} className="text-white/50" />
        </div>
      )}
      <div
        className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-white/10 text-white/80 border border-white/[0.08]"
            : "bg-white/[0.04] text-white/60 border border-white/[0.05]"
        }`}
      >
        {msg.content.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-1.5" : ""}>
            {renderMarkdown(line)}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
        <Bot size={11} className="text-white/50" />
      </div>
      <div className="flex gap-1 px-4 py-3 bg-white/[0.04] border border-white/[0.05] rounded-2xl">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/30"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

interface ChatPanelProps {
  messages: ReturnType<typeof useChatbot>["messages"];
  isTyping: boolean;
  sendMessage: (msg: string) => void;
  clearMessages: () => void;
  onClose?: () => void;
  isFloating?: boolean;
}

function ChatPanel({ messages, isTyping, sendMessage, clearMessages, onClose, isFloating }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`flex flex-col border border-white/[0.08] rounded-2xl overflow-hidden ${
        isFloating ? "h-[450px] w-80 shadow-2xl" : "h-[500px] w-full"
      }`}
      style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(24px)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-white/60 tracking-wider text-emerald-400/80">FeemoAI</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearMessages}
            className="w-6 h-6 flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
          >
            <RotateCcw size={11} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scroll-smooth"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Suggestions */}
      <div className="px-3 py-2 border-t border-white/[0.04] flex gap-2 overflow-x-auto">
        {["Skills", "Projects", "Contact", "Experience"].map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="flex-shrink-0 px-2.5 py-1 text-[10px] font-mono text-white/30 border border-white/[0.07] rounded-full hover:text-white/60 hover:border-white/20 transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 pb-3">
        <div className="flex gap-2 items-center p-2 border border-white/[0.08] rounded-xl bg-white/[0.03]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Tanya apa aja soal Fajril..."
            className="flex-1 bg-transparent text-xs text-white/70 placeholder-white/20 outline-none font-mono"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 disabled:opacity-30 transition-all"
          >
            <Send size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Exported ref-based interface so the floating widget and embedded share state
export interface ChatbotRef {
  openWidget: () => void;
}

interface ChatbotProps {
  chatState: ReturnType<typeof useChatbot>;
}

export default function Chatbot({ chatState }: ChatbotProps) {
  const { messages, isTyping, sendMessage, clearMessages } = chatState;
  const [widgetOpen, setWidgetOpen] = useState(false);

  return (
    <>
      {/* Embedded section */}
      <section id="chat" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
              07 // FeemoAI
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Left description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Chat with FeemoAI
                </h2>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">
                  FeemoAI tau segalanya soal Fajril — mulai dari skill, project, sampe prestasinya. Yuk ngobrol santai buat kenal lebih dekat! 🚀
                </p>
                <div className="space-y-2">
                  {[
                    "Skill apa yang Fajril miliki?",
                    "Bagaimana pengalaman organisasi Fajril?",
                    "Fajril pernah menang lomba apa?",
                    "Gimana cara kontak Fajril?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left px-4 py-2.5 border border-white/[0.07] rounded-lg text-xs text-white/60 hover:text-white/70 hover:border-white/15 transition-all font-mono"
                    >
                      → {q}
                    </button>
                  ))}
                </div>
              </motion.div>

            {/* Right chat panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <ChatPanel
                messages={messages}
                isTyping={isTyping}
                sendMessage={sendMessage}
                clearMessages={clearMessages}
                isFloating={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {widgetOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              <ChatPanel
                messages={messages}
                isTyping={isTyping}
                sendMessage={sendMessage}
                clearMessages={clearMessages}
                onClose={() => setWidgetOpen(false)}
                isFloating
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          onClick={() => setWidgetOpen(!widgetOpen)}
          className="w-12 h-12 rounded-full border border-white/20 bg-black flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all shadow-xl"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{ boxShadow: "0 0 30px rgba(255,255,255,0.05)" }}
        >
          <AnimatePresence mode="wait">
            {widgetOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={16} />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageSquare size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

export { ChatPanel };
