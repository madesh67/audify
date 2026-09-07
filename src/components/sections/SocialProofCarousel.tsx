"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { soundEngine } from "@/utils/sound";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  publication: string;
  badge: string;
}

const testimonials: Testimonial[] = [
  {
    id: "wired",
    quote:
      "The standard by which all flagship headphones will now be judged. Unflinching acoustic clarity.",
    author: "Julian Vance",
    role: "Lead Hardware Editor",
    publication: "WIRED",
    badge: "9.8 / 10 EDITOR'S CHOICE",
  },
  {
    id: "sos",
    quote:
      "A triumph of industrial design and acoustic transparency. Every micro-detail in the soundstage feels tangible.",
    author: "Marcus Sterling",
    role: "Technical Director",
    publication: "SOUND ON SOUND",
    badge: "REFERENCE GOLD SEAL",
  },
  {
    id: "grammy",
    quote:
      "Listening through the Audify chassis is like sitting in the center of an acoustically perfected mastering suite.",
    author: "Elena Rostova",
    role: "Grammy-Winning Mix Engineer",
    publication: "RECORDING ACADEMY",
    badge: "MASTERING STANDARD",
  },
  {
    id: "verge",
    quote:
      "Audify didn't just build a wireless headset. They engineered an heirloom mechanical sound sculpture.",
    author: "David Chen",
    role: "Senior Tech Critic",
    publication: "THE VERGE",
    badge: "BEST AUDIO GEAR 2026",
  },
  {
    id: "pitchfork",
    quote:
      "The cryogenic titanium baffle system eliminates harmonic resonance entirely. It breathes new life into analog recordings.",
    author: "Chloe St. Claire",
    role: "Acoustics Analyst",
    publication: "PITCHFORK LABS",
    badge: "BENCHMARK DISTINCTION",
  },
];

export default function SocialProofCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggableInstanceRef = useRef<Draggable[] | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(Draggable);

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    let totalWidth = track.scrollWidth - container.clientWidth;
    if (totalWidth < 0) totalWidth = 0;

    const draggables = Draggable.create(track, {
      type: "x",
      bounds: {
        minX: -totalWidth,
        maxX: 0,
      },
      edgeResistance: 0.75,
      cursor: "grab",
      activeCursor: "grabbing",
      onDragStart: () => setIsDragging(true),
      onDragEnd: function () {
        setIsDragging(false);
        soundEngine.playClick(500);
        // Calculate closest slide
        const progress = Math.abs(this.x) / (totalWidth || 1);
        const idx = Math.min(
          testimonials.length - 1,
          Math.max(0, Math.round(progress * (testimonials.length - 1)))
        );
        setActiveIndex(idx);
      },
      onDrag: function () {
        const progress = Math.abs(this.x) / (totalWidth || 1);
        const idx = Math.min(
          testimonials.length - 1,
          Math.max(0, Math.round(progress * (testimonials.length - 1)))
        );
        setActiveIndex(idx);
      },
    });

    draggableInstanceRef.current = draggables;

    const handleResize = () => {
      if (!track || !container || !draggableInstanceRef.current?.[0]) return;
      const newTotal = track.scrollWidth - container.clientWidth;
      draggableInstanceRef.current[0].applyBounds({
        minX: -Math.max(0, newTotal),
        maxX: 0,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      draggables.forEach((d) => d.kill());
    };
  }, []);

  const slideTo = (index: number) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    soundEngine.playClick(620);
    const targetCard = track.children[index] as HTMLElement;
    if (!targetCard) return;

    const targetX = -targetCard.offsetLeft;
    const totalWidth = track.scrollWidth - container.clientWidth;
    const clampedX = Math.max(-totalWidth, Math.min(0, targetX));

    gsap.to(track, {
      x: clampedX,
      duration: 0.7,
      ease: "power3.out",
      onUpdate: () => {
        if (draggableInstanceRef.current?.[0]) {
          draggableInstanceRef.current[0].update();
        }
      },
      onComplete: () => {
        setActiveIndex(index);
      },
    });
  };

  return (
    <section className="relative w-full pt-10 md:pt-14 pb-24 md:pb-32 bg-[#FEFEFE] text-neutral-950 overflow-hidden border-t border-neutral-200/60 select-none">
      {/* Editorial Background Accent */}
      <div className="absolute top-12 right-12 text-[12vw] font-black text-neutral-950/[0.03] leading-none pointer-events-none font-serif">
        CRITIQUE
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header with Ample Whitespace */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-600">
              <Quote className="w-3 h-3 text-neutral-500" />
              <span>ACCLAIM & REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
              ACOUSTIC HONESTY.
            </h2>
          </div>

          {/* Navigation & Drag Indicator */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
              <span>{isDragging ? "DRAGGING" : "DRAG HORIZONTALLY"}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => slideTo(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous Testimonial"
                className="w-12 h-12 rounded-full border border-neutral-200 bg-white shadow-sm flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-50 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  slideTo(Math.min(testimonials.length - 1, activeIndex + 1))
                }
                disabled={activeIndex === testimonials.length - 1}
                aria-label="Next Testimonial"
                className="w-12 h-12 rounded-full border border-neutral-200 bg-white shadow-sm flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-50 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Track Container */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing px-6 sm:px-10 lg:px-12"
      >
        <div
          ref={trackRef}
          className="inline-flex gap-8 md:gap-12 pb-8 will-change-transform"
        >
          {testimonials.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.id}
                className={`relative w-[85vw] sm:w-[650px] md:w-[780px] shrink-0 rounded-[2.5rem] p-1.5 transition-all duration-500 ${
                  isActive
                    ? "bg-neutral-200/70 ring-1 ring-neutral-300 shadow-xl"
                    : "bg-neutral-100/60 ring-1 ring-neutral-200/60 opacity-60 hover:opacity-90"
                }`}
              >
                {/* Inner Core */}
                <div className="rounded-[calc(2.5rem-0.375rem)] bg-white p-8 sm:p-12 md:p-16 flex flex-col justify-between h-[420px] sm:h-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  {/* Badge & Publication */}
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700">
                      {item.badge}
                    </span>
                    <span className="text-neutral-400 tracking-widest uppercase font-semibold">
                      {item.publication}
                    </span>
                  </div>

                  {/* Oversized Typography Quote */}
                  <blockquote className="my-auto">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 tracking-tight leading-[1.25]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author Meta */}
                  <div className="pt-6 border-t border-neutral-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-base font-bold text-neutral-950">
                        {item.author}
                      </div>
                      <div className="text-xs text-neutral-500 font-mono">
                        {item.role}, {item.publication}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-neutral-400">
                      0{index + 1} / 0{testimonials.length}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Dots Indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => slideTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 rounded-full ${
                idx === activeIndex
                  ? "w-10 bg-neutral-950"
                  : "w-2 bg-neutral-200 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        <div className="text-xs font-mono text-neutral-400">
          SWIPE OR DRAG TRACK
        </div>
      </div>
    </section>
  );
}
