import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, MapPin, Menu, X, Sparkles, Navigation } from "lucide-react";

export function Navbar({ onUseMyLocation, isLocating }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (hashId) => {
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${hashId}`);
    } else {
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-5 h-5 text-white animate-spin-slow group-hover:rotate-45 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Wander<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium -mt-1 hidden sm:block">
                Travel Explorer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                location.pathname === "/" ? "text-cyan-400" : "text-slate-300"
              }`}
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick("destinations")}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400 cursor-pointer"
            >
              Explore
            </button>
            <button
              onClick={() => handleNavClick("ai-planner")}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Planner
            </button>
          </nav>

          {/* Actions: Use Location Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onUseMyLocation}
              disabled={isLocating}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-100 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 shadow-sm transition-all duration-200 hover:shadow-cyan-500/10 active:scale-95 disabled:opacity-60 cursor-pointer"
              title="Detect live weather at your coordinates"
            >
              <MapPin className={`w-3.5 h-3.5 text-cyan-400 ${isLocating ? "animate-bounce" : "group-hover:scale-110"} transition-transform`} />
              <span>{isLocating ? "Locating..." : "📍 Use My Location"}</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onUseMyLocation}
              disabled={isLocating}
              className="p-2 text-slate-300 hover:text-cyan-400 bg-slate-900/60 border border-slate-800 rounded-lg text-xs flex items-center gap-1"
              aria-label="Use My Location"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/80 px-6 py-5 shadow-2xl transition-all animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium py-1 ${
                location.pathname === "/" ? "text-cyan-400" : "text-slate-200"
              }`}
            >
              Home
            </Link>

            <button
              onClick={() => handleNavClick("destinations")}
              className="text-left text-base font-medium text-slate-200 py-1 hover:text-cyan-400 cursor-pointer"
            >
              Explore Destinations
            </button>
            <button
              onClick={() => handleNavClick("ai-planner")}
              className="text-left text-base font-medium text-slate-200 py-1 hover:text-cyan-400 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Planner
            </button>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onUseMyLocation) onUseMyLocation();
                }}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-100 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 transition-all cursor-pointer"
              >
                <Navigation className={`w-4 h-4 text-cyan-400 ${isLocating ? "animate-spin" : ""}`} />
                <span>{isLocating ? "Detecting Location..." : "📍 Use My Location"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;