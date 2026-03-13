import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllPosts, getPost } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

const portableTextComponents: PortableTextComponents = {
  types: {
    code: ({ value }) => {
      const code = typeof value?.code === "string" ? value.code : "";
      const language = typeof value?.language === "string" ? value.language : "code";
      return (
        <CodeBlock>
          <code data-lang={language}>{code}</code>
        </CodeBlock>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href ?? "#"} target="_blank" rel="noopener noreferrer" className="text-link">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
    code: ({ children }) => (
      <code
        style={{
          fontFamily: "var(--font-mono)",
          background: "var(--color-surface-alt)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-sm)",
          padding: "0.1rem 0.3rem",
        }}
      >
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: "var(--text-xl)",
          marginTop: "var(--space-8)",
          marginBottom: "var(--space-3)",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "0.2rem",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: "var(--text-lg)", marginTop: "var(--space-6)", marginBottom: "var(--space-2)" }}>
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p style={{ marginBottom: "var(--space-4)", lineHeight: 1.75, color: "var(--color-ink-secondary)" }}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "3px solid #D97706",
          paddingLeft: "var(--space-4)",
          color: "var(--color-ink-tertiary)",
          fontStyle: "italic",
          margin: "var(--space-6) 0",
        }}
      >
        {children}
      </blockquote>
    ),
  },
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found — Signal Tags Blog",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    robots: { index: false, follow: false },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="section">
      <article className="content-grid" style={{ maxWidth: "820px", margin: "0 auto" }}>
        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {post.tags.map((tag) => (
              <span
                key={`${post._id}-${tag}`}
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

        <h1 style={{ fontSize: "var(--text-3xl)", maxWidth: "720px" }}>{post.title}</h1>
        <p className="lead" style={{ marginBottom: "var(--space-2)" }}>
          By {post.author} · {formatDate(post.publishedAt)}
        </p>

        {post.coverImage?.asset?.url ? (
          <div className="relative w-full overflow-hidden rounded-lg" style={{ height: "min(400px, 48vw)" }}>
            <Image
              src={post.coverImage.asset.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        ) : null}

        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        <footer
          style={{
            maxWidth: "720px",
            margin: "var(--space-6) auto 0",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {post.tags.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "var(--space-4)" }}>
              {post.tags.map((tag) => (
                <span
                  key={`footer-${post._id}-${tag}`}
                  className="rounded-full px-2 py-1 font-mono text-xs"
                  style={{ border: "1px solid var(--color-border)", color: "var(--color-ink-tertiary)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <Link href="/blog" className="text-link">
            ← Back to Blog
          </Link>

          <div style={{ marginTop: "var(--space-6)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--color-border)" }}>
            <p style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>Built with Signal Tags</p>
            <p>
              Building product authentication or traceability workflows?{" "}
              <Link href="/docs/getting-started/quick-start" className="text-link">
                View the docs →
              </Link>{" "}
              or{" "}
              <a href="https://github.com/tagdsh/tagd" target="_blank" rel="noopener noreferrer" className="text-link">
                star on GitHub →
              </a>
            </p>
          </div>
        </footer>
      </article>
    </main>
  );
}
