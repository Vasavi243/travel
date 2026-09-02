import React, { useState } from "react";
import { MapPin, Search, Navigation, AlertCircle, Loader2 } from "lucide-react";

const POPULAR_CITIES = [
  "Paris",
  "Tokyo",
  "Dubai",
  "London",
  "New York",
  "Rome",
  "Singapore",
  "Goa",
  "Sydney",
  "Bangkok"
];

export function LocationSelector({
  onSelectCity,
  onUseMyLocation,
  isLocating = false,
  currentLocationLabel = ""
}) {
  const [cityInput, setCityInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = cityInput.trim();
    if (!query) return;

    setSearchError("");
    setIsSearching(true);
    try {
      await onSelectCity(query);
      setCityInput("");
    } catch (err) {
      setSearchError(err.message || "City not found. Please try another location.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickSelect = async (city) => {
    setSearchError("");
    setIsSearching(true);
    setCityInput(city);
    try {
      await onSelectCity(city);
    } catch (err) {
      setSearchError(err.message || "City not found. Please try another location.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden border border-slate-700/60 shadow-xl shadow-black/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span>Interactive Location Explorer</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentLocationLabel
              ? `Currently viewing weather for ${currentLocationLabel}. Explore other global cities below.`
              : "Check real-time weather at your current location or search any global city."}
          </p>
        </div>

        {/* GPS Geolocation Button */}
        <button
          onClick={onUseMyLocation}
          disabled={isLocating}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 active:scale-95 disabled:opacity-60 transition-all cursor-pointer whitespace-nowrap"
        >
          <MapPin className={`w-4 h-4 ${isLocating ? "animate-bounce" : ""}`} />
          <span>{isLocating ? "Locating..." : "📍 Use My Location"}</span>
        </button>
      </div>

      {/* Manual Search Form */}
      <form onSubmit={handleSearchSubmit} className="relative mt-2">
        <div className="relative">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => {
              setCityInput(e.target.value);
              if (searchError) setSearchError("");
            }}
            placeholder="Search a city (e.g., London, Tokyo, New York, Zurich)..."
            className="w-full pl-11 pr-24 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            disabled={isSearching || !cityInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700/60 transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Searching</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        {searchError && (
          <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 px-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{searchError}</span>
          </div>
        )}
      </form>

      {/* Quick Select Popular Cities */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold whitespace-nowrap">
          Quick Picks:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handleQuickSelect(city)}
            className="px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-slate-700 whitespace-nowrap text-xs transition-colors cursor-pointer"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LocationSelector;