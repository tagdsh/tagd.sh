import type { MetadataRoute } from "next";

export default function robotsPublic(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://tagd.sh/sitemap.xml",
  };
}
