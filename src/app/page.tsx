"use client";

import React, { useState, useCallback, useEffect } from "react";
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
  const [preloaderKey, setPreloaderKey] = useState(0);
  const [canvasKey, setCanvasKey] = useState(0);

  const handleProgressUpdate = useCallback((prog: PreloadProgress) => {
    setPreloadProgress((prev) => {
      if (prev.percentage === prog.percentage && prev.loaded === prog.loaded) {
        return prev;
      }
      return prog;
    });
  }, []);

  // Listen to audify:reset-home event triggered by clicking header logo
  useEffect(() => {
    const handleResetHome = () => {
      // 1. Instantly jump scroll position to 0 (no reverse scrub animation)
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

      // 2. Remount Preloader so the kinetic logo & equalizer loading animation plays fresh
      setPreloaderKey((prev) => prev + 1);

      // 3. Remount ScrollCanvas so the canvas and hero stage initialize clean at Frame 1
      setCanvasKey((prev) => prev + 1);
    };

    window.addEventListener("audify:reset-home", handleResetHome);
    return () => window.removeEventListener("audify:reset-home", handleResetHome);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#FEFEFE] text-neutral-950">
      {/* 382-Frame Preloader with dynamic key for clean replay on logo click */}
      <Preloader key={preloaderKey} progress={preloadProgress} />

      {/* Floating Island Navigation */}
      <Navbar />

      {/* Continuous Pinned Scroll Canvas: Headset Fitting -> Headset Features -> Variant Chooser Dock */}
      <div id="canvas-scroll" className="relative w-full">
        <ScrollCanvas key={canvasKey} onProgressUpdate={handleProgressUpdate} />
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
