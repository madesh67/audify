"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Check,
  Compass,
  Cpu,
  Layers,
  Microscope,
  ShieldCheck,
  Sparkles,
  Volume2,
  Wrench,
  Zap,
} from "lucide-react";
import { soundEngine } from "@/utils/sound";

export default function AboutView() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedLocation, setCopiedLocation] = useState<string | null>(null);

  const handleCopyLocation = (loc: string) => {
    soundEngine.playChime();
    navigator.clipboard.writeText(loc);
    setCopiedLocation(loc);
    setTimeout(() => setCopiedLocation(null), 2000);
  };

  const laboratoryPhases = [
    {
      number: "01",
      title: "Finite Element Acoustic Dynamics",
      subtitle: "10,000+ Computational Airflow Cycles",
      description:
        "Before cutting a single gram of titanium, our computational acoustics team runs finite element fluid simulations. We map micro-cavity air compression, phase wave alignment, and rear exhaust pressure to eliminate standing waves mechanically.",
      badge: "Computational Physics",
      specs: ["±0.1% Aerodynamic Delta", "Zero Internal Turbulence", "Iso-Acoustic Modeling"],
    },
    {
      number: "02",
      title: "Cryogenic Nitrogen Quenching",
      subtitle: "-196°C Molecular Lattice Alignment",
      description:
        "Every Grade-5 titanium yoke and billet aluminum baffle is submerged in liquid nitrogen at -196°C. This cryogenic tempering process reorganizes the metallic crystalline lattice, dampening parasitic chassis ringing and maximizing structural rigidity.",
      badge: "Metallurgical Science",
      specs: ["Cryogenic Grade-5 Ti", "-196°C Nitrogen Soak", "Zero-Resonance Baffles"],
    },
    {
      number: "03",
      title: "Bio-Cellulose Transducer Pairing",
      subtitle: "Hand-Matched within ±0.3dB Tolerances",
      description:
        "We culture our bio-cellulose diaphragms through organic bacterial synthesis. The resulting ultra-thin organic matrix yields transient speeds comparable to beryllium with the warm harmonic depth of aged spruce. Left and right drivers are individually acoustic-matched.",
      badge: "Organic Synthesis",
      specs: ["0.5µm Ultrathin Substrate", "±0.3dB Stereo Symmetry", "4Hz – 52kHz Response"],
    },
    {
      number: "04",
      title: "Anechoic Verification & Certification",
      subtitle: "-12dBA Ambient Floor Measurement",
      description:
        "Every instrument is placed on a dummy head torso inside our ISO-certified anechoic chamber. We perform a 48-point frequency response sweep, print the individual laboratory plot curve, and serialize each unit before hand-packaging.",
      badge: "Laboratory Protocol",
      specs: ["-12dBA Quiet Chamber", "48-Point THD Sweep", "Serialized Lab Certificate"],
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FEFEFE] pt-20 sm:pt-28 md:pt-32 pb-24 overflow-hidden select-none">
      {/* Container aligned strictly with design system: max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-28">
        
        {/* =========================================================================
            SECTION 1: HERO MANIFESTO (Macro-Typography & Key Proof Metrics)
           ========================================================================= */}
        <section className="space-y-6 sm:space-y-10 md:space-y-12">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-neutral-600 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AUDIFY ACOUSTIC LABORATORIES • EST. 2021</span>
          </div>

          {/* Headline */}
          <div className="space-y-3 max-w-5xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[-0.04em] uppercase text-neutral-950 leading-[0.96] sm:leading-[0.92]">
              SOUND WITHOUT COMPROMISE.
              <br />
              <span className="text-neutral-400">CRAFTED FROM FIRST PRINCIPLES.</span>
            </h1>
          </div>

          {/* Lead Editorial Narrative & Double-Bezel Metric Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-6">
              <p className="text-sm sm:text-lg md:text-xl text-neutral-700 leading-relaxed font-normal">
                Audify was founded on a singular conviction: modern audio hardware has traded physical acoustic purity for cheap injection-molded plastics, disposable batteries, and aggressive digital DSP coloring.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-neutral-500 leading-relaxed font-normal">
                We returned to the workbench—combining cryogenic metallurgy, bio-cellulose diaphragms, and precision anechoic calibration to build permanent instruments that reproduce sound exactly as the recording artist heard it in the studio.
              </p>
            </div>

            {/* Double-Bezel Metrics Strip */}
            <div className="lg:col-span-6">
              <div className="rounded-[2rem] sm:rounded-[2.5rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80 shadow-xs">
                <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2.5rem-0.375rem)] bg-white p-4 sm:p-6 md:p-8 grid grid-cols-2 gap-3.5 sm:gap-6 md:gap-8 border border-neutral-100/60">
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 font-mono">
                      0.02%
                    </div>
                    <div className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Total Harmonic Distortion
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-snug line-clamp-2 sm:line-clamp-none">
                      Ultra-linear dynamic transducers with zero acoustic coloring.
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 font-mono">
                      5Hz–52kHz
                    </div>
                    <div className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Acoustic Bandwidth
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-snug line-clamp-2 sm:line-clamp-none">
                      Extended frequency resolution far beyond the audible threshold.
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5 pt-3 sm:pt-4 border-t border-neutral-100">
                    <div className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 font-mono">
                      Grade-5 Ti
                    </div>
                    <div className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Cryogenic Metallurgy
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-snug line-clamp-2 sm:line-clamp-none">
                      Solid CNC machined alloys with zero plastic structural joints.
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5 pt-3 sm:pt-4 border-t border-neutral-100">
                    <div className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 font-mono">
                      100%
                    </div>
                    <div className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Anechoic Certified
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-snug line-clamp-2 sm:line-clamp-none">
                      Individually verified frequency plot curve with every serialized unit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: EDITORIAL SPLIT (Physical Acoustics over Digital Masks)
           ========================================================================= */}
        {/* =========================================================================
            SECTION 2: EDITORIAL SPLIT (Physical Acoustics over Digital Masks)
           ========================================================================= */}
        {/* =========================================================================
            SECTION 2: EDITORIAL SPLIT (Physical Acoustics over Digital Masks)
           ========================================================================= */}
        <section className="rounded-[2rem] sm:rounded-[2.5rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80">
          <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2.5rem-0.375rem)] bg-white p-5 sm:p-8 md:p-10 lg:p-16 border border-neutral-100/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
              
              {/* Left Column: Manifesto Details */}
              <div className="lg:col-span-6 space-y-3.5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600">
                  <Compass className="w-3 h-3 text-neutral-500" />
                  <span>ACOUSTIC MANIFESTO</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] uppercase text-neutral-950 leading-[1.05]">
                  PHYSICAL ACOUSTICS
                  <br />
                  OVER DIGITAL MASKS.
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                  Most mass-market headphones rely on aggressive DSP firmware equalization to artificially mask acoustic resonance caused by thin, injection-molded plastic cups.
                </p>

                <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                  At Audify, we eradicate internal standing waves physically through milled titanium acoustic baffles, dual-chamber geometry, and custom-tensioned bio-cellulose diaphragms. When the mechanical foundation is inert, the sound requires zero artificial manipulation.
                </p>

                <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 uppercase font-mono">
                        Linear Phase Coherence:{" "}
                      </span>
                      <span className="text-xs text-neutral-600">
                        Zero phase smear across critical vocal frequencies.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 uppercase font-mono">
                        Cryogenic Stabilization:{" "}
                      </span>
                      <span className="text-xs text-neutral-600">
                        Metals tempered at -196°C to eliminate microphonic internal vibrations.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 uppercase font-mono">
                        Serviceable Longevity:{" "}
                      </span>
                      <span className="text-xs text-neutral-600">
                        100% modular screws and replaceable lambskin ear seals, never glued shut.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-End Hardware Visual Card */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl sm:rounded-3xl bg-neutral-50/80 border border-neutral-200/80 p-5 sm:p-8 flex flex-col justify-between items-center overflow-hidden group">
                  <div className="w-full flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase tracking-widest z-10">
                    <span>CAD / CHASSIS CUTAWAY</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      ZERO RESONANCE
                    </span>
                  </div>

                  {/* Visual Render */}
                  <div className="relative w-4/5 h-4/5 my-auto">
                    <Image
                      src="/images/headset-frame-382-crop.png"
                      alt="Audify Chassis Architecture"
                      fill
                      unoptimized
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] select-none pointer-events-none"
                    />
                  </div>

                  <div className="w-full text-center text-[11px] sm:text-xs font-mono text-neutral-500 border-t border-neutral-200/60 pt-2.5 sm:pt-3 z-10">
                    Audify Ultra • Dual Chamber Acoustic Chamber
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: THREE ENGINEERING PILLARS (Asymmetric Bento Grid)
           ========================================================================= */}
        <section className="space-y-6 sm:space-y-10">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-neutral-600">
              <Layers className="w-3 h-3 text-neutral-500" />
              <span>THE THREE TENETS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] uppercase text-neutral-950">
              OUR UNCOMPROMISING STANDARDS
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-2xl font-normal leading-relaxed">
              Every instrument in the Audify catalog—from our flagship over-ear headsets to our micro-billet earphones and billet speakers—is built to satisfy three foundational engineering rules.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            
            {/* Card 1 */}
            <div className="rounded-[2rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-300 flex flex-col">
              <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2rem-0.375rem)] bg-white p-5 sm:p-7 md:p-6 lg:p-8 flex flex-col justify-between flex-1 border border-neutral-100/60 space-y-5 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900">
                    <Microscope className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    TENET 01
                  </div>
                  <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight text-neutral-950">
                    Transducer Purism
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    We engineer our dynamic bio-cellulose and planar magnetic transducers in-house. By synthesizing bacterial cellulose fibers rather than pressing petroleum plastics, our diaphragms achieve lightning-quick impulse settling and visceral sub-bass articulation down to 4Hz without artificial boost circuits.
                  </p>
                </div>

                <div className="pt-3.5 sm:pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-500">
                  <span className="truncate">DRIVER TOLERANCE</span>
                  <span className="font-semibold text-neutral-950 font-mono shrink-0">±0.3 dB</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[2rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-300 flex flex-col">
              <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2rem-0.375rem)] bg-white p-5 sm:p-7 md:p-6 lg:p-8 flex flex-col justify-between flex-1 border border-neutral-100/60 space-y-5 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    TENET 02
                  </div>
                  <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight text-neutral-950">
                    Monoblock Metallurgy
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Zero plastic stress joints. Every gimbal, yoke, speaker cylinder, and earphone shell is milled from solid billet 6061 aerospace aluminum or forged Grade-5 titanium. This structural mass naturally eliminates physical micro-vibrations and guarantees hardware that outlives consumer trends.
                  </p>
                </div>

                <div className="pt-3.5 sm:pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-500">
                  <span className="truncate">CHASSIS RESILIENCE</span>
                  <span className="font-semibold text-neutral-950 font-mono shrink-0">PVD Titanium</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="sm:col-span-2 lg:col-span-1 rounded-[2rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-300 flex flex-col">
              <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2rem-0.375rem)] bg-white p-5 sm:p-7 md:p-6 lg:p-8 flex flex-col justify-between flex-1 border border-neutral-100/60 space-y-5 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900">
                    <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    TENET 03
                  </div>
                  <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight text-neutral-950">
                    Serialized Calibration
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Every instrument is individually benchmarked on a simulated acoustic torso inside an ISO-certified silent chamber. We provide a physical, serialized measurement certificate in every box. All assemblies use modular mechanical fasteners, making components 100% serviceable.
                  </p>
                </div>

                <div className="pt-3.5 sm:pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-500">
                  <span className="truncate">FACTORY WARRANTY</span>
                  <span className="font-semibold text-neutral-950 font-mono shrink-0">3 Years Full</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4: THE 4-PHASE CREATION PROTOCOL (Interactive Process)
           ========================================================================= */}
        <section className="space-y-5 sm:space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600">
                <Cpu className="w-3 h-3 text-neutral-500" />
                <span>MANUFACTURING PIPELINE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] uppercase text-neutral-950">
                THE 4-PHASE PROTOCOL
              </h2>
            </div>

            <div className="text-[11px] sm:text-xs font-mono text-neutral-500">
              Interactive Protocol • Phase {activeTab + 1} of 4
            </div>
          </div>

          {/* Phase Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {laboratoryPhases.map((phase, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={phase.number}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick(650);
                    setActiveTab(idx);
                  }}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left border transition-all duration-300 cursor-pointer min-h-[66px] sm:min-h-[76px] flex flex-col justify-between ${
                    isSelected
                      ? "bg-neutral-950 text-white border-neutral-950 shadow-md"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  <div
                    className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest ${
                      isSelected ? "text-neutral-400" : "text-neutral-400"
                    }`}
                  >
                    PHASE {phase.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold line-clamp-2 leading-tight mt-0.5">
                    {phase.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Card (Double-Bezel) */}
          <div className="rounded-[2rem] sm:rounded-[2.5rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80 transition-all duration-500">
            <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2.5rem-0.375rem)] bg-white p-5 sm:p-8 md:p-10 lg:p-12 border border-neutral-100/60 space-y-4 sm:space-y-6">
              <div className="flex items-start sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4 sm:pb-6">
                <div>
                  <div className="text-[11px] sm:text-xs font-mono text-emerald-600 font-semibold uppercase tracking-wider mb-0.5">
                    {laboratoryPhases[activeTab].badge}
                  </div>
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-950 leading-snug">
                    {laboratoryPhases[activeTab].title}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-neutral-500 mt-0.5">
                    {laboratoryPhases[activeTab].subtitle}
                  </div>
                </div>

                <div className="text-2xl sm:text-4xl font-black font-mono text-neutral-200 shrink-0">
                  #{laboratoryPhases[activeTab].number}
                </div>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed max-w-3xl">
                {laboratoryPhases[activeTab].description}
              </p>

              <div className="pt-2 sm:pt-4 flex flex-wrap gap-2 sm:gap-2.5">
                {laboratoryPhases[activeTab].specs.map((spec, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-[11px] sm:text-xs font-mono text-neutral-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LABORATORY LOCATIONS & CHIEF ARCHITECT QUOTE
           ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          
          {/* Quote Card (8 cols) */}
          <div className="lg:col-span-8 rounded-[2rem] sm:rounded-[2.5rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80 flex flex-col">
            <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2.5rem-0.375rem)] bg-white p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between flex-1 border border-neutral-100/60 space-y-5 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                  FOUNDER’S MEMORANDUM
                </div>
                <blockquote className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-950 leading-snug">
                  “In an era of disposable earbuds engineered for twelve-month obsolescence, we build permanent acoustic instruments. You do not simply purchase an Audify—you invest in an uncolored, surgical window into the art of sound.”
                </blockquote>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-neutral-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-950 text-white flex items-center justify-center font-bold text-xs sm:text-sm font-mono shrink-0">
                  JV
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-950">
                    Dr. Julian Vance, Ph.D.
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-neutral-500">
                    Chief Acoustic Architect & Founder • Stockholm
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laboratory Hubs (4 cols) */}
          <div className="lg:col-span-4 rounded-[2rem] sm:rounded-[2.5rem] p-1 sm:p-1.5 bg-neutral-100/70 border border-neutral-200/80 flex flex-col">
            <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2.5rem-0.375rem)] bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between flex-1 border border-neutral-100/60 space-y-4 sm:space-y-6">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-1 sm:mb-2">
                  GLOBAL ENGINEERING HUBS
                </div>
                <h4 className="text-sm sm:text-lg font-bold uppercase tracking-tight text-neutral-950">
                  Where Audify Operates
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 sm:gap-3 lg:gap-4 text-xs font-mono">
                <div
                  onClick={() => handleCopyLocation("Stockholm Acoustics Lab • Anechoic Test Suite 04")}
                  className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/70 hover:bg-neutral-100 transition-colors cursor-pointer space-y-1 flex flex-col justify-between min-h-[76px] sm:min-h-[92px]"
                >
                  <div className="flex justify-between items-center text-neutral-950 font-bold gap-1">
                    <span className="truncate">STOCKHOLM</span>
                    <span className="text-[10px] text-emerald-600 font-semibold shrink-0">R&D CORE</span>
                  </div>
                  <div className="text-neutral-500 text-[11px] leading-snug">Acoustic Transducer & Anechoic R&D</div>
                </div>

                <div
                  onClick={() => handleCopyLocation("Kyoto Metallurgy Works • Billet Machining Wing")}
                  className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/70 hover:bg-neutral-100 transition-colors cursor-pointer space-y-1 flex flex-col justify-between min-h-[76px] sm:min-h-[92px]"
                >
                  <div className="flex justify-between items-center text-neutral-950 font-bold gap-1">
                    <span className="truncate">KYOTO</span>
                    <span className="text-[10px] text-neutral-400 shrink-0">FABRICATION</span>
                  </div>
                  <div className="text-neutral-500 text-[11px] leading-snug">Titanium PVD & Monoblock CNC Milling</div>
                </div>

                <div
                  onClick={() => handleCopyLocation("San Francisco Design Studio • Hardware Mechanics")}
                  className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/70 hover:bg-neutral-100 transition-colors cursor-pointer space-y-1 flex flex-col justify-between min-h-[76px] sm:min-h-[92px]"
                >
                  <div className="flex justify-between items-center text-neutral-950 font-bold gap-1">
                    <span className="truncate">SAN FRANCISCO</span>
                    <span className="text-[10px] text-neutral-400 shrink-0">DESIGN</span>
                  </div>
                  <div className="text-neutral-500 text-[11px] leading-snug">Kinetic Suspension & Haptic Design</div>
                </div>
              </div>

              {copiedLocation && (
                <div className="text-[11px] font-mono text-emerald-600 text-center animate-fade-in">
                  ✓ Location copied to clipboard
                </div>
              )}
            </div>
          </div>

        </section>

        {/* =========================================================================
            SECTION 6: GRAND EXPLORE CTA
           ========================================================================= */}
        <section className="rounded-[2rem] sm:rounded-[2.5rem] p-1 sm:p-1.5 bg-neutral-950 text-white shadow-2xl">
          <div className="rounded-[calc(2rem-0.25rem)] sm:rounded-[calc(2.5rem-0.375rem)] bg-neutral-900/90 p-6 sm:p-10 md:p-12 lg:p-16 text-center max-w-4xl mx-auto space-y-5 sm:space-y-8">
            
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>THE 16 REFERENCE INSTRUMENTS</span>
            </div>

            <div className="space-y-2.5 sm:space-y-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] uppercase text-white leading-[0.95]">
                DISCOVER THE COLLECTION
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl mx-auto font-normal leading-relaxed">
                Explore our full lineup: 8 Reference Over-Ear Headsets, 4 Wired In-Ear Monitors, and 4 Monoblock Portable Speakers.
              </p>
            </div>

            {/* Nested CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              {/* Primary Button-in-Button */}
              <Link
                href="/products"
                onClick={() => soundEngine.playChime()}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[46px] sm:min-h-[48px] rounded-full bg-white text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Explore All Products"
              >
                <span>Explore All Products</span>
                <span className="w-6 h-6 rounded-full bg-neutral-950/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950" />
                </span>
              </Link>

              {/* Secondary Sound Check Button */}
              <button
                type="button"
                onClick={() => soundEngine.playChime()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 min-h-[46px] sm:min-h-[48px] rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm font-mono tracking-wider uppercase cursor-pointer"
                title="Test Acoustic Sound Engine"
              >
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Test Audio Engine</span>
              </button>
            </div>

            <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500 pt-1 sm:pt-4">
              Ships within 24 Hours • Complimentary 2-Day Air • 3-Year Warranty Included
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
