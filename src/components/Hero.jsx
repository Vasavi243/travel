import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, ArrowDown, CloudSun, Map } from "lucide-react";

export function Hero() {
  const [videoError, setVideoError] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Video Layer (z-index 0 & z-index 1 for overlays) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-[0.52] contrast-[1.08] pointer-events-none transition-opacity duration-1000"
          >
            {/* Primary Source: Mixkit Royalty-Free Cinematic Travel Video */}
            <source
              src="/hero-video.mp4"
              type="video/mp4"
            />
            {/* Secondary High-Reliability CDN Fallback */}
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          /* Graceful Static Fallback if video fails to load */
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
            alt="Scenic mountain road travel background"
            className="absolute inset-0 w-full h-full object-cover brightness-100 contrast-105 pointer-events-none"
          />
        )}

        {/* Cinematic Gradient Overlays (z-index 1) for contrast & readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/45 via-slate-950/20 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/10 to-slate-950/25 pointer-events-none" />
      </div>

      {/* Hero Foreground Content (z-index 2 / z-10) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase shadow-lg shadow-cyan-500/10 mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Gen Autonomous Travel Intelligence</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md"
        >
          Explore The World{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            Differently
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow"
        >
          Discover breathtaking destinations, check live weather, explore iconic
          places, and plan your perfect journey with AI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <button
            onClick={() => scrollToSection("destinations")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Destinations</span>
          </button>

          <button
            onClick={() => scrollToSection("ai-planner")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 text-slate-200 font-semibold text-sm backdrop-blur-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Plan With AI</span>
          </button>
        </motion.div>

        {/* Value Props Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14 max-w-4xl mx-auto"
        >
          <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Compass className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white">59+ Global Cities</div>
              <div className="text-[10px] text-slate-400">Curated itineraries</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
              <CloudSun className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white">Real-Time Weather</div>
              <div className="text-[10px] text-slate-400">Live conditions & telemetry</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white">Gemini AI Concierge</div>
              <div className="text-[10px] text-slate-400">Contextual answers</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Map className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white">Interactive Planner</div>
              <div className="text-[10px] text-slate-400">Day-by-day structure</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 flex justify-center cursor-pointer"
          onClick={() => scrollToSection("destinations")}
        >
          <div className="p-2 rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-400 hover:text-cyan-400 transition-colors">
            <ArrowDown className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;