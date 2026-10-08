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
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pb-8 pt-3"
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
              className="grain relative h-full w-full object-cover object-[62%_12%]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6b8aa5]/20 via-transparent to-[#6b8aa5]/10" />
        </motion.div>

        {/* bio card — cursor following, no hint */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              key="card"
              style={{ x: fpx, y: fpy }}
              className="pointer-events-none fixed left-0 top-0 z-40 will-change-transform"
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
          )}
        </AnimatePresence>

        {/* BACK layer — giant type with bottom margin, sliced by the curtain */}
        <motion.h1
          style={{ y: nameY }}
          className="pointer-events-none absolute inset-x-0 bottom-5 z-10 select-none text-center will-change-transform"
        >
          <motion.span
            initial={{ y: "55%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="font-display block whitespace-nowrap uppercase leading-[1] tracking-[0.1em] text-[#f5f2ec]"
            style={{ fontSize: `${nameSize}vw`, fontWeight: 600 }}
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
