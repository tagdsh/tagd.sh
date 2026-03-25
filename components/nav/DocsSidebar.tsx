"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/lib/nav";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="docs-sidebar">
      <details open>
        <summary>Documentation</summary>
        {docsNav.map((group) => (
          <section key={group.section} className="docs-group">
            <h4>{group.section}</h4>
            <ul>
              {group.items.map((item) => {
                const href = `/docs/${item.slug}`;
                const active = pathname === href;
                return (
                  <li key={item.slug}>
                    <Link href={href} className={active ? "active" : ""}>
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
