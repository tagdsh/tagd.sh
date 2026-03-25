import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/nav/DocsSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="docs-shell">
      <DocsSidebar />
      <article className="docs-content prose">{children}</article>
    </main>
  );
}
