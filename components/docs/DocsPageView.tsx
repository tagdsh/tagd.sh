"use client";

import { useEffect } from "react";
import { trackDocsPageView } from "@/lib/analytics/events";

export function DocsPageView({ slugPath, title }: { slugPath: string; title: string }) {
  useEffect(() => {
    trackDocsPageView({ slug: slugPath, title });
  }, [slugPath, title]);
  return null;
}
