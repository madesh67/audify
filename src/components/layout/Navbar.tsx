"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, CircleUserRound, Menu } from "lucide-react";
import { soundEngine } from "@/utils/sound";
import AudifyLogo from "@/components/common/AudifyLogo";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/products/CartDrawer";
import AccountModal from "@/components/layout/AccountModal";
import MobileNavDrawer from "@/components/layout/MobileNavDrawer";

export default function Navbar() {
  const pathname = usePathname();
  const { lenis } = useLenis();
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const lastScrollYRef = useRef(0);
  const isHome = pathname === "/";

  // Sync category query parameter from URL for active nav indicators
  useEffect(() => {
    const updateCategoryFromUrl = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        setActiveCategory(params.get("category"));
      }
    };

    updateCategoryFromUrl();
    window.addEventListener("popstate", updateCategoryFromUrl);
    return () => window.removeEventListener("popstate", updateCategoryFromUrl);
  }, [pathname]);

  // Hide header when scrolling forward; only open when scrolling back
  useEffect(() => {
    if (!isHome) {
      setIsVisible(true);
      return;
    }

    const updateVisibility = (scrollY: number, direction?: number) => {
      const current = Math.max(0, scrollY);
      const prev = lastScrollYRef.current;
      const delta = current - prev;
      lastScrollYRef.current = current;

      // Always visible at the very top of the page (Hero)
      if (current <= 25) {
        setIsVisible(true);
        return;
      }

      // Direction tracking: 1 = forward/down, -1 = backward/up
      if (direction !== undefined && Math.abs(delta) > 2) {
        if (direction > 0) {
          setIsVisible(false); // Scroll forward -> close header
        } else if (direction < 0) {
          setIsVisible(true); // Scroll back -> open header
        }
        return;
      }

      // Delta threshold fallback
      if (delta > 4) {
        setIsVisible(false); // Scroll forward -> close header
      } else if (delta < -4) {
        setIsVisible(true); // Scroll back -> open header
      }
    };

    if (lenis) {
      const onLenisScroll = (e: { scroll: number; direction: number }) => {
        updateVisibility(e.scroll, e.direction);
      };
      lenis.on("scroll", onLenisScroll);
      return () => {
        lenis.off("scroll", onLenisScroll);
      };
    } else {
      const onNativeScroll = () => {
        updateVisibility(window.scrollY);
      };
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onNativeScroll);
      };
    }
  }, [isHome, lenis]);

  const handleAccountClick = () => {
    soundEngine.playClick(700);
    setIsAccountOpen(true);
  };

  const handleCartClick = () => {
    soundEngine.playClick(600);
    setIsDrawerOpen(true);
  };

  const handleToggleMobileMenu = () => {
    soundEngine.playClick(600);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    soundEngine.playClick(800);
    if (isHome) {
      e.preventDefault();
      // Ensure header remains visible at the top
      setIsVisible(true);
      lastScrollYRef.current = 0;

      // Instantly reset scroll to top without any reverse scrubbing
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

      // Signal Homepage to replay Preloader and reset canvas
      window.dispatchEvent(new CustomEvent("audify:reset-home"));
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  const handleNavClick = (category: string | null) => {
    soundEngine.playClick(600);
    setActiveCategory(category);
  };

  const shouldShowHeader =
    isVisible || isDrawerOpen || isAccountOpen || isMobileMenuOpen;

  const isHeadsetsActive =
    pathname.startsWith("/products") && activeCategory === "headsets";
  const isEarphonesActive =
    pathname.startsWith("/products") && activeCategory === "earphones";
  const isSpeakersActive =
    pathname.startsWith("/products") && activeCategory === "speakers";
  const isShopActive =
    pathname === "/products" && (!activeCategory || activeCategory === "all");
  const isAboutActive = pathname === "/about";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 py-3 sm:py-3.5 bg-[#FEFEFE]/85 backdrop-blur-md border-b border-neutral-200/60 shadow-xs select-none transition-all duration-300 ease-in-out ${
          shouldShowHeader
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between w-full relative">
          {/* Mobile & Tablet: Hamburger Navigation Toggle Button (Hidden on Desktop lg+) */}
          <div className="flex items-center lg:hidden z-10">
            <button
              type="button"
              onClick={handleToggleMobileMenu}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100/90 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <Menu className="w-5 h-5" strokeWidth={1.8} />
            </button>
          </div>

          {/* AUDIFY Brand Logo: Centered on Mobile & Tablet (<lg), Left-aligned on Desktop (lg+) */}
          <div className="flex items-center absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 z-10">
            {isHome ? (
              <button
                type="button"
                onClick={handleLogoClick}
                className="group inline-flex items-center gap-1.5 sm:gap-2.5 cursor-pointer text-left focus-visible:outline-none"
                aria-label="AUDIFY Home"
              >
                <span className="inline-flex items-center text-lg sm:text-2xl lg:text-2xl xl:text-3xl font-black tracking-[-0.04em] uppercase text-neutral-950">
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
                onClick={handleLogoClick}
                className="group inline-flex items-center gap-1.5 sm:gap-2.5 cursor-pointer focus-visible:outline-none"
                aria-label="AUDIFY Home"
              >
                <span className="inline-flex items-center text-lg sm:text-2xl lg:text-2xl xl:text-3xl font-black tracking-[-0.04em] uppercase text-neutral-950">
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

          {/* Desktop Navigation Links (Centered, visible only on Desktop lg+) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
            {/* 1. Headsets */}
            <Link
              href="/products?category=headsets"
              onClick={() => handleNavClick("headsets")}
              className={`text-[12px] font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer py-1 ${
                isHeadsetsActive
                  ? "text-neutral-950 underline underline-offset-4 font-black"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
              aria-label="Headsets"
            >
              Headsets
            </Link>

            {/* 2. Wired Earphones */}
            <Link
              href="/products?category=earphones"
              onClick={() => handleNavClick("earphones")}
              className={`text-[12px] font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer py-1 ${
                isEarphonesActive
                  ? "text-neutral-950 underline underline-offset-4 font-black"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
              aria-label="Wired Earphones"
            >
              Wired Earphones
            </Link>

            {/* 3. Portable Speaker */}
            <Link
              href="/products?category=speakers"
              onClick={() => handleNavClick("speakers")}
              className={`text-[12px] font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer py-1 ${
                isSpeakersActive
                  ? "text-neutral-950 underline underline-offset-4 font-black"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
              aria-label="Portable Speaker"
            >
              Portable Speaker
            </Link>

            {/* 4. Shop (All Products) */}
            <Link
              href="/products"
              onClick={() => handleNavClick("all")}
              className={`text-[12px] font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer py-1 ${
                isShopActive
                  ? "text-neutral-950 underline underline-offset-4 font-black"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
              aria-label="Shop All Products"
            >
              Shop
            </Link>

            {/* 5. About Us */}
            <Link
              href="/about"
              onClick={() => handleNavClick(null)}
              className={`text-[12px] font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer py-1 ${
                isAboutActive
                  ? "text-neutral-950 underline underline-offset-4 font-black"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
              aria-label="About Us"
            >
              About Us
            </Link>
          </nav>

          {/* Top-Right: Actions (Account & Cart Logo Button) */}
          <div className="flex items-center gap-1 sm:gap-2.5 z-10">
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

      {/* Mobile & Tablet Navigation Sidebar Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        isHome={isHome}
        onLogoClick={handleLogoClick}
      />

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
