"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap, maskReveal, prefersReducedMotion, registerGsap } from "@/lib/animations";

export function Finale() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (!root.current) return;
    const ctx = gsap.context(() => {
      maskReveal(".fn-line span", { trigger: root.current!, stagger: 0.07 });
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          ".fn-glow",
          { opacity: 0.35 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "center center",
              scrub: true,
            },
          },
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="finale" ref={root} className="relative overflow-hidden bg-graphite text-paper">
      <div className="absolute inset-0">
        <Image
          src="/assets/house.png"
          alt="Crestora building fully lit at night"
          fill
          className="object-contain object-bottom opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/40" />
        <div className="fn-glow absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,180,87,0.22),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85svh] max-w-site flex-col justify-end px-5 pb-20 pt-28 md:px-10 md:pb-28">
        <p className="mono-label mb-6 text-paper/45">Scene 05 · Lights on</p>
        <h2 className="display max-w-[12ch] text-[clamp(3rem,8vw,7.5rem)]">
          <span className="fn-line mask-line">
            <span>
              Find your <em className="accent-italic text-amberglow">light</em> on.
            </span>
          </span>
        </h2>
        <p className="mt-6 max-w-md text-base text-paper/65">
          Book a private viewing. We&apos;ll walk the plan with you — graphite to glow.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton href={site.whatsapp} variant="light" external>
            WhatsApp
          </MagneticButton>
          <MagneticButton href={`tel:${site.phone.replace(/\s/g, "")}`} variant="outline">
            {site.phone}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
