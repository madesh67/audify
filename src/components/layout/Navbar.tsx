"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, CircleUserRound } from "lucide-react";
import { soundEngine } from "@/utils/sound";
import AudifyLogo from "@/components/common/AudifyLogo";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/products/CartDrawer";
import AccountModal from "@/components/layout/AccountModal";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollTo } = useLenis();
  const {
    items,
    totalCount,
    updateQuantity,
    removeItem,
    clearCart,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useCart();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const isHome = pathname === "/";

  const handleAccountClick = () => {
    soundEngine.playClick(700);
    setIsAccountOpen(true);
  };

  const handleCartClick = () => {
    soundEngine.playClick(600);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 py-3.5 bg-[#FEFEFE]/85 backdrop-blur-md border-b border-neutral-200/60 shadow-xs pointer-events-none select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 flex items-center justify-between w-full relative">
          {/* Top-Left: Audify Brand Logo (Spectrogram Monogram + Wordmark) */}
          <div className="flex items-center pointer-events-auto">
            {isHome ? (
              <button
                onClick={() => {
                  soundEngine.playClick(800);
                  scrollTo(0, { duration: 1.2 });
                }}
                className="group inline-flex items-center gap-1.5 sm:gap-2.5 cursor-pointer text-left"
                aria-label="AUDIFY Home"
              >
                <span className="inline-flex items-center text-lg sm:text-2xl md:text-3xl font-black tracking-[-0.04em] uppercase text-neutral-950">
                  <AudifyLogo
                    className="h-[0.92em] w-auto inline-block -translate-y-[0.02em] mr-[0.04em]"
                    chevronColor="#0A0A0A"
                    barColor="#0A0A0A"
                  />
                  <span>UDIFY</span>
                </span>
              </button>
            ) : (
              <Link
                href="/"
                onClick={() => soundEngine.playClick(800)}
                className="group inline-flex items-center gap-1.5 sm:gap-2.5 cursor-pointer"
                aria-label="AUDIFY Home"
              >
                <span className="inline-flex items-center text-lg sm:text-2xl md:text-3xl font-black tracking-[-0.04em] uppercase text-neutral-950">
                  <AudifyLogo
                    className="h-[0.92em] w-auto inline-block -translate-y-[0.02em] mr-[0.04em]"
                    chevronColor="#0A0A0A"
                    barColor="#0A0A0A"
                  />
                  <span>UDIFY</span>
                </span>
              </Link>
            )}
          </div>

          {/* Center: Navigation Links (Shop, About Us) */}
          <nav className="flex items-center gap-3.5 sm:gap-6 md:gap-9 pointer-events-auto absolute left-1/2 -translate-x-1/2">
            {/* Shop Nav Link */}
            <Link
              href="/products"
              onClick={() => soundEngine.playClick(600)}
              className={`text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-colors cursor-pointer ${
                pathname === "/products" || pathname.startsWith("/products/")
                  ? "text-neutral-950 underline underline-offset-4 font-black"
                  : "text-neutral-700 hover:text-neutral-950"
              }`}
              aria-label="Shop"
            >
              Shop
            </Link>

            {/* About Us Nav Link */}
            <Link
              href="/about"
              onClick={() => soundEngine.playClick(600)}
              className={`text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-colors cursor-pointer ${
                pathname === "/about"
                  ? "text-neutral-950 underline underline-offset-4 font-black"
                  : "text-neutral-700 hover:text-neutral-950"
              }`}
              aria-label="About Us"
            >
              About Us
            </Link>
          </nav>

          {/* Top-Right: Actions (Account & Cart Logo Button) */}
          <div className="flex items-center gap-1 sm:gap-2.5 pointer-events-auto">
            {/* Account Button */}
            <button
              type="button"
              onClick={handleAccountClick}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/90 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
              aria-label="Account"
              title="Account"
            >
              <CircleUserRound className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.8} />
            </button>

            {/* Cart Logo Button */}
            <button
              type="button"
              onClick={handleCartClick}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/90 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
              aria-label={`Open Cart (${totalCount} items)`}
              title="Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.8} />
              {totalCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] sm:min-w-[17px] sm:h-[17px] px-1 rounded-full bg-neutral-950 text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Sidebar Drawer */}
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />

      {/* Member Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </>
  );
}



