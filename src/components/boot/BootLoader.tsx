"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { Monogram } from "@/components/boot/Monogram";
import { ScrambleLines } from "@/components/boot/ScrambleLines";
import { shouldSkipBoot, useBoot } from "@/components/boot/BootContext";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.86, 0, 0.14, 1");
CustomEase.create("smooth", "0.65, 0, 0.35, 1");

type Phase = "spin" | "loading" | "enter" | "authorized" | "done";

const CHARS = "01<>[]|/\\·#+";

/** Survive React Strict Mode remounts in dev. */
let introLocked = false;

const DIAMOND = { base: 95, hover: 112, dashBase: 118, dashHover: 136 };

function setDiamondSize(
  el: SVGRectElement | null,
  half: number
) {
  if (!el) return;
  el.setAttribute("x", String(-half));
  el.setAttribute("y", String(-half));
  el.setAttribute("width", String(half * 2));
  el.setAttribute("height", String(half * 2));
}

function playAsciiBurst(host: HTMLElement) {
  const w = host.offsetWidth;
  const h = host.offsetHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;z-index:10;pointer-events:none;";
  host.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const step = Math.max(10, Math.ceil(Math.sqrt((w * h) / 5200)));
  const diag = Math.hypot(w, h) || 1;
  type Glyph = {
    x: number;
    y: number;
    char: string;
    size: number;
    maxSize: number;
    minSize: number;
    growStep: number;
    shimmerSpeed: number;
    delay: number;
    hold: number;
    isReverse: boolean;
    isShimmer: boolean;
    alpha: number;
  };
  const glyphs: Glyph[] = [];
  for (let x = 0; x <= w; x += step) {
    for (let y = 0; y <= h; y += step) {
      const n = Math.hypot(x, h - y) / diag;
      const maxSize = 8 + 4 * Math.random();
      glyphs.push({
        x,
        y,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        size: 0,
        maxSize,
        minSize: 0.45 * maxSize,
        growStep: 1.5 + Math.random(),
        shimmerSpeed: 0.02 + 0.05 * Math.random(),
        delay: 55 * n + 12 * Math.random(),
        hold: 22 + 12 * Math.random(),
        isReverse: false,
        isShimmer: false,
        alpha: 0.3 + 0.5 * Math.random(),
      });
    }
  }

  let frame = 0;
  const tick = () => {
    frame += 1;
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#2dd4a8";
    let alive = false;
    const buckets = new Map<number, Glyph[]>();

    for (const g of glyphs) {
      const age = frame - g.delay;
      if (age < 0) {
        alive = true;
        continue;
      }
      if (age <= g.hold) {
        if (g.size >= g.maxSize) g.isShimmer = true;
        if (g.isShimmer) {
          if (g.size >= g.maxSize) g.isReverse = true;
          else if (g.size <= g.minSize) g.isReverse = false;
          g.size += g.isReverse ? -(10 * g.shimmerSpeed) : 10 * g.shimmerSpeed;
        } else {
          g.size += g.growStep;
        }
        alive = true;
      } else if (g.size > 0) {
        g.size -= 1.2;
        alive = true;
      }
      if (g.size <= 0.1) continue;
      const key = Math.round(g.size);
      const list = buckets.get(key) ?? [];
      list.push(g);
      buckets.set(key, list);
    }

    buckets.forEach((list, size) => {
      ctx.font = `${size}px "JetBrains Mono", Consolas, Menlo, monospace`;
      for (const g of list) {
        ctx.globalAlpha = g.alpha * Math.min(1, g.size / g.maxSize);
        ctx.fillText(g.char, g.x, g.y);
      }
    });
    ctx.globalAlpha = 1;
    if (alive) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
}

export function BootLoader() {
  const { markDone } = useBoot();
  const [mounted, setMounted] = useState(false);
  const [skip, setSkip] = useState(false);
  const [phase, setPhase] = useState<Phase>("spin");
  const [hudActive, setHudActive] = useState(false);
  const [enterReady, setEnterReady] = useState(false);
  const exiting = useRef(false);

  const creamRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGRectElement>(null);
  const progressRef = useRef<SVGRectElement>(null);
  const progressGroupRef = useRef<SVGGElement>(null);
  const dashedRef = useRef<SVGRectElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (shouldSkipBoot()) {
      setSkip(true);
      markDone();
    }
  }, [markDone]);

  useEffect(() => {
    if (!mounted || skip || introLocked) return;
    introLocked = true;

    const track = trackRef.current;
    const progress = progressRef.current;
    const dashed = dashedRef.current;
    if (!track || !progress || !dashed) return;

    setDiamondSize(track, DIAMOND.base);
    setDiamondSize(progress, DIAMOND.base);
    setDiamondSize(dashed, DIAMOND.dashBase);

    gsap.set(track, { opacity: 0, strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(progress, { opacity: 0, strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(dashed, { opacity: 0 });

    const tl = gsap.timeline();
    tl.to(track, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.85,
      ease: "power2.inOut",
      delay: 0.25,
      onComplete: () => setPhase("loading"),
    });
    tl.to(progress, { opacity: 1, duration: 0.25, ease: "smooth" });
    tl.fromTo(
      brandRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "smooth" },
      "-=0.2"
    );

    const group = progressGroupRef.current;
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.0,
      ease: "power2.in",
      onUpdate: () => {
        const v = Math.round(counter.val);
        if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, "0");
        if (progress) progress.style.strokeDashoffset = String(1 - v / 100);
        if (group) {
          const t = Math.min(counter.val / 100, 1);
          group.style.transform = `rotate(${90 * t}deg)`;
        }
      },
      onComplete: () => setPhase("enter"),
    });
    tl.fromTo(
      counterRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "smooth" },
      "-=2.0"
    );
  }, [mounted, skip]);

  useEffect(() => {
    if (phase !== "enter") return;
    const tl = gsap.timeline();
    tl.to(counterRef.current, { opacity: 0, y: -8, duration: 0.25, ease: "smooth" });
    tl.fromTo(
      readyRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "smooth" },
      "-=0.1"
    );

    const expand = { half: DIAMOND.base };
    tl.to(expand, {
      half: DIAMOND.base + 6,
      duration: 0.45,
      ease: "smooth",
      onUpdate: () => {
        setDiamondSize(trackRef.current, expand.half);
        setDiamondSize(progressRef.current, expand.half);
      },
    }, "-=0.1");

    tl.to(logoRef.current, { opacity: 0, scale: 0.75, duration: 0.28, ease: "smooth" });
    tl.fromTo(
      enterRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "smooth",
        onComplete: () => {
          exiting.current = false;
          setEnterReady(true);
        },
      },
      "-=0.15"
    );
    tl.fromTo(
      dashedRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.45,
        ease: "smooth",
        onStart: () => setDiamondSize(dashedRef.current, DIAMOND.dashBase),
      },
      "-=0.2"
    );
  }, [phase]);

  const hoverRing = (expand: boolean) => {
    if (phase !== "enter" || !enterReady) return;
    const half = expand ? DIAMOND.hover : DIAMOND.base + 6;
    const dash = expand ? DIAMOND.dashHover : DIAMOND.dashBase;
    const proxy = { t: 0, half: expand ? DIAMOND.base + 6 : DIAMOND.hover, dash };
    const targetHalf = half;
    const targetDash = dash;
    gsap.to(proxy, {
      t: 1,
      duration: 0.35,
      ease: "smooth",
      onUpdate: () => {
        const fromH = expand ? DIAMOND.base + 6 : DIAMOND.hover;
        const fromD = expand ? DIAMOND.dashBase : DIAMOND.dashHover;
        const h = fromH + (targetHalf - fromH) * proxy.t;
        const d = fromD + (targetDash - fromD) * proxy.t;
        setDiamondSize(trackRef.current, h);
        setDiamondSize(progressRef.current, h);
        setDiamondSize(dashedRef.current, d);
      },
    });
  };

  const handleEnter = () => {
    if (exiting.current) return;
    exiting.current = true;
    setEnterReady(false);
    setPhase("authorized");

    const tl = gsap.timeline();
    try {
      tl.to(enterRef.current, { opacity: 0, duration: 0.25, ease: "smooth" });
      tl.to(logoRef.current, { opacity: 0, duration: 0.2, ease: "smooth" }, "-=0.1");
      tl.to(
        [trackRef.current, progressRef.current, dashedRef.current],
        { opacity: 0, duration: 0.4, ease: "smooth" }
      );
      tl.fromTo(
        authRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "smooth" }
      );
      tl.to(
        blackRef.current,
        {
          marginTop: "7vh",
          marginBottom: "7vh",
          marginLeft: "6vw",
          marginRight: "6vw",
          duration: 1.05,
          ease: "hop",
          onComplete: () => setHudActive(true),
        },
        "+=0.45"
      );
      tl.fromTo(
        hudRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "smooth" },
        "-=0.3"
      );
      tl.to(
        [readyRef.current, brandRef.current, authRef.current],
        { opacity: 0, duration: 0.3 },
        "-=1.0"
      );
      tl.add(() => {
        if (blackRef.current) playAsciiBurst(blackRef.current);
      }, "+=0.45");
      tl.to(blackRef.current, {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        duration: 1.15,
        ease: "hop",
        delay: 1.6,
      });
      tl.to(
        creamRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "smooth",
          onComplete: () => {
            setPhase("done");
            markDone();
          },
        },
        "-=0.2"
      );
    } catch (err) {
      console.error("boot exit failed", err);
      setPhase("done");
      markDone();
    }
  };

  if (!mounted || skip || phase === "done") return null;

  const mono = 'var(--font-mono), "JetBrains Mono", Consolas, monospace';

  return (
    <div
      ref={creamRef}
      className="boot-root"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#d8dee8",
        pointerEvents: "all",
      }}
    >
      <div
        ref={hudRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 4,
          color: "#0c1016",
        }}
      >
        <div style={{ position: "absolute", top: "1.6vh", left: "1.5vw" }}>
          <ScrambleLines
            active={hudActive}
            delay={80}
            lines={[siteConfig.shortName, "LAB / PORTFOLIO"]}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "1.6vh",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <ScrambleLines
            active={hudActive}
            delay={120}
            align="center"
            lines={["HAMILTON NODE", "43.2557°N  79.8711°W"]}
          />
        </div>
        <div style={{ position: "absolute", top: "1.6vh", right: "1.5vw" }}>
          <ScrambleLines
            active={hudActive}
            delay={160}
            align="right"
            lines={[
              "SIGNAL · TEAL",
              `BUILD INDEX: ${String(projects.length).padStart(2, "0")}`,
            ]}
          />
        </div>
        <div style={{ position: "absolute", bottom: "1.6vh", left: "1.5vw" }}>
          <ScrambleLines
            active={hudActive}
            delay={200}
            lines={["AT-01", "MCMASTER ENG I"]}
          />
        </div>
        <div style={{ position: "absolute", bottom: "1.6vh", left: "22vw" }}>
          <ScrambleLines
            active={hudActive}
            delay={240}
            lines={["STACK:", "ROBOTICS · EMBEDDED · CV"]}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "1.6vh",
            left: "50%",
            right: "1.5vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <ScrambleLines active={hudActive} delay={300} lines={["CH·A  2.4 GHZ"]} />
          <ScrambleLines
            active={hudActive}
            delay={200}
            align="center"
            lines={["LINK ESTABLISHED / OPEN SESSION"]}
          />
          <ScrambleLines
            active={hudActive}
            delay={100}
            align="right"
            lines={["EXIT → HOME"]}
          />
        </div>
      </div>

      <div
        ref={blackRef}
        style={{
          position: "absolute",
          inset: 0,
          margin: 0,
          background: "#07090c",
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        <div
          ref={readyRef}
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontFamily: mono,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "#2dd4a8",
            opacity: 0,
          }}
        >
          ONLINE
        </div>
        <div
          ref={counterRef}
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontFamily: mono,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#f2f4f7",
            opacity: 0,
          }}
        >
          000
        </div>
        <div
          ref={brandRef}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "2rem",
            fontFamily: mono,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#f2f4f7",
            opacity: 0,
            lineHeight: 1.45,
          }}
        >
          <div>{siteConfig.shortName}</div>
          <div style={{ color: "#2dd4a8" }}>SIGNAL READY</div>
        </div>

        <div
          ref={authRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: mono,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#2dd4a8",
            opacity: 0,
            textAlign: "center",
            lineHeight: 1.6,
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          SIGNAL LOCKED
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            role="button"
            tabIndex={0}
            aria-label="Open portfolio"
            data-boot-enter=""
            onClick={handleEnter}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleEnter();
              }
            }}
            onMouseEnter={() => hoverRing(true)}
            onMouseLeave={() => hoverRing(false)}
            style={{
              position: "relative",
              width: 260,
              height: 260,
              cursor: phase === "enter" && enterReady ? "pointer" : "default",
              color: "#f2f4f7",
            }}
          >
            <svg
              width="260"
              height="260"
              viewBox="0 0 260 260"
              style={{ position: "absolute", inset: 0 }}
              aria-hidden
            >
              <g transform="translate(130 130) rotate(45)">
                <rect
                  ref={dashedRef}
                  x={-DIAMOND.dashBase}
                  y={-DIAMOND.dashBase}
                  width={DIAMOND.dashBase * 2}
                  height={DIAMOND.dashBase * 2}
                  fill="none"
                  stroke="#2dd4a8"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0"
                />
                <rect
                  ref={trackRef}
                  x={-DIAMOND.base}
                  y={-DIAMOND.base}
                  width={DIAMOND.base * 2}
                  height={DIAMOND.base * 2}
                  fill="none"
                  stroke="#1c2430"
                  strokeWidth="1.5"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  opacity="0"
                />
                <g
                  ref={progressGroupRef}
                  style={{ transformOrigin: "0px 0px", transition: "none" }}
                >
                  <rect
                    ref={progressRef}
                    x={-DIAMOND.base}
                    y={-DIAMOND.base}
                    width={DIAMOND.base * 2}
                    height={DIAMOND.base * 2}
                    fill="none"
                    stroke="#2dd4a8"
                    strokeWidth="1.75"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                    strokeLinecap="square"
                    opacity="0"
                  />
                </g>
              </g>
            </svg>

            <div
              ref={logoRef}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Monogram size={36} />
            </div>
            <div
              ref={enterRef}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: mono,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.28em",
                color: "#2dd4a8",
                opacity: 0,
              }}
            >
              OPEN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
