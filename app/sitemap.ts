import type { MetadataRoute } from "next";
import { PROJECTS } from "./data/projects";

const SITE = "https://www.krmzov.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE}/hours`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...PROJECTS.map((p) => ({
      url: `${SITE}/work/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
