"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { site } from "@/lib/site";

function LiveClock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = () =>
      `${new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })} ${new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      })}`;
    setNow(fmt());
    const t = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="tabular-nums">{now || "—"}</span>;
}

/**
 * Shared footer for all pages: Book-a-Call pill, contact row,
 * glass statement card with live clock, giant faded name.
 */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-[rgba(15,15,15,0.6)] font-manrope text-[18px] text-white/85 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] backdrop-blur-[12px] backdrop-saturate-[1.8] transition hover:bg-white/15 hover:text-white"
        >
          <span aria-hidden="true">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
export function Footer() {
  const [hover, setHover] = useState(false);
  const moved = useRef(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const fx = useSpring(mx, { stiffness: 130, damping: 27, mass: 0.7 });
  const fy = useSpring(my, { stiffness: 130, damping: 27, mass: 0.7 });

  return (
    <footer
      id="contact"
      onMouseMove={(e) => {
        moved.current = true;
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (!moved.current) {
          mx.set(window.innerWidth / 2);
          my.set(window.innerHeight / 2);
        }
        setHover((v) => !v);
      }}
      className="grain relative z-20 cursor-pointer overflow-hidden bg-[#0b0d0f] px-4 pb-6 pt-20 sm:px-8 sm:pt-28"
    >
      {/* Book a Call pill */}
      <motion.a
        href={`mailto:${site.email}`}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        className="font-display mx-auto flex max-w-6xl items-center justify-center rounded-[999px] bg-[#f4f1ea] px-6 py-14 text-center text-[11vw] leading-none tracking-[-0.03em] text-black sm:py-20 sm:text-[7vw]"
      >
        Let&apos;s talk
      </motion.a>

      {/* contact row */}
      <div className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-3 px-2 font-manrope text-[13px] text-white/80">
        <p>
          {site.email} <span className="mx-1.5 text-white/30">·</span> {site.phone}
        </p>
        <p className="flex gap-3">
          {site.socials.map((s, i) => (
            <span key={s.label} className="flex gap-3">
              {i > 0 && <span className="text-white/30">·</span>}
              <a href={s.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                {s.label}
              </a>
            </span>
          ))}
        </p>
      </div>

      {/* statement card — follows the cursor, takes no layout space */}
      <AnimatePresence>
        {hover && (
          <motion.div
            key="card"
            style={{ x: fx, y: fy }}
            className="pointer-events-none fixed left-0 top-0 z-40 will-change-transform"
          >
            <div className="-translate-x-1/2 -translate-y-[112%]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="w-[min(92vw,520px)] rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[rgba(20,22,24,0.9)] via-[rgba(15,15,15,0.7)] to-[#1c2a34]/60 p-7 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] backdrop-blur-[12px] backdrop-saturate-[1.8] sm:p-9"
              >
                <p className="font-display max-w-[300px] text-[24px] leading-[1.25] tracking-tight text-white sm:text-[26px]">
                  Let&apos;s create something worth remembering.
                </p>
                <div className="mt-14 flex items-center justify-between font-manrope text-[13.5px] text-white/60">
                  <p>
                    Based in <span className="font-normal text-white">{site.location}</span>
                  </p>
                  <LiveClock />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* giant name */}
      <motion.h2
        aria-hidden
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display pointer-events-none mt-10 select-none whitespace-nowrap text-center uppercase leading-[0.85] tracking-[-0.045em] text-white/[0.13]"
        style={{ fontSize: `${Math.min(20, 145 / site.fullName.length)}vw` }}
      >
        {site.fullName}
      </motion.h2>

      {/* credits */}
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between px-2 font-manrope text-[11.5px] text-white/40">
        <p>
          Designed in Next.js by <span className="text-white/70">Jamiel</span>
        </p>
        <p>© 2026 All rights reserved</p>
      </div>
      <BackToTop />
    </footer>
  );
}
