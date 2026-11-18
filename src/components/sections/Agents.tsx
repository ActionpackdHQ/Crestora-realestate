"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap, maskReveal, prefersReducedMotion, registerGsap } from "@/lib/animations";

export function Agents() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const quote = site.testimonials[active];

  useEffect(() => {
    registerGsap();
    if (!root.current) return;
    const ctx = gsap.context(() => {
      maskReveal(".ag-line span", { trigger: root.current!, stagger: 0.07 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || site.testimonials.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % site.testimonials.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="agents" ref={root} className="relative bg-graphite text-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-site gap-14 px-5 md:grid-cols-[1fr_1.1fr] md:items-end md:px-10">
        <div>
          <p className="mono-label mb-5 text-paper/45">Scene 03 · For agents</p>
          <h2 className="display text-[clamp(2.6rem,5.5vw,5.4rem)]">
            <span className="ag-line mask-line">
              <span>Own your</span>
            </span>
            <span className="ag-line mask-line">
              <span>
                <em className="accent-italic text-amberglow">career</em>
              </span>
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/65">
            Crestora agents work with clarity, craft, and a desk that feels like a studio — not a call center. Bring your book. We bring the blueprint.
          </p>
          <div className="mt-8">
            <MagneticButton href="#contact" variant="light">
              Join the Movement
            </MagneticButton>
          </div>
        </div>

        <figure className="relative min-h-[14rem] border-l border-paper/15 pl-6 md:pl-10">
          <blockquote
            key={quote.name}
            className="animate-[fadeSoft_0.8s_ease] display text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.25] text-paper/90"
          >
            “{quote.quote}”
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium">{quote.name}</div>
              <div className="mono-label mt-1 text-paper/40">{quote.role}</div>
            </div>
            <div className="flex gap-2" aria-label="Testimonials">
              {site.testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={`h-1.5 w-6 transition ${i === active ? "bg-amberglow" : "bg-paper/25"}`}
                />
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
