"use client";

import Link from "next/link";

export function DocsPrevNext({
  prev,
  next,
}: {
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
}) {
  if (!prev && !next) return null;
  return (
    <nav
      className="not-prose mt-12 flex flex-wrap justify-between gap-6 border-t pt-8"
      style={{ borderColor: "var(--border, #e2e8f0)" }}
      aria-label="Documentation pagination"
    >
      <div>
        {prev ? (
          <Link href={prev.href}>
            <span className="mono block text-xs uppercase" style={{ color: "var(--muted, #64748b)" }}>
              Previous
            </span>
            <span className="text-sm">{prev.title}</span>
          </Link>
        ) : null}
      </div>
      <div className="text-right">
        {next ? (
          <Link href={next.href}>
            <span className="mono block text-xs uppercase" style={{ color: "var(--muted, #64748b)" }}>
              Next
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--accent, #2563eb)" }}>
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
