"use client";

import React from "react";

export interface SocialReview {
  id: string;
  name: string;
  handle: string;
  platform: "x" | "reddit" | "instagram" | "youtube" | "threads";
  avatarBg: string;
  avatarText: string;
  timestamp: string;
  text: string;
  metrics: string;
  register: "simple" | "advanced" | "mixed";
  verified?: boolean;
}

const reviewsData: SocialReview[] = [
  // Track 1 Reviews
  {
    id: "sr-1",
    name: "Liam K.",
    handle: "@liamk_music",
    platform: "x",
    avatarBg: "bg-neutral-900 text-white",
    avatarText: "LK",
    timestamp: "3h ago",
    register: "simple",
    metrics: "♥ 428 · 31 Reposts",
    text: "Honestly didn't expect much for $499 but these are insane. Had them on for 8 hours on a flight to Tokyo and my ears didn't hurt at all. Battery was still at 70%. Worth every single dollar.",
  },
  {
    id: "sr-2",
    name: "Dr. Aris Thorne",
    handle: "@aris_acoustics",
    platform: "x",
    avatarBg: "bg-neutral-800 text-white",
    avatarText: "AT",
    verified: true,
    timestamp: "Yesterday",
    register: "advanced",
    metrics: "♥ 612 · 89 Reposts",
    text: "The transient decay on these 40mm beryllium diaphragms is remarkably fast. Zero perceptual smearing in lower-mid frequencies, and internal cup reflections are virtually non-existent. Genuine reference-grade tuning.",
  },
  {
    id: "sr-3",
    name: "daily_driver_92",
    handle: "r/headphones",
    platform: "reddit",
    avatarBg: "bg-orange-600 text-white",
    avatarText: "DD",
    timestamp: "1d ago",
    register: "simple",
    metrics: "▲ 842 Upvotes · 128 comments",
    text: "Bro the bass on the Audify is so clean, not muddy or boomy at all. You can literally hear the singer taking a breath between lyrics. Spotify sounds like a whole new app lol.",
  },
  {
    id: "sr-4",
    name: "Chloe Martinez",
    handle: "@chloemartinez.design",
    platform: "instagram",
    avatarBg: "bg-neutral-950 text-white",
    avatarText: "CM",
    verified: true,
    timestamp: "4d ago",
    register: "mixed",
    metrics: "♥ 1.2k likes",
    text: "My Obsidian pair arrived this morning. The unboxing alone felt like opening a luxury Swiss timepiece. Solid aluminum, zero creaking, and looks gorgeous next to my workspace setup. 10/10.",
  },
  {
    id: "sr-5",
    name: "Julian Vance",
    handle: "@julianvance.audio",
    platform: "threads",
    avatarBg: "bg-neutral-900 text-white",
    avatarText: "JV",
    timestamp: "5d ago",
    register: "advanced",
    metrics: "♥ 340 likes",
    text: "The passive mechanical isolation on these memory seals is striking. Muffles low-frequency ambient rumble without relying on digital phase cancellation that usually fatigues the eardrum. An exceptional acoustic achievement.",
  },

  // Track 2 Reviews
  {
    id: "sr-6",
    name: "Kai Takahashi",
    handle: "@kaitakahashi_tech",
    platform: "youtube",
    avatarBg: "bg-red-600 text-white",
    avatarText: "KT",
    verified: true,
    timestamp: "3d ago",
    register: "mixed",
    metrics: "♥ 2.8k · 190 comments",
    text: "Switched from my daily AirPods Max to the Audify Mercury for two weeks. Soundstage is way wider, mic clarity on calls is actually good, and the metal build doesn't feel like plastic junk. Definitely my new daily recommendation.",
  },
  {
    id: "sr-7",
    name: "mastering_chronicles",
    handle: "r/audiophile",
    platform: "reddit",
    avatarBg: "bg-orange-600 text-white",
    avatarText: "MC",
    timestamp: "2d ago",
    register: "advanced",
    metrics: "▲ 1.4k Upvotes · 215 comments",
    text: "Tested across 24-bit/192kHz master recordings of Mahler's Symphony No. 2. Spatial localization is pinpoint; instrument separation across the stereo field rivals my open-back planar studio monitors. Impressive phase coherence down to 10Hz.",
  },
  {
    id: "sr-8",
    name: "Maya Sterling",
    handle: "@mayasterling_prod",
    platform: "x",
    avatarBg: "bg-neutral-900 text-white",
    avatarText: "MS",
    verified: true,
    timestamp: "6h ago",
    register: "mixed",
    metrics: "♥ 945 · 112 Reposts",
    text: "Mixed an entire indie EP on the Audify Ultra this week. The high-end sparkle is crystal clear without being piercing, and honestly the dune champagne finish looks sick in studio b-roll footage. Big fan.",
  },
  {
    id: "sr-9",
    name: "Sofia Reyes",
    handle: "@sofiareyes_work",
    platform: "x",
    avatarBg: "bg-neutral-700 text-white",
    avatarText: "SR",
    timestamp: "12h ago",
    register: "simple",
    metrics: "♥ 214 Likes",
    text: "WFH setup complete! 8 hours straight of Zoom calls and zero headphone hair or clamp headaches. My coworkers said I sound like I'm in a podcast studio with the built-in mics.",
  },
  {
    id: "sr-10",
    name: "beatmaker_sf",
    handle: "r/MusicBattlestations",
    platform: "reddit",
    avatarBg: "bg-orange-600 text-white",
    avatarText: "BM",
    timestamp: "1w ago",
    register: "mixed",
    metrics: "▲ 980 Upvotes · 84 comments",
    text: "I was lowkey skeptical of the price tag tbh, but once you put them on, you get it. The physical dials feel so satisfying, zero latency with the DAC cable, and they just sound alive. 100% keeping these.",
  },
  {
    id: "sr-11",
    name: "Tariq Vance",
    handle: "@tariqv_audio",
    platform: "x",
    avatarBg: "bg-neutral-800 text-white",
    avatarText: "TV",
    timestamp: "18h ago",
    register: "simple",
    metrics: "♥ 310 Likes",
    text: "Had these on through an entire transatlantic red-eye. The earcups don't stick to your skin like pleather does. Pure comfort and crystal audio.",
  },
  {
    id: "sr-12",
    name: "Acoustic Lab EU",
    handle: "@studio_acoustic_eu",
    platform: "threads",
    avatarBg: "bg-neutral-900 text-white",
    avatarText: "AL",
    verified: true,
    timestamp: "2d ago",
    register: "advanced",
    metrics: "♥ 540 Likes",
    text: "Anechoic chamber impulse testing confirms linear transient response up to 48kHz. The acoustic chamber baffle delivers mastering-grade precision without unnatural EQ boosting.",
  },
];

