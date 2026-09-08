import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import CartPageView from "@/components/cart/CartPageView";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Reservation Bag & Acoustic Cart — Audify",
  description:
    "Review and reserve your Audify acoustic monitors, reference headphones, and companion hardware with expedited white-glove logistics.",
};

export default function CartPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#FEFEFE] text-neutral-950">
      {/* Floating Top Navigation with Cart link & dynamic badge */}
      <Navbar />

      {/* Main Luxury Cart View */}
      <CartPageView />

      {/* Standardized Minimal Footer */}
      <Footer showCta={false} />
    </main>
  );
}
