"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Eye, Sparkles, Star } from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, variant: ProductVariant) => void;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleVariantSelect = (variant: ProductVariant) => {
    soundEngine.playClick(900);
    setSelectedVariant(variant);
  };

  const handleQuickView = () => {
    soundEngine.playClick(700);
    onQuickView(product, selectedVariant);
  };

  const handleAdd = () => {
    soundEngine.playChime();
    setIsAdded(true);
    onAddToCart(product, selectedVariant);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="group relative rounded-[2rem] p-1.5 bg-neutral-100/70 border border-neutral-200/80 hover:border-neutral-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col">
      {/* Inner Core: Concentric Rounded White Container */}
      <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 flex flex-col justify-between flex-1 border border-neutral-100/50">
        <div>
          {/* Header Row: Badge & Rating */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-medium">
              {product.badgeType === "emerald" ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ) : (
                <Sparkles className="w-2.5 h-2.5 text-neutral-400" />
              )}
              <span>{product.badge}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-neutral-900">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Media Display Container */}
          <div className="relative aspect-square w-full rounded-2xl bg-neutral-50/70 border border-neutral-100 flex items-center justify-center p-6 overflow-hidden mb-5">
            {/* Ambient Backlight Glow */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none transition-colors duration-700 blur-2xl"
              style={{
                background: `radial-gradient(circle at center, ${selectedVariant.hex} 0%, transparent 70%)`,
              }}
            />

            {/* Product Image with Hover Spring Effect */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.name}`}
                fill
                unoptimized
                className="object-contain p-2 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 select-none"
              />
            </div>

            {/* Floating Quick View Pill Overlay on Hover */}
            <button
              onClick={handleQuickView}
              className="absolute bottom-3 inset-x-auto px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/80 text-neutral-900 text-xs font-semibold flex items-center gap-2 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white cursor-pointer"
              aria-label={`Quick view ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5 text-neutral-600" />
              <span>Quick View</span>
            </button>
          </div>

          {/* Colorway / Variant Swatches */}
          {product.variants.length > 1 && (
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-100">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                Finish:{" "}
                <span className="text-neutral-800 font-sans font-medium">
                  {selectedVariant.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {product.variants.map((v) => {
                  const isCurrent = v.colorKey === selectedVariant.colorKey;
                  return (
                    <button
                      key={v.colorKey}
                      onClick={() => handleVariantSelect(v)}
                      aria-label={`Select ${v.name} finish`}
                      className={`relative w-5 h-5 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? "border-neutral-950 scale-110 shadow-xs"
                          : "border-neutral-200 hover:scale-105"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: v.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Title & Series */}
          <div className="space-y-1 mb-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              {product.series}
            </div>
            <Link
              href={`/products/${product.slug}`}
              onClick={() => soundEngine.playClick(800)}
              className="block group-hover:text-neutral-700 transition-colors"
            >
              <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
            {product.tagline}
          </p>

          {/* Key Specs Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {product.keyHighlights.slice(0, 3).map((highlight, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200/60 text-[10px] font-mono text-neutral-600"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Row: Price & Action CTA */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[9px] font-mono uppercase text-neutral-400 tracking-wider">
              MSRP
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-light tracking-tight text-neutral-950">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-[10px] font-mono text-neutral-400 uppercase">
                USD
              </span>
            </div>
          </div>

          {/* Island Button with Nested Trailing Icon */}
          <button
            onClick={handleAdd}
            className={`group/btn relative rounded-full py-2.5 pl-5 pr-2 flex items-center gap-3 font-semibold text-xs tracking-tight transition-all duration-300 shadow-sm cursor-pointer ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-neutral-950 text-white hover:bg-neutral-800"
            }`}
            aria-label={`Reserve ${product.name}`}
          >
            <span>{isAdded ? "Added to Bag" : "Reserve"}</span>
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                isAdded
                  ? "bg-white text-emerald-700"
                  : "bg-white text-neutral-950 group-hover/btn:translate-x-0.5"
              }`}
            >
              {isAdded ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