// Split reviews into 3 tracks: Track 1 (Left), Track 2 (Center Main), Track 3 (Right)
const track1 = [reviewsData[0], reviewsData[3], reviewsData[2], reviewsData[10]]; // Liam K, Chloe M, daily_driver, Tariq V
const track2 = [reviewsData[1], reviewsData[4], reviewsData[6], reviewsData[5]];  // Dr. Aris, Julian V, mastering_chronicles, Kai T (Center Main)
const track3 = [reviewsData[7], reviewsData[9], reviewsData[8], reviewsData[11]]; // Maya S, beatmaker_sf, Sofia R, Acoustic Lab EU

function PlatformIcon({ platform }: { platform: SocialReview["platform"] }) {
  if (platform === "x") {
    return (
      <svg className="w-3.5 h-3.5 fill-neutral-900" viewBox="0 0 24 24" aria-label="X">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (platform === "reddit") {
    return (
      <svg className="w-3.5 h-3.5 fill-[#FF4500]" viewBox="0 0 24 24" aria-label="Reddit">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .468c.785.786 2.054 1.157 2.947 1.157.893 0 2.161-.371 2.946-1.157a.33.33 0 0 0 0-.468.33.33 0 0 0-.468 0c-.628.629-1.637.935-2.478.935s-1.85-.306-2.478-.935a.33.33 0 0 0-.238-.094z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg className="w-3.5 h-3.5 fill-[#E4405F]" viewBox="0 0 24 24" aria-label="Instagram">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (platform === "youtube") {
    return (
      <svg className="w-3.5 h-3.5 fill-[#FF0000]" viewBox="0 0 24 24" aria-label="YouTube">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  // threads
  return (
    <svg className="w-3.5 h-3.5 fill-neutral-900" viewBox="0 0 192 192" aria-label="Threads">
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.8398 72.8423C81.4286 64.3644 90.0163 60.3392 100.999 60.3392C117.842 60.3392 124.629 72.2479 125.753 87.7287C118.898 87.0543 111.458 86.8223 103.498 87.0378C73.4116 87.8528 55.4593 103.447 55.8587 125.688C56.2418 147.012 73.8348 161.474 95.8362 161.474C111.411 161.474 123.639 154.512 130.803 141.745C136.216 151.782 145.419 157.065 157.872 157.065C170.898 157.065 180.898 147.933 180.898 127.353V88.8557C180.898 42.1469 146.04 8.74426 96.2574 8.74426C46.3688 8.74426 9.42969 43.1495 9.42969 96.2571C9.42969 149.365 46.3688 183.77 96.2574 183.77C125.293 183.77 148.868 173.064 162.748 153.255L149.99 143.082C138.831 158.461 120.301 166.526 96.2574 166.526C56.1264 166.526 26.6738 137.669 26.6738 96.2571C26.6738 54.8455 56.1264 25.9883 96.2574 25.9883C136.425 25.9883 163.654 53.6429 163.654 88.8557V127.353C163.654 138.567 159.208 141.696 154.912 141.696C147.24 141.696 142.158 135.293 142.158 120.477V114.509C142.158 104.996 141.951 96.9922 141.537 88.9883ZM125.048 103.376C125.568 117.842 118.898 126.96 104.092 126.96C93.0039 126.96 86.4172 120.316 86.4172 110.74C86.4172 96.8661 97.4484 92.5186 112.569 92.5186C117.065 92.5186 121.261 92.8366 125.048 93.4735V103.376Z" />
    </svg>
  );
}

function ReviewCard({
  review,
  isCenter = false,
}: {
  review: SocialReview;
  isCenter?: boolean;
}) {
  return (
    <div
      className={`shrink-0 rounded-2xl flex flex-col justify-between select-none my-2 sm:my-2.5 transition-shadow ${
        isCenter
          ? "w-[260px] sm:w-[280px] lg:w-[295px] border border-transparent bg-white p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          : "w-[215px] sm:w-[235px] lg:w-[250px] border border-neutral-200/70 bg-white/90 p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
      }`}
    >
      {/* Author & Platform Header */}
      <div className="flex items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className={`rounded-full ${review.avatarBg} flex items-center justify-center font-mono font-semibold shrink-0 shadow-xs ${
              isCenter ? "w-8 h-8 text-[11px]" : "w-7 h-7 text-[10px]"
            }`}
          >
            {review.avatarText}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span
                className={`font-semibold text-neutral-950 tracking-tight ${
                  isCenter ? "text-xs sm:text-sm" : "text-xs"
                }`}
              >
                {review.name}
              </span>
              {review.verified && (
                <svg
                  className="w-3 h-3 fill-sky-500 shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] text-neutral-400">
              {review.handle}
            </div>
          </div>
        </div>

        <div className="w-6 h-6 rounded-full bg-neutral-50 border border-neutral-200/60 flex items-center justify-center shrink-0">
          <PlatformIcon platform={review.platform} />
        </div>
      </div>

      {/* Review Body Text - Center Main cards are shown fully */}
      <p
        className={`text-neutral-800 font-normal mb-3 ${
          isCenter
            ? "text-xs sm:text-[13px] leading-relaxed"
            : "text-[11px] sm:text-xs leading-normal"
        }`}
      >
        {review.text}
      </p>

      {/* Footer Timestamp & Metrics */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <span>{review.timestamp}</span>
        <span className="text-neutral-500 font-medium">{review.metrics}</span>
      </div>
    </div>
  );
}

export default function SocialReviewCanvas() {
  return (
    <section
      id="critical-acclaim"
      className="relative w-full bg-[#FEFEFE] text-neutral-950 pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Side: Section Heading and Small Description only */}
          <div className="lg:col-span-5 flex flex-col space-y-3 sm:space-y-4 lg:pr-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 leading-[1.08]">
              Reviews &amp;{" "}
              <span className="font-semibold text-neutral-950">
                Ratings
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed pt-1">
              Real impressions from X, Reddit, and Instagram. Unedited feedback from daily commuters on 8-hour flights, mastering engineers auditing acoustic phase coherence, and creators in the studio.
            </p>
          </div>

          {/* Right Side: Creative Review Canvas with 3 Columns Running in a Diagonal Path */}
          {/* Exactly preserving container width and height */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] lg:h-[530px] w-full rounded-3xl border border-transparent bg-transparent p-2 sm:p-4 overflow-hidden">
            {/* Rotated Diagonal Canvas Wrapper with 3 Columns */}
            <div className="absolute -inset-14 sm:-inset-16 flex justify-center items-center pointer-events-auto rotate-[9deg] scale-100 sm:scale-105">
              <div className="flex gap-3 sm:gap-3.5 lg:gap-4 justify-center items-center">
                {/* Column 1: Left Lane (drifts up) */}
                <div className="animate-marquee-up opacity-60 hover:opacity-100 transition-opacity">
                  {[...track1, ...track1, ...track1, ...track1].map((review, idx) => (
                    <ReviewCard key={`diag-col1-${review.id}-${idx}`} review={review} isCenter={false} />
                  ))}
                </div>

                {/* Column 2: Center Main Lane (Main Review - Shown Fully, drifts down) */}
                <div className="animate-marquee-down z-10 opacity-100">
                  {[...track2, ...track2, ...track2, ...track2].map((review, idx) => (
                    <ReviewCard key={`diag-col2-${review.id}-${idx}`} review={review} isCenter={true} />
                  ))}
                </div>

                {/* Column 3: Right Lane (drifts up) */}
                <div className="animate-marquee-up opacity-60 hover:opacity-100 transition-opacity">
                  {[...track3, ...track3, ...track3, ...track3].map((review, idx) => (
                    <ReviewCard key={`diag-col3-${review.id}-${idx}`} review={review} isCenter={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
