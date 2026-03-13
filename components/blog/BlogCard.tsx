import type { BlogPostCard } from "@/lib/blog";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = Pick<
  BlogPostCard,
  "title" | "slug" | "excerpt" | "publishedAt" | "tags" | "coverImage"
>;

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogCard({
  title,
  slug,
  excerpt,
  publishedAt,
  tags,
  coverImage,
}: BlogCardProps) {
  const shownTags = tags.slice(0, 2);

  return (
    <article className="card">
      {coverImage?.asset?.url ? (
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={coverImage.asset.url}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : null}

      {shownTags.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {shownTags.map((tag) => (
            <span
              key={`${slug.current}-${tag}`}
              className="rounded-full px-2 py-1 font-mono text-xs"
              style={{
                backgroundColor: "var(--color-primary-light)",
                color: "var(--color-primary-dark)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <h2 style={{ fontSize: "var(--text-xl)" }}>
        <Link href={`/blog/${slug.current}`} className="text-link">
          {title}
        </Link>
      </h2>

      <p
        className="mt-3"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {excerpt}
      </p>

      <p className="mt-4 text-sm" style={{ color: "var(--color-ink-muted)" }}>
        {formatDate(publishedAt)}
      </p>
    </article>
  );
}
