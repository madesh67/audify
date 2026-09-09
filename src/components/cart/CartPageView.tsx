"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  Undo2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { soundEngine } from "@/utils/sound";
import { PRODUCTS } from "@/data/products";

export default function CartPageView() {
  const {
    items,
    totalCount,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Recommended accessories for empty state or bottom recommendations
  const recommendedItems = PRODUCTS.filter(
    (p) => p.category === "accessories" || p.category === "hardware"
  ).slice(0, 3);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === "PURIST10" || promoCode.trim().toUpperCase() === "AUDIFY") {
      soundEngine.playChime();
      setDiscount(0.1); // 10% off
      setPromoApplied(true);
      setPromoError("");
    } else {
      soundEngine.playClick(400);
      setPromoError("Invalid concierge code. Try 'PURIST10'");
    }
  };

  const finalTotal = subtotal * (1 - discount);

  const handleCheckout = () => {
    soundEngine.playChime();
    setIsProcessing(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#0a0a0a", "#10b981", "#d4d4d8", "#e4e4e7"],
      });
    } catch {}

    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-24 sm:pt-28 md:pt-32 pb-24 select-none">
      {/* Aligned strictly to design system standard: max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500 pb-4 border-b border-neutral-200/60">
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
          <span className="text-neutral-950 font-semibold">Reservation Bag</span>
        </nav>

        {/* Page Heading & Value Proposition Ribbon */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>DIRECT ACOUSTIC ALLOCATION</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] uppercase text-neutral-950 leading-[0.95]">
                YOUR RESERVATION BAG
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Review your allocated instruments and finalize your custom batch reservation.
              </p>
            </div>

            <div className="text-xs font-mono text-neutral-500 bg-neutral-100/70 border border-neutral-200/80 px-4 py-2.5 rounded-2xl shrink-0">
              <span>Current Allocation: </span>
              <span className="font-bold text-neutral-950">{totalCount}</span>{" "}
              {totalCount === 1 ? "Instrument" : "Instruments"}
            </div>
          </div>
        </div>

        {/* Order Completion Screen */}
        {orderComplete ? (
          <div className="rounded-[2.5rem] p-2 bg-neutral-100/70 border border-neutral-200/80">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-10 sm:p-16 text-center max-w-xl mx-auto space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                <Check className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-mono uppercase tracking-widest text-emerald-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BATCH #04 RESERVATION CONFIRMED</span>
                </div>
                <h2 className="text-3xl font-black tracking-tight text-neutral-950">
                  Welcome to the Audify Soundstage
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  Your custom build order has been reserved in our laboratory queue. You will receive an acoustic certificate and tracking dispatch dispatch details via email shortly.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Explore More Instruments
                </Link>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Return to Soundstage
                </Link>
              </div>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* Empty Bag State */
          <div className="rounded-[2.5rem] p-2 bg-neutral-100/70 border border-neutral-200/80">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-10 sm:p-16 text-center max-w-lg mx-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-neutral-950">
                  Your reservation bag is empty
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  Discover our flagship over-ear acoustic instruments, cryogenic amplifiers, and studio cables.
                </p>
              </div>

              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                <span>Discover Catalog</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Main Cart Grid: Left Ledger (7 cols) + Right Summary Card (5 cols) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Ledger Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Allocated Items ({totalCount})
                </h2>
                <button
                  onClick={() => {
                    soundEngine.playClick(400);
                    clearCart();
                  }}
                  className="text-[11px] font-mono text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Clear Bag
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variant.colorKey}`}
                    className="rounded-3xl p-1.5 bg-neutral-100/70 border border-neutral-200/80 shadow-xs"
                  >
                    <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-50 border border-neutral-100 shrink-0 flex items-center justify-center p-2 overflow-hidden group/img"
                        >
                          <Image
                            src={item.variant.image}
                            alt={item.product.name}
                            fill
                            unoptimized
                            className="object-contain p-2 group-hover/img:scale-105 transition-transform"
                          />
                        </Link>

                        <div className="min-w-0 space-y-1">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                            {item.product.series}
                          </div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="text-base font-bold text-neutral-950 hover:text-neutral-700 transition-colors block truncate"
                          >
                            {item.product.name}
                          </Link>

                          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 pt-0.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                              style={{ backgroundColor: item.variant.hex }}
                            />
                            <span>{item.variant.name}</span>
                          </div>

                          <div className="text-xs font-medium text-neutral-400 pt-0.5">
                            ${item.product.price} USD each
                          </div>
                        </div>
                      </div>

                      {/* Right: Quantity Stepper & Price Total */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        <div className="text-lg font-light text-neutral-950">
                          ${item.product.price * item.quantity}{" "}
                          <span className="text-xs font-mono text-neutral-400">USD</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Stepper */}
                          <div className="flex items-center gap-2 bg-neutral-100 border border-neutral-200/80 rounded-full px-3 py-1 text-xs font-mono">
                            <button
                              onClick={() => {
                                soundEngine.playClick(600);
                                updateQuantity(item.product.id, item.variant.colorKey, -1);
                              }}
                              className="hover:text-neutral-950 text-neutral-500 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center font-bold text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                soundEngine.playClick(800);
                                updateQuantity(item.product.id, item.variant.colorKey, 1);
                              }}
                              className="hover:text-neutral-950 text-neutral-500 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => {
                              soundEngine.playClick(400);
                              removeItem(item.product.id, item.variant.colorKey);
                            }}
                            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-400 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier & Guarantee Assurances */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-neutral-600">
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px]">Complimentary 2-Day Air</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px]">3-Year International Warranty</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center gap-2.5">
                  <Undo2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px]">30-Day Studio Trial</span>
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Double-Bezel Order Receipt Container */}
              <div className="rounded-[2.5rem] p-2 bg-neutral-100/70 border border-neutral-200/80 shadow-xl">
                <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-6 sm:p-8 space-y-6">
                  <div className="space-y-1 pb-4 border-b border-neutral-100">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      ORDER SPECIFICATION
                    </div>
                    <h3 className="text-xl font-bold text-neutral-950">
                      Reservation Summary
                    </h3>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex justify-between text-neutral-500">
                      <span>Instruments Subtotal</span>
                      <span className="text-neutral-950 font-sans font-medium">
                        ${subtotal.toFixed(2)} USD
                      </span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Purist Concierge Discount (10%)</span>
                        <span>-${(subtotal * discount).toFixed(2)} USD</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-500">
                      <span>Worldwide Courier</span>
                      <span className="text-emerald-600 font-semibold">Complimentary</span>
                    </div>

                    <div className="flex justify-between text-neutral-500">
                      <span>Acoustic Calibration Certificate</span>
                      <span className="text-neutral-950 font-medium">Included</span>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline">
                      <div>
                        <div className="text-xs font-mono uppercase text-neutral-600 font-semibold">
                          Total Investment
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          Import duties & taxes included
                        </div>
                      </div>
                      <div className="text-3xl font-light text-neutral-950 tracking-tight">
                        ${finalTotal.toFixed(2)}{" "}
                        <span className="text-xs font-mono text-neutral-400">USD</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="space-y-1.5 pt-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Concierge code (e.g. PURIST10)"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono uppercase text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:scale-[0.97] text-neutral-800 text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <div className="text-[11px] font-mono text-red-500">{promoError}</div>
                    )}
                    {promoApplied && (
                      <div className="text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Concierge privilege applied: 10% discount</span>
                      </div>
                    )}
                  </form>

                  {/* Primary Checkout CTA */}
                  <div className="pt-2 space-y-3">
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full inline-flex items-center justify-center gap-2.5 rounded-full py-4 px-8 bg-neutral-950 hover:bg-neutral-800 active:scale-[0.99] text-white font-bold text-base tracking-tight transition-all duration-200 shadow-lg cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Processing Order...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-neutral-300" />
                          <span>Confirm Order — ${finalTotal.toFixed(2)} USD</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400">
                      <Lock className="w-3 h-3 text-neutral-400" />
                      <span>256-Bit SSL Encrypted • 30-Day Risk-Free Trial Period</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* What to pair with section */}
        {items.length > 0 && !orderComplete && (
          <div className="space-y-6 pt-12 border-t border-neutral-200/70">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                RECOMMENDED COMPANIONS
              </div>
              <h3 className="text-2xl font-bold text-neutral-950">
                Frequently Paired With Your Allocation
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recommendedItems.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-3xl p-1 bg-neutral-100/70 border border-neutral-200/80 flex flex-col justify-between"
                >
                  <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-5 flex flex-col justify-between h-full space-y-4">
                    <div className="relative aspect-square w-full rounded-xl bg-neutral-50 flex items-center justify-center p-4">
                      <Image
                        src={rec.variants[0].image}
                        alt={rec.name}
                        fill
                        unoptimized
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-neutral-400">
                        {rec.series}
                      </div>
                      <h4 className="text-sm font-bold text-neutral-950 truncate">
                        {rec.name}
                      </h4>
                      <div className="text-xs font-semibold text-neutral-900 mt-1">
                        ${rec.price} USD
                      </div>
                    </div>
                    <Link
                      href={`/products/${rec.slug}`}
                      className="w-full py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold text-center transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
