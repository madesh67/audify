"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { soundEngine } from "@/utils/sound";
import { ArrowUpRight } from "lucide-react";
import AudifyLogo from "@/components/common/AudifyLogo";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollTo } = useLenis();
  const { totalCount } = useCart();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 pointer-events-none select-none ${
        isScrolled
          ? "py-3.5 bg-[#FEFEFE]/85 backdrop-blur-md border-b border-neutral-200/60 shadow-xs"
          : "py-5 sm:py-6 md:py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between w-full">
        {/* Top-Left: Audify Brand Logo (Spectrogram Monogram + Wordmark) */}
        <div className="flex items-center pointer-events-auto">
          {isHome ? (
            <button
              onClick={() => {
                soundEngine.playClick(800);
                scrollTo(0, { duration: 1.2 });
              }}
              className="group inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer text-left"
              aria-label="AUDIFY Home"
            >
              <span className="inline-flex items-center text-xl sm:text-2xl md:text-3xl font-black tracking-[-0.04em] uppercase text-neutral-950">
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
              className="group inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer"
              aria-label="AUDIFY Home"
            >
              <span className="inline-flex items-center text-xl sm:text-2xl md:text-3xl font-black tracking-[-0.04em] uppercase text-neutral-950">
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

        {/* Top-Right: Navigation Links & "Buy Ultra" Button */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pointer-events-auto">
          {/* Shop Nav Link */}
          <Link
            href="/products"
            onClick={() => soundEngine.playClick(600)}
            className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer ${
              pathname === "/products"
                ? "text-neutral-950 underline underline-offset-4"
                : "text-neutral-800 hover:text-neutral-950"
            }`}
            aria-label="Shop"
          >
            Shop
          </Link>

          {/* About Us Nav Link */}
          {isHome ? (
            <a
              href="#social-proof"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playClick(600);
                scrollTo("#social-proof", { duration: 1.2 });
              }}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-neutral-800 hover:text-neutral-950 cursor-pointer"
              aria-label="About Us"
            >
              About Us
            </a>
          ) : (
            <Link
              href="/#social-proof"
              onClick={() => soundEngine.playClick(600)}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-neutral-800 hover:text-neutral-950 cursor-pointer"
              aria-label="About Us"
            >
              About Us
            </Link>
          )}

          {/* Cart Nav Link */}
          <Link
            href="/cart"
            onClick={() => soundEngine.playClick(600)}
            className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer ${
              pathname === "/cart"
                ? "text-neutral-950 underline underline-offset-4"
                : "text-neutral-800 hover:text-neutral-950"
            }`}
            aria-label={`Cart with ${totalCount} items`}
          >
            <span>Cart</span>
            {totalCount > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-neutral-950 text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Buy Ultra / Catalog Primary Action Button */}
          <Link
            href={isHome ? "#variant-chooser" : "/products"}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                soundEngine.playClick(900);
                scrollTo("#variant-chooser", { duration: 1.2 });
              } else {
                soundEngine.playClick(900);
              }
            }}
            className="inline-flex items-center gap-1.5 sm:gap-2 pl-3.5 sm:pl-5 pr-2.5 sm:pr-3.5 py-1.5 sm:py-2.5 rounded-full bg-neutral-950 text-white border border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.18)] hover:bg-neutral-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer"
            aria-label="Buy Audify Ultra"
          >
            <span>Buy Ultra</span>
            <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-neutral-400" />
          </Link>
        </div>
      </div>
    </header>
  );
}



