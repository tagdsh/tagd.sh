import type { PortableTextBlock } from "@portabletext/types";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity";

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  author: string;
  excerpt: string;
  coverImage?: { asset: { url: string } };
  body: PortableTextBlock[];
  tags: string[];
};

export type BlogPostCard = Omit<BlogPost, "body">;

const allPostsQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id, title, slug, publishedAt, author, excerpt,
    coverImage { asset -> { url } }, tags
  }
`;

const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, author, excerpt,
    coverImage { asset -> { url } }, body, tags
  }
`;

const recentPostsQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...$limit] {
    _id, title, slug, publishedAt, author, excerpt,
    coverImage { asset -> { url } }, tags
  }
`;

function normalizeCard(post: Partial<BlogPostCard>): BlogPostCard | null {
  if (!post._id || !post.title || !post.slug?.current || !post.publishedAt) {
    return null;
  }

  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    publishedAt: post.publishedAt,
    author: post.author ?? "Loop Engine Team",
    excerpt: post.excerpt ?? "",
    coverImage: post.coverImage,
    tags: Array.isArray(post.tags) ? post.tags : [],
  };
}

export async function getAllPosts(): Promise<BlogPostCard[]> {
  if (!isSanityConfigured) {
    return [];
  }

  const client = getSanityClient();
  if (!client) {
    return [];
  }

  const rows = await client.fetch<Partial<BlogPostCard>[]>(allPostsQuery);
  return rows.map(normalizeCard).filter((row): row is BlogPostCard => Boolean(row));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) {
    return null;
  }

  const client = getSanityClient();
  if (!client) {
    return null;
  }

  const post = await client.fetch<Partial<BlogPost>>(postBySlugQuery, { slug });
  if (!post?._id || !post.title || !post.slug?.current || !post.publishedAt) {
    return null;
  }

  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    publishedAt: post.publishedAt,
    author: post.author ?? "Loop Engine Team",
    excerpt: post.excerpt ?? "",
    coverImage: post.coverImage,
    body: (Array.isArray(post.body) ? post.body : []) as PortableTextBlock[],
    tags: Array.isArray(post.tags) ? post.tags : [],
  };
}

export async function getRecentPosts(n: number): Promise<BlogPostCard[]> {
  if (!isSanityConfigured || n <= 0) {
    return [];
  }

  const client = getSanityClient();
  if (!client) {
    return [];
  }

  const rows = await client.fetch<Partial<BlogPostCard>[]>(recentPostsQuery, {
    limit: n,
  });

  return rows.map(normalizeCard).filter((row): row is BlogPostCard => Boolean(row));
}
