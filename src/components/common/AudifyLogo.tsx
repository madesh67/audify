"use client";

import React from "react";

export interface AudifyLogoProps {
  className?: string;
  size?: number | string;
  chevronColor?: string;
  barColor?: string;
  strokeWidth?: number;
  animated?: boolean;
}

export default function AudifyLogo({
  className = "h-[0.98em] w-auto inline-block",
  size,
  chevronColor = "currentColor",
  barColor = "currentColor",
  strokeWidth = 55,
  animated = false,
}: AudifyLogoProps) {
  return (
    <svg
      viewBox="330 110 340 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none overflow-visible ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      {/* Monogram A Chevron Arch */}
      <path
        d="M370,430 L500,150 L630,430"
        stroke={chevronColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Acoustic Spectrogram Wave (5 Equalizer Bars) */}
      <g className={animated ? "animate-pulse" : undefined}>
        <rect x="430" y="310" width="18" height="20" rx="6" fill={barColor} />
        <rect x="462" y="302" width="18" height="36" rx="6" fill={barColor} />
        <rect x="494" y="293" width="18" height="54" rx="6" fill={barColor} />
        <rect x="526" y="302" width="18" height="36" rx="6" fill={barColor} />
        <rect x="558" y="310" width="18" height="20" rx="6" fill={barColor} />
      </g>
    </svg>
  );
}

