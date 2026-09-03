import React, { useState, useEffect } from "react";
import { Clock, MapPin, Sparkles, ArrowRight, Eye } from "lucide-react";
import { getPlaceImage } from "../services/imageService";
import { Skeleton } from "./LoadingSpinner";

export function PlaceCard({ place, destinationName = "", onClick }) {
  const [imageUrl, setImageUrl] = useState(place.fallbackImage || "");
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPlaceImg() {
      try {
        const url = await getPlaceImage(place.name, destinationName);
        if (isMounted && url) {
          setImageUrl(url);
        }
      } catch (err) {
        console.warn("Place image fetch error:", err);
      } finally {
        if (isMounted) setLoadingImage(false);
      }
    }
    loadPlaceImg();
    return () => {
      isMounted = false;
    };
  }, [place.name, destinationName]);

  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="group rounded-2xl overflow-hidden glass-card hover:border-cyan-400/60 flex flex-col h-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/15 cursor-pointer transform hover:-translate-y-1 active:translate-y-0 text-left focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      aria-label={`View details for ${place.name}`}
    >
      {/* Place Image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
        {loadingImage && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        )}
        <img
          src={imageUrl}
          alt={place.name}
          onLoad={() => setLoadingImage(false)}
          onError={() => {
            setImageUrl(place.fallbackImage);
            setLoadingImage(false);
          }}
          className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out ${
            loadingImage ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Visiting Duration Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 border border-white/10 text-cyan-300 backdrop-blur-md shadow-md">
            <Clock className="w-3 h-3 text-cyan-400" />
            {place.recommendedTime}
          </span>
        </div>

        {/* Hover View Details Tag */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-[2px]">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/40 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5" />
            <span>Explore Place</span>
          </span>
        </div>
      </div>

      {/* Place Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 flex items-center justify-between gap-1.5">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="truncate">{place.name}</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {place.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-cyan-400/90 font-medium">
            <Sparkles className="w-3 h-3" />
            Must-visit Attraction
          </span>
          <span className="group-hover:text-cyan-300 transition-colors font-medium">Click for details →</span>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;