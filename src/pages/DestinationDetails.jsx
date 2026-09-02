import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Coins,
  Languages,
  Tag,
  Sparkles,
  Share2,
  Check,
  Globe2
} from "lucide-react";

import { destinations } from "../data/destinations";
import { getDestinationImage } from "../services/imageService";
import { getWeatherByCoords } from "../services/weatherService";
import { WeatherCard } from "../components/WeatherCard";
import { FamousPlaces } from "../components/FamousPlaces";
import { AIChatbot } from "../components/AIChatbot";
import { ItineraryPlanner } from "../components/ItineraryPlanner";
import { Skeleton } from "../components/LoadingSpinner";

export function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = destinations.find((d) => d.id === id);

  const [heroImage, setHeroImage] = useState(destination?.defaultImage || "");
  const [loadingHero, setLoadingHero] = useState(true);

  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState("");
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Load dynamic hero image
  useEffect(() => {
    if (!destination) return;
    let isMounted = true;
    async function loadImg() {
      try {
        const url = await getDestinationImage(`${destination.name} ${destination.country} high resolution`);
        if (isMounted && url) {
          setHeroImage(url);
        }
      } catch (err) {
        console.warn("Failed to load destination hero image:", err);
      } finally {
        if (isMounted) setLoadingHero(false);
      }
    }
    loadImg();
    return () => {
      isMounted = false;
    };
  }, [destination]);

  // Load live weather for coordinates
  const fetchDestinationWeather = useCallback(async () => {
    if (!destination?.coordinates) return;
    setLoadingWeather(true);
    setWeatherError("");
    try {
      const data = await getWeatherByCoords(
        destination.coordinates.lat,
        destination.coordinates.lon,
        `${destination.name}, ${destination.country}`
      );
      setWeather(data);
    } catch (err) {
      setWeatherError(err.message || "Failed to load live weather.");
    } finally {
      setLoadingWeather(false);
    }
  }, [destination]);

  useEffect(() => {
    let active = true;
    if (!destination?.coordinates) return;
    
    getWeatherByCoords(
      destination.coordinates.lat,
      destination.coordinates.lon,
      `${destination.name}, ${destination.country}`
    )
      .then((data) => {
        if (active) {
          setWeather(data);
          setLoadingWeather(false);
        }
      })
      .catch((err) => {
        if (active) {
          setWeatherError(err.message || "Failed to load live weather.");
          setLoadingWeather(false);
        }
      });

    return () => {
      active = false;
    };
  }, [destination]);



  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!destination) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center px-4">
        <div className="glass-panel p-8 rounded-3xl max-w-md text-center border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-2">Destination Not Found</h2>
          <p className="text-xs text-slate-400 mb-6">
            The destination you're looking for does not exist in our catalog.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Return to Explorer
          </button>
        </div>
      </div>
    );
  }

  const quickFacts = [
    {
      icon: MapPin,
      label: "Country",
      value: destination.country,
      color: "text-cyan-400"
    },
    {
      icon: Globe2,
      label: "Region / Continent",
      value: destination.continent || "Global",
      color: "text-sky-400"
    },
    {
      icon: Tag,
      label: "Category",
      value: destination.category,
      color: "text-teal-400"
    },
    {
      icon: Calendar,
      label: "Best Time to Visit",
      value: destination.bestTime,
      color: "text-amber-400"
    },
    {
      icon: Clock,
      label: "Recommended Stay",
      value: destination.recommendedStay,
      color: "text-purple-400"
    },
    {
      icon: Coins,
      label: "Currency",
      value: destination.currency,
      color: "text-emerald-400"
    },
    {
      icon: Languages,
      label: "Primary Language",
      value: destination.language,
      color: "text-rose-400"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Actions bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold transition-all hover:scale-102"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explorer</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition-all cursor-pointer"
            title="Share destination"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Link!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Large Hero Image Banner */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[360px] max-h-[540px] w-full bg-slate-900 shadow-2xl border border-slate-800">
          {loadingHero && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
          )}
          <img
            src={heroImage}
            alt={destination.name}
            onLoad={() => setLoadingHero(false)}
            onError={() => {
              setHeroImage(destination.defaultImage);
              setLoadingHero(false);
            }}
            className={`w-full h-full object-cover filter brightness-75 contrast-105 transition-opacity duration-700 ${
              loadingHero ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Hero Text Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col justify-end">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-950/80 border border-white/20 text-cyan-300 backdrop-blur-md self-start mb-3">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{destination.country}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
              {destination.name}
            </h1>

            {destination.tagline && (
              <p className="text-sm sm:text-base text-cyan-200/90 font-medium mt-1 drop-shadow">
                "{destination.tagline}"
              </p>
            )}
          </div>
        </div>

        {/* Main Content Layout: Left Details, Right Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          {/* Left Column: Description & Quick Facts (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Section */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>About {destination.name}</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {destination.description}
              </p>
            </div>

            {/* Quick Facts Grid */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6">
                Key Travel Intelligence
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {quickFacts.map((fact, idx) => {
                  const Icon = fact.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                    >
                      <div
                        className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 ${fact.color} flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          {fact.label}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                          {fact.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Weather Telemetry (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <WeatherCard
                weather={weather}
                loading={loadingWeather}
                error={weatherError}
                onRetry={fetchDestinationWeather}
                title={`Live Atmosphere in ${destination.name}`}
                locationName={`${destination.name}, ${destination.country}`}
              />
            </div>
          </div>
        </div>

        {/* Famous Places Section */}
        <FamousPlaces
          places={destination.famousPlaces}
          destinationName={destination.name}
        />

        {/* AI Travel Assistant Chatbot Section */}
        <section className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive AI Concierge</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ask WanderAI About {destination.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ask about local customs, secret photography spots, dining, or neighborhood transit.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AIChatbot destination={destination} />
          </div>
        </section>

        {/* AI Itinerary Planner Section pre-configured for this destination */}
        <ItineraryPlanner initialDestinationId={destination.id} />
      </div>
    </div>
  );
}

export default DestinationDetails;