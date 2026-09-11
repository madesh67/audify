"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Plus } from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();
  const defaultVariant = product.variants[0];
  const [isAdded, setIsAdded] = useState(false);

  const handleCardClick = () => {
    soundEngine.playClick(800);
    router.push(`/products/${product.slug}`);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents navigating to PDP
    soundEngine.playChime();
    setIsAdded(true);
    onAddToCart(product, defaultVariant);
    setTimeout(() => setIsAdded(false), 1800);
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
      className="group relative rounded-[2rem] p-1.5 bg-neutral-100/70 border border-neutral-200/80 hover:border-neutral-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col cursor-pointer select-none"
    >
      {/* Inner Core: Concentric Rounded White Container */}
      <div className="rounded-[calc(2rem-0.375rem)] bg-white p-5 sm:p-6 flex flex-col justify-between flex-1 border border-neutral-100/50">
        <div>
          {/* 1. Product Picture */}
          <div className="relative aspect-square w-full rounded-2xl bg-neutral-50/70 border border-neutral-100 flex items-center justify-center p-6 overflow-hidden mb-4 sm:mb-5 group-hover:bg-neutral-50 transition-colors">
            <Image
              src={defaultVariant.image}
              alt={product.name}
              fill
              unoptimized
              className="object-contain p-3 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 select-none"
            />
          </div>

          {/* 2. Product Name */}
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950 group-hover:text-neutral-700 transition-colors">
              {product.name}
            </h3>
          </div>
        </div>

        {/* 3. Price & 4. Add to Cart Button */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 sm:gap-3 mt-auto">
          <div className="flex items-baseline gap-1 shrink-0">
            <span className="text-xl sm:text-2xl font-light tracking-tight text-neutral-950">
              ${product.price}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase">
              USD
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`group/btn inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4.5 sm:py-2.5 min-h-[38px] sm:min-h-[40px] rounded-full font-semibold text-xs tracking-tight transition-all duration-200 shadow-xs cursor-pointer active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 shrink-0 ${
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
