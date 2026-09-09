"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Minus, Plus, ShoppingCart, Sparkles, Trash2, X } from "lucide-react";
import confetti from "canvas-confetti";
import { Product, ProductVariant } from "@/data/products";
import { soundEngine } from "@/utils/sound";

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
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex justify-end select-none animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl z-10 flex flex-col justify-between border-l border-neutral-200">
        {/* Top Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
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

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-950 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
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
                className="mt-6 px-6 py-3 rounded-full bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-neutral-400">
              <ShoppingCart className="w-12 h-12 stroke-[1.2] text-neutral-300" />
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
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant.colorKey}`}
                className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex gap-4 items-center"
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
                    className="text-neutral-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
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
                      className="hover:text-neutral-950 text-neutral-500 cursor-pointer"
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
                      className="hover:text-neutral-950 text-neutral-500 cursor-pointer"
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
          <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
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
