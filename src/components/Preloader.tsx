"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/data/site";
import { prefersReducedMotion } from "@/lib/animations";

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce) {
      setPct(100);
      onDone();
      return;
    }

    const obj = { n: 0 };
    const tl = gsap.timeline({ onComplete: onDone });

    tl.to(obj, {
      n: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(obj.n)),
    });
    tl.to(".preload-path", { strokeDashoffset: 0, duration: 1.15, ease: "power3.inOut" }, 0);
    tl.to(".preload-glow", { opacity: 1, duration: 0.35 }, 0.85);
    tl.to(brand.current, { opacity: 0, duration: 0.25 }, "+=0.05");
    tl.to(
      [left.current, right.current],
      {
        xPercent: (i) => (i === 0 ? -100 : 100),
        duration: 0.75,
        ease: "power4.inOut",
      },
      "<",
    );
    tl.set(root.current, { autoAlpha: 0 });

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div ref={root} className="fixed inset-0 z-[200] overflow-hidden" aria-busy="true" aria-live="polite">
      <div ref={left} className="absolute inset-y-0 left-0 z-20 w-1/2 bg-paper" />
      <div ref={right} className="absolute inset-y-0 right-0 z-20 w-1/2 bg-paper" />
      <div
        ref={brand}
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center"
      >
        <div className="relative mb-10">
          <svg viewBox="0 0 220 48" className="h-12 w-56 overflow-visible" aria-hidden>
            <text
              x="0"
              y="36"
              className="preload-path fill-none stroke-blueprint/50"
              style={{
                strokeDasharray: 700,
                strokeDashoffset: 700,
                fontSize: 26,
                fontFamily: "var(--font-sans), Space Grotesk, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.04em",
              }}
            >
              {site.name}
            </text>
            <text
              x="0"
              y="36"
              className="preload-glow fill-graphite opacity-0"
              style={{
                fontSize: 26,
                fontFamily: "var(--font-sans), Space Grotesk, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.04em",
              }}
            >
              {site.name}
            </text>
          </svg>
        </div>
        <div className="mono-label text-ash">{String(pct).padStart(3, "0")}%</div>
        <p className="mt-3 font-mono text-[10px] tracking-brand text-graphite/40">{site.concept}</p>
      </div>
    </div>
  );
}
