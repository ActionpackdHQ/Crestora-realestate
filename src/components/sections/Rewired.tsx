"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { drawPath, gsap, maskReveal, pinStack, prefersReducedMotion, registerGsap } from "@/lib/animations";

export function Rewired() {
  const root = useRef<HTMLElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    registerGsap();
    if (!root.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      maskReveal(".rw-line span", { trigger: root.current!, stagger: 0.07 });

      if (!reduce && svgRef.current) {
        const paths = svgRef.current.querySelectorAll("path, line, rect");
        drawPath(paths as NodeListOf<SVGGeometryElement>, {
          trigger: root.current!,
          duration: 1.6,
          stagger: 0.05,
        });
      }

      if (!reduce && lens.current) {
        gsap.fromTo(
          lens.current,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(78% at 50% 45%)",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 55%",
              end: "center center",
              scrub: true,
            },
          },
        );
      } else if (lens.current) {
        lens.current.style.clipPath = "circle(100% at 50% 50%)";
      }

      if (!reduce) {
        const cards = Array.from(root.current!.querySelectorAll<HTMLElement>("[data-stack-card]"));
        pinStack(cards);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="rewired" ref={root} className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-site gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-10">
        <div>
          <p className="mono-label mb-5 text-ash">Scene 01 · Why CRESTORA</p>
          <h2 className="display text-[clamp(2.6rem,5vw,5rem)]">
            <span className="rw-line mask-line">
              <span>Real estate,</span>
            </span>
            <span className="rw-line mask-line">
              <span>
                <em className="accent-italic text-sienna">rewired.</em>
              </span>
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-graphite/65">
            We begin with graphite and intention — then the line dissolves into lived-in light. One building. One continuous scroll from drawing to dwelling.
          </p>

          <div className="relative mt-10 aspect-[4/5] overflow-hidden border border-graphite/10 bg-mist crosshair-corners">
            <svg
              ref={svgRef}
              viewBox="0 0 400 500"
              className="absolute inset-0 h-full w-full p-8 text-blueprint/65"
              aria-hidden
            >
              <rect x="40" y="40" width="320" height="420" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <line x1="40" y1="180" x2="360" y2="180" stroke="currentColor" strokeWidth="1" />
              <line x1="40" y1="320" x2="360" y2="320" stroke="currentColor" strokeWidth="1" />
              <line x1="200" y1="40" x2="200" y2="460" stroke="currentColor" strokeWidth="1" />
              <path d="M80 100 H160 V160 H80 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M240 100 H320 V160 H240 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M80 220 H180 V300 H80 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <div ref={lens} className="absolute inset-0" style={{ clipPath: "circle(0% at 50% 50%)" }}>
              <Image
                src="/assets/buy.fed72bc8.jpg"
                alt="Crestora facade resolved into photography"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>

        <div className="relative space-y-5 pt-2 md:pt-24">
          <p className="mono-label text-ash">Steps</p>
          {site.process.map((step, i) => (
            <article
              key={step.title}
              data-stack-card
              className="sticky top-28 border border-graphite/10 bg-paper p-7 shadow-[0_16px_40px_rgba(21,23,26,0.05)] md:top-32"
              style={{ zIndex: i + 1 }}
            >
              <div className="mono-label text-sienna">0{i + 1}</div>
              <h3 className="mt-4 text-2xl tracking-tight md:text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-sm text-graphite/60 leading-relaxed">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
