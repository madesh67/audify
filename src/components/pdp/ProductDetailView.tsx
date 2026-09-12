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
  Truck,
  Undo2,
} from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";
import ProductCard from "@/components/products/ProductCard";
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
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Global Cart State from Context
  const { addToCart, setIsDrawerOpen: setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile sticky bar when scrolled past the primary buy action
      if (window.scrollY > 440) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
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
    <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-20 sm:pt-28 md:pt-32 pb-28 md:pb-24 select-none">
      {/* Container aligned strictly with design system: max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Navigation & Breadcrumb */}
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200/60">
          <Link
            href="/products"
            onClick={() => soundEngine.playClick(700)}
            className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200/80 active:scale-[0.97] text-neutral-900 hover:text-neutral-950 text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            aria-label="Back to products"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>All Instruments</span>
          </Link>
          <div className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider hidden xs:block">
            {product.category} • Model Ref. {product.id.slice(0, 4).toUpperCase()}
          </div>
        </div>

        {/* Product Details & Subsequent Sections */}
        <div className="mt-6 sm:mt-8 space-y-14 sm:space-y-20 md:space-y-24">
          {/* STAGE 1: Clean Editorial Hero (Showcase Media Left, Buy Box Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-start">
            {/* Left Column (md:col-span-6): Hardware Showcase */}
            <div className="md:col-span-6 max-w-xl mx-auto md:max-w-none w-full space-y-3.5 sm:space-y-5">
              {/* Double-Bezel Hardware Container */}
              <div className="relative rounded-[2rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
                {/* Inner Concentric Core */}
                <div className="relative aspect-square sm:aspect-[4/3.2] w-full rounded-[calc(2rem-0.375rem)] bg-white border border-neutral-100 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
                  {/* Subtle inner radial depth responding to active variant finish */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000 blur-3xl"
                    style={{
                      background: `radial-gradient(circle at center, ${selectedVariant.hex || "#161618"} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Cross-Fading Headset Colorway Images with smooth zoom/blur transition */}
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
                            className="object-contain p-2 sm:p-3"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Below Product Showcase Area: Color Variant & Free 2-Day Air */}
              <div className="space-y-2.5 pt-0.5">
                {/* Headset Color Preview Box Selector */}
                {product.variants.length > 1 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono">
                        <span className="uppercase tracking-wider text-neutral-400">Finish:</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shrink-0 shadow-2xs"
                          style={{ backgroundColor: selectedVariant.hex }}
                        />
                        <span className="font-semibold text-neutral-950 normal-case">{selectedVariant.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
                      {product.variants.map((v) => {
                        const isSelected = v.colorKey === selectedVariant.colorKey;
                        return (
                          <button
                            key={v.colorKey}
                            type="button"
                            onClick={() => handleVariantChange(v)}
                            className={`group relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 border-2 transition-all duration-200 cursor-pointer shrink-0 overflow-hidden ${
                              isSelected
                                ? "border-neutral-950 bg-white shadow-xs"
                                : "border-neutral-200/80 bg-neutral-50/80 hover:border-neutral-400 hover:bg-white opacity-70 hover:opacity-100"
                            }`}
                            aria-label={`Select ${v.name}`}
                            title={v.name}
                          >
                            <Image
                              src={v.image}
                              alt={v.name}
                              fill
                              unoptimized
                              className="object-contain p-1 sm:p-1.5 transition-transform duration-200 group-hover:scale-105"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Free 2-Day Air Text */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="whitespace-nowrap">Complimentary 2-Day Air Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column (md:col-span-6): Clean Buy Box */}
            <div className="md:col-span-6 space-y-4 sm:space-y-5 max-w-xl mx-auto md:max-w-none w-full">
              {/* Product Category & Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-wider uppercase text-neutral-600">
                <span>{product.tagline}</span>
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-950 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Clean Price Area */}
              <div className="flex items-baseline gap-2 pt-0.5 pb-0.5">
                <span className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-950">
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
              <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Key Technical Highlights */}
              {product.keyHighlights && product.keyHighlights.length > 0 && (
                <div className="space-y-2 py-2 border-y border-neutral-100">
                  {product.keyHighlights.slice(0, 4).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Selector & Add to Cart Button */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2.5 sm:gap-3">
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
                    <span className="w-8 sm:w-9 text-center font-mono text-xs font-semibold text-neutral-950">
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
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3 sm:py-3.5 px-4 sm:px-6 font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-sm cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 min-h-[44px] ${
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

                {/* Assurance Ribbon */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-3 text-[11px] sm:text-xs text-neutral-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="whitespace-nowrap">3-Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Undo2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="whitespace-nowrap">30-Day Trial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STAGE 2: Technical Specifications Sheet */}
          {product.specs.length > 0 && (
            <div className="space-y-4 sm:space-y-6 pt-6 border-t border-neutral-200/70">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-950">
                  Technical Specifications
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-mono">
                  Detailed acoustic architecture and hardware parameters
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200/80 overflow-hidden divide-y divide-neutral-200/70 text-xs sm:text-sm shadow-2xs">
                {product.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 py-3 px-4 sm:py-3.5 sm:px-5 bg-white hover:bg-neutral-50/70 transition-colors gap-1 sm:gap-0"
                  >
                    <span className="sm:col-span-4 font-mono text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="sm:col-span-8 font-sans font-medium text-xs sm:text-sm text-neutral-950">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 3: Included in the Box */}
          {product.boxContents.length > 0 && (
            <div className="space-y-4 sm:space-y-6 pt-6 border-t border-neutral-200/70">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-950">
                  What's in the Box
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-mono">
                  Complete packaging and certified accessories
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                {product.boxContents.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 flex items-center gap-3 text-xs text-neutral-800"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-6 border-t border-neutral-200/70">
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-neutral-200/80 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-neutral-950">Free Expedited Shipping</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Complimentary 2-day air delivery with real-time tracking on every domestic and international order.
              </p>
            </div>

            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-neutral-200/80 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-neutral-950">3-Year Factory Warranty</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Comprehensive hardware warranty and driver support directly handled by our engineering team.
              </p>
            </div>

            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-neutral-200/80 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-950">
                <Undo2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-neutral-950">30-Day In-Home Trial</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Audition the instruments on your own source gear. Zero hassle returns with prepaid return shipping.
              </p>
            </div>
          </div>

          {/* STAGE 5: Related Instruments */}
          {relatedProducts.length > 0 && (
            <div className="space-y-4 sm:space-y-6 pt-6 border-t border-neutral-200/70">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-950">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {relatedProducts.map((rel) => (
                  <ProductCard
                    key={rel.id}
                    product={rel}
                    onAddToCart={(p, v) => {
                      soundEngine.playChime();
                      addToCart(p, v, 1);
                      setIsCartOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Sticky Quick-Add Bar (Visible when scrolled past main buy box) */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#FEFEFE]/95 backdrop-blur-md border-t border-neutral-200/80 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-in-out ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200/70 p-1 shrink-0 overflow-hidden flex items-center justify-center">
              <Image
                src={selectedVariant.image}
                alt={product.name}
                fill
                unoptimized
                className="object-contain p-0.5"
              />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-neutral-950 truncate leading-tight">
                {product.name}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-light text-neutral-950 font-mono">
                  ${product.price}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">USD</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-full text-xs font-semibold tracking-tight shadow-sm cursor-pointer active:scale-[0.97] transition-all duration-200 shrink-0 ${
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
      </div>
    </div>
  );
}
