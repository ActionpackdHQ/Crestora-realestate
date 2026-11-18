"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/animations";

type Mode = "cross" | "open" | "drag" | "play";

export function CrosshairCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("cross");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("has-crosshair");
    setOn(true);

    const move = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const m = (t?.dataset.cursor as Mode) || "cross";
      setMode(m);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      document.body.classList.remove("has-crosshair");
      window.removeEventListener("mousemove", move);
    };
  }, []);

  if (!on) return null;

  const label = mode === "open" ? "OPEN" : mode === "drag" ? "DRAG" : mode === "play" ? "PLAY" : "";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        <span className="absolute h-px w-6 bg-graphite/70" />
        <span className="absolute h-6 w-px bg-graphite/70" />
        {mode !== "cross" && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-brand text-sienna">
            {label}
          </span>
        )}
      </div>
      <div className="mt-2 font-mono text-[9px] tracking-wider text-graphite/45">
        {String(Math.round(coords.x)).padStart(4, "0")} / {String(Math.round(coords.y)).padStart(4, "0")}
      </div>
    </div>
  );
}
