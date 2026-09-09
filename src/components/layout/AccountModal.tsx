"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  ShieldCheck,
  Package,
  Sparkles,
  ArrowRight,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { soundEngine } from "@/utils/sound";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playChime();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSignedIn(true);
    }, 600);
  };

  const handleDemoSignIn = () => {
    soundEngine.playChime();
    setIsLoading(true);
    setTimeout(() => {
      setEmail("collector@audify.audio");
      setIsLoading(false);
      setIsSignedIn(true);
    }, 400);
  };

  const handleSignOut = () => {
    soundEngine.playClick(600);
    setIsSignedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-dialog-title"
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 select-none animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-neutral-200/80 shadow-[0_24px_60px_rgba(0,0,0,0.12)] z-10 overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="p-6 sm:p-7 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 border border-neutral-200/60">
              <User className="w-4.5 h-4.5" strokeWidth={1.8} />
            </div>
            <div>
              <h3
                id="account-dialog-title"
                className="text-base font-bold text-neutral-950 tracking-tight"
              >
                {isSignedIn ? "Audify Acoustic Registry" : "Member Account"}
              </h3>
              <p className="text-[11px] font-mono uppercase text-neutral-400">
                {isSignedIn ? "Purist Collector Tier" : "Sign In & Order Tracking"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(600);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-950 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          {isSignedIn ? (
            /* Signed In Member View */
            <div className="space-y-6">
              {/* Member Card */}
              <div className="p-5 rounded-2xl bg-neutral-950 text-white space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                    Acoustic Registry ID
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight">
                    {email || "collector@audify.audio"}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">
                    Instrument Serial: AUD-ULTRA-9284-TI
                  </div>
                </div>
              </div>

              {/* Quick Actions / Status */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Instrument Allocations
                </h4>
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-neutral-700" />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">
                        Audify Ultra 01 — Obsidian
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        Order #AUD-48291 • Dispatched (2-Day Air)
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-semibold">
                    In Transit
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-neutral-700" />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">
                        Lab Calibration Certificate
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        Individual 40mm bio-cellulose profile
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-semibold">
                    Active
                  </span>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            /* Sign In Form */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-950 text-xs text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-neutral-800 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => soundEngine.playClick(600)}
                    className="text-[11px] text-neutral-500 hover:text-neutral-950 underline cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-950 text-xs text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 active:scale-[0.98] transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-xs mt-2"
              >
                <span>{isLoading ? "Authenticating..." : "Sign In to Registry"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <div className="border-t border-neutral-200 w-full" />
                <span className="bg-white px-3 text-[10px] font-mono uppercase text-neutral-400 absolute">
                  or
                </span>
              </div>

              {/* Demo Sign In (instant preview) */}
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full border border-neutral-200 bg-neutral-50/80 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold tracking-tight transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
                <span>One-Click Demo Sign In</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
