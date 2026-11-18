# CRESTORA

Premium cinematic real-estate site — **Blueprint to Home**. One building, one continuous scroll (~6–7 screens).

Stack: Next.js App Router · TypeScript · Tailwind · GSAP ScrollTrigger · Lenis · Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

## Deploy to Vercel

```bash
npx vercel
npx vercel --prod
```

Or connect the Git repo in the Vercel dashboard. Static assets live in `public/assets`.

## Scenes (keep this length)

1. Nav — wordmark, Search / Agents / Journal, Book a viewing  
2. Hero — pinned ~200vh dusk → night + search bar  
3. Rewired — blueprint draw-in → photo + 3 sticky steps  
4. Services — Buy / Sell / Rent panels + Mortgage / PM / Development  
5. Agents — “Own your career” + rotating testimonial  
6. Journal — 3 articles  
7. Finale + footer — night lights, CTA, compact footer, large CRESTORA wordmark  

## Brand & copy

Edit `src/data/site.ts` for name, tagline, nav, floors, services, support, testimonials, journal.

Current brand: **CRESTORA** · tagline **Built to be lived in.** · email `hello@crestora.com`.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Limestone | `#ecebe6` | Page / paper |
| Graphite | `#15171a` | Type / dark scenes |
| Burnt sienna | `#b5532f` | Accent / progress |
| Window amber | `#ffb457` | Lights-on only |
| Blueprint | `#2d4bff` | Line drawings (low opacity) |

Type: Space Grotesk (display), Instrument Serif (one italic accent per headline), JetBrains Mono (11px labels).

## Swap images

Drop files into `public/assets/` with descriptive names, then update paths in `src/data/site.ts` (and hero paths in `src/components/sections/Hero.tsx` / `Finale.tsx`).

Suggested placeholders:

- `facade-dusk.webp` — hero day plate  
- `facade-night.png` — transparent night cutout (`house.png` today)  
- `buy.jpg` / `sell.jpg` / `rent.jpg` — service panels  
- `journal-01.jpg` … — article cards  

## Dusk → night frames

Hero uses a layered parallax fallback (dusk plate → night cutout → amber window glows) scrubbed over `+=200%`.

To upgrade to a true sequence (≤ 90 WebP/AVIF frames):

1. Export dusk→night frames (After Effects / Blender / ffmpeg) as `public/assets/hero-seq/frame-000.webp` …  
2. Drive frame index with `scrubSequence()` from `src/lib/animations.ts`  
3. On mobile, keep a single poster + fade (already the reduced-motion / coarse path)

## Motion helpers (`src/lib/animations.ts`)

- `maskReveal` — clipped headline lines (70ms stagger)  
- `scrubSequence` — pin + progress callback  
- `drawPath` — SVG stroke-dashoffset  
- `pinStack` — sticky cards scale back as next covers  
- `magnetic` — button pull  
- `crosshairCursor` — custom cursor helper (UI: `CrosshairCursor`)  
- `imageReveal` — clip-path wipe + inner scale 1.2→1  

Lenis lerp `0.08`, synced with ScrollTrigger. `prefers-reduced-motion` disables Lenis, scrubbing, and parallax.

## Quality notes

- Animate transform/opacity only; clean up ScrollTriggers on unmount  
- Lazy-load below the fold via `next/image`  
- Semantic landmarks, keyboard focus, alt text on key photos  
