import React from "react";
import { Cloud, Droplets, Wind, Thermometer, RefreshCw, Sparkles, MapPin } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { getWeatherEmoji } from "../utils/helpers";

export function WeatherCard({
  weather,
  loading,
  error,
  onRetry,
  title = "Current Weather",
  locationName = ""
}) {
  if (loading) {
    return (
      <div className="glass-panel rounded-3xl p-6 flex items-center justify-center min-h-[220px]">
        <LoadingSpinner size="md" text="Fetching real-time atmospheric data..." />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <ErrorMessage
        title="Weather Unavailable"
        message={error || "Could not retrieve live meteorological data."}
        onRetry={onRetry}
      />
    );
  }

  const weatherEmoji = getWeatherEmoji(weather.icon);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden border border-slate-700/60 shadow-xl shadow-black/20">
      {/* Background radial glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Cloud className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {title}
            </h4>
            <div className="text-sm font-semibold text-white flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{weather.cityName || locationName}</span>
              {weather.country && (
                <span className="text-xs text-slate-400">({weather.country})</span>
              )}
            </div>
          </div>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Refresh weather"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Temperature & Condition Display */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
        <div className="flex items-baseline gap-3">
          <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
            {weather.temp}°
            <span className="text-2xl font-light text-cyan-400">C</span>
          </span>
          <span className="text-3xl" role="img" aria-label={weather.condition}>
            {weatherEmoji}
          </span>
        </div>

        <div className="sm:text-right">
          <div className="text-lg font-bold text-slate-100">{weather.condition}</div>
          <div className="text-xs text-slate-400 capitalize">
            {weather.description || weather.condition}
          </div>
        </div>
      </div>

      {/* Sub-Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 pt-6 mt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-cyan-400">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Feels Like</div>
            <div className="text-xs font-bold text-slate-200">{weather.feelsLike}°C</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-sky-400">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Humidity</div>
            <div className="text-xs font-bold text-slate-200">{weather.humidity}%</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-teal-400">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Wind</div>
            <div className="text-xs font-bold text-slate-200">{weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>

      {/* Source Status Pill */}
      <div className="mt-4 pt-3 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-900">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Status: {weather.source || (weather.isFallback ? "Simulation" : "Live OpenWeather Feed")}</span>
        </span>
        <span className="text-slate-400">Celsius</span>
      </div>
    </div>
  );
}

export default WeatherCard;