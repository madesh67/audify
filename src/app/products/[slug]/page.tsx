import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ProductDetailView from "@/components/pdp/ProductDetailView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Instrument Not Found — Audify",
    };
  }

  return {
    title: `${product.name} — ${product.tagline} | Audify`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Audify Acoustic Laboratories`,
      description: product.description,
      images: [
        {
          url: product.variants[0]?.image || "/images/headset.png",
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, 3);

  return (
    <main className="relative w-full min-h-screen bg-[#FEFEFE] text-neutral-950">
      <Navbar />
      <ProductDetailView product={product} relatedProducts={related} />
      <Footer showCta={false} />
    </main>
  );
}
