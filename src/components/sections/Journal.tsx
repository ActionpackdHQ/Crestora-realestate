"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";
import { gsap, imageReveal, maskReveal, prefersReducedMotion, registerGsap } from "@/lib/animations";

export function Journal() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (!root.current) return;
    const ctx = gsap.context(() => {
      maskReveal(".jn-line span", { trigger: root.current!, stagger: 0.07 });
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
    <section id="journal" ref={root} className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono-label mb-5 text-ash">Scene 04 · Journal</p>
            <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)]">
              <span className="jn-line mask-line">
                <span>
                  Field notes from the <em className="accent-italic text-sienna">floor</em>
                </span>
              </span>
            </h2>
          </div>
          <Link href="#journal" className="mono-label text-sienna hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} data-cursor="open" className="group">
              <div data-reveal className="relative mb-5 aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-crest group-hover:scale-[1.04]"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <p className="mono-label text-ash">{article.date}</p>
              <h3 className="mt-3 text-xl tracking-tight md:text-2xl">{article.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite/60">{article.excerpt}</p>
              <Link
                href="#journal"
                className="mt-4 inline-flex text-sm text-sienna transition group-hover:translate-x-1"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
