"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Package, Plus, Sparkles, Star, X } from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";

interface ProductQuickViewProps {
  product: Product | null;
  initialVariant?: ProductVariant;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export default function ProductQuickView({
  product,
  initialVariant,
  isOpen,
  onClose,
  onAddToCart,
}: ProductQuickViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    initialVariant || product?.variants[0] || null
  );
  const [isAdded, setIsAdded] = useState(false);

  // Sync variant when modal opens with new product or initialVariant
  React.useEffect(() => {
    if (product) {
      setSelectedVariant(initialVariant || product.variants[0]);
    }
  }, [product, initialVariant]);

  if (!isOpen || !product || !selectedVariant) return null;

  const handleVariantSwitch = (v: ProductVariant) => {
    soundEngine.playClick(900);
    setSelectedVariant(v);
  };

  const handleAdd = () => {
    soundEngine.playChime();
    setIsAdded(true);
    onAddToCart(product, selectedVariant);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in select-none">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Double Bezel Outer Shell */}
      <div className="relative w-full max-w-4xl rounded-[2.5rem] p-1.5 bg-neutral-100/95 border border-neutral-200/90 shadow-2xl z-10 my-auto">
        {/* Inner Core */}
        <div className="rounded-[calc(2.5rem-0.375rem)] bg-white p-6 sm:p-10 max-h-[88vh] overflow-y-auto">
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-mono tracking-widest uppercase text-neutral-600 mb-2">
                <Sparkles className="w-2.5 h-2.5 text-neutral-400" />
                <span>{product.badge}</span>
                <span>•</span>
                <span>{product.series}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                {product.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-950 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Grid: Left Media & Swatches, Right Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
            {/* Left Column: Image Preview + Finish Selector */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="relative aspect-square w-full rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-8 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-700 blur-3xl"
                  style={{
                    background: `radial-gradient(circle at center, ${selectedVariant.hex} 0%, transparent 70%)`,
                  }}
                />
                <Image
                  src={selectedVariant.image}
                  alt={`${product.name} - ${selectedVariant.name}`}
                  fill
                  unoptimized
                  className="object-contain p-4 transition-transform duration-500"
                />
              </div>

              {/* Finish Description */}
              {product.variants.length > 1 && (
                <div className="w-full mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                      Colorway:
                    </span>
                    <span className="text-xs font-semibold text-neutral-900">
                      {selectedVariant.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {product.variants.map((v) => {
                      const isCurrent = v.colorKey === selectedVariant.colorKey;
                      return (
                        <button
                          key={v.colorKey}
                          onClick={() => handleVariantSwitch(v)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                            isCurrent
                              ? "border-neutral-950 bg-white font-semibold text-neutral-950 shadow-xs"
                              : "border-neutral-200 bg-neutral-100/80 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: v.hex }}
                          />
                          <span>{v.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">
                    {selectedVariant.finishDescription}
                  </p>
                </div>
              )}

              {/* Lead Time & Guarantee */}
              <div className="w-full mt-4 flex items-center gap-2 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3.5 py-2 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{product.leadTime}</span>
              </div>
            </div>

            {/* Right Column: Deep Technical Specs & Box Contents */}
            <div className="md:col-span-6 space-y-6">
              {/* Product Overview */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Acoustic Architecture
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2.5">
                  Engineering Specifications
                </h4>
                <div className="rounded-xl border border-neutral-100 overflow-hidden divide-y divide-neutral-100 text-xs">
                  {product.specs.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 px-3 bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
                    >
                      <span className="font-mono text-[11px] text-neutral-500">
                        {item.label}
                      </span>
                      <span className="font-sans font-medium text-neutral-950 text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box Contents Checklist */}
              {product.boxContents.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Included in Box</span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-neutral-600">
                    {product.boxContents.map((content, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="w-1 h-1 rounded-full bg-neutral-400" />
                        <span>{content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Link to Full PDP */}
              <div className="pt-2">
                <Link
                  href={`/products/${product.slug}`}
                  onClick={() => {
                    soundEngine.playClick(800);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  <span>Explore Complete Engineering Anatomy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Purchase Footer */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase text-neutral-400">
                    Total Investment
                  </div>
                  <div className="text-3xl font-light text-neutral-950 tracking-tight">
                    ${product.price}{" "}
                    <span className="text-xs font-mono text-neutral-400">USD</span>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className={`group inline-flex items-center justify-center gap-2.5 rounded-full py-3 px-6 font-semibold text-sm tracking-tight transition-all duration-200 shadow-sm cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ${
                    isAdded
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-neutral-950 hover:bg-neutral-800 text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
