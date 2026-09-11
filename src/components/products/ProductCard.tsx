"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Eye, Plus, Star } from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
  onQuickView?: (product: Product, variant: ProductVariant) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const router = useRouter();
  const [activeVariant, setActiveVariant] = useState<ProductVariant>(
    product.variants[0] || {
      name: "Default",
      colorKey: "default",
      hex: "#161618",
      image: "/images/headset.png",
      finishDescription: "Precision finish",
    }
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleCardClick = () => {
    soundEngine.playClick(800);
    router.push(`/products/${product.slug}`);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents navigating to PDP
    soundEngine.playChime();
    setIsAdded(true);
    onAddToCart(product, activeVariant);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick(700);
    onQuickView?.(product, activeVariant);
  };

  const handleSwatchClick = (e: React.MouseEvent, variant: ProductVariant) => {
    e.stopPropagation();
    soundEngine.playClick(900);
    setActiveVariant(variant);
  };

  return (
    <div
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="group relative rounded-[2rem] p-1.5 bg-neutral-100/70 border border-neutral-200/80 hover:border-neutral-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col cursor-pointer select-none"
    >
      {/* Inner Core: Concentric Rounded Container */}
      <div className="rounded-[calc(2rem-0.375rem)] bg-white p-5 sm:p-6 flex flex-col justify-between flex-1 border border-neutral-100/60">
        <div>
          {/* 1. Header: Badge & Rating Row */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-neutral-100/90 text-neutral-700">
              {product.badge || "Acoustic Series"}
            </span>

            {product.rating && (
              <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-500">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-neutral-800">{product.rating}</span>
              </div>
            )}
          </div>

          {/* 2. Product Picture with Subtle Glow & Quick View Action */}
          <div className="relative aspect-square w-full rounded-2xl bg-neutral-50/80 border border-neutral-100 flex items-center justify-center p-6 overflow-hidden mb-4 group-hover:bg-neutral-50 transition-colors">
            {/* Dynamic Radial Ambient Tint */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none transition-colors duration-700 blur-2xl"
              style={{
                background: `radial-gradient(circle at center, ${activeVariant.hex || "#161618"} 0%, transparent 70%)`,
              }}
            />

            <Image
              src={activeVariant.image}
              alt={`${product.name} - ${activeVariant.name}`}
              fill
              unoptimized
              className="object-contain p-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 select-none"
            />

            {/* Quick View Button */}
            {onQuickView && (
              <button
                type="button"
                onClick={handleQuickViewClick}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-neutral-900 border border-neutral-200/90 shadow-sm text-[11px] font-mono font-medium hover:bg-neutral-950 hover:text-white hover:border-neutral-950 active:scale-95 transition-all duration-200 cursor-pointer"
                title="Quick View"
                aria-label={`Quick View ${product.name}`}
              >
                <Eye className="w-3 h-3" />
                <span>Quick View</span>
              </button>
            )}
          </div>

          {/* 3. Colorway Swatches (if multiple variants exist) */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              {product.variants.map((v) => {
                const isCurrent = v.colorKey === activeVariant.colorKey;
                return (
                  <button
                    key={v.colorKey}
                    type="button"
                    onClick={(e) => handleSwatchClick(e, v)}
                    className={`group/swatch relative w-5 h-5 rounded-full p-0.5 border transition-all duration-200 cursor-pointer ${
                      isCurrent
                        ? "border-neutral-950 ring-1 ring-neutral-950 ring-offset-1 scale-110"
                        : "border-neutral-300 hover:border-neutral-500 hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                    title={`${v.name} finish`}
                    aria-label={`Select ${v.name} finish`}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-black/10"
                      style={{ backgroundColor: v.hex }}
                    />
                  </button>
                );
              })}
              <span className="text-[10px] font-mono text-neutral-400 ml-1">
                {activeVariant.name}
              </span>
            </div>
          )}

          {/* 4. Product Name & Tagline */}
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 group-hover:text-neutral-700 transition-colors leading-snug">
              {product.name}
            </h3>
            {product.tagline && (
              <p className="text-xs text-neutral-500 line-clamp-1 mt-1 font-normal">
                {product.tagline}
              </p>
            )}
          </div>
        </div>

        {/* 5. Price & Add to Cart Action Row */}
        <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2 sm:gap-3 mt-auto">
          {/* Price Block */}
          <div className="flex items-baseline gap-1.5 shrink-0">
            <span className="text-xl sm:text-2xl font-light tracking-tight text-neutral-950">
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

          {/* Action Button: Ergonomic Touch Target */}
          <button
            type="button"
            onClick={handleAdd}
            className={`group/btn inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 min-h-[38px] sm:min-h-[40px] rounded-full font-semibold text-xs tracking-tight transition-all duration-200 shadow-xs cursor-pointer active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 shrink-0 ${
              isAdded
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-neutral-950 text-white hover:bg-neutral-800"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="whitespace-nowrap">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover/btn:scale-110" />
                <span className="whitespace-nowrap">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
