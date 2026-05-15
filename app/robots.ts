import type { MetadataRoute } from "next";

const PRODUCTION_SITEMAP = "https://tagd.sh/sitemap.xml";

/**
 * Production: public indexing for tagd.sh (provenance / trust property).
 * Vercel previews: disallow crawlers so deployment URLs are not indexed.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return {
      rules: {
        userAgent: "*",
        disallow: ["/"],
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/pagefind/"],
    },
    sitemap: PRODUCTION_SITEMAP,
  };
}
