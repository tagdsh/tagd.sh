"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { DocNavSection } from "@/lib/docs";

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DocsSidebar({ sections }: { sections: DocNavSection[] }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (!q) return sections;
    return sections
      .map((sec) => ({
        ...sec,
        items: sec.items.filter(
          (item) => item.title.toLowerCase().includes(q) || item.href.toLowerCase().includes(q),
        ),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [sections, q]);

  return (
    <aside className="docs-sidebar">
      <details open>
        <summary>Documentation</summary>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter…"
          className="mb-3 mt-2 w-full rounded border px-2 py-1.5 text-sm"
          style={{ borderColor: "var(--border, #e2e8f0)" }}
          aria-label="Filter documentation pages"
        />
        {visible.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted, #64748b)" }}>
            No matches.
          </p>
        ) : null}
        {visible.map((group) => (
          <section key={group.label} className="docs-group">
            <h4>{group.label}</h4>
            <ul>
              {group.items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={active ? "active" : ""}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </details>
    </aside>
  );
}
