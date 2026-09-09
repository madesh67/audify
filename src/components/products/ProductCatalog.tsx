"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, Product, ProductVariant } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import ProductFilterBar from "@/components/products/ProductFilterBar";
import { soundEngine } from "@/utils/sound";
import { useCart } from "@/context/CartContext";

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

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
    <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-24 sm:pt-28 md:pt-32 pb-24">
      {/* Main Container snapped to strict design system guide rails: max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Page Hero Header */}
        <div className="pb-8 sm:pb-10 border-b border-neutral-200/70">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] uppercase text-neutral-950">
            All Products
          </h1>
        </div>

        {/* Filter Bar Controls */}
        <div className="pt-8 sm:pt-10">
          <ProductFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Product Grid */}
        <div className="pt-10 sm:pt-12">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-neutral-50 border border-neutral-200/80 p-8 space-y-4">
              <div className="text-base font-semibold text-neutral-900">
                No instruments match your criteria
              </div>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try adjusting your search query or reset the category filter to view all available instruments.
              </p>
              <button
                onClick={() => {
                  soundEngine.playClick(600);
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
