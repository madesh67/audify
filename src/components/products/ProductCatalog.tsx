"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, Product, ProductVariant } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import ProductFilterBar from "@/components/products/ProductFilterBar";
import ProductQuickView from "@/components/products/ProductQuickView";
import CartDrawer from "@/components/products/CartDrawer";
import { ShieldCheck, ShoppingBag, Sparkles, Truck, Undo2 } from "lucide-react";
import { soundEngine } from "@/utils/sound";
import { useCart } from "@/context/CartContext";

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  // Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewVariant, setQuickViewVariant] = useState<ProductVariant | undefined>();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

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

  // Quick View Handler
  const handleQuickView = (product: Product, variant: ProductVariant) => {
    setQuickViewProduct(product);
    setQuickViewVariant(variant);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-24 sm:pt-28 md:pt-32 pb-24">
      {/* Main Container snapped to strict design system guide rails: max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Page Hero Header */}
        <div className="space-y-6 pb-12 sm:pb-16 border-b border-neutral-200/70">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span>DIRECT ACOUSTIC REGISTRY</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] uppercase text-neutral-950 leading-[0.95]">
                PRECISION SOUND INSTRUMENTS
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Engineered from cryogenic Grade-5 titanium, planar magnetic transducers, and discrete balanced amplification for purists and studio masters.
              </p>
            </div>

            {/* Bag Button Bar */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  soundEngine.playClick(800);
                  setIsCartOpen(true);
                }}
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md cursor-pointer shrink-0"
                aria-label="Open reservation bag"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Reservation Bag</span>
                <span className="w-5 h-5 rounded-full bg-white text-neutral-950 text-[11px] font-mono flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Value Guarantee Badges Ribbon */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className="text-[11px]">Complimentary 2-Day Air</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className="text-[11px]">3-Year Global Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Undo2 className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className="text-[11px]">30-Day Studio Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className="text-[11px]">Laboratory Calibrated</span>
            </div>
          </div>
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
                className="px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer"
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
                  onQuickView={handleQuickView}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slide-Over Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        initialVariant={quickViewVariant}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart / Reservation Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={clearCart}
      />
    </div>
  );
}
