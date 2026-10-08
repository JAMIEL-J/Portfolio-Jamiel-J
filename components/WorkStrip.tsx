"use client";
import { ProjectSection } from "./Work";
import { projects } from "@/lib/projects";

const picks = ["credit-risk", "hubspot-forecast", "demand-forecasting"];

/**
 * Home strip after About — same full sticky sections with cursor-following
 * cards as the pre-about work, continuing the numbering.
 */
export function WorkStrip() {
  const items = picks
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="relative z-10">
      {items.map((p, k) => (
        <ProjectSection
          key={p.slug}
          index={`0${k + 3}`}
          slug={p.slug}
          title={p.title}
          year={p.year}
          desc={p.desc}
          img={p.img}
          thumb={p.thumb ?? p.img}
          url={p.url}
        />
      ))}
    </div>
  );
}
