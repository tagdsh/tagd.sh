/** Dispatched to open the docs Pagefind modal (tagd.sh). */
export const DOCS_SEARCH_OPEN_EVENT = "tagd:docs-search-open" as const;

export type DocsSearchOpenSource = "keyboard" | "sidebar" | "header";

export type DocsSearchOpenDetail = {
  source: DocsSearchOpenSource;
};
