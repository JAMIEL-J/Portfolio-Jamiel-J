"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Hero";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";
import { projects } from "@/lib/projects";

const order = [
  "jpmc",
  "citi",
  "credit-risk",
  "hubspot-forecast",
  "conversion-funnel",
  "sales-optimization",
  "churn-prediction",
  "demand-forecasting",
  "customer-sla",
  "vizzy-pilot"
];
const ordered = order
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

function WorkCard({ title, year, img, slug, align, tall, i }: { title: string; year: string; img: string; slug: string; align?: string; tall?: boolean; i: number }) {
  return (
    <motion.a
      href={`/work/${slug}`}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
      className="group relative block overflow-hidden rounded-2xl bg-white/5 border border-white/10"
    >
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={title}
          loading="lazy"
          style={{ objectPosition: align ?? "50% 50%" }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/10 bg-black/65 px-4 py-3 backdrop-blur-[14px]">
        <span className="font-manrope text-[15px] sm:text-[16px] font-medium leading-snug text-white">{title}</span>
      </div>
    </motion.a>
  );
}

export default function WorkPage() {
  return (
    <main className="relative bg-[#0b0d0f]">
      <SmoothScroll />
      <Navbar />
      <section className="w-full px-4 pb-24 pt-20 sm:px-8 sm:pt-36">
        <motion.a
          href="/"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-manrope text-[13px] text-white/80 backdrop-blur-[12px] transition hover:bg-white/15 hover:text-white group"
        >
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span> Home
        </motion.a>
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[36px] leading-[42px] tracking-[-0.03em] text-white sm:text-[80px] sm:leading-[88px]"
        >
          Selected Work
        </motion.h1>
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-4 max-w-xl font-manrope text-[16px] font-light leading-[21px] text-white/55"
        >
          A collection of projects spanning finance, analytics, and machine
          learning — each shaped by the same pursuit of clarity, rhythm, and
          intentional detail.
        </motion.p>
        {/* plain flowing grid — footer rides right after the final row */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ordered.map((p, i) => (
            <WorkCard key={p.slug} {...p} i={i} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
