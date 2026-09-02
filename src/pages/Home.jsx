import React, { useState } from "react";
import { Hero } from "../components/Hero";
import { SearchFilter } from "../components/SearchFilter";
import { DestinationCard } from "../components/DestinationCard";
import { WeatherCard } from "../components/WeatherCard";
import { LocationSelector } from "../components/LocationSelector";
import { ItineraryPlanner } from "../components/ItineraryPlanner";
import { destinations } from "../data/destinations";
import { Compass, MapPin, SearchX, ChevronDown } from "lucide-react";

const INITIAL_VISIBLE_COUNT = 12;
const PAGE_STEP = 12;

export function Home({
  selectedWeather,
  weatherLoading,
  weatherError,
  isLocating,
  onSelectCity,
  onUseMyLocation,
  onRefreshWeather
}) {
  // Search & Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  // Filter destinations based on search query and continent/category
  const filteredDestinations = destinations.filter((dest) => {
    const matchesContinent =
      selectedCategory === "All" ||
      dest.continent === selectedCategory ||
      dest.category === selectedCategory ||
      dest.categories?.includes(selectedCategory);

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      dest.name.toLowerCase().includes(q) ||
      dest.country.toLowerCase().includes(q) ||
      dest.continent?.toLowerCase().includes(q) ||
      dest.category?.toLowerCase().includes(q) ||
      dest.description.toLowerCase().includes(q);

    return matchesContinent && matchesQuery;
  });

  const displayedDestinations = filteredDestinations.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDestinations.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_STEP);
  };

  const formattedLocationLabel = selectedWeather?.cityName
    ? `${selectedWeather.cityName}${selectedWeather.country ? `, ${selectedWeather.country}` : ""}`
    : "";

  return (
    <div className="min-h-screen">
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-24">
        {/* 2. Interactive Live Weather & Global Location Explorer */}
        <section id="weather-hub" className="scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Meteorological Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Live Global Atmosphere
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Synchronized real-time weather telemetry from OpenWeather API.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Location selector / search bar */}
            <div className="lg:col-span-7 flex">
              <div className="w-full">
                <LocationSelector
                  onSelectCity={onSelectCity}
                  onUseMyLocation={onUseMyLocation}
                  isLocating={isLocating}
                  currentLocationLabel={formattedLocationLabel}
                />
              </div>
            </div>

            {/* Live Weather Card */}
            <div className="lg:col-span-5 flex">
              <div className="w-full">
                <WeatherCard
                  weather={selectedWeather}
                  loading={weatherLoading}
                  error={weatherError}
                  onRetry={onRefreshWeather}
                  title="Atmospheric Telemetry"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Global Destination Explorer Section */}
        <section id="destinations" className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>World Explorations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated Global Destinations
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Explore {destinations.length} handpicked global cities and paradises featuring rich cultural
              landmarks, live weather feeds, and AI itineraries.
            </p>
          </div>

          {/* Search and Filters */}
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            resultCount={filteredDestinations.length}
            totalCount={destinations.length}
          />

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
                {displayedDestinations.map((destination, idx) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    index={idx}
                  />
                ))}
              </div>

              {/* Load More Button or Finished Indicator */}
              {hasMore ? (
                <div className="flex flex-col items-center justify-center pt-4">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Load More Destinations ({filteredDestinations.length - visibleCount} remaining)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-slate-500 mt-2.5">
                    Showing {displayedDestinations.length} of {filteredDestinations.length} destinations
                  </p>
                </div>
              ) : filteredDestinations.length > INITIAL_VISIBLE_COUNT ? (
                <div className="text-center pt-4">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-400">
                    Showing all {filteredDestinations.length} matching destinations
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            /* Empty State */
            <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto my-12 border border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <SearchX className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                No destinations found
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                We couldn't find any destinations matching "{searchQuery}" in region "{selectedCategory}". Try another search term or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>

        {/* 4. AI Itinerary Planner Section */}
        <ItineraryPlanner initialDestinationId="paris" />
      </div>
    </div>
  );
}

export default Home;