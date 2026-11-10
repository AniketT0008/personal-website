"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789+*×·:.~^#%=<>/\\";

type ScrambleLinesProps = {
  lines: string[];
  delay?: number;
  align?: "left" | "center" | "right";
  active: boolean;
};

/** HUD scramble text on the cool signal panel. */
export function ScrambleLines({
  lines,
  delay = 0,
  align = "left",
  active,
}: ScrambleLinesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const timers: number[] = [];

    root.querySelectorAll<HTMLSpanElement>("[data-final]").forEach((span, index) => {
      const final = span.dataset.final ?? "";
      span.textContent = final === " " ? "\u00a0" : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      span.style.opacity = "0";
      span.style.color = "#6b7380";

      const start = window.setTimeout(() => {
        span.style.opacity = "1";
        let n = 0;
        const flips = 4 + Math.floor(Math.random() * 5);
        const tick = () => {
          if (n < flips) {
            span.textContent =
              final === " " ? "\u00a0" : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            n += 1;
            timers.push(window.setTimeout(tick, 28 + Math.random() * 20));
          } else {
            span.textContent = final === " " ? "\u00a0" : final;
            span.style.color = "#0c1016";
          }
        };
        tick();
      }, delay + index * 18);

      timers.push(start);
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [active, delay, lines]);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'var(--font-mono), "JetBrains Mono", Consolas, monospace',
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.06em",
        lineHeight: 1.9,
        textAlign: align,
        color: "#0c1016",
        textTransform: "uppercase",
      }}
    >
      {lines.map((line) => (
        <div key={line}>
          {line.split("").map((ch, i) => (
            <span key={`${line}-${i}`} data-final={ch}>
              {ch === " " ? "\u00a0" : ch}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
