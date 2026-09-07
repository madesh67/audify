"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ChevronLeft, ChevronRight, Activity, Award } from "lucide-react";
import { soundEngine } from "@/utils/sound";

interface ReviewItem {
  id: string;
  index: string;
  publication: string;
  score: string;
  award: string;
  quote: string;
  author: string;
  role: string;
  acousticsTested: string;
  labMeasurement: string;
}

const reviews: ReviewItem[] = [
  {
    id: "wired",
    index: "01",
    publication: "WIRED",
    score: "9.8 / 10",
    award: "EDITOR'S CHOICE",
    quote:
      "The standard by which all flagship headphones will now be judged. Unflinching acoustic clarity and spatial separation.",
    author: "Julian Vance",
    role: "Lead Hardware Editor",
    acousticsTested: "40mm Beryllium Transducer",
    labMeasurement: "5Hz – 48,000Hz Ultra-Wide Bandwidth",
  },
  {
    id: "sos",
    index: "02",
    publication: "SOUND ON SOUND",
    score: "GOLD SEAL",
    award: "REFERENCE CLASS",
    quote:
      "A triumph of industrial design and acoustic transparency. Every micro-detail in the soundstage feels physical and tangible.",
    author: "Marcus Sterling",
    role: "Technical Director",
    acousticsTested: "Acoustic Chamber Damping",
    labMeasurement: "<0.018% Total Harmonic Distortion",
  },
  {
    id: "grammy",
    index: "03",
    publication: "RECORDING ACADEMY",
    score: "MASTERING",
    award: "STUDIO STANDARD",
    quote:
      "Listening through the Audify chassis is like sitting in the center of an acoustically perfected mastering suite.",
    author: "Elena Rostova",
    role: "Grammy-Winning Mix Engineer",
    acousticsTested: "Cryogenic Titanium Enclosure",
    labMeasurement: "124 dB Signal-to-Noise Floor",
  },
  {
    id: "verge",
    index: "04",
    publication: "THE VERGE",
    score: "VERDICT 10",
    award: "BEST AUDIO GEAR 2026",
    quote:
      "Audify didn't just build a wireless headset. They engineered an heirloom mechanical sound sculpture.",
    author: "David Chen",
    role: "Senior Tech Critic",
    acousticsTested: "Memory Cushion Acoustic Seal",
    labMeasurement: "-38 dB Passive Isolation",
  },
  {
    id: "pitchfork",
    index: "05",
    publication: "PITCHFORK LABS",
    score: "9.6 / 10",
    award: "BENCHMARK DISTINCTION",
    quote:
      "The cryogenic titanium baffle system eliminates harmonic resonance entirely. It breathes new life into analog recordings.",
    author: "Chloe St. Claire",
    role: "Acoustics Analyst",
    acousticsTested: "Cryo-Treated Titanium Baffle",
    labMeasurement: "Linear Phase Impulse Response",
  },
];

