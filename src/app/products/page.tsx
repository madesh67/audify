import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductCatalog from "@/components/products/ProductCatalog";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Acoustic Instruments & Products — Audify",
  description:
    "Explore Audify's complete lineup of flagship over-ear headphones, planar magnetic studio reference monitors, cryogenic balanced DAC amplifiers, and bespoke acoustic accessories.",
};

export default function ProductsPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#FEFEFE] text-neutral-950">
      {/* Floating Top Navigation */}
      <Navbar />

      {/* Main Products Collection wrapped in Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-20 sm:pt-28 md:pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 animate-pulse space-y-6">
              <div className="h-6 w-32 bg-neutral-200 rounded-full" />
              <div className="h-12 w-64 bg-neutral-200 rounded-xl" />
              <div className="h-4 w-96 max-w-full bg-neutral-100 rounded" />
              <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 bg-neutral-100 rounded-3xl" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ProductCatalog />
      </Suspense>

      {/* Standardized Footer without repeating the giant hero CTA */}
      <Footer showCta={false} />
    </main>
  );
}
