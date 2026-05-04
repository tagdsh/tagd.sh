"use client";

import { useEffect, useMemo, useState } from "react";
import type { TocHeading } from "@/lib/docs";

export function DocsToc({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -70% 0px", threshold: [0, 1] },
    );
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const items = useMemo(() => headings.filter((h) => h.level === 2 || h.level === 3), [headings]);
  if (!items.length) return null;

  return (
    <aside className="hidden w-[200px] shrink-0 lg:block">
      <p className="doc-muted mono text-xs uppercase tracking-wide">On this page</p>
      <nav className="sticky top-24 mt-2 max-h-[calc(100vh-7rem)] space-y-1 overflow-auto">
        {items.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className="mono block text-xs leading-snug hover:underline"
            style={{
              color: active === heading.id ? "var(--accent, #2563eb)" : "var(--muted, #64748b)",
              marginLeft: heading.level === 3 ? "0.5rem" : 0,
              opacity: heading.level === 3 ? 0.85 : 1,
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
