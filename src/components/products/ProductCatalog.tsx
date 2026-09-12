"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import ProductFilterBar from "@/components/products/ProductFilterBar";
import { soundEngine } from "@/utils/sound";
import { useCart } from "@/context/CartContext";

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (
      categoryParam &&
      ["headsets", "earphones", "speakers", "all"].includes(categoryParam)
    ) {
      return categoryParam;
    }
    return "all";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  // Keep state synchronized with URL query params (e.g. from navbar/sidebar clicks)
  useEffect(() => {
    if (
      categoryParam &&
      ["headsets", "earphones", "speakers", "all"].includes(categoryParam)
    ) {
      setSelectedCategory(categoryParam);
    } else if (!categoryParam) {
      setSelectedCategory("all");
    }
  }, [categoryParam]);

  // Global Cart State
  const {
    items: cartItems,
    totalCount: totalCartCount,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart,
    isDrawerOpen: isCartOpen,
    setIsDrawerOpen: setIsCartOpen,
  } = useCart();

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (typeof window !== "undefined") {
      const url = cat === "all" ? "/products" : `/products?category=${cat}`;
      window.history.replaceState(null, "", url);
    }
  };

  // Dynamic header metadata reflecting current selected category
  const categoryMeta = useMemo(() => {
    switch (selectedCategory) {
      case "headsets":
        return {
          badge: "COLLECTION // OVER-EAR REFERENCE",
          title: "Headset",
          desc: "Flagship over-ear wireless and planar magnetic reference monitoring headsets engineered with cryogenic Grade-5 titanium.",
        };
      case "earphones":
        return {
          badge: "COLLECTION // IN-EAR MONITORS",
          title: "Earphones",
          desc: "Precision in-ear acoustic monitors crafted from acoustic brass, dual dynamic drivers, and high-purity silver-plated balanced copper.",
        };
      case "speakers":
        return {
          badge: "COLLECTION // PORTABLE ACOUSTICS",
          title: "Speakers",
          desc: "High-output spatial audio systems engineered with twin passive radiators, omnidirectional drivers, and lossless wireless transmission.",
        };
      default:
        return {
          badge: "REFERENCE CATALOG",
          title: "All Products",
          desc: "Explore reference over-ear headphones, planar magnetic monitors, and precision acoustic instruments.",
        };
    }
  }, [selectedCategory]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.keyHighlights.some((h) => h.toLowerCase().includes(q)) ||
        product.specs.some(
          (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        );

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-20 sm:pt-28 md:pt-32 pb-24">
      {/* Main Container snapped to strict design system guide rails */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Page Hero Header */}
        <div className="pb-6 sm:pb-8 md:pb-10 border-b border-neutral-200/70">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 mb-2 sm:mb-3">
            <span>{categoryMeta.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] uppercase text-neutral-950">
            {categoryMeta.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-1 sm:mt-2 max-w-md">
            {categoryMeta.desc}
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="pt-6 sm:pt-10">
          <ProductFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Product Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="pt-8 sm:pt-12">
          {filteredProducts.length === 0 ? (
            <div className="py-16 sm:py-20 text-center rounded-3xl bg-neutral-50 border border-neutral-200/80 p-6 sm:p-8 space-y-4">
              <div className="text-sm sm:text-base font-semibold text-neutral-900">
                No instruments match your criteria
              </div>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try adjusting your search query or reset the category filter to view all available instruments.
              </p>
              <button
                onClick={() => {
                  soundEngine.playClick(600);
                  handleSelectCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
