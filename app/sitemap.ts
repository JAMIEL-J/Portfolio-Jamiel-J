import type { MetadataRoute } from "next";

const SITE_URL = "https://jamiel-j.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "", priority: 1, freq: "monthly" as const },
    { path: "/work", priority: 0.9, freq: "monthly" as const },
    ...[
      "jpmc",
      "citi",
      "credit-risk",
      "hubspot-forecast",
      "conversion-funnel",
      "sales-optimization",
      "churn-prediction",
      "demand-forecasting",
      "vizzy-pilot"
    ].map((slug) => ({ path: `/work/${slug}`, priority: 0.7, freq: "yearly" as const }))
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority
  }));
}