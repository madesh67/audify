"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import confetti from "canvas-confetti";
import { soundEngine } from "@/utils/sound";
import AudifyLogo from "@/components/common/AudifyLogo";

export default function Footer({ showCta = true }: { showCta?: boolean }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(soundEngine.enabled);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    soundEngine.playChime();
    setIsSubscribed(true);
  };

  const handleOrderClick = () => {
    soundEngine.playChime();
    setIsOrderOpen(true);
  };

  const toggleSound = () => {
    const next = soundEngine.toggle();
    setSoundActive(next);
  };

  return (
    <footer
      id="footer"
      className={`relative w-full bg-[#FEFEFE] text-neutral-950 ${
        showCta ? "pt-16 sm:pt-20 lg:pt-24" : "pt-8"
      } pb-12 overflow-hidden select-none`}
    >
      {/* Final Section ("OWN AUDIFY" CTA): Headset on Left, Descriptions on Right */}
      {showCta && (
        <>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            <div
              id="buy-now-cta"
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh] py-16 sm:py-20 lg:py-24"
            >
              {/* Left Column: Transparent Headset Visual */}
              <div className="lg:col-span-6 flex justify-center lg:justify-start items-center">
                <div className="relative w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[480px] aspect-[560/696] flex items-center justify-center">
                  <Image
                    src="/images/headset.png"
                    alt="Audify Flagship Acoustic Headset"
                    fill
                    unoptimized
                    className="object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.12)] pointer-events-none select-none"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Descriptions, Title & Action */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6 lg:pl-6 xl:pl-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DIRECT FROM AUDIO LABS</span>
                </div>

                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase text-neutral-950 leading-[0.92]">
                  OWN AUDIFY
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-lg font-normal leading-relaxed">
                  Engineered in limited production runs. 3-year warranty and 30-day trial included.
                </p>

                <div className="pt-3 sm:pt-4">
                  <Link
                    href="/products"
                    onClick={() => soundEngine.playChime()}
                    className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 font-bold text-sm sm:text-base uppercase tracking-wider shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    aria-label="Shop Now"
                  >
                    <span>Shop Now</span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width Divider between Final Section and Footer — Stretched Fully Edge-to-Edge */}
          <div className="w-full border-t border-neutral-200/70" />
        </>
      )}

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Middle Navigation & Newsletter Grid */}
        <div className="pt-16 pb-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Brand Info & Newsletter */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center text-2xl font-black tracking-tighter uppercase text-neutral-950">
                <AudifyLogo
                  className="h-[0.92em] w-auto inline-block -translate-y-[0.02em] mr-[0.04em]"
                  chevronColor="#0A0A0A"
                  barColor="#0A0A0A"
                />
                <span>UDIFY</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-sm leading-relaxed">
                Precision acoustic instruments engineered for purists, composers, and discerning listeners worldwide.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                Acoustic Dispatch & Journal
              </div>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-full">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>You are subscribed to the private release registry.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 rounded-full bg-neutral-100/90 border border-neutral-200 text-xs text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white font-mono transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-neutral-950 text-white font-semibold text-xs tracking-wider uppercase hover:bg-neutral-800 active:scale-[0.98] shrink-0 shadow-xs cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div className="space-y-3">
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest">
                ARCHITECTURE
              </div>
              <ul className="space-y-2 text-neutral-600">
                <li><a href="#canvas-scroll" className="hover:text-neutral-950 transition-colors">Titanium Architecture</a></li>
                <li><a href="#canvas-scroll" className="hover:text-neutral-950 transition-colors">Acoustic Chamber</a></li>
                <li><a href="#canvas-scroll" className="hover:text-neutral-950 transition-colors">Active Isolation</a></li>
                <li><a href="#canvas-scroll" className="hover:text-neutral-950 transition-colors">Ultra-Link Stream</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest">
                COLLECTIONS
              </div>
              <ul className="space-y-2 text-neutral-600">
                <li><a href="#variant-chooser" className="hover:text-neutral-950 transition-colors">Obsidian Onyx</a></li>
                <li><a href="#variant-chooser" className="hover:text-neutral-950 transition-colors">Platinum Mercury</a></li>
                <li><a href="#variant-chooser" className="hover:text-neutral-950 transition-colors">Champagne Dune</a></li>
                <li><a href="#variant-chooser" className="hover:text-neutral-950 transition-colors">Modular Lambskin</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest">
                EXPERIENCE
              </div>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={toggleSound} className="hover:text-neutral-950 transition-colors flex items-center gap-1.5">
                    {soundActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
                    <span>{soundActive ? "Audio Mute" : "Enable Audio"}</span>
                  </button>
                </li>
                <li><a href="#footer" className="hover:text-neutral-950 transition-colors">Mastering Suites</a></li>
                <li><a href="#footer" className="hover:text-neutral-950 transition-colors">Warranty & Service</a></li>
                <li><a href="#footer" className="hover:text-neutral-950 transition-colors">Sustainability</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Micro Row */}
        <div className="pt-8 border-t border-neutral-200/60 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-neutral-400 gap-4">
          <div>© {new Date().getFullYear()} AUDIFY ACOUSTIC LABORATORIES. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>STOCKHOLM • SAN FRANCISCO • TOKYO</span>
            <span>60FPS KINETIC ENGINE</span>
          </div>
        </div>
      </div>

      {/* Checkout Drawer / Modal */}
      {isOrderOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-[2.5rem] p-1.5 bg-neutral-100/90 ring-1 ring-black/5 shadow-2xl">
            <div className="rounded-[calc(2.5rem-0.375rem)] bg-white p-8 sm:p-10 space-y-6 shadow-xl">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" />
                    <span>RESERVATION ALLOCATED</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-950 tracking-tight">
                    Audify Reference Model 01
                  </h3>
                </div>
                <button
                  onClick={() => setIsOrderOpen(false)}
                  className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-500">
                  <span>Hardware Edition:</span>
                  <span className="text-neutral-950 font-sans font-medium">Obsidian Onyx Titanium</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Included Accessories:</span>
                  <span className="text-neutral-950">DAC Cable + Magnetic Shell</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Worldwide Courier:</span>
                  <span className="text-emerald-600 font-semibold">Complimentary 2-Day</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-950">
                  <span>Total (Taxes Included):</span>
                  <span>$499.00 USD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playChime();
                  alert("Order simulated successfully! Welcome to Audify.");
                  setIsOrderOpen(false);
                }}
                className="w-full py-4 rounded-full bg-neutral-950 text-white font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 shadow-lg"
              >
                Confirm Immediate Reservation
              </button>

              <div className="text-center text-[10px] font-mono text-neutral-400">
                Encrypted with 256-Bit SSL • 30-Day Risk-Free Trial Period
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
