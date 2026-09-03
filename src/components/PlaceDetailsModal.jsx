import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  ExternalLink,
  Tag,
  Sparkles,
  Lightbulb,
  Compass,
  Camera
} from "lucide-react";
import { getPlaceImage } from "../services/imageService";
import { Skeleton } from "./LoadingSpinner";

export function PlaceDetailsModal({ place, destination, isOpen, onClose }) {
  const [imageUrl, setImageUrl] = useState(() => place?.fallbackImage || destination?.defaultImage || "");
  const [loadingImage, setLoadingImage] = useState(true);

  // Load dynamic Unsplash image for the selected place
  useEffect(() => {
    let isMounted = true;
    if (!place) return;

    async function loadImg() {
      try {
        const url = await getPlaceImage(place.name, destination?.name || "");
        if (isMounted && url) {
          setImageUrl(url);
        }
      } catch (err) {
        console.warn("Place modal image load error:", err);
      } finally {
        if (isMounted) setLoadingImage(false);
      }
    }

    loadImg();
    return () => {
      isMounted = false;
    };
  }, [place, destination]);

  // Handle Escape key and prevent background body scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !place) return null;

  // Construct Google Maps search URL safely without API keys
  const query = `${place.name}, ${destination?.name || ""}, ${destination?.country || ""}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;

  return (
    <AnimatePresence>
      <motion.div
        key="place-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="place-modal-title"
      >
        <motion.div
          key="place-modal-content"
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.05 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl my-auto rounded-3xl overflow-hidden glass-panel border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-black/60 flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors shadow-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden flex-shrink-0">
            {loadingImage && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            )}
            <img
              src={imageUrl}
              alt={place.name}
              onLoad={() => setLoadingImage(false)}
              onError={() => {
                setImageUrl(place.fallbackImage || destination?.defaultImage || "");
                setLoadingImage(false);
              }}
              className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
                loadingImage ? "opacity-0" : "opacity-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

            {/* Destination Pill Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-950/80 border border-white/15 text-cyan-300 backdrop-blur-md shadow-md">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {destination?.name}, {destination?.country}
                </span>
              </span>
            </div>

            {/* Recommended Duration Badge */}
            <div className="absolute bottom-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/90 text-slate-950 backdrop-blur-md shadow-lg">
                <Clock className="w-3.5 h-3.5" />
                <span>Visit: {place.recommendedTime || "1–2 hours"}</span>
              </span>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Tag className="w-3 h-3" />
                  {destination?.category || "Landmark"}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-slate-800 text-slate-300 border border-slate-700">
                  <Compass className="w-3 h-3 text-sky-400" />
                  Must-See Attraction
                </span>
              </div>

              <h3
                id="place-modal-title"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
              >
                {place.name}
              </h3>
            </div>

            {/* Detailed Description */}
            <div className="text-sm text-slate-300 leading-relaxed space-y-2">
              <p>{place.description}</p>
            </div>

            {/* Travel Info Box */}
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4 sm:p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Useful Travel Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      Recommended Duration
                    </span>
                    <span>{place.recommendedTime || "2–3 hours"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Camera className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      Photography Tip
                    </span>
                    <span>Best captured during morning golden hour or sunset</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      Crowd Advisory
                    </span>
                    <span>Arrive early or book timed tickets to avoid queues</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Location</span>
                    <span>
                      {destination?.name}, {destination?.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400 text-center sm:text-left">
                Explore location, directions, and nearby cafes in Google Maps
              </span>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-102 cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" />
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PlaceDetailsModal;
