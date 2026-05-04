import matter from "gray-matter";
import { docFrontmatterSchema } from "./schema";
import type { DocFrontmatter } from "./schema";

export type ParsedMdxFile = {
  frontmatter: DocFrontmatter;
  content: string;
};

export function parseAndValidateMdx(source: string, fileLabel: string): ParsedMdxFile {
  const fm = matter(source);
  const parsed = docFrontmatterSchema.safeParse(fm.data);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`[docs] Invalid frontmatter in ${fileLabel}: ${msg}`);
  }
  return { frontmatter: parsed.data, content: fm.content };
}
