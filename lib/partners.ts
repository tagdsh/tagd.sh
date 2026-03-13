export type Partner = {
  name: string;
  slug: string;
  logoPath?: string;
  description: string;
  integrationType: "featured" | "ecosystem" | "standard";
  docsPath?: string;
  externalUrl?: string;
  certificationStatus?: "certified" | "in-review" | "community";
  note?: string;
};

export const featuredPartner: Partner = {
  name: "Better Data",
  slug: "better-data",
  logoPath: "/logos/better-data.svg",
  description:
    "Better Data hosts the managed Signal Tags verification API — high-availability, blockchain-anchored, enterprise SLA.",
  integrationType: "featured",
  externalUrl: "https://betterdata.co",
  docsPath: "/docs/verify/better-data-api",
};

export const ecosystemPartners: Partner[] = [
  {
    name: "Loop Engine",
    slug: "loop-engine",
    logoPath: "/logos/loop-engine.svg",
    description:
      "A recalled or failed tag verification triggers a governed Loop Engine compliance loop — quarantine, investigation, resolution.",
    integrationType: "ecosystem",
    externalUrl: "https://loopengine.io",
    docsPath: "/docs",
  },
  {
    name: "Commerce Chain",
    slug: "commerce-chain",
    logoPath: "/logos/commerce-chain.svg",
    description:
      "Signal Tags authentication integrates with Commerce Chain supply chain and quality loops.",
    integrationType: "ecosystem",
    externalUrl: "https://commercechain.io",
    docsPath: "/docs",
  },
];

export const standardsPartners: Partner[] = [
  {
    name: "GS1",
    slug: "gs1",
    description:
      "Signal Tags schema is compatible with GS1 GTIN standards. GTIN field maps directly to the GS1 product identifier format.",
    integrationType: "standard",
    externalUrl: "https://www.gs1.org",
    note: "Standards compatibility — not a commercial partnership.",
  },
  {
    name: "EPCIS / GS1",
    slug: "epcis",
    description:
      "Signal Tags event schema maps to EPCIS event types — ObjectEvent, AggregationEvent, TransactionEvent.",
    integrationType: "standard",
    externalUrl: "https://www.gs1.org/standards/epcis",
  },
];
