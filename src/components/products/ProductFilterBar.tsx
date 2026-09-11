"use client";

import { ArrowDownWideNarrow, ArrowUpNarrowWide, Search, X } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { soundEngine } from "@/utils/sound";

interface ProductFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating";
  onSortChange: (sort: "featured" | "price-asc" | "price-desc" | "rating") => void;
  totalResults: number;
}

export default function ProductFilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
}: ProductFilterBarProps) {
  const handleCategoryClick = (catId: string) => {
    soundEngine.playClick(600);
    onSelectCategory(catId);
  };

  const handleClearSearch = () => {
    soundEngine.playClick(500);
    onSearchChange("");
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Category Pills: Horizontal scroll on small mobile, elegant wrap on tablet & desktop */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none sm:flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 min-h-[42px] rounded-full text-xs font-semibold tracking-tight transition-all duration-200 shrink-0 cursor-pointer active:scale-[0.98] ${
                isActive
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-950"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-neutral-800 text-neutral-300"
                    : "bg-neutral-200/70 text-neutral-500"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Control Strip: Search & Sort Bar with tablet-first touch ergonomics */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 p-2.5 rounded-2xl bg-neutral-100/70 border border-neutral-200/80">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search instruments, specs, drivers, finishes..."
            className="w-full pl-10 pr-9 py-2.5 sm:py-3 min-h-[44px] rounded-xl bg-white border border-neutral-200/80 text-xs sm:text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 font-sans transition-colors"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results Count & Price Sort Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 px-1 sm:px-0 shrink-0">
          <div className="text-[11px] font-mono text-neutral-500 whitespace-nowrap">
            <span className="font-semibold text-neutral-950">{totalResults}</span>{" "}
            {totalResults === 1 ? "instrument" : "instruments"}
          </div>

          <div className="h-4 w-[1px] bg-neutral-300 hidden md:block" />

          {/* Sort Controls */}
          <div className="flex items-center gap-1 bg-white border border-neutral-200/80 rounded-xl p-1 shadow-2xs">
            {/* Low to High */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(750);
                onSortChange(sortBy === "price-asc" ? "featured" : "price-asc");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                sortBy === "price-asc"
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
              }`}
              title="Sort Price: Low to High"
              aria-label="Sort Price: Low to High"
            >
              <ArrowUpNarrowWide className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] font-mono whitespace-nowrap">Low to High</span>
            </button>

            {/* High to Low */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(750);
                onSortChange(sortBy === "price-desc" ? "featured" : "price-desc");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                sortBy === "price-desc"
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
              }`}
              title="Sort Price: High to Low"
              aria-label="Sort Price: High to Low"
            >
              <ArrowDownWideNarrow className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] font-mono whitespace-nowrap">High to Low</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
