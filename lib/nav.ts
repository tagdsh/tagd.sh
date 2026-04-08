export const docsNav = [
  {
    section: "Getting Started",
    items: [
      { title: "Quick Start", slug: "getting-started/quick-start" },
      { title: "Core Concepts", slug: "getting-started/concepts" },
      { title: "Tag Anatomy", slug: "getting-started/tag-anatomy" },
    ],
  },
  {
    section: "Schema",
    items: [
      { title: "Overview", slug: "schema/overview" },
      { title: "Tag ID Format", slug: "schema/tag-id-format" },
      { title: "Verification Record", slug: "schema/verification-record" },
    ],
  },
  {
    section: "Verify",
    items: [
      { title: "Overview", slug: "verify/overview" },
      { title: "Self-Host", slug: "verify/self-host" },
      { title: "Better Data API", slug: "verify/better-data-api" },
    ],
  },
  {
    section: "Generate",
    items: [
      { title: "Overview", slug: "generate/overview" },
      { title: "QR Encoding", slug: "generate/qr-encoding" },
    ],
  },
  {
    section: "Industries",
    items: [
      { title: "Pharmaceutical", slug: "industries/pharma" },
      { title: "Healthcare", slug: "industries/healthcare" },
      { title: "Retail", slug: "industries/retail" },
      { title: "Food & Beverage", slug: "industries/food-beverage" },
      { title: "Construction", slug: "industries/construction" },
    ],
  },
  {
    section: "Project",
    items: [{ title: "Changelog", slug: "changelog" }],
  },
] as const;
