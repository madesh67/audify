/**
 * Audify Progressive Interlaced Image Preloader
 * 382 Frames:
 * Phase 1 (1 - 191): Headset Fitting & Component Assembly (headset-assemble)
 * Phase 2 (192 - 382): Headset Features & Acoustic Waves (headset-feature)
 */

export const TOTAL_FRAMES = 382;
export const ASSEMBLE_FRAMES = 191;
export const FEATURE_FRAMES = 191;

export interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
  isReady: boolean;
  phase?: "assemble" | "features" | "ready";
}

// Global in-memory frame buffer
const frameBuffer: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
let isInitialized = false;

if (typeof window !== "undefined") {
  (window as any).__frameBuffer = frameBuffer;
}

/**
 * Returns image URL for any global frame (1 to 382)
 */
export function getFrameUrl(globalFrame: number): string {
  const frame = Math.min(TOTAL_FRAMES, Math.max(1, globalFrame || 1));
  if (frame <= ASSEMBLE_FRAMES) {
    const localIndex = frame;
    const fileName = `${String(localIndex).padStart(4, "0")}.webp`;
    return `/scroll-animation-source/headset-assemble/${fileName}`;
  } else {
    const localIndex = frame - ASSEMBLE_FRAMES;
    const fileName = `${String(localIndex).padStart(4, "0")}.webp`;
    return `/scroll-animation-source/headset-feature/${fileName}`;
  }
}

/**
 * Retrieves the best available loaded image for frameNumber.
 * If exact frame isn't loaded yet, immediately returns the nearest loaded neighbor.
 */
export function getFrameImage(globalFrame: number): HTMLImageElement | null {
  const safeFrame = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(globalFrame || 1)));
  const index = safeFrame - 1;

  // 1. Direct hit
  const direct = frameBuffer[index];
  if (direct && direct.complete && direct.naturalWidth > 0) {
    return direct;
  }

  // 2. Nearest neighbor search (checks closest loaded frames in both directions)
  for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
    const left = index - offset;
    if (left >= 0) {
      const imgL = frameBuffer[left];
      if (imgL && imgL.complete && imgL.naturalWidth > 0) return imgL;
    }
    const right = index + offset;
    if (right < TOTAL_FRAMES) {
      const imgR = frameBuffer[right];
      if (imgR && imgR.complete && imgR.naturalWidth > 0) return imgR;
    }
  }

  return null;
}

// Separated 382th frame headset (clean isolated 3D model without network icons)
let separated382Image: HTMLImageElement | null = null;

export function getSeparated382Image(): HTMLImageElement | null {
  if (separated382Image && separated382Image.complete && separated382Image.naturalWidth > 0) {
    return separated382Image;
  }
  if (typeof window !== "undefined" && !separated382Image) {
    separated382Image = new Image();
    separated382Image.src = "/images/headset-frame-382.webp";
  }
  return separated382Image;
}

/**
 * Progressive preloader with interlaced batches
 */
export function preloadAllFrames(
  onProgress?: (progress: PreloadProgress) => void,
  onFirstFrameReady?: () => void
): void {
  if (typeof window === "undefined") return;

  // Preload separated 382th frame headset early so glide transition is instant
  if (!separated382Image) {
    separated382Image = new Image();
    separated382Image.src = "/images/headset-frame-382.webp";
  }

  // Priority 1: Load Frame 1 immediately
  if (!frameBuffer[0]) {
    const img1 = new Image();
    img1.onload = () => {
      frameBuffer[0] = img1;
      onFirstFrameReady?.();
    };
    img1.src = getFrameUrl(1);
  } else if (frameBuffer[0].complete && frameBuffer[0].naturalWidth > 0) {
    onFirstFrameReady?.();
  }

  if (isInitialized) {
    const count = frameBuffer.filter((f) => f && f.complete && f.naturalWidth > 0).length;
    onProgress?.({
      loaded: count,
      total: TOTAL_FRAMES,
      percentage: Math.round((count / TOTAL_FRAMES) * 100),
      isReady: count >= 10,
    });
    return;
  }
  isInitialized = true;

  let loadedCount = 0;
  const notify = () => {
    const percentage = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
    onProgress?.({
      loaded: loadedCount,
      total: TOTAL_FRAMES,
      percentage,
      isReady: loadedCount >= 10 || percentage >= 15,
      phase: loadedCount > ASSEMBLE_FRAMES ? "features" : "assemble",
    });
  };

  const loadFrame = (frameNum: number): Promise<void> => {
    return new Promise((done) => {
      if (!frameNum || isNaN(frameNum)) {
        done();
        return;
      }
      const idx = frameNum - 1;
      if (frameBuffer[idx] && frameBuffer[idx]!.complete && frameBuffer[idx]!.naturalWidth > 0) {
        loadedCount++;
        notify();
        done();
        return;
      }

      const img = new Image();
      img.onload = () => {
        frameBuffer[idx] = img;
        loadedCount++;
        if (frameNum === 1) onFirstFrameReady?.();
        notify();
        done();
      };
      img.onerror = () => {
        loadedCount++;
        notify();
        done();
      };
      img.src = getFrameUrl(frameNum);
    });
  };

  // Interlaced loading strategy:
  // Pass 1: Every 4th frame (1, 5, 9, 13...) -> covers 100% of the entire animation quickly
  const pass1: number[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i += 4) pass1.push(i);

  // Pass 2: Every 2nd frame (3, 7, 11, 15...) -> doubles temporal resolution
  const pass2: number[] = [];
  for (let i = 3; i <= TOTAL_FRAMES; i += 4) pass2.push(i);

  // Pass 3: All remaining even frames (2, 4, 6, 8...) -> full 382-frame 60fps fidelity
  const pass3: number[] = [];
  for (let i = 2; i <= TOTAL_FRAMES; i += 2) pass3.push(i);

  const runBatch = async (batch: number[], concurrency = 16) => {
    let pointer = 0;
    const worker = async () => {
      while (true) {
        if (pointer >= batch.length) break;
        const frame = batch[pointer++];
        if (!frame) break;
        await loadFrame(frame);
      }
    };
    const workers: Promise<void>[] = [];
    for (let w = 0; w < concurrency; w++) workers.push(worker());
    await Promise.all(workers);
  };

  // Run passes in rapid succession
  (async () => {
    await runBatch(pass1, 16);
    await runBatch(pass2, 16);
    await runBatch(pass3, 20);
  })();
}
