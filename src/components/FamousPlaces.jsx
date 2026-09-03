import React, { useState } from "react";
import { Landmark, Compass } from "lucide-react";
import { PlaceCard } from "./PlaceCard";
import { PlaceDetailsModal } from "./PlaceDetailsModal";

export function FamousPlaces({ places = [], destination, destinationName = "" }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  if (!places || places.length === 0) return null;

  const destObj = destination || { name: destinationName };
  const displayName = destination?.name || destinationName;

  return (
    <section className="my-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <Landmark className="w-3.5 h-3.5" />
            <span>Curated Landmarks</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Famous Places in {displayName}
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Click any iconic sight or cultural wonder below to view detailed travel guidance, visiting tips, and Google Maps.
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 self-start sm:self-auto">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>{places.length} Must-See Locations</span>
        </div>
      </div>

      {/* Responsive Grid of Famous Place Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {places.map((place) => (
          <PlaceCard
            key={place.id || place.name}
            place={place}
            destinationName={displayName}
            onClick={() => setSelectedPlace(place)}
          />
        ))}
      </div>

      {/* Interactive Place Details Modal with Google Maps */}
      <PlaceDetailsModal
        key={selectedPlace ? selectedPlace.id || selectedPlace.name : "none"}
        place={selectedPlace}
        destination={destObj}
        isOpen={Boolean(selectedPlace)}
        onClose={() => setSelectedPlace(null)}
      />
    </section>
  );
}

export default FamousPlaces;