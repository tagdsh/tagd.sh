import type { LoadedDoc } from "./types";

/** Sidebar / prev-next section order (matches prior `lib/nav.ts`). */
export const SECTION_LABEL_ORDER: string[] = [
  "Getting Started",
  "Schema",
  "Verify",
  "Generate",
  "Integrations",
  "Industries",
  "Project",
];

/** Matches prior manual nav traversal order. */
const ORDERED_SLUGS = [
  "getting-started/quick-start",
  "getting-started/concepts",
  "getting-started/tag-anatomy",
  "schema/overview",
  "schema/tag-id-format",
  "schema/verification-record",
  "verify/overview",
  "verify/self-host",
  "verify/better-data-api",
  "generate/overview",
  "generate/qr-encoding",
  "integrations/loop-engine",
  "industries/pharma",
  "industries/healthcare",
  "industries/retail",
  "industries/food-beverage",
  "industries/construction",
  "changelog",
];

const SLUG_RANK: Record<string, number> = (() => {
  const m: Record<string, number> = {};
  ORDERED_SLUGS.forEach((s, i) => {
    m[s] = i;
  });
  return m;
})();

function sectionRank(label: string): number {
  const i = SECTION_LABEL_ORDER.indexOf(label);
  if (i !== -1) return i;
  return 100 + label.localeCompare("");
}

function withinSectionSort(a: LoadedDoc, b: LoadedDoc): number {
  const oa = a.frontmatter.order;
  const ob = b.frontmatter.order;
  if (oa != null && ob != null && oa !== ob) return oa - ob;
  if (oa != null && ob == null) return -1;
  if (oa == null && ob != null) return 1;

  const ra = SLUG_RANK[a.slugPath];
  const rb = SLUG_RANK[b.slugPath];
  const fa = ra !== undefined ? ra : 9999;
  const fb = rb !== undefined ? rb : 9999;
  if (fa !== fb) return fa - fb;
  return a.slugPath.localeCompare(b.slugPath);
}

export function sortLoadedDocsByReaderOrder(docs: LoadedDoc[]): LoadedDoc[] {
  return [...docs].sort((a, b) => {
    const s = sectionRank(a.sectionLabel) - sectionRank(b.sectionLabel);
    if (s !== 0) return s;
    return withinSectionSort(a, b);
  });
}
