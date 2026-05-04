"use client";

import { trackDocsEditClicked } from "@/lib/analytics/events";

function editUrl(filePath: string): string {
  const org = process.env.NEXT_PUBLIC_DOCS_GIT_ORG ?? "tagdsh";
  const repo = process.env.NEXT_PUBLIC_DOCS_GIT_REPO ?? "tagd.sh";
  const branch = process.env.NEXT_PUBLIC_DOCS_GIT_BRANCH ?? "main";
  const root = `https://github.com/${org}/${repo}/edit/${branch}/content/docs`;
  return `${root}/${filePath.replace(/^\/+/, "")}`;
}

export function EditOnGitHub({ filePath }: { filePath: string }) {
  const href = editUrl(filePath);
  return (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="mono shrink-0 text-xs underline-offset-2 hover:underline"
      style={{ color: "var(--muted, #64748b)" }}
      onClick={() =>
        trackDocsEditClicked({
          filePath: `content/docs/${filePath.replace(/^\/+/, "")}`,
          destination: href,
        })
      }
    >
      Edit this page
    </a>
  );
}
