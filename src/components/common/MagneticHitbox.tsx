"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MagneticHitboxProps {
  children: React.ReactNode;
  radius?: number; // 30-pixel attraction radius
  strength?: number; // Gentle pull factor
  className?: string;
}

/**
 * MagneticHitbox
 * Wraps elements in an active magnetic field that smoothly attracts the element
 * toward the cursor when the pointer is within a specified radius (default 30px).
 */
export default function MagneticHitbox({
  children,
  radius = 30,
  strength = 0.35,
  className = "",
}: MagneticHitboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    // Disable magnetic effect on touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Use GSAP quickTo for lag-free 60/120fps tracking
    const xTo = gsap.quickTo(target, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.45, ease: "power3.out" });

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();

      // Find nearest point on element's un-transformed bounding box
      const nearestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const nearestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));

      const distX = e.clientX - nearestX;
      const distY = e.clientY - nearestY;
      const distance = Math.hypot(distX, distY);

      if (distance <= radius) {
        // Within 30-pixel radius: gently pull element toward cursor
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const pullX = (e.clientX - centerX) * strength;
        const pullY = (e.clientY - centerY) * strength;

        xTo(pullX);
        yTo(pullY);
      } else {
        // Outside magnetic radius: release smoothly to origin
        xTo(0);
        yTo(0);
      }
    };

    const handleRelease = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handleRelease);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleRelease);
      gsap.killTweensOf(target);
    };
  }, [radius, strength]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center pointer-events-auto ${className}`}
    >
      <div ref={targetRef} className="will-change-transform inline-flex items-center">
        {children}
      </div>
    </div>
  );
}
