"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  preloadAllFrames,
  getFrameImage,
  getSeparated382Image,
  TOTAL_FRAMES,
  PreloadProgress,
} from "@/utils/preloader";
import PinpointCallout, { PinpointCalloutHandle } from "./PinpointCallout";
import VariantChooser, { VariantColor } from "@/components/sections/VariantChooser";

interface ScrollCanvasProps {
  onProgressUpdate?: (progress: PreloadProgress) => void;
}

interface ScaleKeyframe {
  progress: number;
  scale: number;
}

const desktopKeyframes: ScaleKeyframe[] = [
  { progress: 0.0, scale: 1.04 },  // Hero landing: balanced scale overlapping AUDIFY ULTRA
  { progress: 0.03, scale: 1.04 },
  { progress: 0.08, scale: 0.62 }, // Exploded breakdown scales down for clean clearance in max-w-7xl container
  { progress: 0.54, scale: 0.62 },
  { progress: 0.66, scale: 0.74 },
  { progress: 0.73, scale: 0.82 }, // Stage 5: Ultra-Link Stream assembled
];

const tabletKeyframes: ScaleKeyframe[] = [
  { progress: 0.0, scale: 1.04 },  // Hero landing: bold balanced scale
  { progress: 0.03, scale: 1.04 },
  { progress: 0.08, scale: 0.52 }, // Stages: perfectly scaled to fit 314px center pocket
  { progress: 0.54, scale: 0.52 },
  { progress: 0.66, scale: 0.62 },
  { progress: 0.73, scale: 0.70 }, // Stage 5 assembled
];

const mobileKeyframes: ScaleKeyframe[] = [
  { progress: 0.0, scale: 1.06 },  // Hero landing: refined, elegant presence
  { progress: 0.03, scale: 1.06 },
  { progress: 0.08, scale: 0.92 }, // Stages: perfectly proportioned, closer to typography
  { progress: 0.54, scale: 0.92 },
  { progress: 0.66, scale: 0.95 },
  { progress: 0.73, scale: 0.98 }, // Fully assembled
];

function getInterpolatedScale(progress: number, keyframes: ScaleKeyframe[]): number {
  if (keyframes.length === 0) return 1.0;
  if (progress <= keyframes[0].progress) return keyframes[0].scale;
  if (progress >= keyframes[keyframes.length - 1].progress) return keyframes[keyframes.length - 1].scale;

  for (let i = 0; i < keyframes.length - 1; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    if (progress >= k1.progress && progress <= k2.progress) {
      const t = (progress - k1.progress) / (k2.progress - k1.progress);
      const easeT = t * t * (3 - 2 * t);
      return k1.scale + (k2.scale - k1.scale) * easeT;
    }
  }
  return 1.0;
}

interface FrameKeypoint {
  p: number;
  f: number;
}

const frameKeypoints: FrameKeypoint[] = [
  { p: 0.00, f: 1 },    // Hero at rest
  { p: 0.02, f: 1 },    // Hero hold
  { p: 0.05, f: 55 },   // Explodes to hinges
  { p: 0.085, f: 85 },  // Headband descends and locks into hinges (ready for Stage 1)
  { p: 0.185, f: 85 },  // Headband holds perfectly stable on Frame 85 throughout Stage 1
  { p: 0.22, f: 130 },  // Chambers & cushions assemble and lock into Frame 130 (ready for Stage 2)
  { p: 0.33, f: 130 },  // Acoustic chamber & cushions hold stable on Frame 130 throughout Stage 2
  { p: 0.36, f: 185 },  // Lead up to sound waves
  { p: 0.42, f: 215 },  // Peak sound waves (Stage 3)
  { p: 0.47, f: 235 },  // Sound waves recede
  { p: 0.50, f: 250 },  // Battery charging starts
  { p: 0.56, f: 280 },  // Peak battery illumination (Stage 4)
  { p: 0.61, f: 300 },  // Battery illumination settles
  { p: 0.64, f: 320 },  // Connectivity streams begin
  { p: 0.72, f: 382 },  // Ultra-link peak streams complete
];

function getTargetFrame(p: number): number {
  if (p <= frameKeypoints[0].p) return frameKeypoints[0].f;
  if (p >= frameKeypoints[frameKeypoints.length - 1].p) return frameKeypoints[frameKeypoints.length - 1].f;
  for (let i = 0; i < frameKeypoints.length - 1; i++) {
    const k1 = frameKeypoints[i];
    const k2 = frameKeypoints[i + 1];
    if (p >= k1.p && p <= k2.p) {
      const t = (p - k1.p) / (k2.p - k1.p);
      return Math.min(TOTAL_FRAMES, Math.max(1, Math.round(k1.f + (k2.f - k1.f) * t)));
    }
  }
  return TOTAL_FRAMES;
}

