"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";
import { soundEngine } from "@/utils/sound";
import { useLenis } from "@/components/layout/SmoothScroll";

export type VariantColor = "obsidian" | "silver" | "dune";

interface VariantInfo {
  id: VariantColor;
  name: string;
  tagline: string;
  finish: string;
  hex: string;
  borderHex: string;
  image: string;
  description: string;
  cushionMaterial: string;
  chassisFinish: string;
}

const variants: Record<VariantColor, VariantInfo> = {
  obsidian: {
    id: "obsidian",
    name: "Obsidian Onyx",
    tagline: "Midnight Titanium & Black Nappa Leather",
    finish: "Matte Vantablack with PVD Titanium Hinges",
    hex: "#161618",
    borderHex: "#3f3f46",
    image: "/images/headset-variant-obsidian.webp",
    description:
      "Deep light-absorbing black anodization paired with perforated Italian lambskin ear cushions. Engineered for stealth studio environments.",
    cushionMaterial: "Italian Perforated Nappa Leather",
    chassisFinish: "Grade-5 PVD Coated Titanium",
  },
  silver: {
    id: "silver",
    name: "Platinum Mercury",
    tagline: "Brushed Aluminum & Heather Grey Mesh",
    finish: "Satin Honed Aerospace Aluminum",
    hex: "#CBD5E1",
    borderHex: "#94A3B8",
    image: "/images/headset-variant-silver.webp",
    description:
      "Raw machined aerospace-grade aluminum polished to a satin sheen. Accented with tactile micro-knurled dials and breathable acoustic weave.",
    cushionMaterial: "Acoustic Memory Micro-Mesh",
    chassisFinish: "Electrolytically Anodized Aluminum",
  },
  dune: {
    id: "dune",
    name: "Champagne Dune",
    tagline: "Matte Gold Sand & Forged Bronze",
    finish: "Warm Champagne Anodized with Saddle Tan",
    hex: "#D4B996",
    borderHex: "#A27B5C",
    image: "/images/headset-variant-dune.webp",
    description:
      "Inspired by shifting desert sands. Warm bronze metallic acoustic enclosures complemented by supple saddle-tan vegetable-tanned leather.",
    cushionMaterial: "Hand-Stitched Saddle Tan Leather",
    chassisFinish: "Sandblasted Champagne Bronze",
  },
};

export interface VariantChooserProps {
  onSelectVariant?: (variant: VariantColor) => void;
  selectedColor?: VariantColor;
  onColorChange?: (color: VariantColor) => void;
  showcaseRef?: React.RefObject<HTMLDivElement | null>;
  hideObsidianImage?: boolean;
  className?: string;
}

