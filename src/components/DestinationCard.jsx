import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Tag, Globe2 } from "lucide-react";
import { getDestinationImage } from "../services/imageService";
import { Skeleton } from "./LoadingSpinner";

export function DestinationCard({ destination, index = 0 }) {
  const [imageUrl, setImageUrl] = useState(destination.defaultImage || "");
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadImage() {
      try {
        const url = await getDestinationImage(`${destination.name} ${destination.country}`);
        if (isMounted && url) {
          setImageUrl(url);
        }
      } catch (err) {
        console.warn("Failed to load dynamic image:", err);
      } finally {
        if (isMounted) setLoadingImage(false);
      }
    }
    loadImage();
    return () => {
      isMounted = false;
    };
  }, [destination.name, destination.country]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index % 12, 8) * 0.05 }}
      className="group flex flex-col h-full rounded-3xl overflow-hidden glass-card hover:border-cyan-500/40 transition-all duration-300 shadow-xl shadow-black/30"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        {loadingImage && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        )}
        <img
          src={imageUrl}
          alt={`${destination.name}, ${destination.country}`}
          onLoad={() => setLoadingImage(false)}
          onError={() => {
            setImageUrl(destination.defaultImage);
            setLoadingImage(false);
          }}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
            loadingImage ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Badges Container */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-slate-950/75 border border-white/10 text-cyan-300 backdrop-blur-md">
            <Tag className="w-3 h-3 text-cyan-400" />
            {destination.category}
          </span>
          {destination.continent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-slate-900/80 border border-slate-700/60 text-slate-300 backdrop-blur-md">
              <Globe2 className="w-3 h-3 text-sky-400" />
              {destination.continent}
            </span>
          )}
        </div>

        {/* Floating Country Tag */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{destination.country}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
            {destination.name}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-6">
            {destination.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">
            Stay: <strong className="text-slate-200">{destination.recommendedStay}</strong>
          </span>

          <Link
            to={`/destination/${destination.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800/80 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 border border-slate-700/60 group-hover:border-transparent transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default DestinationCard;