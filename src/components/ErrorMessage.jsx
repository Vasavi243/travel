import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export function ErrorMessage({
  title = "Something went wrong",
  message = "Unable to complete the operation. Please check your connection and try again.",
  onRetry,
  className = ""
}) {
  return (
    <div
      className={`glass-panel border-rose-500/30 bg-rose-950/20 rounded-2xl p-6 text-center max-w-md mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-3 text-rose-400">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-100 mb-1">{title}</h4>
      <p className="text-xs text-slate-400 mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;