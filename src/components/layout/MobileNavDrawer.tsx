"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  X,
  Headphones,
  AudioLines,
  Speaker,
  LayoutGrid,
  Compass,
  CircleUserRound,
  ShoppingCart,
  Volume2,
  VolumeX,
  ChevronRight,
} from "lucide-react";
import AudifyLogo from "@/components/common/AudifyLogo";
import { soundEngine } from "@/utils/sound";
import { useLenis } from "@/components/layout/SmoothScroll";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAccount: () => void;
  onOpenCart: () => void;
  cartCount: number;
  pathname: string;
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  isHome: boolean;
  onLogoClick: (e: React.MouseEvent) => void;
}

export default function MobileNavDrawer({
  isOpen,
  onClose,
  onOpenAccount,
  onOpenCart,
  cartCount,
  pathname,
  activeCategory,
  onSelectCategory,
  isHome,
  onLogoClick,
}: MobileNavDrawerProps) {
  const [soundEnabled, setSoundEnabled] = useState(soundEngine.enabled);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const { lenis } = useLenis();

  // Sync body scroll & Lenis lock
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, lenis]);

  // ESC key dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        soundEngine.playClick(500);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Swipe left to close gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    // User swiped left by > 50px
    if (touchDeltaX.current < -50) {
      touchStartX.current = null;
      soundEngine.playClick(500);
      onClose();
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const handleLinkClick = (category: string | null) => {
    soundEngine.playClick(600);
    onSelectCategory(category);
    onClose();
  };

  const handleToggleSound = () => {
    const nextState = soundEngine.toggle();
    setSoundEnabled(nextState);
    if (nextState) {
      soundEngine.playChime();
    }
  };

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
      {/* Backdrop Blur Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-neutral-950/45 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          soundEngine.playClick(500);
          onClose();
        }}
        aria-hidden="true"
      />

      {/* Slide-over Sidebar Drawer */}
      <aside
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-0 bottom-0 left-0 z-50 w-[85vw] max-w-[340px] sm:max-w-[380px] bg-[#FEFEFE] text-neutral-950 shadow-2xl border-r border-neutral-200/80 flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-neutral-200/70">
          <button
            type="button"
            onClick={(e) => {
              onLogoClick(e);
              onClose();
            }}
            className="group inline-flex items-center gap-1.5 cursor-pointer text-left focus-visible:outline-none"
            aria-label="AUDIFY Home"
          >
            <span className="inline-flex items-center text-xl font-black tracking-[-0.04em] uppercase text-neutral-950">
              <AudifyLogo
                className="h-[0.92em] w-auto inline-block -translate-y-[0.02em] mr-[0.04em]"
                chevronColor="#0A0A0A"
                barColor="#0A0A0A"
              />
              <span>UDIFY</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(500);
              onClose();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Scrollable Nav Content */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Section: Acoustic Collections (Headsets, Wired Earphones, Portable Speaker) */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              Collections
            </div>
            <div className="space-y-1">
              {/* 1. Headsets */}
              <Link
                href="/products?category=headsets"
                onClick={() => handleLinkClick("headsets")}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer active:scale-[0.99] ${
                  isHeadsetsActive
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isHeadsetsActive
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200/80"
                    }`}
                  >
                    <Headphones className="w-4.5 h-4.5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">Headsets</div>
                    <div
                      className={`text-[11px] ${
                        isHeadsetsActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      Reference Wireless &amp; Over-Ear
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isHeadsetsActive
                        ? "bg-neutral-800 text-neutral-300"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    8
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isHeadsetsActive ? "text-neutral-300" : "text-neutral-400"
                    }`}
                  />
                </div>
              </Link>

              {/* 2. Wired Earphones */}
              <Link
                href="/products?category=earphones"
                onClick={() => handleLinkClick("earphones")}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer active:scale-[0.99] ${
                  isEarphonesActive
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isEarphonesActive
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200/80"
                    }`}
                  >
                    <AudioLines className="w-4.5 h-4.5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">Wired Earphones</div>
                    <div
                      className={`text-[11px] ${
                        isEarphonesActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      Precision In-Ear Monitors
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isEarphonesActive
                        ? "bg-neutral-800 text-neutral-300"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    3
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isEarphonesActive ? "text-neutral-300" : "text-neutral-400"
                    }`}
                  />
                </div>
              </Link>

              {/* 3. Portable Speaker */}
              <Link
                href="/products?category=speakers"
                onClick={() => handleLinkClick("speakers")}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer active:scale-[0.99] ${
                  isSpeakersActive
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSpeakersActive
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200/80"
                    }`}
                  >
                    <Speaker className="w-4.5 h-4.5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">Portable Speaker</div>
                    <div
                      className={`text-[11px] ${
                        isSpeakersActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      Spatial High-Output Audio
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSpeakersActive
                        ? "bg-neutral-800 text-neutral-300"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    3
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isSpeakersActive ? "text-neutral-300" : "text-neutral-400"
                    }`}
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Section: General Navigation (Shop / All Products, About Us) */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              Explore
            </div>
            <div className="space-y-1">
              {/* All Products / Shop */}
              <Link
                href="/products"
                onClick={() => handleLinkClick("all")}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer active:scale-[0.99] ${
                  isShopActive
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isShopActive
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200/80"
                    }`}
                  >
                    <LayoutGrid className="w-4.5 h-4.5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">All Products</div>
                    <div
                      className={`text-[11px] ${
                        isShopActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      Complete Acoustic Catalog
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                    isShopActive ? "text-neutral-300" : "text-neutral-400"
                  }`}
                />
              </Link>

              {/* About Us */}
              <Link
                href="/about"
                onClick={() => handleLinkClick(null)}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer active:scale-[0.99] ${
                  isAboutActive
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isAboutActive
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200/80"
                    }`}
                  >
                    <Compass className="w-4.5 h-4.5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">About Us</div>
                    <div
                      className={`text-[11px] ${
                        isAboutActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      Philosophy, Sound Lab &amp; Craft
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                    isAboutActive ? "text-neutral-300" : "text-neutral-400"
                  }`}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-neutral-200/70 bg-neutral-50/70 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {/* Account Quick Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAccount();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-neutral-200/80 text-xs font-semibold text-neutral-800 hover:text-neutral-950 hover:border-neutral-300 active:scale-95 transition-all cursor-pointer shadow-2xs"
            >
              <CircleUserRound className="w-4 h-4" strokeWidth={1.8} />
              <span>Account</span>
            </button>

            {/* Cart Quick Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.8} />
              <span>Cart ({cartCount})</span>
            </button>
          </div>

          {/* Sound Experience & Brand Tag */}
          <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-neutral-500">
            <button
              type="button"
              onClick={handleToggleSound}
              className="inline-flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Audio: Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Audio: Muted</span>
                </>
              )}
            </button>

            <span className="text-[10px] tracking-wider uppercase text-neutral-400">
              Kyoto &bull; Zurich
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
