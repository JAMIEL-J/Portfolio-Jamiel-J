"use client";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Hero";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";
import { projects, getProject } from "@/lib/projects";

export default function ProjectPage({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-manrope text-[13px] text-white/45">{label}</span>
      <span className="font-manrope text-[13.5px] font-semibold text-white">{value}</span>
    </div>
  );
}

  const idx = projects.findIndex((p) => p.slug === slug);
  const more = Array.from({ length: 4 }, (_, k) => projects[(idx + 1 + k) % projects.length]);

  return (
    <main className="relative bg-[#0b0d0f]">
      <SmoothScroll />
      <Navbar />

      {/* hero — full-bleed cover + glass meta card */}
      <section className="relative h-[100svh] overflow-hidden">
        <a
          href="/work"
          className="group absolute left-4 top-16 z-30 inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-black/60 px-3.5 py-1.5 font-manrope text-[12px] text-white/90 shadow-lg backdrop-blur-[14px] transition hover:bg-[#f4f1ea] hover:text-black sm:top-20 sm:left-10 sm:px-4 sm:py-2 sm:text-[13px]"
        >
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span> All projects
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.img} alt={project.title} style={{ objectPosition: project.align ?? "50% 50%" }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent sm:via-transparent" />
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute bottom-6 left-4 right-4 max-w-xl rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[rgba(15,15,15,0.85)] via-[rgba(15,15,15,0.7)] to-[#1c2a34]/80 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] backdrop-blur-[14px] backdrop-saturate-[1.8] sm:left-10 sm:right-auto sm:p-9"
        >
          <h1 className="font-display text-[30px] leading-tight tracking-tight text-white sm:text-[48px] sm:leading-none">
            {project.title}
          </h1>
          <p className="mt-2.5 font-manrope text-[13px] font-light leading-relaxed text-white/80 sm:mt-4 sm:text-[14.5px]">
            {project.desc}
          </p>
        </motion.div>
      </section>

      {/* challenge / solution */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-10 sm:py-28">
        <div className="max-w-2xl">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[22px] tracking-tight text-white">Challenge</h2>
          <p className="mt-4 font-manrope text-[15px] font-light leading-[1.7] text-white/70">
            {project.challenge}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <h2 className="font-display text-[22px] tracking-tight text-white">Solution</h2>
          <p className="mt-4 font-manrope text-[15px] font-light leading-[1.7] text-white/70">
            {project.solution}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-5 py-2.5 font-manrope text-[13px] font-normal text-black transition hover:scale-[1.04]"
          >
            View GitHub Repo <span aria-hidden="true">→</span>
          </a>
        </motion.div>
        </div>
      </section>

      {/* gallery — one by one, natural ratio for maximum view */}
      <section className="mx-auto max-w-6xl space-y-4 px-4 sm:px-10">
        {project.gallery.map((g, k) => (
          <motion.figure
            key={g}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g} alt={`${project.title} gallery ${k + 1}`} loading="lazy" className="h-auto w-full" />
          </motion.figure>
        ))}
      </section>

      {/* see more */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-10 sm:pt-28">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[22px] tracking-tight text-white">See more projects</h2>
          <a
            href="/work"
            className="rounded-full bg-white/10 px-4 py-1.5 font-manrope text-[12.5px] text-white/80 transition hover:bg-[#f4f1ea] hover:text-black"
          >
            All projects →
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {more.map((m) => (
            <a key={m.slug} href={`/work/${m.slug}`} className="group relative block overflow-hidden rounded-xl bg-white/5 transition-transform duration-500 ease-out hover:-translate-y-1.5">
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.img}
                  alt={m.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
      <div className="absolute inset-x-3 bottom-3 rounded-lg border border-white/10 bg-black/55 px-4 py-2.5 backdrop-blur-[12px]">
        <span className="font-manrope text-[16px] font-normal leading-[21px] text-white">{m.title}</span>
      </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
