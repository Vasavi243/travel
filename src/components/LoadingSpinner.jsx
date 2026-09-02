import React from "react";

export function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  }[size] || "w-8 h-8 border-3";

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 text-slate-300">
      <div
        className={`${sizeClasses} border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin`}
      />
      {text && <p className="text-xs tracking-wider uppercase font-medium text-slate-400">{text}</p>}
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-slate-800/80 rounded-xl ${className}`}
    />
  );
}

export default LoadingSpinner;