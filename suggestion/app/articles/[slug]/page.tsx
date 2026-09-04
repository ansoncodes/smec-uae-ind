import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ArticleDetail from "@/components/ArticleDetail";
import { articleBySlug, articles } from "@/lib/siteData";
import { articleBody } from "@/lib/articles";

type Params = { params: Promise<{ slug: string }> };

/** Every article is known at build time, so each page is prerendered. */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — SMEC Oil & Gas`,
    description: articleBody(slug)?.standfirst ?? article.text,
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Header />
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/#articles" },
          { label: article.title },
        ]}
      />
      <main>
        <ArticleDetail article={article} />
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
