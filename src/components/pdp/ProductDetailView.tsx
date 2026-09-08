"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Headphones,
  Music2,
  Package,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Undo2,
  Volume2,
  Zap,
} from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";
import CartDrawer from "@/components/products/CartDrawer";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [activeEqPreset, setActiveEqPreset] = useState<"neutral" | "warm" | "spatial">("neutral");

  // Global Cart State from Context
  const {
    items: cartItems,
    totalCount: totalCartCount,
    addToCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart,
    isDrawerOpen: isCartOpen,
    setIsDrawerOpen: setIsCartOpen,
  } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Image Gallery Thumbnails: Main Variant Image + Architectural Details
  const galleryImages = [
    { label: "Front Profile", src: selectedVariant.image },
    { label: "Acoustic Anatomy", src: "/images/headset-frame-382-crop.png" },
    { label: "Studio Silhouette", src: "/images/headset-transparent.png" },
  ];

  const handleVariantChange = (variant: ProductVariant) => {
    soundEngine.playClick(900);
    setSelectedVariant(variant);
    setActiveImageIndex(0);
  };

  const handlePlayAudioSample = () => {
    if (soundPlaying) return;
    setSoundPlaying(true);
    soundEngine.playTone(528, "sine", 0.8, 0.08);
    setTimeout(() => {
      soundEngine.playTone(660, "sine", 0.6, 0.06);
    }, 200);
    setTimeout(() => {
      soundEngine.playTone(792, "sine", 0.9, 0.05);
      setSoundPlaying(false);
    }, 450);
  };

  const handleEqPresetChange = (preset: "neutral" | "warm" | "spatial") => {
    setActiveEqPreset(preset);
    if (preset === "neutral") soundEngine.playClick(600);
    if (preset === "warm") soundEngine.playClick(440);
    if (preset === "spatial") soundEngine.playClick(880);
  };

  const handleAddToCart = () => {
    soundEngine.playChime();
    setIsAdded(true);
    addToCart(product, selectedVariant, 1);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 400);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-24 sm:pt-28 md:pt-32 pb-24 select-none">
      {/* Container aligned strictly with homepage standard: max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-24">
        {/* Top Header: Breadcrumbs & Reservation Bag Trigger */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-200/60">
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500 overflow-x-auto">
            <Link
              href="/"
              className="hover:text-neutral-950 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Audify</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <Link
              href="/products"
              className="hover:text-neutral-950 transition-colors"
            >
              Catalog
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <span className="text-neutral-950 font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <button
            onClick={() => {
              soundEngine.playClick(800);
              setIsCartOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-950 text-xs font-mono transition-colors cursor-pointer shrink-0"
            aria-label="Open reservation bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="w-4.5 h-4.5 rounded-full bg-neutral-950 text-white text-[10px] font-bold flex items-center justify-center">
              {totalCartCount}
            </span>
          </button>
        </div>

        {/* STAGE 1: Editorial Split Hero (Media Showcase Left, Configurator & Purchase Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (lg:col-span-7): Hardware Soundstage Gallery */}
          <div className="lg:col-span-7 space-y-6">
            {/* Double-Bezel Hardware Container */}
            <div className="relative rounded-[2.5rem] p-2 bg-neutral-100/70 border border-neutral-200/80 shadow-[0_24px_50px_rgba(0,0,0,0.04)]">
              {/* Inner Concentric Core */}
              <div className="relative aspect-[4/3.5] sm:aspect-square w-full rounded-[calc(2.5rem-0.5rem)] bg-white border border-neutral-100 flex items-center justify-center p-8 sm:p-12 overflow-hidden">
                {/* Ambient Radial Backlight matched to active colorway */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-700 blur-3xl"
                  style={{
                    background: `radial-gradient(circle at center, ${selectedVariant.hex} 0%, transparent 70%)`,
                  }}
                />

                {/* Main Product Image with subtle scale */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={galleryImages[activeImageIndex].src}
                    alt={`${product.name} - ${selectedVariant.name}`}
                    fill
                    unoptimized
                    priority
                    className="object-contain p-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                </div>

                {/* Floating Acoustic Tone Preview Pill */}
                <button
                  onClick={handlePlayAudioSample}
                  className={`absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono transition-all duration-300 cursor-pointer shadow-xs ${
                    soundPlaying
                      ? "bg-neutral-950 text-white border-neutral-950 animate-pulse"
                      : "bg-white/90 backdrop-blur-md border-neutral-200 text-neutral-800 hover:bg-white"
                  }`}
                  aria-label="Play acoustic tone test"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{soundPlaying ? "Auditing 528Hz Harmonic..." : "Acoustic Sample"}</span>
                </button>

                {/* Batch Certification Badge */}
                <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 text-[10px] font-mono text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>INDIVIDUAL LAB CALIBRATION</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery Switcher Strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundEngine.playClick(700);
                    setActiveImageIndex(idx);
                  }}
                  className={`group relative rounded-2xl p-1 bg-neutral-100/70 border transition-all duration-300 cursor-pointer text-left ${
                    activeImageIndex === idx
                      ? "border-neutral-950 shadow-sm"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full rounded-xl bg-white border border-neutral-100 flex items-center justify-center p-2 overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      unoptimized
                      className="object-contain p-1 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-2 text-[10px] font-mono text-neutral-600 truncate">
                    {img.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (lg:col-span-5): Specifications, Finish Customizer & Reservation */}
          <div className="lg:col-span-5 space-y-6">
            {/* Eyebrow & Verified Rating */}
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-mono uppercase tracking-widest text-neutral-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{product.badge}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-semibold text-neutral-950">{product.rating}</span>
                <span>•</span>
                <span>{product.reviewCount} purist reviews</span>
              </div>
            </div>

            {/* Product Title & Tagline */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                {product.series}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 leading-[1.05]">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {product.tagline}
              </p>
            </div>

            {/* Price & Installment Calculator */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  USD (Tax Included)
                </span>
              </div>
              <p className="text-[11px] font-mono text-neutral-500">
                Or 4 interest-free payments of ${(product.price / 4).toFixed(2)} with Klarna / Affirm.
              </p>
            </div>

            {/* Finish & Colorway Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-widest text-neutral-400 text-[10px]">
                    Select Chassis Finish
                  </span>
                  <span className="font-semibold text-neutral-950">
                    {selectedVariant.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = v.colorKey === selectedVariant.colorKey;
                    return (
                      <button
                        key={v.colorKey}
                        onClick={() => handleVariantChange(v)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-neutral-950 bg-white shadow-xs ring-1 ring-neutral-950"
                            : "border-neutral-200 bg-neutral-50 hover:bg-white hover:border-neutral-300"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-xs"
                          style={{ backgroundColor: v.hex }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-neutral-950 truncate">
                            {v.name}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-400 truncate">
                            {v.finishDescription.slice(0, 30)}...
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key Technical Highlights Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {product.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-100 flex items-start gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-mono text-neutral-700 leading-tight">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full group relative rounded-full py-4.5 px-8 bg-neutral-950 hover:bg-neutral-800 text-white flex items-center justify-between font-bold text-base sm:text-lg tracking-tight transition-all duration-300 shadow-xl cursor-pointer"
                aria-label={`Reserve ${product.name}`}
              >
                <span>{isAdded ? "Allocated to Bag" : `Reserve Instrument — $${product.price}`}</span>
                <span className="w-10 h-10 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-xs group-hover:translate-x-0.5 transition-transform">
                  {isAdded ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  )}
                </span>
              </button>

              <div className="text-center text-[11px] font-mono text-neutral-400">
                {product.leadTime}
              </div>
            </div>

            {/* Trust & Guarantee Ribbon */}
            <div className="pt-4 border-t border-neutral-200/60 grid grid-cols-3 gap-2 text-center font-mono text-[10px] text-neutral-500">
              <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                <Truck className="w-3.5 h-3.5 mx-auto text-neutral-400 mb-1" />
                <span>Free 2-Day Air</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                <ShieldCheck className="w-3.5 h-3.5 mx-auto text-neutral-400 mb-1" />
                <span>3-Year Warranty</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                <Undo2 className="w-3.5 h-3.5 mx-auto text-neutral-400 mb-1" />
                <span>30-Day Trial</span>
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 2: Deep Architectural Deep-Dive (Asymmetrical Bento Grid) */}
        <div className="space-y-8 pt-8">
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
              ENGINEERING ANATOMY
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 uppercase">
              The Architecture of Sound
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Card 1: Transducer Acoustic Chamber (Col-span 7) */}
            <div className="md:col-span-7 rounded-[2rem] p-1.5 bg-neutral-100/70 border border-neutral-200/80">
              <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <Music2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950">
                    40mm Bio-Cellulose Acoustic Chamber
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Unlike standard mylar diaphragms which flex unpredictably at high volumes, bio-cellulose crystallizes naturally into an ultra-rigid matrix. Yields zero cone breakup, instantaneous transient recovery, and deep sub-bass down to 5Hz.
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-4 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase">SUB-BASS</div>
                    <div className="text-base font-semibold text-neutral-950">5 Hz</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase">HIGH AIR</div>
                    <div className="text-base font-semibold text-neutral-950">45 kHz</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase">THD NOISE</div>
                    <div className="text-base font-semibold text-neutral-950">&lt; 0.05%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Grade-5 Cryogenic Titanium (Col-span 5) */}
            <div className="md:col-span-5 rounded-[2rem] p-1.5 bg-neutral-100/70 border border-neutral-200/80">
              <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950">
                    Cryogenic Grade-5 Titanium
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Forged with an aerospace-grade alloy treated at sub-zero temperatures. Weighs only 268 grams while resisting over 250 kilograms of torsional flex without bending or fatigue.
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100 font-mono text-xs">
                  <div className="text-[10px] text-neutral-400 uppercase">NET CHASSIS WEIGHT</div>
                  <div className="text-2xl font-light text-neutral-950">
                    268<span className="text-xs text-neutral-400 ml-1">grams</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Hybrid Active Noise Cancellation (Col-span 5) */}
            <div className="md:col-span-5 rounded-[2rem] p-1.5 bg-neutral-100/70 border border-neutral-200/80">
              <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <Radio className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950">
                    -42dB Hybrid DSP Isolation
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Six calibrated beamforming microphones sample exterior ambient sound 50,000 times per second, synthesizing inverse waveforms before soundwaves reach your eardrum.
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100 font-mono text-xs">
                  <div className="text-[10px] text-neutral-400 uppercase">AMBIENT ATTENUATION</div>
                  <div className="text-2xl font-light text-neutral-950">
                    -42<span className="text-xs text-neutral-400 ml-1">decibels</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 4: 65-Hour Battery Architecture (Col-span 7) */}
            <div className="md:col-span-7 rounded-[2rem] p-1.5 bg-neutral-100/70 border border-neutral-200/80">
              <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950">
                    65-Hour Continuous Lithium Cell
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Travel from London to Tokyo and back twice on a single charge cycle. Smart power management draws near-zero standby current when removed from your head.
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase">FULL PLAYBACK</div>
                    <div className="text-base font-semibold text-neutral-950">65 Hours</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase">FAST RECHARGE</div>
                    <div className="text-base font-semibold text-neutral-950">15 min = 8 hrs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 3: Interactive Acoustic Curve Simulator */}
        <div className="rounded-[2.5rem] p-2 bg-neutral-100/70 border border-neutral-200/80">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-8 sm:p-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                  ACOUSTIC CALIBRATION PROFILE
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950">
                  Target Frequency Response Curve
                </h3>
              </div>

              {/* EQ Preset Switcher */}
              <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-full">
                {(["neutral", "warm", "spatial"] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleEqPresetChange(preset)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono capitalize transition-all cursor-pointer ${
                      activeEqPreset === preset
                        ? "bg-neutral-950 text-white font-semibold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-950"
                    }`}
                  >
                    {preset === "neutral" ? "Studio Neutral" : preset === "warm" ? "Audiophile Warmth" : "Spatial Air"}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual SVG Curve Graph */}
            <div className="relative w-full h-44 sm:h-56 bg-neutral-50 rounded-2xl border border-neutral-200/70 p-6 flex flex-col justify-between overflow-hidden">
              {/* Frequency grid guidelines */}
              <div className="absolute inset-x-6 inset-y-6 flex justify-between border-b border-neutral-200 pointer-events-none opacity-40">
                <span className="border-r border-neutral-200 h-full" />
                <span className="border-r border-neutral-200 h-full" />
                <span className="border-r border-neutral-200 h-full" />
                <span className="border-r border-neutral-200 h-full" />
              </div>

              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 160">
                {/* Reference Baseline */}
                <line x1="0" y1="80" x2="800" y2="80" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />

                {/* Dynamic Curve Path */}
                <path
                  d={
                    activeEqPreset === "neutral"
                      ? "M 0 85 C 150 82, 250 80, 400 80 C 550 80, 680 78, 800 75"
                      : activeEqPreset === "warm"
                      ? "M 0 60 C 120 62, 240 76, 400 80 C 560 84, 680 86, 800 82"
                      : "M 0 90 C 120 86, 260 82, 400 78 C 550 72, 680 50, 800 45"
                  }
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
              </svg>

              {/* Axis Labels */}
              <div className="flex justify-between font-mono text-[10px] text-neutral-400 pt-2 border-t border-neutral-200">
                <span>20 Hz (Sub-Bass)</span>
                <span>250 Hz (Low Mid)</span>
                <span>1 kHz (Presence)</span>
                <span>6 kHz (Treble)</span>
                <span>20 kHz (Air)</span>
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 4: What's in the Box Checklist */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
              UNBOXING ARTIFACTS
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950">
              Included in the Studio Box
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.boxContents.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-center gap-3 font-mono text-xs text-neutral-800"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shrink-0 shadow-xs">
                  <Package className="w-4 h-4" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STAGE 5: Technical Engineering Table */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
              COMPLETE SPECIFICATIONS
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950">
              Laboratory Measurement Sheet
            </h3>
          </div>

          <div className="rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200/70 text-xs sm:text-sm">
            {product.specs.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 py-3.5 px-5 bg-white hover:bg-neutral-50/80 transition-colors"
              >
                <span className="sm:col-span-4 font-mono text-xs text-neutral-500 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="sm:col-span-8 font-sans font-medium text-neutral-950 mt-1 sm:mt-0">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STAGE 6: Related Instruments & Bespoke Pairings */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8 pt-8 border-t border-neutral-200/70">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                  RECOMMENDED PAIRINGS
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950">
                  Complete Your Acoustic Ecosystem
                </h3>
              </div>
              <Link
                href="/products"
                className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-500 flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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

      {/* Cart Drawer */}
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
