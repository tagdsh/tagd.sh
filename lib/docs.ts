import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DOCS_ROOT = path.join(process.cwd(), "content", "docs");

type Frontmatter = {
  title?: string;
  description?: string;
  section?: string;
};

export type DocSummary = {
  slug: string;
  title: string;
  description: string;
  section: string;
};

export type DocPage = DocSummary & {
  content: string;
};

function walkFiles(dir: string, bucket: string[] = []) {
  if (!fs.existsSync(dir)) return bucket;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, bucket);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      bucket.push(fullPath);
    }
  }

  return bucket;
}

function toSlug(filePath: string): string {
  return path.relative(DOCS_ROOT, filePath).replace(/\\/g, "/").replace(/\.mdx$/, "");
}

function fromFile(filePath: string): DocPage {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);
  const data = parsed.data as Frontmatter;

  return {
    slug: toSlug(filePath),
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    section: data.section ?? "General",
    content: parsed.content,
  };
}

export function getAllDocs(): DocSummary[] {
  const files = walkFiles(DOCS_ROOT);
  return files
    .map(fromFile)
    .map((doc) => ({
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      section: doc.section,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getAllDocSlugs(): string[] {
  return getAllDocs().map((doc) => doc.slug);
}

export async function getDoc(slugParts: string[]): Promise<DocPage | null> {
  const slug = slugParts.join("/");
  const filePath = path.join(DOCS_ROOT, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fromFile(filePath);
}
