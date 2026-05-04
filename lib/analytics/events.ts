import posthog from "posthog-js";
import { buildCommonAnalyticsProperties } from "@/lib/analytics/posthog";

function capture(event: string, properties: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture(event, buildCommonAnalyticsProperties(properties));
}

export function trackCtaClicked(args: {
  cta: string;
  location: string;
  destination: string;
  pageType?: string;
}) {
  capture("cta_clicked", {
    cta: args.cta,
    location: args.location,
    destination: args.destination,
    page_type: args.pageType,
  });
}

export function trackDocsViewed(args: {
  section: string;
  slug: string;
  product?: string;
}) {
  capture("docs_viewed", {
    section: args.section,
    slug: args.slug,
    product: args.product,
    page_type: "docs",
  });
}

export function trackDocsPageView(args: { slug: string; title: string }) {
  capture("docs_page_view", {
    page_type: "docs",
    doc_slug: args.slug,
    doc_title: args.title,
    slug: args.slug,
    title: args.title,
  });
}

export function trackDocsEditClicked(args: { filePath: string; destination: string }) {
  capture("edit_clicked", {
    page_type: "docs",
    file_path: args.filePath,
    destination: args.destination,
  });
}

export function trackOutboundClicked(args: {
  label: string;
  destination: string;
  location: string;
  pageType?: string;
}) {
  capture("outbound_clicked", {
    label: args.label,
    destination: args.destination,
    location: args.location,
    page_type: args.pageType,
  });
}
