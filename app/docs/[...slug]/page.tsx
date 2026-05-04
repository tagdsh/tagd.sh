import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DocsPageView } from "@/components/docs/DocsPageView";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { DocsShell } from "@/components/docs/DocsShell";
import { mdxComponents } from "@/components/docs/MDXComponents";
import { getAllDocSlugs, getDocBySlug, getPrevNext } from "@/lib/docs";

const SITE = "https://tagd.sh";

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((s) => ({ slug: s.split("/").filter(Boolean) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let doc;
  try {
    doc = await getDocBySlug(slug);
  } catch {
    return { title: "Not found" };
  }
  const canonical = doc.frontmatter.canonical ?? `${SITE}/docs/${doc.slugPath}`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical },
    robots: { index: false, follow: false },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: `${SITE}/docs/${doc.slugPath}`,
    },
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  let doc;
  try {
    doc = await getDocBySlug(slug);
  } catch {
    notFound();
  }

  const { prev, next } = await getPrevNext(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.description,
    url: `https://tagd.sh/docs/${doc.slugPath}`,
  };

  return (
    <>
      <Script
        id={`doc-jsonld-${doc.slugPath}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <DocsShell
        sectionLabel={doc.sectionLabel}
        title={doc.title}
        description={doc.description}
        readingTimeText={doc.readingTimeText}
        headings={doc.headings}
        filePath={doc.filePath}
      >
        <DocsPageView slugPath={doc.slugPath} title={doc.title} />
        <MDXRemote source={doc.source} components={mdxComponents} />
        <DocsPrevNext prev={prev} next={next} />
      </DocsShell>
    </>
  );
}
