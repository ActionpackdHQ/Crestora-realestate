"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { magnetic, prefersReducedMotion } from "@/lib/animations";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light" | "sienna" | "ghost" | "outline";
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "dark",
  external = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    return magnetic(ref.current, { strength: 0.28, radius: 90 });
  }, []);

  const variants = {
    dark: "bg-graphite text-paper",
    light: "bg-paper text-graphite",
    sienna: "bg-sienna text-paper",
    ghost: "border border-current bg-transparent",
    outline: "border border-paper/40 bg-transparent text-paper",
  };

  return (
    <a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-transform duration-500 ease-overshoot",
        variants[variant],
        className,
      )}
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-sienna transition-transform duration-500 ease-crest group-hover:scale-x-100" />
      <span className="relative z-10 group-hover:text-paper">{children}</span>
    </a>
  );
}
