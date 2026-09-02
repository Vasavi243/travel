import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Compass,
  Heart,
  Sun,
  Sunrise,
  Sunset,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  Printer
} from "lucide-react";
import { generateItinerary } from "../services/geminiService";
import { LoadingSpinner } from "./LoadingSpinner";
import { destinations, categories } from "../data/destinations";


const TRAVEL_STYLES = ["Budget", "Standard", "Luxury", "Adventure", "Relaxed"];

const INTEREST_OPTIONS = [
  "History",
  "Food",
  "Photography",
  "Nature",
  "Shopping",
  "Nightlife",
  "Culture"
];

export function ItineraryPlanner({ initialDestinationId = "paris" }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDestinationId);
  const [days, setDays] = useState(4);
  const [travelStyle, setTravelStyle] = useState("Standard");
  const [selectedInterests, setSelectedInterests] = useState([
    "History",
    "Food",
    "Photography"
  ]);

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [expandedDays, setExpandedDays] = useState({});

  const currentDestination =
    destinations.find((d) => d.id === selectedDestId) || destinations[0];

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const toggleDayExpansion = (dayNum) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNum]: prev[dayNum] === undefined ? false : !prev[dayNum]
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await generateItinerary({
        destination: currentDestination.name,
        country: currentDestination.country,
        days: days,
        style: travelStyle,
        interests: selectedInterests,
        famousPlaces: currentDestination.famousPlaces
      });

      setItinerary(result);
      // Expand all days by default
      const initialExpanded = {};
      result.days.forEach((d) => {
        initialExpanded[d.day] = true;
      });
      setExpandedDays(initialExpanded);
    } catch (err) {
      console.warn("Itinerary generation error:", err);
      setError("Unable to generate live itinerary. Showing smart recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-planner" className="my-16 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Trip Architect</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Personalized AI Itinerary Planner
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Tell WanderAI your travel preferences, and receive a comprehensive,
          structured day-by-day itinerary tailored to your passions.
        </p>
      </div>

      {/* Form Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-slate-700/60 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Destination Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Destination</span>
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 cursor-pointer"
            >
              {categories.filter((c) => c !== "All").map((continent) => (
                <optgroup key={continent} label={`— ${continent} —`} className="bg-slate-950 text-cyan-400 font-bold">
                  {destinations
                    .filter((d) => d.continent === continent)
                    .map((d) => (
                      <option key={d.id} value={d.id} className="text-white font-normal bg-slate-900">
                        {d.name}, {d.country}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>

          </div>

          {/* Number of Days */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Trip Duration</span>
            </label>
            <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-700">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    days === num
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {num}d
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Travel Style</span>
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 cursor-pointer"
            >
              {TRAVEL_STYLES.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interests Multi-Select */}
        <div className="mb-8">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Interests (Multi-select)</span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {INTEREST_OPTIONS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 scale-102 border border-cyan-400/40"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Action Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" text="" />
              <span>Architecting Your Itinerary with AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-200 animate-spin-slow" />
              <span>✨ Generate My Itinerary ({days} Days in {currentDestination.name})</span>
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 text-center">
            {error}
          </div>
        )}
      </div>

      {/* Itinerary Display Section */}
      <AnimatePresence>
        {itinerary && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            {/* Top Bar of Results */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-panel rounded-3xl mb-8 border border-slate-700/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Tailored Travel Blueprint
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  {itinerary.days?.length || days}-Day Itinerary for {itinerary.destination || currentDestination.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Style: <strong className="text-slate-200">{itinerary.style || travelStyle}</strong> • Interests: {selectedInterests.join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Print Plan</span>
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>

            {/* Structured Day-by-Day Cards */}
            <div className="space-y-6">
              {itinerary.days?.map((dayPlan) => {
                const isExpanded = expandedDays[dayPlan.day] !== false;

                return (
                  <div
                    key={dayPlan.day}
                    className="glass-panel rounded-3xl overflow-hidden border border-slate-700/60 shadow-xl"
                  >
                    {/* Day Header Accordion Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleDayExpansion(dayPlan.day)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left bg-slate-900/70 hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-cyan-500/25">
                          DAY {dayPlan.day}
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {dayPlan.title || `Day ${dayPlan.day} Exploration`}
                          </h4>
                          <span className="text-xs text-slate-400">
                            Morning • Afternoon • Evening Experience
                          </span>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {/* Day Details Body */}
                    {isExpanded && (
                      <div className="p-6 sm:p-8 space-y-6 border-t border-slate-800/80 animate-in fade-in-50 duration-200">
                        {/* 🌅 Morning */}
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5">
                            <Sunrise className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold tracking-widest text-amber-400 uppercase">
                              🌅 MORNING
                            </span>
                            <h5 className="text-sm sm:text-base font-bold text-white mt-0.5">
                              {dayPlan.morning?.activity}
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                              {dayPlan.morning?.description}
                            </p>
                          </div>
                        </div>

                        {/* ☀️ Afternoon */}
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex-shrink-0 mt-0.5">
                            <Sun className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold tracking-widest text-sky-400 uppercase">
                              ☀️ AFTERNOON
                            </span>
                            <h5 className="text-sm sm:text-base font-bold text-white mt-0.5">
                              {dayPlan.afternoon?.activity}
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                              {dayPlan.afternoon?.description}
                            </p>
                          </div>
                        </div>

                        {/* 🌙 Evening */}
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex-shrink-0 mt-0.5">
                            <Sunset className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold tracking-widest text-indigo-400 uppercase">
                              🌙 EVENING
                            </span>
                            <h5 className="text-sm sm:text-base font-bold text-white mt-0.5">
                              {dayPlan.evening?.activity}
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                              {dayPlan.evening?.description}
                            </p>
                          </div>
                        </div>

                        {/* 💡 Travel Tips */}
                        {dayPlan.tips && dayPlan.tips.length > 0 && (
                          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 mt-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                              <Lightbulb className="w-4 h-4 text-cyan-400" />
                              <span>💡 TRAVEL TIPS</span>
                            </div>
                            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                              {dayPlan.tips.map((tip, tipIdx) => (
                                <li key={tipIdx} className="leading-relaxed">
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ItineraryPlanner;