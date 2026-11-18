import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Clip-path / translateY mask reveal for lines */
export function maskReveal(
  targets: gsap.TweenTarget,
  opts: { stagger?: number; duration?: number; delay?: number; trigger?: Element | string } = {},
) {
  registerGsap();
  const { stagger = 0.07, duration = 1.05, delay = 0, trigger } = opts;
  const tween = { yPercent: 0, duration, stagger, delay, ease: "power4.out" };
  if (trigger) {
    return gsap.fromTo(targets, { yPercent: 110 }, {
      ...tween,
      scrollTrigger: { trigger, start: "top 85%", toggleActions: "play none none none" },
    });
  }
  return gsap.fromTo(targets, { yPercent: 110 }, tween);
}

/** SVG stroke draw-in via stroke-dashoffset */
export function drawPath(
  paths: SVGGeometryElement | SVGGeometryElement[] | NodeListOf<SVGGeometryElement>,
  opts: { duration?: number; stagger?: number; trigger?: Element | string } = {},
) {
  registerGsap();
  const list = (Array.isArray(paths) || paths instanceof NodeList
    ? Array.from(paths as NodeListOf<SVGGeometryElement>)
    : [paths]) as SVGGeometryElement[];
  const { duration = 1.6, stagger = 0.08, trigger } = opts;

  list.forEach((p) => {
    const len = p.getTotalLength?.() ?? 400;
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
  });

  return gsap.to(list, {
    strokeDashoffset: 0,
    duration,
    stagger,
    ease: "power3.inOut",
    scrollTrigger: trigger
      ? { trigger, start: "top 80%", toggleActions: "play none none none" }
      : undefined,
  });
}

/** Scrub an image sequence or progress callback across a pin */
export function scrubSequence(
  section: Element,
  onProgress: (p: number) => void,
  opts: { end?: string } = {},
) {
  registerGsap();
  if (prefersReducedMotion()) {
    onProgress(1);
    return () => undefined;
  }
  const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: opts.end ?? "+=300%",
    pin: true,
    scrub: 0.6,
    anticipatePin: 1,
    onUpdate: (self) => onProgress(self.progress),
  });
  return () => st.kill();
}

/** Sticky card stack — scale back previous as next covers */
export function pinStack(cards: HTMLElement[]) {
  registerGsap();
  if (prefersReducedMotion()) return () => undefined;
  const triggers = cards.map((card, i) => {
    if (i === cards.length - 1) return null;
    return gsap.to(card, {
      scale: 0.92,
      opacity: 0.55,
      ease: "none",
      scrollTrigger: {
        trigger: cards[i + 1],
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  });
  return () => triggers.forEach((t) => t?.scrollTrigger?.kill());
}

/** Odometer-style rolling digits */
export function odometer(
  el: HTMLElement,
  value: number,
  opts: { duration?: number; suffix?: string; trigger?: Element | string } = {},
) {
  registerGsap();
  const { duration = 1.8, suffix = "", trigger = el } = opts;
  const obj = { n: 0 };
  return gsap.to(obj, {
    n: value,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    onUpdate: () => {
      el.textContent = `${Math.round(obj.n).toLocaleString()}${suffix}`;
    },
  });
}

/** Bottom-to-top image wipe + Ken Burns */
export function imageReveal(
  wrap: Element | string,
  img: Element | string,
  opts: { duration?: number; trigger?: Element | string } = {},
) {
  registerGsap();
  const { duration = 1.35, trigger = wrap } = opts;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 88%",
      toggleActions: "play none none none",
    },
  });
  tl.fromTo(wrap, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration, ease: "expo.out" }).fromTo(
    img,
    { scale: 1.18 },
    { scale: 1, duration: duration + 0.1, ease: "expo.out" },
    0,
  );
  return tl;
}

