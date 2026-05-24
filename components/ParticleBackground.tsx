"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = 0, mouseY = 0;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number; speed: number; z: number }[] = [];
    const count = 80;
    const connectionDist = 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        z: Math.random(),
      });
    }

    let lastScroll = 0;
    let scrollSpeed = 0;

    const onScroll = () => {
      const newScroll = window.scrollY;
      scrollSpeed = (newScroll - lastScroll) * 0.1;
      lastScroll = newScroll;
    };
    window.addEventListener("scroll", onScroll);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      scrollSpeed *= 0.95;

      for (const p of particles) {
        p.pulse += p.speed;
        const breathe = Math.sin(p.pulse) * 0.3 + 0.7;

        if (Math.abs(scrollSpeed) > 0.1) {
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx += (dx / dist) * scrollSpeed * 0.15 * p.z;
          p.vy += (dy / dist) * scrollSpeed * 0.15 * p.z;
        }

        const dmx = mouseX - p.x;
        const dmy = mouseY - p.y;
        const mdist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mdist < 200) {
          p.vx -= dmx * 0.00005;
          p.vy -= dmy * 0.00005;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, `rgba(106, 191, 94, ${p.alpha * breathe})`);
        glow.addColorStop(0.4, `rgba(74, 140, 63, ${p.alpha * breathe * 0.4})`);
        glow.addColorStop(1, "rgba(74, 140, 63, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * breathe, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 220, 140, ${p.alpha * breathe})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(106, 191, 94, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
