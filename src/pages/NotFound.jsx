import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen pt-36 pb-20 flex items-center justify-center px-4">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-lg border border-slate-700/60 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">404</h1>
        <h2 className="text-lg font-semibold text-slate-200 mb-3">
          Destination Off The Map
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">
          The page or destination you are searching for does not exist or has moved. Return to the homepage to continue exploring.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to WanderAI Home</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;