"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/animations";

export function Footer() {
  const word = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    registerGsap();
    if (!root.current || !word.current || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      word.current,
      { letterSpacing: "-0.08em" },
      {
        letterSpacing: "0.12em",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer ref={root} id="footer" className="relative bg-graphite text-paper">
      <div className="mx-auto grid max-w-site gap-12 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:px-10 md:py-28">
        <div>
          <h3 className="text-2xl tracking-tight">Subscribe to the field notes</h3>
          <form
            className="mt-6 flex max-w-md items-center border-b border-paper/25 pb-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter address"
              aria-label="Email"
              className="w-full bg-transparent text-sm outline-none placeholder:text-paper/35"
            />
            <button type="submit" aria-label="Subscribe" className="pl-4 text-amberglow">
              →
            </button>
          </form>
          <p className="mt-8 mono-label text-paper/40">{site.coordinates}</p>
          <p className="mt-2 font-mono text-xs tracking-wider text-paper/45">NYC · {time}</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <ul className="space-y-3 text-sm text-paper/70">
            {site.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#agents" className="hover:text-paper">
                Agents
              </a>
            </li>
          </ul>
          <ul className="space-y-3 text-sm text-paper/70">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto grid max-w-site gap-6 border-t border-paper/10 px-5 py-10 text-sm text-paper/55 md:grid-cols-3 md:px-10">
        <div>
          <div className="mono-label text-paper/35">{site.address.label}</div>
          <div className="mt-2">
            {site.address.lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="mono-label text-paper/35">Email</div>
          <a href={`mailto:${site.email}`} className="mt-2 block hover:text-paper">
            {site.email}
          </a>
        </div>
        <div>
          <div className="mono-label text-paper/35">Call</div>
          <a href={site.phoneHref} className="mt-2 block hover:text-paper">
            {site.phone}
          </a>
        </div>
      </div>

      <div
        ref={word}
        className="overflow-hidden px-5 pb-8 text-center text-[clamp(3rem,16vw,14rem)] font-medium leading-none tracking-tightest text-paper md:px-10"
      >
        {site.name}
      </div>
    </footer>
  );
}
