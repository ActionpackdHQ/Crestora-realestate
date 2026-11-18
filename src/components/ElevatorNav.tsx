"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function ElevatorNav() {
  const [active, setActive] = useState<string>(site.floors[0].id);

  useEffect(() => {
    const ids = site.floors.map((f) => f.id);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.45) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Floor navigation"
      className="pointer-events-auto fixed right-3 top-1/2 z-[60] flex -translate-y-1/2 flex-col gap-0.5 md:right-4 lg:right-8"
    >
      {site.floors.map((floor) => (
        <button
          key={floor.id}
          type="button"
          onClick={() => go(floor.id)}
          title={floor.title}
          className={cn(
            "group flex h-6 w-6 items-center justify-center border font-mono text-[9px] tracking-brand transition-all duration-500 md:h-8 md:w-8 md:rounded-full md:text-[10px]",
            active === floor.id
              ? "border-sienna bg-sienna text-paper"
              : "border-graphite/15 bg-paper/60 text-graphite/50 hover:border-graphite/40 hover:text-graphite",
          )}
        >
          {floor.label}
        </button>
      ))}
    </nav>
  );
}
