"use client";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects as allProjects } from "@/lib/projects";

const projects = [
  {
    slug: "citi",
    title: "Citigroup Expense Variance",
    year: "2025",
    desc: "Excel FP&A model explaining why Citigroup's operating expenses rose 2.9% in FY2025 — volume/rate splits, FY24→FY25 bridge, CET1 tied to the 10-K with live integrity checks.",
    img: "/projects/citi-main.png",
    thumb: "/projects/citi-2.png",
    url: "https://github.com/JAMIEL-J/Citigroup-FY2025-Operating-Expense-Variance-Capital-Analysis"
  },
  {
    slug: "jpmc",
    title: "JPMorgan NII Attribution",
    year: "2026",
    desc: "JPMorgan Chase net interest income and deposit-beta attribution — 18 quarters, source-verified from SEC EDGAR + FRED in a formula-verified workbook.",
    img: "/projects/jpmc-3.png",
    thumb: "/projects/jpmc-1.png",
    url: "https://github.com/JAMIEL-J/JPMorgan-Chase-Net-Interest-Income-Deposit-Beta-Attribution-Model"
  },
];

/**
 * Sticky cover sections (measured from the video: pinned image, next
 * slides over with a hard cut) + scroll parallax on the image.
 * The details card lives only under the cursor: anywhere the mouse is
 * inside the section it appears and trails behind with spring lag.
 */
export function ProjectSection({
  index,
  slug,
  title,
  year,
  desc,
  img,
  thumb,
  url
}: {
  index: string;
  slug: string;
  title: string;
  year: string;
  desc: string;
  img: string;
  thumb: string;
  url: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const s = useSpring(scrollYProgress, { stiffness: 70, damping: 30, mass: 0.8 });
  // parallax to the full: background drifts hard against the pinned section
  const bgY = useTransform(s, [0, 1], ["-5%", "5%"]);

  // cursor follow — tight spring so it trails, never lags behind
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const moved = useRef(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const fx = useSpring(mx, { stiffness: 130, damping: 27, mass: 0.7 });
  const fy = useSpring(my, { stiffness: 130, damping: 27, mass: 0.7 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        moved.current = true;
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/work/${slug}`)}
      className="grain sticky top-0 h-[100svh] cursor-pointer overflow-hidden"
    >
      {/* full-bleed image with scroll parallax */}
      <motion.div style={{ y: bgY }} className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={title} style={{ objectPosition: "50% 0%" }} className="h-full w-full object-cover" />
      </motion.div>

      {/* Mobile-visible bottom overlay card (Static indicator on touch devices) */}
      <div className="absolute inset-x-4 bottom-8 z-20 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/15 bg-black/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 font-manrope text-[11px] text-white/80">
              {index}
            </span>
            <span className="font-manrope text-[11px] font-medium text-amber-300">
              View Project →
            </span>
          </div>
          <h3 className="font-display mt-2 text-[20px] font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 font-manrope text-[12.5px] font-light leading-snug text-white/70">
            {desc}
          </p>
        </motion.div>
      </div>

      {/* Desktop cursor-following details card */}
      <AnimatePresence>
        {hover && (
          <motion.div
            style={{ x: fx, y: fy }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden will-change-transform md:block"
          >
            <div className="-translate-x-1/2 -translate-y-[112%]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="grid w-[min(92vw,720px)] overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[rgba(15,15,15,0.82)] via-[rgba(15,15,15,0.68)] to-[#1c2a34]/85 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] backdrop-blur-[12px] backdrop-saturate-[1.8] md:grid-cols-[1.05fr_1fr]"
              >
                <div className="flex flex-col justify-between p-7 sm:p-9">
                  <div>
                    <p className="font-display text-[28px] leading-none text-white">{title}</p>
                  </div>
                  <p className="mt-16 font-manrope text-[15px] font-light leading-[1.6] text-white/80">
                    {desc}
                  </p>
                </div>
                <div className="relative m-2 ml-0 h-56 overflow-hidden rounded-xl md:h-auto md:min-h-[360px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb} alt={`${title} preview`} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/[0.12] bg-[rgba(15,15,15,0.6)] px-3 py-1 font-manrope text-[12px] text-white/80 backdrop-blur-[12px]">
                    {index}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Work() {
  return (
    <div id="work" className="relative z-10">
      {projects.map((p, i) => (
        <ProjectSection key={p.title} index={`0${i + 1}`} {...p} />
      ))}

      <section id="about" className="relative z-20 bg-[#0e1113] px-5 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display w-full text-center text-[28px] leading-[1.2] tracking-[-0.02em] sm:text-[40px]"
          >
            <span className="text-white">
              I&apos;m Jamiel — a data analyst from Pudukkottai, Tamil Nadu, focused on
              financial modeling, FP&amp;A, and everything data.
            </span>{" "}
            <span className="text-white/40">
              I&apos;ve built an 18-quarter NII attribution model for JPMorgan Chase, a 30-quarter
              rolling forecast engine for HubSpot, a Citigroup FY2025 variance model, and
              credit-risk stress tests on a $7.5B book. B.Tech IT (M.I.E.T) · trained at BY8LABS
              AI · open to full-time FP&amp;A and analyst roles.
            </span>
          </motion.p>

          <motion.h3
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-16 text-[22px] tracking-tight text-white"
          >
            Skills
          </motion.h3>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Data Analysis", items: ["SQL (PostgreSQL, MySQL)", "Exploratory Analysis (EDA)", "Financial Modeling", "KPI Reporting"] },
              { title: "Data Engineering", items: ["DuckDB In-Memory Engines", "FastAPI Microservices", "Query Planning (104ms p95)", "Automated Validation"] },
              { title: "Machine Learning", items: ["Scikit-Learn", "LightGBM / XGBoost", "Threshold Tuning (SMOTE)", "Time-Series Forecasting"] },
              { title: "Visualization", items: ["Power BI", "Tableau", "Streamlit", "Excel Analytics"] }
            ].map((g, gi) => (
              <motion.div
                key={g.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: gi * 0.07 }}
              >
                <p className="font-manrope text-[15px] font-normal text-white">{g.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((s) => (
                    <li key={s} className="flex gap-2.5 font-manrope text-[13.5px] font-light text-white/55 transition-colors hover:text-white/85">
                      <span className="text-white/30">•</span> {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex items-center gap-4">
            <motion.h3
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[22px] tracking-tight text-white"
            >
              Selected Works
            </motion.h3>
            <a
              href="/work"
              className="rounded-full bg-white/10 px-4 py-1.5 font-manrope text-[12.5px] text-white/80 transition hover:bg-[#f4f1ea] hover:text-black"
            >
              All projects →
            </a>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {["jpmc", "citi", "credit-risk"].map((slug, si) => {
              const p = allProjects.find((x) => x.slug === slug)!;
              return (
                <motion.a
                  key={slug}
                  href={`/work/${p.slug}`}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: si * 0.07 }}
                  className="group block"
                >
                  <p className="font-manrope text-[15px] font-normal text-white transition group-hover:underline">
                    {p.title}
                  </p>
                  <p className="mt-1 font-manrope text-[13px] text-white/45">
                    {p.scope}
                  </p>
                  <p className="mt-4 font-manrope text-[13.5px] font-light leading-[1.65] text-white/60">
                    {p.desc}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
