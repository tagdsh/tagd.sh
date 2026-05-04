"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import {
  trackDocsSearchOpened,
  trackDocsSearchQuery,
  trackDocsSearchResultClicked,
} from "@/lib/analytics/events";
import type { DocsSearchOpenDetail } from "@/lib/docs-search-events";
import { DOCS_SEARCH_OPEN_EVENT } from "@/lib/docs-search-events";

const PAGEFIND_CSS = "/pagefind/pagefind-ui.css";
const PAGEFIND_JS = "/pagefind/pagefind-ui.js";

type PagefindUiInstance = { destroy?: () => void };
type PagefindUiConstructor = new (options: Record<string, unknown>) => PagefindUiInstance;

function ensurePagefindCss() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[href="${PAGEFIND_CSS}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = PAGEFIND_CSS;
  document.head.appendChild(link);
}

/**
 * Docs-wide Pagefind modal: Cmd/Ctrl+K on /docs, custom event from sidebar/header, Escape to close.
 */
export function DocsSearchModalHost() {
  const pathname = usePathname();
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<PagefindUiInstance | null>(null);
  const openRef = useRef(false);
  const queryDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastQuerySentRef = useRef("");

  const inDocs = pathname.startsWith("/docs");

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const destroyPagefindUi = useCallback(() => {
    uiRef.current?.destroy?.();
    uiRef.current = null;
    if (containerRef.current) containerRef.current.replaceChildren();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setReady(false);
    setInitError(null);
    destroyPagefindUi();
    if (queryDebounceRef.current) {
      clearTimeout(queryDebounceRef.current);
      queryDebounceRef.current = null;
    }
    lastQuerySentRef.current = "";
  }, [destroyPagefindUi]);

  const openModal = useCallback(
    (source: DocsSearchOpenDetail["source"]) => {
      if (!inDocs) return;
      trackDocsSearchOpened({ source, path: pathname });
      setInitError(null);
      setOpen(true);
    },
    [inDocs, pathname],
  );

  /** Cmd/Ctrl+K — toggle when already open */
  useEffect(() => {
    if (!inDocs) return;
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "k") return;
      e.preventDefault();
      if (openRef.current) close();
      else openModal("keyboard");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inDocs, openModal, close]);

  /** Sidebar / header dispatch */
  useEffect(() => {
    const onOpen = (ev: Event) => {
      const ce = ev as CustomEvent<DocsSearchOpenDetail>;
      const source = ce.detail?.source ?? "header";
      openModal(source);
    };
    window.addEventListener(DOCS_SEARCH_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(DOCS_SEARCH_OPEN_EVENT, onOpen);
  }, [openModal]);

  /** Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  /** Lock body scroll */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /** Init Pagefind UI when modal opens */
  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let mo: MutationObserver | null = null;

    const run = async () => {
      ensurePagefindCss();
      try {
        const mod = (await import(
          /* webpackIgnore: true */
          PAGEFIND_JS
        )) as { default?: { PagefindUI?: PagefindUiConstructor }; PagefindUI?: PagefindUiConstructor };
        if (cancelled || !container) return;

        const PagefindUI =
          mod.default?.PagefindUI ??
          mod.PagefindUI ??
          (mod as unknown as { PagefindUI: PagefindUiConstructor }).PagefindUI;

        if (typeof PagefindUI !== "function") {
          setInitError("Search index is not available. Run `pnpm build` locally to generate Pagefind output.");
          setReady(true);
          return;
        }

        uiRef.current = new PagefindUI({
          element: container,
          bundlePath: "/pagefind/",
          showSubResults: true,
          resetStyles: false,
        });
        setReady(true);

        const hookQueryInput = () => {
          const candidates = container.querySelectorAll("input");
          for (const searchInput of candidates) {
            if (searchInput.dataset.phHooked === "1") continue;
            if (searchInput.type && searchInput.type !== "search" && searchInput.type !== "text") continue;
            searchInput.dataset.phHooked = "1";
            const onInput = () => {
              const q = searchInput.value ?? "";
              if (queryDebounceRef.current) clearTimeout(queryDebounceRef.current);
              queryDebounceRef.current = setTimeout(() => {
                if (q === lastQuerySentRef.current) return;
                lastQuerySentRef.current = q;
                trackDocsSearchQuery({
                  queryLength: q.length,
                  querySample: q.length > 64 ? `${q.slice(0, 64)}…` : q,
                });
              }, 400);
            };
            searchInput.addEventListener("input", onInput);
          }
        };

        hookQueryInput();
        mo = new MutationObserver(() => hookQueryInput());
        mo.observe(container, { childList: true, subtree: true });
      } catch {
        setInitError(
          "Search could not be loaded. In development, run `pnpm build` once to create `/public/pagefind`.",
        );
        setReady(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
      mo?.disconnect();
      destroyPagefindUi();
    };
  }, [open, destroyPagefindUi]);

  /** Result click tracking (capture) */
  useEffect(() => {
    if (!open || !ready) return;
    const root = containerRef.current;
    if (!root) return;

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const link = el?.closest?.("a[href]");
      if (!link || !root.contains(link)) return;
      const href = (link as HTMLAnchorElement).href;
      if (!href || href.startsWith("javascript:")) return;
      const results = root.querySelectorAll("a[href]");
      let rank = 0;
      results.forEach((node, i) => {
        if (node === link) rank = i;
      });
      trackDocsSearchResultClicked({ destination: href, rank });
    };

    root.addEventListener("click", onClick, true);
    return () => root.removeEventListener("click", onClick, true);
  }, [open, ready]);

  if (typeof document === "undefined") return null;

  return createPortal(
    open ? (
      <div
        className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[12vh] backdrop-blur-[1px]"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogId}
          className="w-full max-w-xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg"
          style={{ maxHeight: "min(70vh, 520px)" }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-4 py-3">
            <h2 id={dialogId} className="text-sm font-semibold text-[var(--color-ink)]">
              Search documentation
            </h2>
            <button
              type="button"
              className="rounded border border-[var(--color-border)] px-2 py-1 font-mono text-xs text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-alt)]"
              onClick={close}
            >
              Esc
            </button>
          </div>
          <div className="max-h-[min(60vh,480px)] overflow-y-auto px-3 py-3">
            {initError ? (
              <p className="text-sm text-[var(--color-ink-muted)]" role="status">
                {initError}
              </p>
            ) : null}
            <div
              ref={containerRef}
              className="docs-pagefind-modal-root min-h-[120px] w-full"
              data-pagefind-ignore="true"
            />
          </div>
          <p className="border-t border-[var(--color-border)] px-4 py-2 font-mono text-[10px] uppercase tracking-wide text-[var(--color-ink-muted)]">
            {inDocs ? (
              <>
                <kbd className="rounded border border-[var(--color-border)] px-1">⌘</kbd>
                <kbd className="rounded border border-[var(--color-border)] px-1">K</kbd>
                <span className="ml-2">Toggle · Indexed /docs only</span>
              </>
            ) : null}
          </p>
        </div>
      </div>
    ) : null,
    document.body,
  );
}
