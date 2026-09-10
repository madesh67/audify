import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import AboutView from "@/components/about/AboutView";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About Us — Audify Acoustic Laboratories",
  description:
    "Discover the acoustic philosophy, cryogenic metallurgy, bio-cellulose transducer engineering, and anechoic calibration behind Audify's reference sound instruments.",
};

export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#FEFEFE] text-neutral-950">
      {/* Floating Top Navigation */}
      <Navbar />

      {/* Main About Editorial & Laboratory Experience */}
      <AboutView />

      {/* Standardized Footer without repeating the hero CTA */}
      <Footer showCta={false} />
    </main>
  );
}

