"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Modular hero visual for the right panel.
 *
 * Swap this component later for:
 * - a full-bleed project demo GIF/video
 * - a lightweight Three.js scene
 * - a live shader / WebGL experiment
 *
 * Keep the exported API stable: <HeroVisual className? />
 */

type HeroVisualProps = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

export function HeroVisual({ className }: HeroVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Colors come from the CSS variables in globals.css so the canvas
    // follows the accent and theme without duplicating hex values.
    let accentRgb = "253, 191, 87";
    let maroonRgb = "122, 0, 60";
    let bgRgb = "10, 7, 8";

    const readThemeColors = () => {
      const styles = getComputedStyle(document.documentElement);
      accentRgb = styles.getPropertyValue("--accent-rgb").trim() || accentRgb;
      maroonRgb = styles.getPropertyValue("--maroon-rgb").trim() || maroonRgb;
      const bg = styles.getPropertyValue("--bg").trim();
      if (bg.startsWith("#")) {
        const hex = bg.slice(1);
        const full =
          hex.length === 3
            ? hex
                .split("")
                .map((c) => c + c)
                .join("")
            : hex;
        const n = parseInt(full, 16);
        bgRgb = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(36, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => spawn());
    };

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.8,
      a: 0.25 + Math.random() * 0.55,
    });

    const drawGradient = (t: number) => {
      // Opaque base each frame — without this, the translucent layers below
      // accumulate over time and blow out to a solid colour.
      ctx.fillStyle = `rgb(${bgRgb})`;
      ctx.fillRect(0, 0, w, h);

      const g = ctx.createRadialGradient(
        w * (0.38 + Math.sin(t * 0.0003) * 0.06),
        h * (0.42 + Math.cos(t * 0.00025) * 0.08),
        0,
        w * 0.45,
        h * 0.5,
        Math.max(w, h) * 0.7
      );
      g.addColorStop(0, `rgba(${maroonRgb}, 0.5)`);
      g.addColorStop(0.4, `rgba(${maroonRgb}, 0.24)`);
      g.addColorStop(0.75, `rgba(${maroonRgb}, 0.07)`);
      g.addColorStop(1, `rgba(${maroonRgb}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Warm gold bloom drifting against the maroon field
      const g2 = ctx.createRadialGradient(
        w * (0.68 + Math.cos(t * 0.00019) * 0.08),
        h * (0.7 + Math.sin(t * 0.00022) * 0.1),
        0,
        w * 0.68,
        h * 0.7,
        Math.max(w, h) * 0.4
      );
      g2.addColorStop(0, `rgba(${accentRgb}, 0.1)`);
      g2.addColorStop(1, `rgba(${accentRgb}, 0)`);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Vignette to settle the edges back into the page
      const g3 = ctx.createLinearGradient(0, 0, w, h);
      g3.addColorStop(0, `rgba(${bgRgb}, 0.5)`);
      g3.addColorStop(0.5, `rgba(${bgRgb}, 0)`);
      g3.addColorStop(1, `rgba(${bgRgb}, 0.7)`);
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);
    };

    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = `rgba(${accentRgb}, 0.05)`;
      ctx.lineWidth = 1;
      const step = 48;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const tick = (t: number) => {
      drawGradient(t);
      drawGrid();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${p.a})`;
        ctx.fill();
      }

      // soft links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(${accentRgb}, ${0.12 * (1 - dist / 110)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    readThemeColors();
    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    const themeObserver = new MutationObserver(readThemeColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden bg-bg", className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-transparent to-transparent opacity-40 md:opacity-70" />
      <div className="pointer-events-none absolute bottom-6 left-6 right-6 md:left-10 md:right-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent/80">
          Design · Build · Iterate
        </p>
          <p className="mt-2 max-w-md text-sm text-fg-muted/90 leading-relaxed">
            Thanks for stopping by. Have a look around — and if something here
            sparks an idea, I&rsquo;d love to hear about it.
          </p>
      </div>
    </div>
  );
}
