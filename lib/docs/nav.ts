import { cache } from "react";
import type { DocNavSection } from "./types";
import { getAllDocs } from "./loader";

export const getNavTree = cache(async (): Promise<DocNavSection[]> => {
  const docs = await getAllDocs();
  const order: string[] = [];
  const map = new Map<string, DocNavSection["items"]>();

  for (const d of docs) {
    const label = d.sectionLabel;
    if (!map.has(label)) {
      order.push(label);
      map.set(label, []);
    }
    map.get(label)!.push({
      title: d.frontmatter.sidebar_label ?? d.title,
      href: `/docs/${d.slugPath}`,
    });
  }

  return order.map((label) => ({ label, items: map.get(label)! }));
});
