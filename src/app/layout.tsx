import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://audify.audio"),
  title: "Audify — The Architecture of Sound",
  description:
    "Flagship wireless acoustic instruments engineered for purists and creators. Exploded cryogenic titanium anatomy, 45mm custom beryllium transducer, and 65-hour playback.",
  keywords: [
    "Audify",
    "Audiophile Headphones",
    "High-Res Audio",
    "Beryllium Driver",
    "Titanium Headset",
    "Mastering Studio",
    "Spatial Acoustics",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Audify — The Architecture of Sound",
    description:
      "Flagship wireless acoustic instruments engineered for purists and creators. Exploded cryogenic titanium anatomy, 45mm custom beryllium transducer, and 65-hour playback.",
    siteName: "Audify",
    images: [
      {
        url: "/apple-icon.png",
        width: 512,
        height: 512,
        alt: "Audify Acoustic Monogram",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Audify — The Architecture of Sound",
    description:
      "Flagship wireless acoustic instruments engineered for purists and creators.",
    images: ["/apple-icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#FEFEFE] text-neutral-950 selection:bg-neutral-950 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
