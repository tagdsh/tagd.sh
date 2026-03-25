import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs";

function priorityFor(slug: string): number {
  if (slug.startsWith("getting-started/")) return 0.9;
  if (slug.startsWith("schema/")) return 0.8;
  if (slug.startsWith("industries/")) return 0.8;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const docRoutes = getAllDocSlugs().map((slug) => ({
    url: `https://tagd.sh/docs/${slug}`,
    lastModified: now,
    priority: priorityFor(slug),
  }));

  return [
    { url: "https://tagd.sh", lastModified: now, priority: 1.0 },
    ...docRoutes,
  ];
}
