"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  const [floor, setFloor] = useState<string>(site.floors[0].label);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
      let label: string = site.floors[0].label;
      for (const f of site.floors) {
        const el = document.getElementById(f.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) label = f.label;
      }
      setFloor(label);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-full w-6 md:block" aria-hidden>
      <div className="absolute bottom-0 left-0 top-0 w-px bg-graphite/10" />
      <div
        className="absolute left-0 top-0 w-[2px] origin-top bg-sienna"
        style={{ height: `${p * 100}%` }}
      />
      <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[10px] tracking-brand text-graphite/50">
        FL {floor}
      </div>
    </div>
  );
}
