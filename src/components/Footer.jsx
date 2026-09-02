import React from "react";
import { Link } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";

export function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-800/60">
          {/* Logo & Tagline */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5 group mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Wander<span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Explore the world intelligently. Autonomous AI-powered itineraries,
              real-time meteorological telemetry, and curated travel inspirations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <button
              onClick={() => scrollToSection("destinations")}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Explore
            </button>
            <button
              onClick={() => scrollToSection("ai-planner")}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Planner
            </button>
          </div>
        </div>

        {/* Bottom Credits & Tag */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} WanderAI. Built with React, AI and live travel data.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Crafted for Front-End Developer Assignment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;