"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Minus, Plus, ShoppingCart, Sparkles, Trash2, X } from "lucide-react";
import confetti from "canvas-confetti";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";
import { useLenis } from "@/components/layout/SmoothScroll";

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, variantKey: string, delta: number) => void;
  onRemoveItem: (productId: string, variantKey: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();

  // Handle mounting and smooth entrance / exit transitions
  useEffect(() => {
    let animTimer: NodeJS.Timeout;
    if (isOpen) {
      setIsMounted(true);
      // Double-tick guarantees DOM attachment and layout paint before transition starts
      const frame = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setIsVisible(true);
        });
        return () => cancelAnimationFrame(frame2);
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setIsVisible(false);
      // Retain mounting until exit slide transition completes
      animTimer = setTimeout(() => {
        setIsMounted(false);
        setOrderComplete(false);
      }, 350);
      return () => clearTimeout(animTimer);
    }
  }, [isOpen]);

  // Lock body scroll and pause Lenis while drawer is open
  useEffect(() => {
    if (isMounted) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isMounted, lenis]);

  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  if (!isMounted) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClose = () => {
    soundEngine.playClick(500);
    onClose();
  };

  const handleCheckout = () => {
    soundEngine.playChime();
    setIsCheckingOut(true);

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0a0a0a", "#10b981", "#d4d4d8", "#e4e4e7"],
      });
    } catch {}

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1200);
  };

  const handleResetOrder = () => {
    setOrderComplete(false);
    handleClose();
  };

  // Touch Swipe to Dismiss (Physical touch gestures)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    if (diff > 0) {
      touchDeltaX.current = diff;
      if (drawerRef.current) {
        drawerRef.current.style.transform = `translateX(${diff}px)`;
        drawerRef.current.style.transition = "none";
      }
    }
  };

  const handleTouchEnd = () => {
    if (drawerRef.current) {
      drawerRef.current.style.transform = "";
      drawerRef.current.style.transition = "";
    }
    if (touchDeltaX.current > 75) {
      handleClose();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      className={`fixed inset-0 z-[120] flex justify-end select-none transition-all duration-300 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop: Smooth opacity & blur transition */}
      <div
        className={`fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity duration-350 ease-out ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        ref={drawerRef}
        data-lenis-prevent
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full max-w-md h-full bg-white shadow-[-28px_0_70px_-15px_rgba(0,0,0,0.2),-8px_0_25px_-5px_rgba(0,0,0,0.06)] z-10 flex flex-col justify-between border-l border-neutral-200/80 transform will-change-transform ${
          isVisible
            ? "translate-x-0 duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ease-drawer-in"
            : "translate-x-full duration-[320ms] ease-[cubic-bezier(0.32,0,0.67,0)] ease-drawer-out"
        }`}
      >
        {/* Mobile touch drag affordance bar */}
        <div className="sm:hidden w-12 h-1 rounded-full bg-neutral-200 self-center mt-2.5 mb-[-6px]" />

        {/* Top Header */}
        <div
          className={`p-6 border-b border-neutral-100 flex items-center justify-between transition-all duration-350 ease-out ${
            isVisible ? "opacity-100 translate-y-0 delay-75" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-neutral-800" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-950 tracking-tight">
                Cart
              </h3>
              <div className="text-[10px] font-mono uppercase text-neutral-400">
                {totalItemCount} {totalItemCount === 1 ? "Item" : "Items"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              onClick={handleClose}
              className="group/link px-3 py-1.5 rounded-full text-xs font-mono text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 flex items-center gap-1 transition-colors cursor-pointer"
              aria-label="View full cart details"
            >
              <span>Full View</span>
              <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>

            <button
              onClick={handleClose}
              className="group w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-950 flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            </button>
          </div>
        </div>

        {/* Middle Content: Items List or Order Complete */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderComplete ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-2">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-mono uppercase tracking-widest text-emerald-700">
                  <Sparkles className="w-3 h-3" />
                  <span>RESERVATION CONFIRMED</span>
                </div>
                <h4 className="text-xl font-bold text-neutral-950">
                  Welcome to the Audify Registry
                </h4>
                <p className="text-xs text-neutral-600 max-w-xs leading-relaxed">
                  Your custom build allocation has been queued. A personal acoustic concierge will dispatch tracking details within 24 hours.
                </p>
              </div>
              <button
                onClick={handleResetOrder}
                className="mt-6 px-6 py-3 rounded-full bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div
              className={`h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-neutral-400 transition-all duration-350 ease-out ${
                isVisible ? "opacity-100 scale-100 delay-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400">
                <ShoppingCart className="w-7 h-7 stroke-[1.4] text-neutral-300" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-neutral-800">
                  Your cart is empty
                </h4>
                <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                  Explore our audio instruments and add reference headphones, DACs, or accessories.
                </p>
              </div>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.variant.colorKey}`}
                style={{
                  transitionDelay: isVisible ? `${100 + index * 40}ms` : "0ms",
                }}
                className={`p-4 rounded-2xl bg-neutral-50 border border-neutral-100/90 flex gap-4 items-center transition-all duration-350 ease-out hover:border-neutral-200 hover:shadow-2xs ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                {/* Variant Image */}
                <div className="relative w-16 h-16 rounded-xl bg-white border border-neutral-200/60 shrink-0 p-1 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.variant.image}
                    alt={item.product.name}
                    fill
                    unoptimized
                    className="object-contain p-1"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-neutral-950 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] font-mono text-neutral-500 flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-2 h-2 rounded-full inline-block border border-black/10"
                      style={{ backgroundColor: item.variant.hex }}
                    />
                    <span>{item.variant.name}</span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-950 mt-2">
                    ${item.product.price}{" "}
                    <span className="text-[10px] font-mono text-neutral-400">
                      USD
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end justify-between h-full gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick(500);
                      onRemoveItem(item.product.id, item.variant.colorKey);
                    }}
                    className="text-neutral-400 hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-lg px-2 py-0.5 text-xs font-mono">
                    <button
                      onClick={() => {
                        soundEngine.playClick(600);
                        onUpdateQuantity(item.product.id, item.variant.colorKey, -1);
                      }}
                      className="hover:text-neutral-950 text-neutral-500 cursor-pointer p-1"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center font-bold text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        soundEngine.playClick(800);
                        onUpdateQuantity(item.product.id, item.variant.colorKey, 1);
                      }}
                      className="hover:text-neutral-950 text-neutral-500 cursor-pointer p-1"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout Box */}
        {!orderComplete && items.length > 0 && (
          <div
            className={`p-6 border-t border-neutral-100 bg-neutral-50/60 space-y-4 transition-all duration-350 ease-out ${
              isVisible ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-3"
            }`}
          >
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-neutral-500 font-mono text-[11px]">
                <span>Worldwide Courier</span>
                <span className="text-emerald-600 font-semibold">Complimentary (2-Day)</span>
              </div>
              <div className="flex justify-between text-neutral-500 font-mono text-[11px]">
                <span>Warranty & 30-Day Trial</span>
                <span className="text-neutral-950 font-medium">Included</span>
              </div>
              <div className="pt-2 border-t border-neutral-200/70 flex justify-between items-baseline">
                <span className="text-xs font-mono uppercase text-neutral-600">
                  Total Investment
                </span>
                <div className="text-2xl font-light text-neutral-950 tracking-tight">
                  ${total}{" "}
                  <span className="text-xs font-mono text-neutral-400">USD</span>
                </div>
              </div>
            </div>

            {/* Complete Reservation CTA */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-full py-3.5 px-6 bg-neutral-950 hover:bg-neutral-800 active:scale-[0.98] text-white font-bold text-sm tracking-tight transition-all duration-200 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            >
              {isCheckingOut ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Allocating Build...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-neutral-300" />
                  <span>Confirm Order — ${total} USD</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] font-mono text-neutral-400">
              Encrypted with 256-Bit SSL • 30-Day Risk-Free Trial Period
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