export default function ParallaxLifestyle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeReview = reviews[activeIndex];

  // Auto-advance reviews every 7 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    soundEngine.playClick(600);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    soundEngine.playClick(500);
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSelect = (idx: number) => {
    soundEngine.playClick(600);
    setActiveIndex(idx);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!container || !image) return;

    const ctx = gsap.context(() => {
      // Smooth parallax on background image
      gsap.fromTo(
        image,
        { yPercent: -12, scale: 1.08 },
        {
          yPercent: 12,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Subtle float on content
      if (content) {
        gsap.fromTo(
          content,
          { y: 40, opacity: 0.9 },
          {
            y: -30,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 0.8,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="critical-acclaim"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[850px] lg:h-[120vh] overflow-hidden flex items-center select-none border-t border-neutral-200/60 bg-[#FEFEFE]"
    >
      {/* Parallax Background Image Container */}
      <div
        ref={imageRef}
        className="absolute inset-0 -top-[15%] w-full h-[130%] pointer-events-none will-change-transform"
      >
        <Image
          src="/images/lifestyle.jpg"
          alt="Audify Headset in Architectural Lifestyle Space"
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-[72%_center] lg:object-[68%_center]"
        />

        {/* Sophisticated Architectural Vignette: Dark on left for high-contrast reading, translucent on right to frame the model & headset */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/70 to-neutral-950/20 lg:from-neutral-950/95 lg:via-neutral-950/65 lg:to-transparent" />
        <div className="absolute inset-0 bg-neutral-950/25 backdrop-blur-[0.5px]" />
      </div>

      {/* Seamless edge blending to page background (#FEFEFE) */}
      <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#FEFEFE] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FEFEFE] to-transparent pointer-events-none z-10" />

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-20 will-change-transform"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Architectural Critical Acclaim Console (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Header Monogram & Award Eyebrow + Prev/Next Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[10px] font-mono tracking-[0.22em] uppercase text-white/90 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>CRITICAL ACCLAIM // ARCHIVAL AUDIT</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-[10px] font-mono tracking-wider uppercase text-amber-300">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{activeReview.score} · {activeReview.award}</span>
                </div>
              </div>

              {/* Prev / Next Pagination Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Review"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Review"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Editorial Review Quote */}
            <div className="relative">
              <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-white/20 mb-2" />
              <blockquote className="min-h-[110px] sm:min-h-[130px] flex items-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-light tracking-tight text-white leading-[1.2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  &ldquo;{activeReview.quote}&rdquo;
                </h2>
              </blockquote>
            </div>

            {/* Double-Bezel Critic & Acoustic Lab Measurement Card */}
            <div className="rounded-3xl p-1 bg-white/[0.08] border border-white/15 backdrop-blur-xl shadow-2xl">
              <div className="rounded-[calc(1.5rem-0.25rem)] bg-neutral-950/70 border border-white/10 p-4 sm:p-5 space-y-3.5">
                {/* Top Row: Reviewer Details + Visualizer Benchmark */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-white tracking-tight">
                      {activeReview.author}
                    </div>
                    <div className="font-mono text-xs text-neutral-400 mt-0.5">
                      {activeReview.role} ·{" "}
                      <span className="text-white font-semibold">
                        {activeReview.publication}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20 self-start sm:self-auto">
                    {/* Mini Spectrogram Pulse */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-2 bg-emerald-400" />
                      <span className="w-0.5 h-3 bg-emerald-400" />
                      <span className="w-0.5 h-1.5 bg-emerald-400" />
                      <span className="w-0.5 h-2.5 bg-emerald-400" />
                    </div>
                    <span>LAB BENCHMARK</span>
                  </div>
                </div>

                {/* Bottom Row: Key Acoustic Metrics */}
                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      SUBSYSTEM PRAISED
                    </div>
                    <div className="text-white font-medium mt-0.5 truncate">
                      {activeReview.acousticsTested}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      MEASURED TOLERANCE
                    </div>
                    <div className="text-emerald-400 font-semibold mt-0.5 truncate">
                      {activeReview.labMeasurement}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Publication Interactive Switcher Console (All 5 Inline) */}
            <div className="pt-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
              {reviews.map((r, idx) => {
                const isSelected = idx === activeIndex;
                const displayName =
                  r.publication === "RECORDING ACADEMY"
                    ? "REC. ACADEMY"
                    : r.publication === "PITCHFORK LABS"
                    ? "PITCHFORK"
                    : r.publication;

                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(idx)}
                    aria-label={`View review from ${r.publication}`}
                    className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase border cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-white text-neutral-950 font-bold border-white shadow-md"
                        : "bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white border-white/15"
                    }`}
                  >
                    <span className="opacity-50 mr-1">{r.index}</span>
                    <span>{displayName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: In-Situ Architectural Hotspot Overlay on the Headset (5 Cols) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-end justify-center pointer-events-none pr-4 -translate-y-20">
            <div className="flex items-center gap-3">
              {/* Concentric Radar Point */}
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-sm" />
                <span className="absolute w-5 h-5 rounded-full border border-emerald-400/50" />
              </div>

              {/* Minimalist Spec Tag */}
              <div className="rounded-2xl p-1 bg-white/10 border border-white/15 backdrop-blur-xl text-white shadow-2xl">
                <div className="rounded-xl bg-neutral-950/80 border border-white/10 px-4 py-2.5 space-y-0.5">
                  <div className="flex items-center justify-between gap-3 font-mono text-[9px] tracking-widest uppercase text-neutral-400">
                    <span className="text-emerald-400 font-bold">IN SITU SPEC</span>
                    <span>-38 dB ISOLATION</span>
                  </div>
                  <div className="text-xs font-semibold tracking-tight text-white">
                    Audify Ultra — Obsidian Onyx
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

