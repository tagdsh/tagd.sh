import type { DocFrontmatter } from "./schema";

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type LoadedDoc = {
  slug: string[];
  slugPath: string;
  filePath: string;
  sectionLabel: string;
  title: string;
  description: string;
  frontmatter: DocFrontmatter;
  source: string;
  headings: TocHeading[];
  readingTimeText: string;
};

export type DocNavItem = {
  title: string;
  href: string;
};

export type DocNavSection = {
  label: string;
  items: DocNavItem[];
};

export type FullDoc = {
  slug: string;
  frontmatter: DocFrontmatter;
  content: string;
};
