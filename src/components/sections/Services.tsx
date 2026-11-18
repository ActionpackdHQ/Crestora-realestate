"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { services, support } from "@/data/services";
import { gsap, imageReveal, maskReveal, prefersReducedMotion, registerGsap } from "@/lib/animations";

export function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (!root.current) return;
    const ctx = gsap.context(() => {
      maskReveal(".sv-line span", { trigger: root.current!, stagger: 0.07 });
      if (!prefersReducedMotion()) {
        root.current!.querySelectorAll<HTMLElement>("[data-reveal]").forEach((wrap) => {
          const img = wrap.querySelector("img");
          if (img) imageReveal(wrap, img, { trigger: wrap });
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <p className="mono-label mb-5 text-ash">Scene 02 · How CRESTORA can help you</p>
        <h2 className="display mb-12 max-w-[14ch] text-[clamp(2.4rem,5vw,4.8rem)]">
          <span className="sv-line mask-line">
            <span>
              How CRESTORA <em className="accent-italic text-sienna">can help you</em>
            </span>
          </span>
        </h2>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {services.map((service) => (
            <article
              key={service.title}
              data-cursor="open"
              className="group relative overflow-hidden border border-transparent transition-colors duration-500 hover:border-sienna"
            >
              <div data-reveal className="relative aspect-[3/4] overflow-hidden bg-mist">
                <Image
                  src={service.image}
                  alt={`${service.title} with Crestora`}
                  fill
                  className="object-cover transition-transform duration-700 ease-crest group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                  <h3 className="display text-4xl md:text-5xl">{service.title}</h3>
                  <p className="mt-3 max-w-[28ch] text-sm text-paper/75">{service.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {support.map((item) => (
            <article key={item.title} className="border border-graphite/10 bg-paper p-5">
              <div className="relative mb-4 aspect-[16/10] overflow-hidden bg-mist">
                <Image src={item.image} alt="" fill className="object-cover" sizes="30vw" />
              </div>
              <h3 className="text-lg tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-graphite/60">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
