import type { MetadataRoute } from "next";

const SITE = "https://www.krmzov.com";

// Two pages, both of them real destinations someone can be sent to. The
// /work/[slug] case studies are deliberately absent: nothing on the site links
// to them any more, and they carry noindex (see work/[slug]/page.tsx), so
// listing them here would be asking Google to crawl pages we then tell it to
// drop.
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
  ];
}
