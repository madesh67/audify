"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { PreloadProgress } from "@/utils/preloader";

interface PreloaderProps {
  progress: PreloadProgress;
  onFinished?: () => void;
}

// 5 Default Concept C Spectrogram Equalizer Bars
const EQUALIZER_BARS = [
  { x: 430, fullY: 310, w: 18, fullH: 20, minH: 12, maxH: 26 },
  { x: 462, fullY: 302, w: 18, fullH: 36, minH: 20, maxH: 42 },
  { x: 494, fullY: 293, w: 18, fullH: 54, minH: 28, maxH: 62 },
  { x: 526, fullY: 302, w: 18, fullH: 36, minH: 20, maxH: 42 },
  { x: 558, fullY: 310, w: 18, fullH: 20, minH: 12, maxH: 26 },
];

const REMAINING_LETTERS = ["U", "D", "I", "F", "Y"];

export default function Preloader({ progress, onFinished }: PreloaderProps) {
  const containerRef = useRef<HTMLElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGPathElement>(null);
  const barsRef = useRef<(SVGRectElement | null)[]>([]);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [isVisible, setIsVisible] = useState(true);
  const hasFinishedRef = useRef(false);
  const animationReadyRef = useRef(false);
  const assetsReadyRef = useRef(false);

  // Dismiss transition
  const dismiss = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (!containerRef.current) {
      setIsVisible(false);
      onFinished?.();
      return;
    }

    // Ensure all wordmark letters are fully visible immediately if dismissing
    const validLetters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (validLetters.length > 0) {
      gsap.set(validLetters, { y: 0, opacity: 1 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onFinished?.();
      },
    });

    if (logoContainerRef.current) {
      tl.to(
        logoContainerRef.current,
        {
          y: -16,
          scale: 1.03,
          opacity: 0,
          duration: 0.40,
          ease: "power2.in",
        },
        0
      );
    }

    tl.to(
      containerRef.current,
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.55,
        ease: "power4.inOut",
      },
      "-=0.18"
    );
  }, [onFinished]);

  // Creative Acoustic Genesis Brand Motion
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Initial setups
      const chevronLen = 620;
      if (chevronRef.current) {
        chevronRef.current.style.strokeDasharray = `${chevronLen}`;
        chevronRef.current.style.strokeDashoffset = `${chevronLen}`;
        gsap.set(chevronRef.current, { opacity: 0 });
      }

      const validBars = barsRef.current.filter(Boolean) as SVGRectElement[];
      validBars.forEach((b) => {
        gsap.set(b, { attr: { y: 320, height: 0 }, opacity: 0 });
      });

      const validLetters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
      validLetters.forEach((l) => {
        gsap.set(l, { y: 8, opacity: 0 });
      });

      // 2. Act 1: The Sonic Ping (Symmetrical Equalizer Awakening at y=320)
      // Center apex bar (index 2) expands first with a crisp resonant pop
      if (validBars[2]) {
        tl.to(
          validBars[2],
          {
            attr: { y: EQUALIZER_BARS[2].fullY, height: EQUALIZER_BARS[2].fullH },
            opacity: 1,
            duration: 0.28,
            ease: "power2.out",
          },
          0.05
        );
      }

      // Symmetrically radiate to inner flanking bars (1 & 3)
      [1, 3].forEach((idx) => {
        const barEl = validBars[idx];
        if (barEl) {
          tl.to(
            barEl,
            {
              attr: { y: EQUALIZER_BARS[idx].fullY, height: EQUALIZER_BARS[idx].fullH },
              opacity: 1,
              duration: 0.26,
              ease: "power2.out",
            },
            0.12
          );
        }
      });

      // Symmetrically radiate to outer flanking bars (0 & 4)
      [0, 4].forEach((idx) => {
        const barEl = validBars[idx];
        if (barEl) {
          tl.to(
            barEl,
            {
              attr: { y: EQUALIZER_BARS[idx].fullY, height: EQUALIZER_BARS[idx].fullH },
              opacity: 1,
              duration: 0.26,
              ease: "power2.out",
            },
            0.19
          );
        }
      });

      // 3. Act 2: Continuous Chevron Arch Sweep (encircles the sound wave)
      if (chevronRef.current) {
        tl.to(
          chevronRef.current,
          {
            opacity: 1,
            duration: 0.12,
            ease: "power1.in",
          },
          0.28
        );
        tl.to(
          chevronRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.52,
            ease: "power2.inOut",
          },
          0.28
        );
      }

      // 4. Act 3: Wordmark Kinetic Reveal (Smooth harmonic entrance)
      if (validLetters.length > 0) {
        tl.to(
          validLetters,
          {
            y: 0,
            opacity: 1,
            duration: 0.36,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.58
        );
      }

      // 5. Act 4: Hypnotic Traveling Waveform across all 5 bars
      validBars.forEach((bar, i) => {
        if (!bar) return;
        const spec = EQUALIZER_BARS[i];
        const delay = 0.5 + i * 0.08;

        gsap.to(bar, {
          attr: {
            y: 320 - spec.maxH / 2,
            height: spec.maxH,
          },
          duration: 0.65,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Guarantee minimum duration for logo animation to unfold (~1.4s)
  useEffect(() => {
    const minAnimTimer = setTimeout(() => {
      animationReadyRef.current = true;
      if (assetsReadyRef.current) {
        dismiss();
      }
    }, 1400);

    return () => clearTimeout(minAnimTimer);
  }, [dismiss]);

  // Asset readiness trigger
  useEffect(() => {
    if ((progress.isReady || progress.percentage >= 25) && !hasFinishedRef.current) {
      assetsReadyRef.current = true;
      if (animationReadyRef.current) {
        dismiss();
      }
    }
  }, [progress.isReady, progress.percentage, dismiss]);

  // Safety fallback timer: 2.2s max
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      dismiss();
    }, 2200);
    return () => clearTimeout(safetyTimer);
  }, [dismiss]);

  // Immediate dismiss on user intent
  useEffect(() => {
    const handleUserIntent = () => {
      dismiss();
    };
    window.addEventListener("wheel", handleUserIntent, { passive: true, once: true });
    window.addEventListener("touchstart", handleUserIntent, { passive: true, once: true });
    window.addEventListener("keydown", handleUserIntent, { once: true });
    return () => {
      window.removeEventListener("wheel", handleUserIntent);
      window.removeEventListener("touchstart", handleUserIntent);
      window.removeEventListener("keydown", handleUserIntent);
    };
  }, [dismiss]);

  if (!isVisible) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Experience loading screen"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FEFEFE] text-neutral-950 select-none pointer-events-auto overflow-hidden"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      {/* Centerpiece: Clean Gallery Monogram + Wordmark */}
      <div
        ref={logoContainerRef}
        className="relative z-10 flex items-center justify-center text-center px-4"
      >
        {/* The Wordmark: [Logo 'A'] + "UDIFY" */}
        <div className="flex items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-neutral-950 tracking-[-0.04em] leading-none">
          {/* Kinetic Monogram 'A' SVG */}
          <svg
            viewBox="330 110 340 360"
            className="h-[0.92em] w-auto inline-block -translate-y-[0.02em] mr-[0.04em] overflow-visible select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Precision Chevron Arch */}
            <path
              ref={chevronRef}
              d="M370,430 L500,150 L630,430"
              stroke="#0A0A0A"
              strokeWidth={55}
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ strokeDasharray: 620, strokeDashoffset: 620, opacity: 0 }}
            />

            {/* 5 Spectrogram Equalizer Bars */}
            {EQUALIZER_BARS.map((bar, i) => (
              <rect
                key={i}
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                x={bar.x}
                y={320}
                width={bar.w}
                height={0}
                rx={6}
                fill="#0A0A0A"
                style={{ opacity: 0 }}
              />
            ))}
          </svg>

          {/* Kinetic Harmonic Reveal for Remaining Letters: U D I F Y */}
          <div className="inline-flex items-center">
            {REMAINING_LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={(el) => {
                  lettersRef.current[i] = el;
                }}
                className="inline-block will-change-transform"
                style={{
                  opacity: 0,
                  transform: "translateY(8px)",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
