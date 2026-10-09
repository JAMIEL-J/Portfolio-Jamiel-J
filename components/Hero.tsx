"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/* ---------- Floating island navbar ---------- */
export function Navbar() {
  const [show, setShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // scroll-spy: highlight the home section in view
  useEffect(() => {
    const els = ["intro", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setShow(true);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 350);
  };

  return (
    <>
      {/* Desktop navbar: auto-reveals on hover/scroll */}
      <div
        onMouseEnter={enter}
        onMouseLeave={leave}
        className="fixed inset-x-0 top-0 z-[60] hidden justify-center px-4 pb-8 pt-3 md:flex"
      >
        {!show && <div className="absolute top-1.5 h-1 w-10 rounded-full bg-white/25" />}
        <motion.nav
          initial={false}
          animate={{ y: show ? 0 : -90, opacity: show ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          style={{ pointerEvents: show ? "auto" : "none" }}
        >
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/85 px-2.5 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-150">
            <span className="ml-1.5 flex items-center gap-1.5">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)]"
              />
            </span>
            <span className="mx-1 h-4 w-px bg-white/15" />
            {site.nav.map((n) => {
              const isActive = active !== null && n.href.replace(/^\//, "") === active;
              return (
                <a
                  key={n.label}
                  href={n.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-3.5 py-1.5 font-manrope text-[13px] leading-none transition active:scale-[0.97] ${
                    isActive ? "bg-white/15 text-white" : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {n.label}
                </a>
              );
            })}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Dynamic Island Navbar (Always visible at top) */}
      <div className="fixed inset-x-0 top-0 z-[70] flex justify-center px-3 pt-3 md:hidden">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="w-full max-w-sm overflow-hidden rounded-[26px] border border-white/15 bg-black/85 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl backdrop-saturate-150"
        >
          <div className="flex items-center justify-between px-4 py-2.5">
            <a href="/" className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <motion.span
                  animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-full w-full rounded-full bg-amber-400"
                />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.9)]" />
              </span>
              <span className="font-display text-[13px] font-semibold tracking-wide text-white">
                {site.firstName}
              </span>
            </a>

            {/* Menu toggle button with animated hamburger lines */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="flex h-8 items-center gap-1.5 rounded-full bg-white/10 px-3 font-manrope text-[11px] font-medium text-white transition active:scale-95"
            >
              <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
              <div className="flex h-3 w-3 flex-col justify-center gap-[3px]">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                  className="h-[1.5px] w-full origin-center rounded-full bg-white transition-transform"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="h-[1.5px] w-full rounded-full bg-white"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                  className="h-[1.5px] w-full origin-center rounded-full bg-white transition-transform"
                />
              </div>
            </button>
          </div>

          {/* Dynamic Island Expandable Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="overflow-hidden border-t border-white/10 px-3 pb-3 pt-2"
              >
                <div className="grid grid-cols-2 gap-1.5">
                  {site.nav.map((n) => {
                    const isActive = active !== null && n.href.replace(/^\//, "") === active;
                    return (
                      <a
                        key={n.label}
                        href={n.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 font-manrope text-[13px] font-normal transition active:scale-[0.98] ${
                          isActive
                            ? "bg-white/20 text-white font-medium"
                            : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span>{n.label}</span>
                        <span className="text-[11px] text-white/40">→</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

/* ---------- Pinned Hero + Parallax Reveal + Curtain Mask ----------
   The hero STAYS pinned — no scale-down, no fade-out, no blur.
   On scroll the image is slightly pushed, the giant type travels up
   with the scroll, and the next section opens as a full image while
   the curtain masks the hero away, like the reference.
   The bio card follows the cursor anywhere inside the hero. */
export function Hero() {
  /* scroll wipe progress — first viewport of scrolling, heavy sprung glide */
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(1);
  useEffect(() => {
    const set = () => setVh(window.innerHeight);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  const raw = useTransform(scrollY, [0, vh], [0, 1]);
  const p = useSpring(raw, { stiffness: 65, damping: 30, mass: 0.8 });

  // parallax reveal — image slightly pushed, type travels with scroll,
  // card floats most. Hero itself never leaves; curtain masks it.
  const imgY = useTransform(p, [0, 1], ["0vh", "-30vh"]); // image pushed to full
  const imgScale = useTransform(p, [0, 1], [1, 1.18]); // full push closer
  const nameY = useTransform(p, [0, 1], ["0vh", "-26vh"]); // type travels up
  const cardY = useTransform(p, [0, 1], ["0vh", "-45vh"]); // front floats most

  /* mouse cursor parallax — raw -0.5..0.5, sprung for glide */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.5 });

  const imgMX = useTransform(smx, (v) => v * 18);
  const imgMY = useTransform(smy, (v) => v * 14);
  const nameMX = useTransform(smx, (v) => v * 36);
  const tiltX = useTransform(smy, [-0.5, 0.5], [3.5, -3.5]);
  const tiltY = useTransform(smx, [-0.5, 0.5], [-5, 5]);

  /* cursor-following bio card — revealed anywhere inside the hero */
  const [revealed, setRevealed] = useState(false);
  const moved = useRef(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const fpx = useSpring(px, { stiffness: 130, damping: 27, mass: 0.7 });
  const fpy = useSpring(py, { stiffness: 130, damping: 27, mass: 0.7 });

  // keep the giant type full-bleed for any name length
  const nameSize = Math.min(20, 145 / site.fullName.length);

  return (
    <section
      id="intro"
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
        moved.current = true;
        px.set(e.clientX);
        py.set(e.clientY);
      }}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
        setRevealed(false);
      }}
      onClick={() => {
        if (!moved.current) {
          px.set(window.innerWidth / 2);
          py.set(window.innerHeight / 2);
        }
        setRevealed((v) => !v);
      }}
      className="sticky top-0 z-[1] h-[100svh] cursor-pointer overflow-hidden bg-[#6b8aa5]"
    >
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
        className="absolute inset-0 will-change-transform"
      >
        {/* MIDDLE layer — subject travels upward, curtain masks it */}
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
          <motion.div style={{ x: imgMX, y: imgMY }} className="absolute inset-[-2%]">
            <motion.img
              src="/hero.jpg"
              alt="Portrait"
              initial={{ scale: 1.18, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="grain relative h-full w-full object-cover object-[55%_18%] sm:object-[62%_12%]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6b8aa5]/30 via-transparent to-[#0b0d0f]/40 md:to-[#6b8aa5]/10" />
        </motion.div>

        {/* bio card — cursor following on desktop, centered bottom bottom-sheet modal on mobile */}
        <AnimatePresence>
          {revealed && (
            <>
              {/* Desktop cursor-follow card */}
              <motion.div
                key="desktop-card"
                style={{ x: fpx, y: fpy }}
                className="pointer-events-none fixed left-0 top-0 z-40 hidden will-change-transform md:block"
              >
                <div className="-translate-x-1/2 -translate-y-[112%]">
                  <motion.div style={{ y: cardY }} className="relative will-change-transform">
                    <motion.div
                      initial={{ opacity: 0, y: 60, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.96 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-[min(92vw,520px)] overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[rgba(15,15,15,0.72)] via-[rgba(15,15,15,0.6)] to-[#1c2a34]/80 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] backdrop-blur-[12px] backdrop-saturate-[1.8] will-change-transform"
                    >
                      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-orange-400/25 blur-3xl" />
                      <h2 className="font-display text-[22px] tracking-tight text-white">
                        {site.greeting}
                      </h2>
                      <div className="h-16 sm:h-20" />
                      <p className="font-manrope text-[14.5px] font-light leading-[1.5] text-white/70">
                        <span className="font-normal text-white">{site.role}</span>{" "}
                        {site.years ? (
                          <>
                            with <span className="font-normal text-white">{site.years}</span>{" "}
                          </>
                        ) : null}
                        {site.blurb}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Mobile bottom bio card */}
              <motion.div
                key="mobile-card"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-x-4 bottom-24 z-50 md:hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/85 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-display text-[19px] tracking-tight text-white">
                        {site.greeting}
                      </h2>
                      <p className="font-manrope text-[12px] text-amber-300">
                        {site.role}
                      </p>
                    </div>
                    <button
                      onClick={() => setRevealed(false)}
                      className="rounded-full bg-white/10 px-2.5 py-1 font-manrope text-[11px] text-white/80"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mt-3 font-manrope text-[13px] font-light leading-[1.5] text-white/75">
                    {site.blurb}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* BACK layer — giant type with bottom margin, sliced by the curtain */}
        <motion.h1
          style={{ y: nameY }}
          className="pointer-events-none absolute inset-x-0 bottom-6 sm:bottom-5 z-10 select-none text-center will-change-transform px-2"
        >
          <motion.span
            initial={{ y: "55%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="font-display block whitespace-nowrap uppercase leading-[0.95] sm:leading-[1] tracking-[0.05em] sm:tracking-[0.1em] text-[#f5f2ec]"
            style={{ fontSize: "clamp(2.75rem, 13.5vw, 15vw)", fontWeight: 600 }}
          >
            <motion.span style={{ x: nameMX }} className="block will-change-transform">
              {site.fullName}
            </motion.span>
          </motion.span>
        </motion.h1>
      </motion.div>
    </section>
  );
}
