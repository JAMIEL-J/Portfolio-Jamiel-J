"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis / momentum smooth scrolling.
 * Intercepts wheel input with inertia interpolation (lerp)
 * for the gliding, cushioned feel of the reference site.
 */
export function SmoothScroll() {
  useEffect(() => {
    // honor reduced motion: native scroll, no smoothing engine
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4
    });

    // Anchor links (pill nav) glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
