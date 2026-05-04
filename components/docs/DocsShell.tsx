import type { ReactNode } from "react";
import type { TocHeading } from "@/lib/docs";
import { DocsToc } from "./DocsToc";
import { EditOnGitHub } from "./EditOnGitHub";

export function DocsShell({
  sectionLabel,
  title,
  description,
  readingTimeText,
  headings,
  filePath,
  children,
}: {
  sectionLabel: string;
  title: string;
  description: string;
  readingTimeText: string;
  headings: TocHeading[];
  filePath: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="min-w-0 flex-1" data-pagefind-body>
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mono text-xs uppercase tracking-wide" style={{ color: "var(--accent, #2563eb)" }}>
              {sectionLabel}
            </p>
            <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
            <p className="lead mt-3 max-w-2xl text-base" style={{ color: "var(--muted-foreground, #475569)" }}>
              {description}
            </p>
            <p className="mono mt-2 text-xs" style={{ color: "var(--muted, #64748b)" }}>
              {readingTimeText} · {sectionLabel}
            </p>
          </div>
          <EditOnGitHub filePath={filePath} />
        </header>
        <div className="prose max-w-none">{children}</div>
      </div>
      <DocsToc headings={headings} />
    </div>
  );
}
