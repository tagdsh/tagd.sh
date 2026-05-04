import { z } from "zod";

export const docFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  section: z.string().optional(),
  sidebar_label: z.string().optional(),
  sidebar_group: z.string().optional(),
  order: z.number().optional(),
  draft: z.boolean().optional(),
  canonical: z.string().optional(),
});

export type DocFrontmatter = z.infer<typeof docFrontmatterSchema>;

export const directoryMetaSchema = z.object({
  title: z.string().optional(),
  order: z.array(z.string()).optional(),
  defaultOpen: z.boolean().optional(),
});

export type DirectoryMeta = z.infer<typeof directoryMetaSchema>;
