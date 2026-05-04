import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { getNavTree } from "@/lib/docs";

export default async function DocsLayout({ children }: { children: ReactNode }) {
  const sections = await getNavTree();
  return (
    <main className="docs-shell">
      <DocsSidebar sections={sections} />
      <article className="docs-content prose">{children}</article>
    </main>
  );
}
