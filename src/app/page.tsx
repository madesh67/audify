"use client";

import React, { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/common/Preloader";
import ScrollCanvas from "@/components/canvas/ScrollCanvas";
import SocialReviewCanvas from "@/components/sections/SocialReviewCanvas";
import Footer from "@/components/sections/Footer";
import { PreloadProgress, TOTAL_FRAMES } from "@/utils/preloader";

export default function Home() {
  const [preloadProgress, setPreloadProgress] = useState<PreloadProgress>({
    loaded: 0,
    total: TOTAL_FRAMES,
    percentage: 0,
    isReady: false,
    phase: "assemble",
  });

  const handleProgressUpdate = useCallback((prog: PreloadProgress) => {
    setPreloadProgress((prev) => {
      if (prev.percentage === prog.percentage && prev.loaded === prog.loaded) {
        return prev;
      }
      return prog;
    });
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#FEFEFE] text-neutral-950">
      {/* 382-Frame Preloader */}
      <Preloader progress={preloadProgress} />

      {/* Floating Island Navigation */}
      <Navbar />

      {/* Continuous Pinned Scroll Canvas: Headset Fitting -> Headset Features -> Variant Chooser Dock */}
      <div id="canvas-scroll" className="relative w-full">
        <ScrollCanvas onProgressUpdate={handleProgressUpdate} />
      </div>

      {/* Creative Social Media Review Canvas */}
      <div id="social-proof">
        <SocialReviewCanvas />
      </div>

      {/* Minimalist Footer & Giant Magnetic "Buy Now" CTA */}
      <Footer />
    </main>
  );
}
