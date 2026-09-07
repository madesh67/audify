"use client";

import React from "react";
import { soundEngine } from "@/utils/sound";
import { ArrowUpRight } from "lucide-react";
import AudifyLogo from "@/components/common/AudifyLogo";
import { useLenis } from "@/components/layout/SmoothScroll";

export default function Navbar() {
  const { scrollTo } = useLenis();

  return (
    <header className="fixed top-0 inset-x-0 z-50 py-5 sm:py-6 md:py-8 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between w-full">
        {/* Top-Left: Audify Brand Logo (Spectrogram Monogram + Wordmark) */}
        <div className="flex items-center pointer-events-auto">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundEngine.playClick(800);
            scrollTo(0, { duration: 1.2 });
          }}
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
        </a>
      </div>

      {/* Top-Right: Navigation Links & "Buy Ultra" Button */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pointer-events-auto">
        {/* Shop Nav Link */}
        <a
          href="#variant-chooser"
          onClick={(e) => {
            e.preventDefault();
            soundEngine.playClick(600);
            scrollTo("#variant-chooser", { duration: 1.2 });
          }}
          className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-neutral-800 hover:text-neutral-950 cursor-pointer"
          aria-label="Shop"
        >
          Shop
        </a>

        {/* About Us Nav Link */}
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

        {/* Buy Ultra Button */}
        <a
          href="#variant-chooser"
          onClick={(e) => {
            e.preventDefault();
            soundEngine.playClick(900);
            scrollTo("#variant-chooser", { duration: 1.2 });
          }}
          className="inline-flex items-center gap-1.5 sm:gap-2 pl-3.5 sm:pl-5 pr-2.5 sm:pr-3.5 py-1.5 sm:py-2.5 rounded-full bg-neutral-950 text-white border border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.18)] hover:bg-neutral-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer"
          aria-label="Buy Audify Ultra"
        >
          <span>Buy Ultra</span>
          <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-neutral-400" />
        </a>
      </div>
    </div>
  </header>
  );
}



