"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/animations";

const TABS = ["Buy", "Rent", "Sell"] as const;

export function Hero() {
  const pin = useRef<HTMLElement>(null);
  const night = useRef<HTMLDivElement>(null);
  const lights = useRef<HTMLDivElement>(null);
  const copyA = useRef<HTMLDivElement>(null);
  const copyB = useRef<HTMLDivElement>(null);
  const lines = useRef<(HTMLSpanElement | null)[]>([]);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Buy");

  useEffect(() => {
    registerGsap();
    if (!pin.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines.current.filter(Boolean),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.07,
          ease: "expo.out",
          delay: reduce ? 0 : 0.35,
        },
      );

      if (reduce) {
        gsap.set(night.current, { opacity: 0.9 });
        gsap.set(lights.current, { opacity: 1 });
        gsap.set(copyB.current, { opacity: 1 });
        gsap.set(copyA.current, { opacity: 0 });
        return;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
        },
      })
        .fromTo(night.current, { opacity: 0 }, { opacity: 1, ease: "none" }, 0)
        .fromTo(lights.current, { opacity: 0 }, { opacity: 1, ease: "none" }, 0.2)
        .fromTo(copyA.current, { opacity: 1, y: 0 }, { opacity: 0, y: -36, ease: "none" }, 0.15)
        .fromTo(copyB.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, ease: "none" }, 0.4)
        .to(".hero-window", { opacity: 1, stagger: 0.04, ease: "none" }, 0.3);
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={pin} id="hero" className="relative">
      <div className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-[#c9d7e6]">
        <div className="absolute inset-0">
          <Image
            src="/assets/back.f53e9773.jpg"
            alt="Crestora facade at dusk"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#9ec0df]/35 via-transparent to-paper/70" />
        </div>

        <div ref={night} className="absolute inset-0 opacity-0">
          <Image
            src="/assets/house.png"
            alt="Crestora residence with windows lit at night"
            fill
            priority
            className="object-contain object-bottom"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/55 via-transparent to-graphite/25" />
        </div>

        <div ref={lights} className="pointer-events-none absolute inset-0 opacity-0">
          <div className="hero-window absolute left-[42%] top-[48%] h-8 w-6 rounded-sm bg-amberglow/80 opacity-0 blur-[1px]" />
          <div className="hero-window absolute left-[48%] top-[46%] h-10 w-7 rounded-sm bg-amberglow/70 opacity-0 blur-[1px]" />
          <div className="hero-window absolute left-[54%] top-[50%] h-7 w-5 rounded-sm bg-amberglow/85 opacity-0 blur-[1px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,180,87,0.16),transparent_42%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-site px-5 pb-14 pt-28 md:px-10 md:pb-18">
          <p className="mono-label mb-5 text-graphite/50">{site.coordinates}</p>

          <div className="relative min-h-[8.5rem] md:min-h-[12rem]">
            <div ref={copyA} className="absolute inset-x-0 top-0">
              <h1 className="display max-w-[13ch] text-[clamp(3rem,8.5vw,9rem)] text-graphite">
                <span className="mask-line">
                  <span ref={(el) => { lines.current[0] = el; }}>every address</span>
                </span>
                <span className="mask-line">
                  <span ref={(el) => { lines.current[1] = el; }}>
                    starts as a <em className="accent-italic text-sienna">line</em>
                  </span>
                </span>
              </h1>
            </div>
            <div ref={copyB} className="absolute inset-x-0 top-0 opacity-0">
              <h1 className="display max-w-[14ch] text-[clamp(3rem,8.5vw,9rem)] text-paper mix-blend-difference">
                and ends as a <em className="accent-italic">light on</em>
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-md text-base text-graphite/65 md:text-lg">{site.tagline}</p>

          <div className="mt-8 max-w-3xl rounded-2xl border border-graphite/10 bg-paper/80 p-3 shadow-[0_16px_50px_rgba(21,23,26,0.08)] backdrop-blur-md md:p-4">
            <div className="mb-3 flex gap-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    tab === t ? "bg-graphite text-paper" : "text-ash hover:text-graphite"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <form
              className="grid gap-2 md:grid-cols-[1.2fr_1fr_1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <input
                className="rounded-xl border border-graphite/10 bg-paper px-4 py-3 text-sm outline-none focus:border-sienna"
                placeholder="Location"
                aria-label="Location"
              />
              <select
                className="rounded-xl border border-graphite/10 bg-paper px-4 py-3 text-sm outline-none"
                aria-label="Budget"
                defaultValue=""
              >
                <option value="" disabled>
                  Budget
                </option>
                <option>$1–2M</option>
                <option>$2–5M</option>
                <option>$5M+</option>
              </select>
              <select
                className="rounded-xl border border-graphite/10 bg-paper px-4 py-3 text-sm outline-none"
                aria-label="Type"
                defaultValue=""
              >
                <option value="" disabled>
                  Type
                </option>
                <option>Residence</option>
                <option>Loft</option>
                <option>Townhouse</option>
              </select>
              <button type="submit" className="rounded-xl bg-sienna px-5 py-3 text-sm font-medium text-paper">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