// Section 2 Glide & Dock Thresholds:
// GLIDE_START (0.80): headset begins smooth glide towards the showcase card
// DOCK_PROGRESS (0.94): headset completes glide and locks into the showcase box
// Buffer from 0.94 to 1.00 (~282px): provides a half scroll block hold for exploring Section 2
// before naturally unpinning and scrolling to Section 3.
export const GLIDE_START = 0.80;
export const DOCK_PROGRESS = 0.94;

export default function ScrollCanvas({ onProgressUpdate }: ScrollCanvasProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Overlay DOM element refs
  const overlayHeroRef = useRef<HTMLDivElement>(null);
  const overlayFittingRef = useRef<HTMLDivElement>(null);
  const overlayChamberRef = useRef<HTMLDivElement>(null);
  const overlayWavesRef = useRef<HTMLDivElement>(null);
  const overlayConnectivityRef = useRef<HTMLDivElement>(null);
  const overlayCompleteRef = useRef<HTMLDivElement>(null);
  const overlayVariantRef = useRef<HTMLDivElement>(null);
  const showcaseBoxRef = useRef<HTMLDivElement>(null);

  // Variant chooser active color state
  const [activeVariantColor, setActiveVariantColor] = useState<VariantColor>("obsidian");
  const activeVariantColorRef = useRef<VariantColor>("obsidian");

  // Docked state in VariantChooser
  const [isDocked, setIsDocked] = useState<boolean>(false);
  const isDockedRef = useRef<boolean>(false);

  useEffect(() => {
    activeVariantColorRef.current = activeVariantColor;
  }, [activeVariantColor]);

  // SVG Callout Imperative Handles for Dynamic DrawSVG
  const calloutFittingArchRef = useRef<PinpointCalloutHandle>(null);
  const calloutFittingJointRef = useRef<PinpointCalloutHandle>(null);
  const calloutChamberIsolatorRef = useRef<PinpointCalloutHandle>(null);
  const calloutChamberCushionRef = useRef<PinpointCalloutHandle>(null);

  // Staggered Line Reveal Stage Tracking
  const activeStageRef = useRef<number>(0);
  const lastProgressRef = useRef<number>(0);
  const revealedStagesRef = useRef<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const currentProgressRef = useRef<number>(0);

  const onProgressRef = useRef(onProgressUpdate);
  useEffect(() => {
    onProgressRef.current = onProgressUpdate;
  }, [onProgressUpdate]);

  const lastDrawnFrameRef = useRef<number>(-1);

  // Draw target frame (1 to 382) to canvas with support for glide interpolation
  const drawFrame = useCallback((frameNum: number, progressOverride?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentP = progressOverride ?? currentProgressRef.current;

    // When docked in VariantChooser (currentP >= DOCK_PROGRESS), clear the canvas.
    // The showcase card's HTML Image handles rendering for all 3 colorways (obsidian, silver, dune)
    // with smooth cross-fade transitions, identical sizing, and rock-solid stability!
    if (currentP >= DOCK_PROGRESS) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lastDrawnFrameRef.current = -999;
      return;
    }

    // If colorway is not obsidian and we are in glide, clear canvas
    if (currentP >= GLIDE_START && activeVariantColorRef.current !== "obsidian") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lastDrawnFrameRef.current = frameNum;
      return;
    }

    // After hero sequence (currentP >= 0.75), use the separated 382th frame headset
    // (clean 3D headset isolated directly from frame 382 with all surrounding network icons cleanly removed)
    let img: HTMLImageElement | null = null;
    if (currentP >= 0.75) {
      const sep382 = getSeparated382Image();
      if (sep382 && sep382.complete && sep382.naturalWidth > 0) {
        img = sep382;
      } else {
        img = getFrameImage(frameNum);
      }
    } else {
      img = getFrameImage(frameNum);
    }
    if (!img) return;

    const width = canvas.width;
    const height = canvas.height;

    // Aspect ratio containment with portrait compensation
    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = width < 768 * dpr;
    const isTablet = width >= 768 * dpr && width < 1024 * dpr;
    const isPortrait = height > width;
    const baseScale = isPortrait
      ? isMobile
        ? Math.max((width / imgW) * 2.15, (height / imgH) * 0.62)
        : Math.max((width / imgW) * 1.45, (height / imgH) * 0.50)
      : Math.min(width / imgW, height / imgH);

    const keyframes = isMobile
      ? mobileKeyframes
      : isTablet
      ? tabletKeyframes
      : desktopKeyframes;
    const dynamicMultiplier = getInterpolatedScale(Math.min(0.73, currentP), keyframes);

    const heroScale = baseScale * dynamicMultiplier;
    const heroCenterX = width / 2;
    let heroCenterY = height / 2;
    if (isMobile && isPortrait) {
      if (currentP > 0.03 && currentP <= 0.08) {
        const t = (currentP - 0.03) / 0.05;
        const easeT = t * t * (3 - 2 * t);
        heroCenterY = height * (0.50 + 0.005 * easeT);
      } else if (currentP > 0.08 && currentP < GLIDE_START) {
        heroCenterY = height * 0.505;
      }
    }

    // Mobile portrait vertical subject balancing:
    // Keep Stage 1 (Frame 85) headband arch naturally positioned so it sits close to the description text
    const mobileSubjectOffsetY = 0;

    let finalCenterX = heroCenterX;
    let finalCenterY = heroCenterY + mobileSubjectOffsetY;
    let finalScale = heroScale;

    // GLIDE PHASE (GLIDE_START <= currentP < DOCK_PROGRESS):
    // Smoothly glide the separated 382th frame headset directly into the center
    // and exact scale of #variant-showcase-box
    if (currentP >= GLIDE_START) {
      const box = showcaseBoxRef.current;
      if (box) {
        const rect = box.getBoundingClientRect();
        const targetCenterX = (rect.left + rect.width / 2) * dpr;
        const targetCenterY = (rect.top + rect.height / 2) * dpr;

        // Inside #variant-showcase-box, Image has inset of 12px (mobile) or 20px (sm)
        const inset = isMobile ? 12 : 20;
        const boxInnerW = (rect.width - 2 * inset) * dpr;
        const boxInnerH = (rect.height - 2 * inset) * dpr;
        const imageSize = Math.max(10, Math.min(boxInnerW, boxInnerH));

        // In 900x900 image, headset height is 718px (718/900 = 0.7978 of imageSize)
        const targetHeadsetH = imageSize * (718 / 900);
        const targetScale = targetHeadsetH / 796;

        // Slow, smooth ease interpolation
        const t = Math.min(1, Math.max(0, (currentP - GLIDE_START) / (DOCK_PROGRESS - GLIDE_START)));
        const easeT = t * t * (3 - 2 * t);
        finalCenterX = heroCenterX + (targetCenterX - heroCenterX) * easeT;
        finalCenterY = heroCenterY + (targetCenterY - heroCenterY) * easeT;
        finalScale = heroScale + (targetScale - heroScale) * easeT;
      }
    }

    const renderW = imgW * finalScale;
    const renderH = imgH * finalScale;

    // Compensate for headset center offset within 1920x1080 (centerX: 951.5, centerY: 545.5)
    // Frame center is (960, 540). Offset: 960 - 951.5 = +8.5; 540 - 545.5 = -5.5
    let centerShiftX = 0;
    let centerShiftY = 0;
    if (currentP >= GLIDE_START) {
      const t = Math.min(1, Math.max(0, (currentP - GLIDE_START) / (DOCK_PROGRESS - GLIDE_START)));
      const easeT = t * t * (3 - 2 * t);
      centerShiftX = 8.5 * finalScale * easeT;
      centerShiftY = -5.5 * finalScale * easeT;
    }

    const offsetX = finalCenterX - renderW / 2 + centerShiftX;
    const offsetY = finalCenterY - renderH / 2 + centerShiftY;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    lastDrawnFrameRef.current = frameNum;
  }, []);

  // GSAP Staggered Line Reveal for Masked Typography
  const animateStageIn = useCallback(
    (stageNum: number, direction: "forward" | "backward" = "forward") => {
      const overlayMap: Record<number, React.RefObject<HTMLDivElement | null>> = {
        1: overlayFittingRef,
        2: overlayChamberRef,
        3: overlayWavesRef,
        4: overlayConnectivityRef,
        5: overlayCompleteRef,
      };
      const overlay = overlayMap[stageNum]?.current;
      if (overlay) {
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
      }

      const selector = `.reveal-line-s${stageNum}`;
      const initialY = direction === "forward" ? "115%" : "-115%";

      gsap.fromTo(
        selector,
        { y: initialY, opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto",
          onStart: () => {
            if (stageNum === 1) {
              calloutFittingArchRef.current?.updateGeometry();
              calloutFittingJointRef.current?.updateGeometry();
            } else if (stageNum === 2) {
              calloutChamberIsolatorRef.current?.updateGeometry();
              calloutChamberCushionRef.current?.updateGeometry();
            }
          },
          onComplete: () => {
            if (stageNum === 1) {
              calloutFittingArchRef.current?.updateGeometry();
              calloutFittingJointRef.current?.updateGeometry();
            } else if (stageNum === 2) {
              calloutChamberIsolatorRef.current?.updateGeometry();
              calloutChamberCushionRef.current?.updateGeometry();
            }
          },
        }
      );
      revealedStagesRef.current[stageNum] = true;
    },
    []
  );

  const animateStageOut = useCallback(
    (stageNum: number, direction: "forward" | "backward" = "forward") => {
      const overlayMap: Record<number, React.RefObject<HTMLDivElement | null>> = {
        1: overlayFittingRef,
        2: overlayChamberRef,
        3: overlayWavesRef,
        4: overlayConnectivityRef,
        5: overlayCompleteRef,
      };
      const overlay = overlayMap[stageNum]?.current;
      const selector = `.reveal-line-s${stageNum}`;
      const targetY = direction === "forward" ? "-115%" : "115%";

      gsap.to(selector, {
        y: targetY,
        opacity: 0,
        duration: 0.35,
        stagger: 0.02,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => {
          if (overlay) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
          }
        },
      });
      revealedStagesRef.current[stageNum] = false;
    },
    []
  );

  // Update Overlays and Animate based on scroll progress
  const updateOverlays = useCallback((p: number) => {
    // Hero: Fades out the absolute instant the user triggers the first scroll event
    if (overlayHeroRef.current) {
      if (p <= 0.001) {
        overlayHeroRef.current.style.opacity = "1";
        overlayHeroRef.current.style.transform = "translate3d(0, 0, 0)";
        overlayHeroRef.current.style.pointerEvents = "auto";
      } else if (p < 0.04) {
        const factor = p / 0.04;
        const op = Math.max(0, 1 - factor);
        overlayHeroRef.current.style.opacity = String(op);
        overlayHeroRef.current.style.transform = `translate3d(0, -${factor * 20}px, 0)`;
        overlayHeroRef.current.style.pointerEvents = "none";
      } else {
        overlayHeroRef.current.style.opacity = "0";
        overlayHeroRef.current.style.pointerEvents = "none";
      }
    }

    // Dynamic DrawSVG calculation for Stage 1 (0.105 to 0.185)
    // Frame 85 is already fully locked by p = 0.085, so callouts draw smoothly onto the visible, steady headband!
    let s1Draw = 0;
    if (p >= 0.105 && p <= 0.135) {
      s1Draw = (p - 0.105) / 0.03;
    } else if (p > 0.135 && p <= 0.165) {
      s1Draw = 1;
    } else if (p > 0.165 && p <= 0.185) {
      s1Draw = Math.max(0, 1 - (p - 0.165) / 0.02);
    } else {
      s1Draw = 0;
    }
    calloutFittingArchRef.current?.setDrawProgress(s1Draw);
    calloutFittingJointRef.current?.setDrawProgress(s1Draw);

    // Dynamic DrawSVG calculation for Stage 2 (0.24 to 0.33)
    // Frame 130 is already fully locked by p = 0.22, so callouts draw smoothly onto the visible, steady chamber & cushion!
    let s2Draw = 0;
    if (p >= 0.24 && p <= 0.27) {
      s2Draw = (p - 0.24) / 0.03;
    } else if (p > 0.27 && p <= 0.305) {
      s2Draw = 1;
    } else if (p > 0.305 && p <= 0.33) {
      s2Draw = Math.max(0, 1 - (p - 0.305) / 0.025);
    } else {
      s2Draw = 0;
    }
    calloutChamberIsolatorRef.current?.setDrawProgress(s2Draw);
    calloutChamberCushionRef.current?.setDrawProgress(s2Draw);

    // Determine current active stage (Stages 1 to 5)
    let currentStage = 0;
    if (p >= 0.09 && p <= 0.185) currentStage = 1;
    else if (p >= 0.225 && p <= 0.33) currentStage = 2;
    else if (p >= 0.36 && p <= 0.47) currentStage = 3;
    else if (p >= 0.50 && p <= 0.61) currentStage = 4;
    else if (p >= 0.64 && p <= 0.74) currentStage = 5;

    // Trigger staggered line reveals when stage boundaries are crossed
    if (currentStage !== activeStageRef.current) {
      const prev = activeStageRef.current;
      const dir = p >= lastProgressRef.current ? "forward" : "backward";

      if (prev > 0 && revealedStagesRef.current[prev]) {
        animateStageOut(prev, dir);
      }
      if (currentStage > 0 && !revealedStagesRef.current[currentStage]) {
        animateStageIn(currentStage, dir);
      }
      activeStageRef.current = currentStage;
    }

    // Stage 6: Variant Chooser Transition (p >= GLIDE_START)
    if (overlayVariantRef.current) {
      if (p < GLIDE_START) {
        overlayVariantRef.current.style.opacity = "0";
        overlayVariantRef.current.style.transform = "translate3d(0, 20px, 0)";
        overlayVariantRef.current.style.pointerEvents = "none";
      } else if (p >= GLIDE_START && p < DOCK_PROGRESS) {
        const t = (p - GLIDE_START) / (DOCK_PROGRESS - GLIDE_START);
        const easeT = t * t * (3 - 2 * t);
        overlayVariantRef.current.style.opacity = String(easeT);
        overlayVariantRef.current.style.transform = `translate3d(0, ${(1 - easeT) * 16}px, 0)`;
        overlayVariantRef.current.style.pointerEvents = t > 0.85 ? "auto" : "none";
      } else {
        // Docked: STAYS 100% visible at normal position, zero artificial spacing or fade
        overlayVariantRef.current.style.opacity = "1";
        overlayVariantRef.current.style.transform = "translate3d(0, 0, 0)";
        overlayVariantRef.current.style.pointerEvents = "auto";
      }
    }

    // Docking state management: docked once settled in box (p >= DOCK_PROGRESS)
    const docked = p >= DOCK_PROGRESS;
    if (docked !== isDockedRef.current) {
      isDockedRef.current = docked;
      setIsDocked(docked);
    }

    // Canvas z-index switching:
    // During hero & stages 1-5, canvas is at z-10.
    // During glide (GLIDE_START <= p < DOCK_PROGRESS), canvas elevates to z-35 (above showcase card background).
    // Once docked (p >= DOCK_PROGRESS), canvas returns to z-10 and is cleared.
    if (canvasRef.current) {
      canvasRef.current.style.zIndex = p >= GLIDE_START && p < DOCK_PROGRESS ? "35" : "10";
    }

    // When scrolling backward above the glide phase, reset color to obsidian if needed
    if (p < GLIDE_START && activeVariantColorRef.current !== "obsidian") {
      setActiveVariantColor("obsidian");
      activeVariantColorRef.current = "obsidian";
    }

    lastProgressRef.current = p;
  }, [animateStageIn, animateStageOut]);

  // Colorway switch handler for VariantChooser
  const handleVariantColorChange = useCallback((color: VariantColor) => {
    setActiveVariantColor(color);
    activeVariantColorRef.current = color;
    if (currentProgressRef.current < DOCK_PROGRESS) {
      drawFrame(TOTAL_FRAMES, currentProgressRef.current);
    }
  }, [drawFrame]);

  // Master Synchronized Update Function
  const updateProgress = useCallback(
    (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      currentProgressRef.current = clamped;

      let targetFrame = 1;
      if (clamped <= 0.72) {
        targetFrame = getTargetFrame(clamped);
      } else {
        targetFrame = TOTAL_FRAMES; // Frame 382 locked!
      }

      // 1. Update Canvas Frame:
      // Redraw whenever frame changes, or continuously during the glide phase (GLIDE_START <= clamped < DOCK_PROGRESS)
      // or once at docking transition to clear
      if (
        targetFrame !== lastDrawnFrameRef.current ||
        (clamped >= GLIDE_START && clamped < DOCK_PROGRESS) ||
        (clamped >= DOCK_PROGRESS && lastDrawnFrameRef.current !== -999)
      ) {
        drawFrame(targetFrame, clamped);
      }

      // 2. Ambient Levitation micro-interaction (active at rest, paused during scrub)
      if (canvasRef.current) {
        if (clamped > 0.002) {
          if (canvasRef.current.classList.contains("animate-headset-levitate")) {
            canvasRef.current.classList.remove("animate-headset-levitate");
            canvasRef.current.style.transform = "translate3d(0, 0, 0)";
          }
        } else {
          if (!canvasRef.current.classList.contains("animate-headset-levitate")) {
            canvasRef.current.classList.add("animate-headset-levitate");
          }
        }
      }

      // 3. Overlays
      updateOverlays(clamped);
    },
    [drawFrame, updateOverlays]
  );

  // Resize Handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;

    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    canvas.style.width = `${displayW}px`;
    canvas.style.height = `${displayH}px`;

    drawFrame(lastDrawnFrameRef.current > 0 ? lastDrawnFrameRef.current : 1);
  }, [drawFrame]);

  // Mount: start preloading and bind listeners
  useEffect(() => {
    handleResize();

    preloadAllFrames(
      (prog) => {
        onProgressRef.current?.(prog);
      },
      () => {
        drawFrame(1);
        ScrollTrigger.refresh();
      }
    );

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, drawFrame]);

  // Unified GSAP ScrollTrigger Engine
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize all masked reveal items to hidden position
    for (let s = 1; s <= 5; s++) {
      gsap.set(`.reveal-line-s${s}`, { y: "115%", opacity: 0 });
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
      onUpdate: (self) => {
        updateProgress(self.progress);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, [updateProgress]);



  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[5600px] bg-[#FEFEFE] select-none"
    >
      {/* Anchor marker for smooth scrolling from Navbar */}
      <div id="variant-chooser" className="absolute top-[94%] w-full h-1 pointer-events-none" />

      {/* Sticky Viewport Container: natively fixed at top across the 7200px */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] bg-[#FEFEFE] overflow-hidden flex items-center justify-center z-10">
        {/* Layer 1: Canvas Engine with Ambient Levitation & Multiply blend mode */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none z-10 mix-blend-multiply animate-headset-levitate transition-transform duration-500 ease-out"
        />

        {/* Layer 2: Hero Headline above the Canvas with Dynamic Difference Inversion */}
        <div
          ref={overlayHeroRef}
          className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none select-none z-20 mix-blend-difference transition-transform duration-75"
          style={{ mixBlendMode: "difference" }}
        >
          <h1
            className="w-full text-5xl sm:text-7xl md:text-8xl lg:text-[13.5vw] xl:text-[14.5vw] font-black tracking-tighter uppercase text-white leading-[0.84] select-none mix-blend-difference"
            style={{ mixBlendMode: "difference" }}
          >
            <span className="block">AUDIFY</span>
            <span className="block">ULTRA</span>
          </h1>
        </div>



        {/* Layer 3: Synchronized Storytelling Overlays (Stages 1 to 5) at z-20 */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          {/* Synchronized Storytelling Stages: Unified max-w-7xl responsive container matching all sections */}
          <div className="relative w-full h-full max-w-7xl mx-auto pointer-events-none">

            {/* Stage 1: Headset Fitting & Precision Chassis (Assembly Phase) */}
            <div
              ref={overlayFittingRef}
              className="absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-between opacity-0 px-4 sm:px-8 lg:px-12 pointer-events-none transition-opacity duration-300"
            >
              {/* Absolute-Positioned SVG Callout Lines with Dynamic DrawSVG */}
              <PinpointCallout
                ref={calloutFittingArchRef}
                cardX={34}
                cardY={38.5}
                targetImageX={960}
                targetImageY={165}
                scaleMultiplier={0.62}
                label="Titanium Headband"
                badgePosition="top"
                sourceSelector="#s1-arch-source"
                sourceSide="right"
              />
              <PinpointCallout
                ref={calloutFittingJointRef}
                cardX={80}
                cardY={54.5}
                targetImageX={1164}
                targetImageY={555}
                scaleMultiplier={0.62}
                label="Flex Pivot Joint"
                badgePosition="bottom"
                sourceSelector="#s1-joint-source"
                sourceSide="left"
              />
              <div className="max-w-xs sm:max-w-sm md:max-w-[215px] lg:max-w-[320px] space-y-1.5 sm:space-y-3 lg:space-y-4 pointer-events-auto backdrop-blur-[1px] pt-20 sm:pt-20 md:pt-0">
                {/* Eyebrow */}
                <div className="overflow-hidden">
                  <div className="reveal-line-s1 inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[11px] tracking-[0.20em] sm:tracking-[0.25em] text-neutral-400 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
                    <span>ARCHITECTURE & FITTING</span>
                  </div>
                </div>

                {/* Masked Headline Lines */}
                <div className="overflow-hidden">
                  <h2 className="reveal-line-s1 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    <span id="s1-arch-source" className="inline-block">Lightweight Titanium Frame</span>
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <h2 className="reveal-line-s1 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    & Zero Head Pressure
                  </h2>
                </div>

                {/* Masked Body Copy */}
                <div className="overflow-hidden">
                  <p className="reveal-line-s1 text-[11px] sm:text-xs lg:text-sm text-neutral-600 leading-normal font-normal max-w-[300px] sm:max-w-[320px] md:max-w-[215px] lg:max-w-[380px]">
                    Crafted from ultra-light titanium with a flexible contour that gently hugs your head. It distributes weight so evenly that you can wear it all day long without any pinching or fatigue.
                  </p>
                </div>
              </div>

              {/* Right Technical Specs: Clean Responsive Column/Grid */}
              <div className="mt-auto md:mt-0 pb-14 sm:pb-12 md:pb-0 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-8 md:gap-5 lg:gap-6 font-mono text-xs w-full max-w-full md:max-w-[185px] lg:max-w-[220px] pointer-events-auto backdrop-blur-[1px]">
                <div className="overflow-hidden">
                  <div className="reveal-line-s1 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      FEATHERLIGHT WEIGHT
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono">
                      268<span className="text-xs text-neutral-400 font-normal ml-0.5 sm:ml-1">g</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      FEELS WEIGHTLESS
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="reveal-line-s1 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      AEROSPACE ALLOY
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono">
                      <span id="s1-joint-source" className="inline-block whitespace-nowrap">
                        Grade 5 <span className="text-xs text-neutral-400 font-normal">Titanium</span>
                      </span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      FLEXES WITHOUT BREAKING
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2: Acoustic Chamber Assembly (Assembly Phase) */}
            <div
              ref={overlayChamberRef}
              className="absolute inset-0 flex flex-col md:flex-row-reverse items-start md:items-center justify-between opacity-0 px-4 sm:px-8 lg:px-12 pointer-events-none transition-opacity duration-300"
            >
              {/* Absolute-Positioned SVG Callout Lines with Dynamic DrawSVG */}
              <PinpointCallout
                ref={calloutChamberIsolatorRef}
                cardX={18.5}
                cardY={40.5}
                targetImageX={805}
                targetImageY={695}
                scaleMultiplier={0.62}
                label="Acoustic Chamber"
                badgePosition="top"
                sourceSelector="#s2-chamber-source"
                sourceSide="right"
              />
              <PinpointCallout
                ref={calloutChamberCushionRef}
                cardX={65.5}
                cardY={54.5}
                targetImageX={1070}
                targetImageY={560}
                scaleMultiplier={0.62}
                label="Soft Memory Foam"
                badgePosition="top"
                sourceSelector="#s2-cushion-source"
                sourceSide="left"
              />

              {/* Right Editorial Floating Typography (text-left md:text-right) */}
              <div className="max-w-xs sm:max-w-sm md:max-w-[215px] lg:max-w-[320px] space-y-1.5 sm:space-y-3 lg:space-y-4 text-left md:text-right pointer-events-auto backdrop-blur-[1px] pt-20 sm:pt-20 md:pt-0">
                {/* Eyebrow */}
                <div className="overflow-hidden">
                  <div className="reveal-line-s2 inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[11px] tracking-[0.20em] sm:tracking-[0.25em] text-neutral-400 uppercase">
                    <span>ACOUSTIC CHAMBER</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
                  </div>
                </div>

                {/* Masked Headline Lines */}
                <div className="overflow-hidden">
                  <h2 className="reveal-line-s2 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    <span id="s2-cushion-source" className="inline-block">Cloud-Soft</span> Cushions
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <h2 className="reveal-line-s2 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    & Deep, Punchy Bass
                  </h2>
                </div>

                {/* Masked Body Copy */}
                <div className="overflow-hidden">
                  <p className="reveal-line-s2 text-[11px] sm:text-xs lg:text-sm text-neutral-600 leading-normal font-normal max-w-[300px] sm:max-w-[320px] md:max-w-[215px] lg:max-w-[380px] md:ml-auto">
                    Plush memory foam pillows gently wrap around your ears in breathable comfort. They create an airtight acoustic seal that keeps deep bass inside and room noise out—never feeling hot or tight.
                  </p>
                </div>
              </div>

              {/* Left Technical Specs */}
              <div className="mt-auto md:mt-0 pb-14 sm:pb-12 md:pb-0 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-8 md:gap-5 lg:gap-6 font-mono text-xs w-full max-w-full md:max-w-[185px] lg:max-w-[220px] pointer-events-auto backdrop-blur-[1px]">
                <div className="overflow-hidden">
                  <div className="reveal-line-s2 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      ACOUSTIC DRIVER
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono">
                      <span id="s2-chamber-source" className="inline-block whitespace-nowrap">
                        40<span className="text-xs text-neutral-400 font-normal ml-0.5 sm:ml-1">mm Custom</span>
                      </span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      BIO-CELLULOSE CHAMBER
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="reveal-line-s2 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      ACOUSTIC SEAL
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono whitespace-nowrap">
                      Airtight Seal
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      LOCKS IN DEEP BASS
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3: Active Isolation (Post-Assembly: No Lines) */}
            <div
              ref={overlayWavesRef}
              className="absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-between opacity-0 px-4 sm:px-8 lg:px-12 pointer-events-none transition-opacity duration-300"
            >
              {/* Left Editorial Floating Typography */}
              <div className="max-w-xs sm:max-w-sm md:max-w-[215px] lg:max-w-[320px] space-y-1.5 sm:space-y-3 lg:space-y-4 pointer-events-auto backdrop-blur-[1px] pt-20 sm:pt-20 md:pt-0">
                <div className="overflow-hidden">
                  <div className="reveal-line-s3 inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[11px] tracking-[0.20em] sm:tracking-[0.25em] text-neutral-400 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
                    <span>ACTIVE ISOLATION</span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h2 className="reveal-line-s3 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    Silence the World Around You
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <h2 className="reveal-line-s3 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    & Hear Pure Sound
                  </h2>
                </div>

                <div className="overflow-hidden">
                  <p className="reveal-line-s3 text-[11px] sm:text-xs lg:text-sm text-neutral-600 leading-normal font-normal max-w-[300px] sm:max-w-[320px] md:max-w-[215px] lg:max-w-[380px]">
                    Instantly mute airplane engines, train noise, and loud chatter with one touch. Six smart microphones listen to outside noise and cancel it in real time, so all you hear is crisp, studio-quality music.
                  </p>
                </div>
              </div>

              {/* Right Technical Specs */}
              <div className="mt-auto md:mt-0 pb-14 sm:pb-12 md:pb-0 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-8 md:gap-5 lg:gap-6 font-mono text-xs w-full max-w-full md:max-w-[185px] lg:max-w-[220px] pointer-events-auto backdrop-blur-[1px]">
                <div className="overflow-hidden">
                  <div className="reveal-line-s3 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      ACTIVE CANCELING
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono">
                      -42<span className="text-xs text-neutral-400 font-normal ml-0.5 sm:ml-1">dB</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      MUTES COMMUTE NOISE
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="reveal-line-s3 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      STUDIO CLARITY
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono whitespace-nowrap">
                      Master HD
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      STUDIO-GRADE CLARITY
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 4: Extended Lifespan (Post-Assembly: No Lines) */}
            <div
              ref={overlayConnectivityRef}
              className="absolute inset-0 flex flex-col md:flex-row-reverse items-start md:items-center justify-between opacity-0 px-4 sm:px-8 lg:px-12 pointer-events-none transition-opacity duration-300"
            >
              {/* Right Editorial Floating Typography (text-left md:text-right) */}
              <div className="max-w-xs sm:max-w-sm md:max-w-[215px] lg:max-w-[320px] space-y-1.5 sm:space-y-3 lg:space-y-4 text-left md:text-right pointer-events-auto backdrop-blur-[1px] pt-20 sm:pt-20 md:pt-0">
                <div className="overflow-hidden">
                  <div className="reveal-line-s4 inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[11px] tracking-[0.20em] sm:tracking-[0.25em] text-neutral-400 uppercase">
                    <span>EXTENDED LIFESPAN</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h2 className="reveal-line-s4 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    65-Hour Battery Life
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <h2 className="reveal-line-s4 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    & 15-Minute Fast Charge
                  </h2>
                </div>

                <div className="overflow-hidden">
                  <p className="reveal-line-s4 text-[11px] sm:text-xs lg:text-sm text-neutral-600 leading-normal font-normal max-w-[300px] sm:max-w-[320px] md:max-w-[215px] lg:max-w-[380px] md:ml-auto">
                    Listen for weeks without plugging in. Enjoy up to 65 hours of non-stop music on a single charge. Running low? A quick 15-minute charge gives you 8 full hours of playback before you leave.
                  </p>
                </div>
              </div>

              {/* Left Technical Specs */}
              <div className="mt-auto md:mt-0 pb-14 sm:pb-12 md:pb-0 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-8 md:gap-5 lg:gap-6 font-mono text-xs w-full max-w-full md:max-w-[185px] lg:max-w-[220px] pointer-events-auto backdrop-blur-[1px]">
                <div className="overflow-hidden">
                  <div className="reveal-line-s4 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      PLAYTIME
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono">
                      65<span className="text-xs text-neutral-400 font-normal ml-0.5 sm:ml-1">Hours</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      OVER TWO WEEKS PLAYTIME
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="reveal-line-s4 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      FAST CHARGE
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono">
                      15<span className="text-xs text-neutral-400 font-normal ml-0.5 sm:ml-1">Minutes</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      POWERS FULL WORKDAY
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 5: Ultra-Link Stream (Post-Assembly: Structured like 03 & 04) */}
            <div
              ref={overlayCompleteRef}
              className="absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-between opacity-0 px-4 sm:px-8 lg:px-12 pointer-events-none transition-opacity duration-300"
            >
              {/* Left Editorial Floating Typography */}
              <div className="max-w-xs sm:max-w-sm md:max-w-[215px] lg:max-w-[320px] space-y-1.5 sm:space-y-3 lg:space-y-4 pointer-events-auto backdrop-blur-[1px] pt-20 sm:pt-20 md:pt-0">
                <div className="overflow-hidden">
                  <div className="reveal-line-s5 inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[11px] tracking-[0.20em] sm:tracking-[0.25em] text-neutral-400 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
                    <span>ULTRA-LINK STREAM</span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h2 className="reveal-line-s5 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    Instant Multi-Device Link
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <h2 className="reveal-line-s5 text-base sm:text-2xl md:text-[22px] lg:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
                    & Zero Audio Delay
                  </h2>
                </div>

                <div className="overflow-hidden">
                  <p className="reveal-line-s5 text-[11px] sm:text-xs lg:text-sm text-neutral-600 leading-normal font-normal max-w-[300px] sm:max-w-[320px] md:max-w-[215px] lg:max-w-[380px]">
                    Stay seamlessly connected to your phone, laptop, and tablet all at once. Take calls and watch movies without reconnecting, while enjoying zero audio delay for gaming and an ultra-steady stream that never drops out.
                  </p>
                </div>
              </div>

              {/* Right Technical Specs */}
              <div className="mt-auto md:mt-0 pb-14 sm:pb-12 md:pb-0 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-8 md:gap-5 lg:gap-6 font-mono text-xs w-full max-w-full md:max-w-[185px] lg:max-w-[220px] pointer-events-auto backdrop-blur-[1px]">
                <div className="overflow-hidden">
                  <div className="reveal-line-s5 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      MULTI-DEVICE
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono whitespace-nowrap">
                      Instant<span className="text-xs text-neutral-400 font-normal ml-0.5 sm:ml-1">Switch</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      PHONE & LAPTOP LINK
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="reveal-line-s5 space-y-0.5 sm:space-y-1 font-mono">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neutral-400 font-mono truncate">
                      LOW-LATENCY AUDIO
                    </div>
                    <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums font-mono whitespace-nowrap">
                      Zero<span className="text-xs text-neutral-400 font-normal ml-0.5 sm:ml-1">Lag</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 tracking-wider uppercase font-mono truncate">
                      PERFECT FOR GAMING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 4: Stage 6 - Bespoke Finish Configurator Studio (Docking Target for Frame 382 Headset) */}
        <div
          ref={overlayVariantRef}
          className="absolute inset-x-0 top-14 bottom-0 sm:inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          <div className="w-full max-h-full flex flex-col justify-center">
            <VariantChooser
              showcaseRef={showcaseBoxRef}
              selectedColor={activeVariantColor}
              onColorChange={handleVariantColorChange}
              hideObsidianImage={!isDocked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
