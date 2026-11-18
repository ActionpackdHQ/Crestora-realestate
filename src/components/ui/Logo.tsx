import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export function Logo({ className, markClassName, wordmark = true }: LogoProps) {
  return (
    <a href="#top" className={cn("inline-flex items-center gap-2.5 text-inherit", className)} aria-label="CRESTORA">
      <svg
        viewBox="0 0 40 40"
        className={cn("h-7 w-7 shrink-0", markClassName)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M20 3 L34 14 L28 14 L28 30 L12 30 L12 14 L6 14 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M20 10 L26 16 H14 Z" fill="currentColor" opacity="0.85" />
      </svg>
      {wordmark ? (
        <span className="font-serif text-[1.15rem] tracking-[0.28em] uppercase leading-none">
          Crestora
        </span>
      ) : null}
    </a>
  );
}
