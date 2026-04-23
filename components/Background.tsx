"use client";
import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseX: number;
  baseY: number;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Init particles - Reduced for performance
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 35 : 65;
    particlesRef.current = Array.from({ length: count }, () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      };
    });

    let time = 0;
    let opacity = 0; // Local opacity for fade-in effect

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Global fade-in to prevent initial lag spike
      if (opacity < 1) opacity += 0.01;
      ctx.globalAlpha = opacity;

      // Void gradient base
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sederhanakan Grid - Lebih jarang
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 120;
      const offsetX = (time * 0.15) % gridSize;
      const offsetY = (time * 0.1) % gridSize;

      for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Mouse glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      glowGrad.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      particlesRef.current.forEach((p) => {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Repel from mouse
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 120;
        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        // Boundary wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles - Optimized with squared distance
      const pts = particlesRef.current;
      const maxDistSq = 90 * 90; // Squared distance (avoid Math.sqrt)
      
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq); // Only calc sqrt if within range
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      time++;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "#000" }}
    />
  );
}
