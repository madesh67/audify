"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Undo2,
} from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";
import ProductCard from "@/components/products/ProductCard";
import ProductQuickView from "@/components/products/ProductQuickView";
import { useCart } from "@/context/CartContext";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  // Active variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      name: "Standard",
      colorKey: "standard",
      hex: "#161618",
      image: "/images/headset.png",
      finishDescription: "Precision acoustic finish",
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [quickViewTarget, setQuickViewTarget] = useState<{ product: Product; variant?: ProductVariant } | null>(null);

  // Global Cart State from Context
  const { addToCart, setIsDrawerOpen: setIsCartOpen } = useCart();

  // Scroll listener for sticky quick-buy dock on tablet/mobile
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVariantChange = (variant: ProductVariant) => {
    soundEngine.playClick(900);
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    soundEngine.playChime();
    setIsAdded(true);
    addToCart(product, selectedVariant, quantity);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 400);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-24 sm:pt-28 md:pt-32 pb-24 select-none">
      {/* Container aligned strictly with homepage standard: max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Top Navigation: Products Button & Breadcrumbs */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/70">
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              onClick={() => soundEngine.playClick(700)}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.97] text-neutral-900 hover:text-neutral-950 text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              aria-label="Back to all products"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span>Products</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>/</span>
              <span className="capitalize">{product.category}</span>
              <span>/</span>
              <span className="text-neutral-950 font-medium truncate max-w-[200px] md:max-w-[260px]">
                {product.name}
              </span>
            </div>
          </div>

          {/* In Stock & Dispatch Guarantee */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[11px] font-mono text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">{product.leadTime || "In Stock • Ships in 24h"}</span>
          </div>
        </div>

        {/* Product Details & Subsequent Sections */}
        <div className="mt-6 sm:mt-8 space-y-16 sm:space-y-20 lg:space-y-24">
          {/* STAGE 1: Editorial Hero (Hardware Showcase Left, Buy Box Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (md:col-span-6 lg:col-span-7): Hardware Showcase */}
            <div className="md:col-span-6 lg:col-span-7 w-full space-y-4">
              {/* Double-Bezel Hardware Container */}
              <div className="relative rounded-[2rem] p-1.5 bg-neutral-100/70 border border-neutral-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
                {/* Inner Concentric Core */}
                <div className="relative aspect-[4/3] sm:aspect-[4/3.2] w-full rounded-[calc(2rem-0.375rem)] bg-white border border-neutral-100 flex items-center justify-center p-6 sm:p-8 overflow-hidden">
                  {/* Subtle inner radial depth responding to active variant finish */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000 blur-3xl"
                    style={{
                      background: `radial-gradient(circle at center, ${selectedVariant.hex || "#161618"} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Cross-Fading Headset Colorway Images */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {product.variants.map((v) => {
                      const isSelected = v.colorKey === selectedVariant.colorKey;
                      return (
                        <div
                          key={v.colorKey}
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                            isSelected
                              ? "opacity-100 scale-100 blur-0 pointer-events-auto z-10"
                              : "opacity-0 scale-95 blur-sm pointer-events-none z-0"
                          }`}
                        >
                          <Image
                            src={v.image}
                            alt={`${product.name} - ${v.name}`}
                            fill
                            unoptimized
                            priority={isSelected}
                            className="object-contain p-2"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Key Highlights 2x2 Grid under Hardware Showcase */}
              {product.keyHighlights && product.keyHighlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {product.keyHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-neutral-50/80 border border-neutral-100 flex items-start gap-2 text-xs text-neutral-700"
                    >
                      <Check className="w-3.5 h-3.5 text-neutral-950 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span className="font-medium leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column (md:col-span-6 lg:col-span-5): Buy Box */}
            <div className="md:col-span-6 lg:col-span-5 space-y-5 w-full">
              {/* Badge & Series & Rating Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-mono uppercase tracking-widest font-semibold text-neutral-700">
                  {product.badge || "Flagship"}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs font-mono text-neutral-500">{product.series}</span>
                <span className="text-neutral-300">•</span>
                <div className="flex items-center gap-1 text-xs font-mono text-neutral-700">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewCount})</span>
                </div>
              </div>

              {/* Product Title & Tagline */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
                  {product.name}
                </h1>
                {product.tagline && (
                  <p className="text-xs sm:text-sm font-mono text-neutral-500 mt-1">
                    {product.tagline}
                  </p>
                )}
              </div>

              {/* Clean Price Area */}
              <div className="flex items-baseline gap-2 pt-0.5 pb-0.5">
                <span className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  USD
                </span>
              </div>

              {/* Product Overview / Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Headset Color Preview Box Selector */}
              {product.variants.length > 1 && (
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-wider text-neutral-400 text-[11px]">
                      Finish: <span className="font-semibold text-neutral-950 normal-case">{selectedVariant.name}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {product.variants.map((v) => {
                      const isSelected = v.colorKey === selectedVariant.colorKey;
                      return (
                        <button
                          key={v.colorKey}
                          type="button"
                          onClick={() => handleVariantChange(v)}
                          className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-2 border transition-all duration-200 cursor-pointer overflow-hidden ${
                            isSelected
                              ? "border-neutral-950 bg-white shadow-xs ring-2 ring-neutral-950 ring-offset-1"
                              : "border-neutral-200 bg-neutral-50/80 hover:border-neutral-400 hover:bg-white opacity-70 hover:opacity-100"
                          }`}
                          aria-label={`Select ${v.name}`}
                          title={v.name}
                        >
                          <Image
                            src={v.image}
                            alt={v.name}
                            fill
                            unoptimized
                            className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {selectedVariant.finishDescription && (
                    <p className="text-[11px] font-mono text-neutral-500 leading-relaxed pt-0.5">
                      {selectedVariant.finishDescription}
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Selector & Add to Cart Button */}
              <div className="space-y-4 pt-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50/80 p-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick(500);
                        setQuantity(Math.max(1, quantity - 1));
                      }}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-white hover:text-neutral-950 transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-semibold text-neutral-950">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick(600);
                        setQuantity(Math.min(10, quantity + 1));
                      }}
                      disabled={quantity >= 10}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-white hover:text-neutral-950 transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Primary Add to Cart Action */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[46px] rounded-full font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-sm cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ${
                      isAdded
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                        : "bg-neutral-950 hover:bg-neutral-800 text-white"
                    }`}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span className="whitespace-nowrap">Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 stroke-[2]" />
                        <span className="whitespace-nowrap">Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Assurance Ribbon in 3-Column Grid for Tablet Symmetry */}
                <div className="pt-3 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-neutral-500">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="whitespace-nowrap">Free 2-Day Air</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="whitespace-nowrap">3-Year Warranty</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
                    <Undo2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="whitespace-nowrap">30-Day Trial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STAGE 2: Technical Specifications Sheet (2-Column Grid on Tablet) */}
          {product.specs && product.specs.length > 0 && (
            <div className="space-y-5 pt-6 border-t border-neutral-200/70">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                  Technical Specifications
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-mono">
                  Detailed acoustic architecture and hardware parameters
                </p>
              </div>

              {/* 2-Column Responsive Grid on Tablet and Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {product.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-neutral-50/70 border border-neutral-200/70 flex items-start justify-between gap-3 hover:bg-neutral-50 transition-colors"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 shrink-0 mt-0.5">
                      {item.label}
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-medium text-neutral-950 text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 3: Included in the Box */}
          {product.boxContents && product.boxContents.length > 0 && (
            <div className="space-y-5 pt-6 border-t border-neutral-200/70">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                  What's in the Box
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-mono">
                  Complete packaging and certified accessories
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {product.boxContents.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 flex items-center gap-3.5 text-xs text-neutral-800"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shrink-0 shadow-2xs">
                      <Package className="w-4 h-4 text-neutral-700" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 4: Delivery & Warranty Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-6 border-t border-neutral-200/70">
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-neutral-200/80 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-950">Free Expedited Shipping</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Complimentary 2-day air delivery with real-time tracking on every domestic and international order.
              </p>
            </div>

            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-neutral-200/80 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-950">3-Year Factory Warranty</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Comprehensive hardware warranty and driver support directly handled by our engineering team.
              </p>
            </div>

            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-neutral-200/80 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950">
                <Undo2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-950">30-Day In-Home Trial</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Audition the instruments on your own source gear. Zero hassle returns with prepaid return shipping.
              </p>
            </div>
          </div>

          {/* STAGE 5: Related Instruments (Responsive: 1 col on mobile, 2 cols on tablet, 3 on desktop) */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-neutral-200/70">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                    Related Instruments
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 font-mono">
                    Complementary hardware and acoustic accessories
                  </p>
                </div>
                <Link
                  href="/products"
                  className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-500 flex items-center gap-1 transition-colors"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 2 columns on tablet md:, 3 columns on desktop lg: */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                {relatedProducts.map((rel) => (
                  <ProductCard
                    key={rel.id}
                    product={rel}
                    onAddToCart={(p, v) => {
                      soundEngine.playChime();
                      addToCart(p, v, 1);
                      setIsCartOpen(true);
                    }}
                    onQuickView={(p, v) => setQuickViewTarget({ product: p, variant: v })}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Sticky Quick-Buy Bar on Scroll for Tablet & Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-auto md:right-8 md:w-[380px] z-40 bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-2xl rounded-2xl p-3 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200/70 shrink-0 overflow-hidden flex items-center justify-center">
              <Image
                src={selectedVariant.image}
                alt={product.name}
                fill
                unoptimized
                className="object-contain p-1"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-neutral-950 truncate">
                {product.name}
              </h4>
              <div className="flex items-baseline gap-1 text-[11px] font-mono text-neutral-500">
                <span className="font-semibold text-neutral-950">${product.price}</span>
                <span>USD</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[38px] rounded-full font-semibold text-xs tracking-tight transition-all duration-200 shadow-xs cursor-pointer active:scale-95 shrink-0 ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-neutral-950 text-white hover:bg-neutral-800"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Quick View Modal for Related Products */}
      {quickViewTarget && (
        <ProductQuickView
          product={quickViewTarget.product}
          initialVariant={quickViewTarget.variant}
          isOpen={!!quickViewTarget}
          onClose={() => setQuickViewTarget(null)}
          onAddToCart={(p, v) => {
            addToCart(p, v, 1);
            setIsCartOpen(true);
            setQuickViewTarget(null);
          }}
        />
      )}
    </div>
  );
}
