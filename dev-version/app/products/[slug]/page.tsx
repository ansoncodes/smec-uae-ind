import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import Stats from "@/components/Stats";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductDetail from "@/components/ProductDetail";
import Reveal from "@/components/ui/Reveal";
import { productBySlug, products } from "@/lib/siteData";

type Params = { params: Promise<{ slug: string }> };

/** All eight products are known at build time, so every page is prerendered. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.title} — SMEC Oil & Gas`,
    description: product.text,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Header />
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/#products" },
          { label: product.title },
        ]}
      />
      <main>
        <ProductDetail product={product} />
        <Reveal>
          <Stats />
        </Reveal>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
