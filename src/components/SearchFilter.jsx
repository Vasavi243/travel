import React from "react";
import { Search, X, SlidersHorizontal, Globe2 } from "lucide-react";
import { categories } from "../data/destinations";

export function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  resultCount,
  totalCount
}) {
  return (
    <div className="w-full mb-10">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search destinations by name, country, or category..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-xl transition-all shadow-lg shadow-black/20"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Result Count Pill */}
        <div className="flex items-center justify-between md:justify-end gap-2 text-xs font-medium text-slate-400 px-3.5 py-2 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              Showing <strong className="text-white font-bold">{resultCount}</strong> {resultCount === 1 ? "destination" : "destinations"}
              {totalCount && totalCount !== resultCount ? (
                <span className="text-slate-500 ml-1">of {totalCount}</span>
              ) : null}
            </span>
          </div>
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400 font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
              <Globe2 className="w-3 h-3" />
              {selectedCategory}
            </span>
          )}
        </div>
      </div>

      {/* Continent / Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-5 scrollbar-none">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SearchFilter;