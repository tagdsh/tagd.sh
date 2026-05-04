"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { inferPageType } from "@/lib/analytics/posthog";
import { trackCtaClicked, trackOutboundClicked } from "@/lib/analytics/events";
import { DOCS_SEARCH_OPEN_EVENT } from "@/lib/docs-search-events";

export function TopNav() {
  const pathname = usePathname();
  const pageType = inferPageType(pathname);

  const openDocsSearch = () => {
    window.dispatchEvent(
      new CustomEvent(DOCS_SEARCH_OPEN_EVENT, { detail: { source: "header" as const } }),
    );
  };

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <Link href="/" className="brand">
          <Image src="/logo.svg" alt="tagd.sh" width={140} height={34} priority />
        </Link>
        <nav className="nav-links">
          {pathname.startsWith("/docs") ? (
            <button
              type="button"
              className="mono"
              style={{
                fontSize: "var(--text-sm)",
                letterSpacing: "0.06em",
                color: "var(--color-ink-tertiary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              onClick={openDocsSearch}
            >
              SEARCH <span style={{ opacity: 0.7 }}>⌘K</span>
            </button>
          ) : null}
          <Link
            href="/docs/getting-started/quick-start"
            data-ph-cta="view_docs"
            onClick={() =>
              trackCtaClicked({
                cta: "view_docs",
                location: "top_nav",
                destination: "/docs/getting-started/quick-start",
                pageType,
              })
            }
          >
            DOCS
          </Link>
          <a
            href="https://betterdata.co/blog/tags/signal-tags"
            target="_blank"
            rel="noreferrer"
            data-ph-cta="read_blog"
            onClick={() =>
              trackOutboundClicked({
                label: "blog",
                destination: "https://betterdata.co/blog/tags/signal-tags",
                location: "top_nav",
                pageType,
              })
            }
          >
            BLOG
          </a>
          <a
            href="https://betterdata.co/changelog?module=signal-tags"
            target="_blank"
            rel="noreferrer"
            data-ph-cta="read_changelog"
            onClick={() =>
              trackOutboundClicked({
                label: "changelog",
                destination: "https://betterdata.co/changelog?module=signal-tags",
                location: "top_nav",
                pageType,
              })
            }
          >
            CHANGELOG
          </a>
          <a
            href="https://github.com/tagdsh/tagd/releases"
            target="_blank"
            rel="noreferrer"
            data-ph-cta="releases"
            onClick={() =>
              trackOutboundClicked({
                label: "releases",
                destination: "https://github.com/tagdsh/tagd/releases",
                location: "top_nav",
                pageType,
              })
            }
          >
            RELEASES
          </a>
          <Link
            href="/partners"
            data-ph-cta="partners"
            onClick={() =>
              trackCtaClicked({
                cta: "partners",
                location: "top_nav",
                destination: "/partners",
                pageType,
              })
            }
          >
            PARTNERS
          </Link>
          <a
            href="https://github.com/tagdsh/tagd"
            target="_blank"
            rel="noreferrer"
            data-ph-cta="github"
            onClick={() =>
              trackOutboundClicked({
                label: "github",
                destination: "https://github.com/tagdsh/tagd",
                location: "top_nav",
                pageType,
              })
            }
          >
            GITHUB
          </a>
        </nav>
        <div className="nav-actions">
          <span className="npm-badge">npm i @signal-tags/sdk</span>
          <Link
            href="/docs/getting-started/quick-start"
            className="btn btn-primary"
            data-ph-cta="get_started"
            onClick={() =>
              trackCtaClicked({
                cta: "get_started",
                location: "top_nav",
                destination: "/docs/getting-started/quick-start",
                pageType,
              })
            }
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
