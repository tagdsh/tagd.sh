import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllDocSlugs, getDoc } from "@/lib/docs";
import { MDXComponents } from "@/components/docs/MDXComponents";

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDoc(slug);
  if (!doc) {
    return { title: "Not found" };
  }

  return {
    title: doc.title,
    description: doc.description,
    robots: { index: false, follow: false },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = await getDoc(slug);

  if (!doc) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.description,
    url: `https://tagd.sh/docs/${doc.slug}`,
  };

  return (
    <>
      <Script
        id={`doc-jsonld-${doc.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <h1>{doc.title}</h1>
      <p className="lead">{doc.description}</p>
      <MDXRemote source={doc.content} components={MDXComponents} />
    </>
  );
}
