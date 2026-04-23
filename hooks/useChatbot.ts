"use client";
import { useState, useCallback, useRef } from "react";
import { type Message } from "@/lib/chatLogic";

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "Haloo! Aku FeemoAI, asisten chatbotnya **Fajril**. Tanya-tanya soal skills, projects, atau pengalamannya yuk, pasti seru! ✨",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  // Use ref to always have latest messages in the closure
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: userInput.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messagesRef.current, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const text = data.text || data.error || "I'm having trouble connecting right now. Please try again.";

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const assistantMsg: Message = {
        id: `a-err-${Date.now()}`,
        role: "assistant",
        content: "⚠️ Couldn't connect to AI right now. Please check your connection and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "init-reset",
        role: "assistant",
        content: "Obrolan kita udah di-reset nih. Ada lagi yang mau kamu kepoin soal Fajril? ✨",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return { messages, isTyping, sendMessage, clearMessages };
}
