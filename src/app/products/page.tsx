import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ProductCatalog from "@/components/products/ProductCatalog";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Acoustic Instruments & Catalog — Audify",
  description:
    "Explore Audify's complete lineup of flagship over-ear headphones, planar magnetic studio reference monitors, cryogenic balanced DAC amplifiers, and bespoke acoustic accessories.",
};

export default function ProductsPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#FEFEFE] text-neutral-950">
      {/* Floating Top Navigation */}
      <Navbar />

      {/* Main Product Catalog */}
      <ProductCatalog />

      {/* Standardized Footer without repeating the giant hero CTA */}
      <Footer showCta={false} />
    </main>
  );
}
