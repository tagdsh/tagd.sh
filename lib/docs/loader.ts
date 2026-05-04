import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { docsContentRoot, isPublicDocPath } from "./paths";
import { parseAndValidateMdx } from "./parse-matter";
import type { DirectoryMeta } from "./schema";
import { directoryMetaSchema } from "./schema";
import type { LoadedDoc } from "./types";
import { getTocFromSource } from "./toc";
import { sortLoadedDocsByReaderOrder } from "./reader-order";

function includeDraftDocs(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.INCLUDE_DRAFT_DOCS === "true";
}

function toTitle(segment: string): string {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function shouldIncludeLoaded(frontmatter: { draft?: boolean }): boolean {
  if (!frontmatter.draft) return true;
  return includeDraftDocs();
}

async function readDirectoryMeta(dirAbs: string): Promise<DirectoryMeta | null> {
  try {
    const raw = await fs.readFile(path.join(dirAbs, "_meta.json"), "utf8");
    return directoryMetaSchema.parse(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

type DirChild = { kind: "index" } | { kind: "file"; base: string } | { kind: "dir"; name: string };

function metaOrderKey(ch: DirChild): string {
  if (ch.kind === "index") return "index";
  if (ch.kind === "file") return ch.base;
  return ch.name;
}

function sortDirChildren(children: DirChild[], meta: DirectoryMeta | null): DirChild[] {
  const order = meta?.order ?? [];
  return [...children].sort((a, b) => {
    const ka = metaOrderKey(a);
    const kb = metaOrderKey(b);
    const ia = order.indexOf(ka);
    const ib = order.indexOf(kb);
    const ra = ia === -1 ? Number.MAX_SAFE_INTEGER : ia;
    const rb = ib === -1 ? Number.MAX_SAFE_INTEGER : ib;
    if (ra !== rb) return ra - rb;
    return ka.localeCompare(kb);
  });
}

async function buildDocFromFile(slugPath: string, fileRel: string): Promise<LoadedDoc | null> {
  const absolutePath = path.join(docsContentRoot, fileRel);
  let raw: string;
  try {
    raw = await fs.readFile(absolutePath, "utf8");
  } catch {
    return null;
  }
  const label = path.join("content", "docs", fileRel);
  const { frontmatter, content } = parseAndValidateMdx(raw, label);
  if (!shouldIncludeLoaded(frontmatter)) return null;

  const slug = slugPath === "" ? [] : slugPath.split("/").filter(Boolean);
  const sectionLabel = frontmatter.section ?? toTitle(slug[0] ?? "Docs");

  return {
    slug,
    slugPath: slugPath === "" ? "" : slugPath,
    filePath: fileRel.replace(/\\/g, "/"),
    sectionLabel,
    title: frontmatter.title,
    description: frontmatter.description,
    frontmatter,
    source: content,
    headings: getTocFromSource(content),
    readingTimeText: readingTime(content).text,
  };
}

async function collectDocsInNavOrder(): Promise<LoadedDoc[]> {
  const out: LoadedDoc[] = [];

  async function visitDirectory(relDir: string): Promise<void> {
    if (relDir && !isPublicDocPath(relDir)) return;

    const dirAbs = path.join(docsContentRoot, relDir);
    let entries;
    try {
      entries = await fs.readdir(dirAbs, { withFileTypes: true });
    } catch {
      return;
    }

    const meta = await readDirectoryMeta(dirAbs);
    const children: DirChild[] = [];

    if (entries.some((e) => e.isFile() && e.name === "index.mdx") && (relDir === "" || isPublicDocPath(relDir))) {
      children.push({ kind: "index" });
    }

    for (const e of entries) {
      if (e.name === "_meta.json") continue;
      if (e.isFile() && e.name.endsWith(".mdx") && e.name !== "index.mdx") {
        const base = e.name.replace(/\.mdx$/, "");
        const sp = relDir ? `${relDir}/${base}` : base;
        if (!isPublicDocPath(sp)) continue;
        children.push({ kind: "file", base });
      } else if (e.isDirectory()) {
        const cr = relDir ? `${relDir}/${e.name}` : e.name;
        if (!isPublicDocPath(cr)) continue;
        children.push({ kind: "dir", name: e.name });
      }
    }

    for (const ch of sortDirChildren(children, meta)) {
      if (ch.kind === "index") {
        const sp = relDir;
        const fr = relDir ? `${relDir}/index.mdx` : "index.mdx";
        const doc = await buildDocFromFile(sp, fr);
        if (doc) out.push(doc);
      } else if (ch.kind === "file") {
        const sp = relDir ? `${relDir}/${ch.base}` : ch.base;
        const doc = await buildDocFromFile(sp, `${sp}.mdx`);
        if (doc) out.push(doc);
      } else {
        await visitDirectory(relDir ? `${relDir}/${ch.name}` : ch.name);
      }
    }
  }

  await visitDirectory("");
  return out;
}

export const getAllDocs = cache(async (): Promise<LoadedDoc[]> => {
  return sortLoadedDocsByReaderOrder(await collectDocsInNavOrder());
});

export const getAllDocSlugs = cache(async (): Promise<string[]> => {
  const docs = await getAllDocs();
  return docs.map((d) => d.slugPath).filter(Boolean);
});

function slugCandidates(slug: string[]): { fileRel: string }[] {
  if (slug.length === 0) return [];
  const slugPath = slug.join("/");
  return [{ fileRel: `${slugPath}.mdx` }, { fileRel: `${slugPath}/index.mdx` }];
}

export const getDocBySlug = cache(async (slug: string[]): Promise<LoadedDoc> => {
  const slugPath = slug.join("/");
  if (!isPublicDocPath(slugPath)) notFound();
  for (const { fileRel } of slugCandidates(slug)) {
    const doc = await buildDocFromFile(slugPath, fileRel);
    if (doc) return doc;
  }
  notFound();
});

export type NavPrevNext = {
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
};

export const getPrevNext = cache(async (slug: string[]): Promise<NavPrevNext> => {
  const slugPath = slug.join("/");
  const flat = await getAllDocs();
  const hrefs = flat.map((d) => ({
    slugPath: d.slugPath,
    title: d.frontmatter.sidebar_label ?? d.title,
    href: `/docs/${d.slugPath}`,
  }));
  const idx = hrefs.findIndex((h) => h.slugPath === slugPath);
  if (idx === -1) return { prev: null, next: null };
  const prev = idx > 0 ? { title: hrefs[idx - 1]!.title, href: hrefs[idx - 1]!.href } : null;
  const next =
    idx < hrefs.length - 1 ? { title: hrefs[idx + 1]!.title, href: hrefs[idx + 1]!.href } : null;
  return { prev, next };
});