export function parallax(
  target: gsap.TweenTarget,
  opts: { speed?: number; trigger?: Element | string } = {},
) {
  registerGsap();
  if (prefersReducedMotion()) return;
  const { speed = 0.5, trigger } = opts;
  return gsap.to(target, {
    yPercent: speed * -20,
    ease: "none",
    scrollTrigger: {
      trigger: trigger ?? (target as Element),
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function magnetic(el: HTMLElement, opts: { strength?: number; radius?: number } = {}) {
  if (prefersReducedMotion()) return () => undefined;
  const { strength = 0.35, radius = 80 } = opts;
  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    if (Math.hypot(dx, dy) < radius) {
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.45, ease: "power3.out" });
    } else {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
    }
  };
  const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
  window.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    window.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
    gsap.set(el, { clearProps: "x,y" });
  };
}

/** Wire a fixed crosshair cursor; returns cleanup. Prefer <CrosshairCursor /> component. */
export function crosshairCursor(root: HTMLElement) {
  if (prefersReducedMotion()) return () => undefined;
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return () => undefined;
  }
  document.body.classList.add("has-crosshair");
  const onMove = (e: MouseEvent) => {
    root.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
    const mode = t?.dataset.cursor || "cross";
    root.dataset.mode = mode;
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  return () => {
    document.body.classList.remove("has-crosshair");
    window.removeEventListener("mousemove", onMove);
  };
}

/** Count up number on scroll enter (legacy alias) */
export function counter(
  el: HTMLElement,
  value: number,
  opts: { duration?: number; suffix?: string; trigger?: Element | string } = {},
) {
  return odometer(el, value, opts);
}

/** Simple letter scramble then resolve */
export function scramble(
  el: HTMLElement,
  finalText: string,
  opts: { duration?: number; charset?: string } = {},
) {
  const { duration = 0.9, charset = "CRESTORAABCDEFGHIJKLMNOPQRSTUVWXYZ" } = opts;
  const obj = { progress: 0 };
  return gsap.to(obj, {
    progress: 1,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const done = Math.floor(obj.progress * finalText.length);
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === " ") out += " ";
        else if (i < done) out += finalText[i];
        else out += charset[Math.floor(Math.random() * charset.length)];
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = finalText;
    },
  });
}

/** Infinite marquee; velocity boosts with scroll */
export function marquee(
  track: HTMLElement,
  opts: { baseSpeed?: number; reverse?: boolean } = {},
) {
  registerGsap();
  if (prefersReducedMotion()) return () => undefined;
  const { baseSpeed = 40, reverse = false } = opts;
  const dir = reverse ? 1 : -1;
  let x = 0;
  let boost = 1;
  const half = track.scrollWidth / 2;

  const ticker = () => {
    x += dir * (baseSpeed / 60) * boost;
    if (Math.abs(x) >= half) x = 0;
    gsap.set(track, { x });
  };
  gsap.ticker.add(ticker);

  const st = ScrollTrigger.create({
    onUpdate: (self) => {
      boost = 1 + Math.min(2.5, Math.abs(self.getVelocity()) / 1200);
    },
  });

  return () => {
    gsap.ticker.remove(ticker);
    st.kill();
  };
}

/** Pin horizontal gallery driven by vertical scroll */
export function pinHorizontal(
  section: HTMLElement,
  track: HTMLElement,
  opts: { skew?: boolean } = {},
) {
  registerGsap();
  if (prefersReducedMotion()) return () => undefined;
  const { skew = true } = opts;
  const getScroll = () => track.scrollWidth - window.innerWidth;

  const tween = gsap.to(track, {
    x: () => -getScroll(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${getScroll()}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: skew
        ? (self) => {
            const v = self.getVelocity();
            const s = gsap.utils.clamp(-8, 8, v / 400);
            gsap.to(track, { skewX: s, duration: 0.4, overwrite: "auto", ease: "power3.out" });
          }
        : undefined,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(track, { clearProps: "x,skewX" });
  };
}

export function killScrollTriggers(scope?: Element | string) {
  ScrollTrigger.getAll().forEach((st) => {
    if (!scope) {
      st.kill();
      return;
    }
    const trigger = st.trigger;
    if (typeof scope === "string") {
      if (trigger?.matches?.(scope) || trigger?.closest?.(scope)) st.kill();
    } else if (trigger === scope || scope.contains(trigger as Node)) {
      st.kill();
    }
  });
}

export { gsap, ScrollTrigger };
