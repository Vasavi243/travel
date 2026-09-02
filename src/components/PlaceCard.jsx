import React, { useState, useEffect } from "react";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { getPlaceImage } from "../services/imageService";
import { Skeleton } from "./LoadingSpinner";

export function PlaceCard({ place, destinationName = "" }) {
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

  return (
    <div className="group rounded-2xl overflow-hidden glass-card hover:border-cyan-500/40 flex flex-col h-full transition-all duration-300 shadow-lg">
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
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
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
      </div>

      {/* Place Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>{place.name}</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {place.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-cyan-400/80">
            <Sparkles className="w-3 h-3" />
            Must-visit Attraction
          </span>
          <span>Rec: {place.recommendedTime}</span>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;