export default function VariantChooser({
  onSelectVariant,
  selectedColor: externalColor,
  onColorChange,
  showcaseRef,
  hideObsidianImage = false,
  className = "",
}: VariantChooserProps) {
  const { scrollTo } = useLenis();
  const [internalColor, setInternalColor] = useState<VariantColor>("obsidian");
  const selectedColor = externalColor ?? internalColor;
  const activeVariant = variants[selectedColor];

  const handleSelect = (color: VariantColor) => {
    soundEngine.playClick(680);
    setInternalColor(color);
    onColorChange?.(color);
    onSelectVariant?.(color);
  };

  return (
    <section
      id="variant-chooser-inner"
      className={`relative w-full py-1 sm:py-3 lg:py-4 text-neutral-950 select-none ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header: Minimal & Connected to Section 1 */}
        <div className="flex flex-col items-center text-center mb-2 sm:mb-4 md:mb-5 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-light tracking-tight text-neutral-950 leading-tight">
            Choose Your <span className="font-semibold text-neutral-950">Finish</span>
          </h2>
        </div>

        {/* Studio Grid: Headset Showcase on Left (5 cols on md), Configurator on Right (7 cols on md) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 md:gap-6 lg:gap-14 items-center">
          {/* Left Column: Headset Showcase Soundstage Target for 382th Frame Docking */}
          <div className="md:col-span-5 flex justify-center md:justify-center lg:justify-start items-center">
            <div
              ref={showcaseRef}
              id="variant-showcase-box"
              className="relative aspect-square w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[440px] xl:max-w-[480px] rounded-3xl border border-neutral-200/90 bg-neutral-50/40 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden flex items-center justify-center transition-all duration-700"
            >
              {/* Subtle inner radial depth */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000 blur-3xl"
                style={{
                  background: `radial-gradient(circle at center, ${activeVariant.hex} 0%, transparent 70%)`,
                }}
              />

              {/* 3 Cross-Fading Headset Colorway Images */}
              {(Object.keys(variants) as VariantColor[]).map((key) => {
                const isSelected = selectedColor === key;
                const shouldShow = isSelected && !(key === "obsidian" && hideObsidianImage);

                return (
                  <div
                    key={key}
                    className={`absolute inset-3 sm:inset-5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      shouldShow
                        ? "opacity-100 scale-100 blur-0 pointer-events-auto z-10"
                        : "opacity-0 scale-95 blur-sm pointer-events-none z-0"
                    }`}
                  >
                    <Image
                      src={variants[key].image}
                      alt={`Audify Headset - ${variants[key].name}`}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                      className="object-contain"
                      priority={isSelected}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Essential Details Only */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-2.5 sm:space-y-4 md:space-y-3.5 lg:space-y-6 max-w-xl mx-auto md:max-w-none w-full">
            {/* 3 Clean Finish Switcher Tiles */}
            <div className="space-y-1.5 sm:space-y-2.5">
              <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400">
                SELECT COLORWAY
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-2.5 lg:gap-3">
                {(Object.keys(variants) as VariantColor[]).map((key) => {
                  const item = variants[key];
                  const isSelected = selectedColor === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelect(key)}
                      aria-label={`Select ${item.name}`}
                      className={`group relative flex flex-col p-2 sm:p-3 md:p-2.5 lg:p-3.5 rounded-2xl border text-left focus:outline-none cursor-pointer transition-all ${
                        isSelected
                          ? "bg-neutral-950 text-white border-neutral-950 shadow-md"
                          : "bg-neutral-50/70 hover:bg-neutral-100/80 text-neutral-900 border-neutral-200/80"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border shadow-inner mb-1.5 sm:mb-2.5 flex items-center justify-center shrink-0 ${
                          isSelected ? "border-white/50 ring-2 ring-white/20" : "border-black/15"
                        }`}
                        style={{ backgroundColor: item.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                              key === "silver" ? "text-neutral-950" : "text-white"
                            }`}
                          />
                        )}
                      </span>

                      <div
                        className={`text-[11px] sm:text-sm md:text-xs lg:text-sm font-semibold tracking-tight truncate ${
                          isSelected ? "text-white" : "text-neutral-950"
                        }`}
                      >
                        {item.name}
                      </div>

                      <div
                        className={`font-mono text-[9px] sm:text-[10px] mt-0.5 truncate ${
                          isSelected ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        {item.finish}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Essential Finish Highlight */}
            <div className="space-y-0.5 sm:space-y-1">
              <div className="text-xs sm:text-base md:text-sm lg:text-lg font-medium text-neutral-950 tracking-tight">
                {activeVariant.tagline}
              </div>
              <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-neutral-500 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                {activeVariant.description}
              </p>
            </div>

            {/* Core Material Specs from Section 1 */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-2 sm:pt-3 md:pt-3 lg:pt-4 border-t border-neutral-200/60 font-mono">
              <div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                  CHASSIS ALLOY
                </div>
                <div className="text-xs sm:text-sm font-semibold text-neutral-950 tracking-tight mt-0.5">
                  {activeVariant.chassisFinish}
                </div>
              </div>

              <div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                  CUSHION SEAL
                </div>
                <div className="text-xs sm:text-sm font-semibold text-neutral-950 tracking-tight mt-0.5">
                  {activeVariant.cushionMaterial}
                </div>
              </div>
            </div>

            {/* Clean Price & Primary CTA */}
            <div className="pt-2 flex flex-row items-center justify-between gap-3 sm:gap-4">
              <div>
                <div className="text-xl sm:text-3xl font-light tracking-tight text-neutral-950">
                  $499 <span className="text-xs font-mono text-neutral-400 uppercase">USD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playChime();
                  scrollTo("#buy-now-cta", { duration: 1.4 });
                }}
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-6 md:px-5 lg:px-7 py-2.5 sm:py-3 md:py-2.5 lg:py-3.5 rounded-full bg-neutral-950 text-white font-semibold text-xs sm:text-xs lg:text-sm uppercase tracking-wider hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                <span>Order {activeVariant.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
