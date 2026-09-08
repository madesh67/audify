"use client";

import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
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
    <div className="w-full space-y-6">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 shrink-0 cursor-pointer ${
                isActive
                  ? "bg-neutral-950 text-white shadow-sm"
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

      {/* Control Strip: Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-2xl bg-neutral-100/60 border border-neutral-200/70">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search instruments, specs, drivers, finishes..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-neutral-200/80 text-xs text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 font-sans transition-colors"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Results Count & Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-3 px-2 sm:px-0">
          <div className="text-[11px] font-mono text-neutral-500 whitespace-nowrap">
            <span className="font-semibold text-neutral-950">{totalResults}</span>{" "}
            {totalResults === 1 ? "instrument" : "instruments"}
          </div>

          <div className="h-4 w-[1px] bg-neutral-300 hidden sm:block" />

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-neutral-200/80 rounded-xl px-3 py-1.5 text-xs text-neutral-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[10px] font-mono uppercase text-neutral-400 hidden md:inline">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                soundEngine.playClick(750);
                onSortChange(
                  e.target.value as "featured" | "price-asc" | "price-desc" | "rating"
                );
              }}
              className="bg-transparent text-neutral-900 font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
