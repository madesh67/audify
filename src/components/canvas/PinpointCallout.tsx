"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import gsap from "gsap";

export interface PinpointCalloutHandle {
  setDrawProgress: (progress: number) => void;
  updateGeometry: () => void;
}

export interface PinpointCalloutProps {
  cardX: number; // percentage (0 - 100) fallback
  cardY: number; // percentage (0 - 100) fallback
  targetX?: number; // percentage (0 - 100) fallback
  targetY?: number; // percentage (0 - 100) fallback
  targetImageX?: number; // Exact X coordinate in 1920 frame image
  targetImageY?: number; // Exact Y coordinate in 1080 frame image
  scaleMultiplier?: number; // Scale multiplier (default 0.76)
  label: string;
  badgePosition?: "top" | "bottom" | "left" | "right";
  initialDraw?: number;
  sourceSelector?: string; // Optional DOM selector to dynamically anchor origin to text element
  sourceSide?: "left" | "right"; // Which side of the text element to anchor to
}

const PinpointCallout = forwardRef<PinpointCalloutHandle, PinpointCalloutProps>(
  (
    {
      cardX,
      cardY,
      targetX = 50,
      targetY = 50,
      targetImageX,
      targetImageY,
      scaleMultiplier = 0.76,
      label,
      badgePosition = "top",
      initialDraw = 0,
      sourceSelector,
      sourceSide = "right",
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const originDotRef = useRef<SVGCircleElement>(null);
    const anchorGroupRef = useRef<SVGGElement>(null);
    const pathLengthRef = useRef<number>(600);
    const currentDrawProgressRef = useRef<number>(initialDraw);

    const [size, setSize] = useState<{ w: number; h: number }>({
      w: typeof window !== "undefined" ? window.innerWidth : 1440,
      h: typeof window !== "undefined" ? window.innerHeight : 900,
    });

    const [coords, setCoords] = useState<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }>({
      x1: (cardX / 100) * (typeof window !== "undefined" ? window.innerWidth : 1440),
      y1: (cardY / 100) * (typeof window !== "undefined" ? window.innerHeight : 900),
      x2: (targetX / 100) * (typeof window !== "undefined" ? window.innerWidth : 1440),
      y2: (targetY / 100) * (typeof window !== "undefined" ? window.innerHeight : 900),
    });

    const coordsRef = useRef(coords);
    coordsRef.current = coords;

    const updateGeometry = useCallback(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setSize({ w, h });

      let calculatedX1 = (cardX / 100) * w;
      let calculatedY1 = (cardY / 100) * h;
      let calculatedX2 = ((targetX ?? 50) / 100) * w;
      let calculatedY2 = ((targetY ?? 50) / 100) * h;

      if (targetImageX !== undefined && targetImageY !== undefined) {
        const isPortrait = h > w;
        const baseScale = isPortrait
          ? Math.max((w / 1920) * 1.45, (h / 1080) * 0.50)
          : Math.min(w / 1920, h / 1080);
        const finalScale = baseScale * scaleMultiplier;
        const offsetX = (w - 1920 * finalScale) / 2;
        const offsetY = (h - 1080 * finalScale) / 2;
        calculatedX2 = offsetX + targetImageX * finalScale;
        calculatedY2 = offsetY + targetImageY * finalScale;
      }

      if (sourceSelector && typeof document !== "undefined") {
        const el = document.querySelector(sourceSelector);
        if (el) {
          const r = el.getBoundingClientRect();
          let textLeft = r.left;
          let textRight = r.right;
          let textTop = r.top;
          let textHeight = r.height;

          // If element contains text, measure exact character boundary with Range
          if (el.childNodes.length > 0) {
            try {
              const range = document.createRange();
              range.selectNodeContents(el);
              const rects = range.getClientRects();
              if (rects.length > 0) {
                const rectArr = Array.from(rects);
                textLeft = Math.min(...rectArr.map((rc) => rc.left));
                textRight = Math.max(...rectArr.map((rc) => rc.right));
                textTop = rectArr[0].top;
                textHeight = rectArr[0].height;
              }
            } catch {}
          }

          // Compute resting untransformed position by removing any ancestor CSS translateY/translateX
          let cur: HTMLElement | null = el as HTMLElement;
          let totalTx = 0;
          let totalTy = 0;
          while (cur && cur !== document.body) {
            const style = window.getComputedStyle(cur);
            const transform = style.transform;
            if (transform && transform !== "none") {
              const match = transform.match(/matrix\(([^)]+)\)/);
              if (match) {
                const parts = match[1].split(",").map(Number);
                totalTx += parts[4] || 0;
                totalTy += parts[5] || 0;
              }
            }
            cur = cur.parentElement;
          }

          const restingLeft = textLeft - totalTx;
          const restingRight = textRight - totalTx;
          const restingTop = textTop - totalTy;

          if (sourceSide === "right") {
            calculatedX1 = restingRight + 12;
          } else if (sourceSide === "left") {
            calculatedX1 = restingLeft - 12;
          }
          calculatedY1 = restingTop + textHeight / 2;
        }
      }

      const svgRect = svgRef.current?.getBoundingClientRect();
      const svgOffsetX = svgRect ? svgRect.left : 0;
      const svgOffsetY = svgRect ? svgRect.top : 0;

      const nextCoords = {
        x1: calculatedX1 - svgOffsetX,
        y1: calculatedY1 - svgOffsetY,
        x2: calculatedX2 - svgOffsetX,
        y2: calculatedY2 - svgOffsetY,
      };
      coordsRef.current = nextCoords;
      setCoords(nextCoords);

      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        pathLengthRef.current = len > 0 ? len : 600;
        pathRef.current.style.strokeDasharray = `${pathLengthRef.current}`;
        const offset = pathLengthRef.current * (1 - currentDrawProgressRef.current);
        pathRef.current.style.strokeDashoffset = `${offset}`;
      }

      if (anchorGroupRef.current) {
        const p = currentDrawProgressRef.current;
        const anchorT = p >= 0.82 ? (p - 0.82) / 0.18 : 0;
        anchorGroupRef.current.setAttribute(
          "transform",
          `translate(${calculatedX2}, ${calculatedY2}) scale(${anchorT})`
        );
        anchorGroupRef.current.style.opacity = `${anchorT}`;
      }

      if (originDotRef.current) {
        const p = currentDrawProgressRef.current;
        originDotRef.current.style.opacity = p > 0.05 ? "1" : "0";
      }
    }, [cardX, cardY, targetX, targetY, targetImageX, targetImageY, scaleMultiplier, sourceSelector, sourceSide]);

    useEffect(() => {
      updateGeometry();
      const t1 = setTimeout(updateGeometry, 50);
      const t2 = setTimeout(updateGeometry, 250);
      window.addEventListener("resize", updateGeometry);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener("resize", updateGeometry);
      };
    }, [updateGeometry]);

    // Imperative DrawSVG controller driven by scroll progress
    useImperativeHandle(ref, () => ({
      updateGeometry: () => {
        updateGeometry();
      },
      setDrawProgress: (progress: number) => {
        const clamped = Math.min(1, Math.max(0, progress));
        const wasZero = currentDrawProgressRef.current === 0;
        currentDrawProgressRef.current = clamped;

        // Ensure geometry is freshly measured whenever drawing activates
        if (wasZero && clamped > 0) {
          updateGeometry();
        }

        const len = pathLengthRef.current;

        if (pathRef.current) {
          const offset = len * (1 - clamped);
          gsap.to(pathRef.current, {
            strokeDashoffset: offset,
            opacity: clamped > 0.01 ? 1 : 0,
            duration: 0.1,
            ease: "none",
            overwrite: "auto",
          });
        }

        if (svgRef.current) {
          gsap.to(svgRef.current, {
            opacity: clamped > 0.005 ? 1 : 0,
            duration: 0.1,
            ease: "none",
            overwrite: "auto",
          });
        }

        if (anchorGroupRef.current) {
          const anchorT = clamped >= 0.82 ? (clamped - 0.82) / 0.18 : 0;
          const cur = coordsRef.current;
          gsap.to(anchorGroupRef.current, {
            attr: { transform: `translate(${cur.x2}, ${cur.y2}) scale(${anchorT})` },
            opacity: anchorT,
            duration: 0.15,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (originDotRef.current) {
          gsap.to(originDotRef.current, {
            opacity: clamped > 0.05 ? 1 : 0,
            duration: 0.1,
            overwrite: "auto",
          });
        }
      },
    }));

    const midX = (coords.x1 + coords.x2) / 2;

    const badgeW = label.length * 6.8 + 24;
    const badgeH = 20;
    let bx = -badgeW / 2;
    let by = -38;

    if (badgePosition === "top") {
      bx = -badgeW / 2;
      by = -38;
    } else if (badgePosition === "bottom") {
      bx = -badgeW / 2;
      by = 22;
    } else if (badgePosition === "left") {
      bx = -badgeW - 22;
      by = -badgeH / 2;
    } else if (badgePosition === "right") {
      bx = 22;
      by = -badgeH / 2;
    }

    return (
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible select-none z-20"
        style={{ width: "100%", height: "100%", opacity: initialDraw > 0.005 ? 1 : 0 }}
      >
        {/* Origin Anchor Disc at Editorial Text */}
        <circle
          ref={originDotRef}
          cx={coords.x1}
          cy={coords.y1}
          r={3.5}
          fill="#000000"
          style={{ opacity: initialDraw > 0.05 ? 1 : 0 }}
          className="transition-opacity duration-200"
        />

        {/* Dynamic DrawSVG Leader Line (From Text to Hardware Anchor) */}
        <path
          ref={pathRef}
          d={`M ${coords.x1} ${coords.y1} L ${midX} ${coords.y1} L ${coords.x2} ${coords.y2}`}
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLengthRef.current,
            strokeDashoffset: pathLengthRef.current * (1 - initialDraw),
            opacity: initialDraw > 0.01 ? 1 : 0,
          }}
        />

        {/* Absolute SVG Hardware Anchor Point & Reticle Centered at (0, 0) */}
        <g
          ref={anchorGroupRef}
          transform={`translate(${coords.x2}, ${coords.y2}) scale(${initialDraw >= 0.85 ? 1 : 0})`}
          style={{
            opacity: initialDraw >= 0.85 ? 1 : 0,
          }}
        >
          {/* Outer Precision Target Ring */}
          <circle
            cx={0}
            cy={0}
            r={10}
            fill="none"
            stroke="#000000"
            strokeWidth={1.75}
          />

          {/* Orbit Dashed Reticle Ring */}
          <circle
            cx={0}
            cy={0}
            r={16}
            fill="none"
            stroke="#000000"
            strokeWidth={0.75}
            strokeDasharray="2 3"
            opacity={0.35}
          />

          {/* Solid Core Target Dot */}
          <circle cx={0} cy={0} r={2.5} fill="#000000" />

          {/* Crosshair Precision Ticks */}
          <line
            x1={-14}
            y1={0}
            x2={-10}
            y2={0}
            stroke="#000000"
            strokeWidth={1.5}
          />
          <line
            x1={10}
            y1={0}
            x2={14}
            y2={0}
            stroke="#000000"
            strokeWidth={1.5}
          />
          <line
            x1={0}
            y1={-14}
            x2={0}
            y2={-10}
            stroke="#000000"
            strokeWidth={1.5}
          />
          <line
            x1={0}
            y1={10}
            x2={0}
            y2={14}
            stroke="#000000"
            strokeWidth={1.5}
          />

          {/* Monospace SVG Specification Badge Pill */}
          <g transform={`translate(${bx}, ${by})`}>
            <rect
              x={0}
              y={0}
              width={badgeW}
              height={badgeH}
              rx={10}
              fill="#000000"
            />
            <circle cx={9} cy={10} r={2.5} fill="#ffffff" />
            <text
              x={17}
              y={13.5}
              fill="#ffffff"
              fontSize="9"
              fontFamily="var(--font-geist-mono), monospace"
              fontWeight="600"
              letterSpacing="0.1em"
              className="select-none uppercase"
            >
              {label}
            </text>
          </g>
        </g>
      </svg>
    );
  }
);

PinpointCallout.displayName = "PinpointCallout";

export default PinpointCallout;
