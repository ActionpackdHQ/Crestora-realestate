"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.45);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,color] duration-500",
          solid ? "bg-paper/80 text-graphite backdrop-blur-md" : "bg-transparent text-graphite",
        )}
      >
        <div className="mx-auto flex max-w-site items-center justify-between px-5 py-5 md:px-10 md:py-6">
          <a href="#hero" className="text-lg font-medium tracking-tightest md:text-xl">
            {site.name}
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-current/75 transition hover:text-current"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#finale"
              className={cn(
                "hidden rounded-full px-5 py-2.5 text-sm font-medium transition hover:scale-[1.02] md:inline-flex",
                solid ? "bg-graphite text-paper" : "bg-paper/90 text-graphite shadow-sm",
              )}
            >
              Book a viewing
            </a>
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={cn(
                  "absolute block h-px w-5 bg-current transition",
                  open ? "translate-y-0 rotate-45" : "-translate-y-1.5",
                )}
              />
              <span
                className={cn(
                  "absolute block h-px w-5 bg-current transition",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute block h-px w-5 bg-current transition",
                  open ? "translate-y-0 -rotate-45" : "translate-y-1.5",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-10 pt-28 md:hidden">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-graphite/10 py-5 text-3xl tracking-tightest"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#finale"
            onClick={() => setOpen(false)}
            className="mt-8 rounded-full bg-graphite px-6 py-4 text-center text-paper"
          >
            Book a viewing
          </a>
        </div>
      )}
    </>
  );
}
