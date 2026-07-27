"use client";

import { useState } from "react";

export function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const playlistUrl = `https://www.youtube.com/embed/b83LryMe7s4?list=RDb83LryMe7s4&autoplay=1&loop=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* Expanded player */}
      {isOpen && (
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{
            width: 280,
            background: "rgba(20,20,20,0.92)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              {/* Animated sound bars */}
              <div className="flex items-end gap-[2px] h-4">
                {[1, 2, 3, 4]?.map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                      background: "#4ade80",
                      height: `${[60, 100, 75, 90]?.[i - 1]}%`,
                      animation: `soundBar${i} 0.8s ease-in-out infinite alternate`,
                      animationDelay: `${(i - 1) * 0.15}s`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-white/80">Lo-fi Ambient</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/50 hover:text-white/90 transition-colors text-sm leading-none"
              aria-label="Close player"
            >
              ✕
            </button>
          </div>

          {/* YouTube iframe */}
          <iframe
            src={playlistUrl}
            width="280"
            height="157"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Lo-fi ambient music player"
            className="block"
            style={{ border: "none" }}
          />
        </div>
      )}
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: isOpen ? "rgba(74,222,128,0.15)" : "rgba(20,20,20,0.85)",
          border: "1px solid rgba(74,222,128,0.4)",
          backdropFilter: "blur(10px)",
          color: "#4ade80",
        }}
        aria-label={isOpen ? "Hide music player" : "Play ambient music"}
      >
        {/* Music note icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
        <span className="text-xs font-medium whitespace-nowrap">
          {isOpen ? "Now Playing" : "Ambient Music"}
        </span>
        {isOpen && (
          <span className="flex gap-[2px] items-end h-3">
            {[1, 2, 3]?.map((i) => (
              <span
                key={i}
                className="w-[2px] rounded-full bg-green-400"
                style={{
                  height: `${[50, 100, 70]?.[i - 1]}%`,
                  animation: `soundBar${i} 0.7s ease-in-out infinite alternate`,
                  animationDelay: `${(i - 1) * 0.2}s`,
                }}
              />
            ))}
          </span>
        )}
      </button>
      <style>{`
        @keyframes soundBar1 { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }
        @keyframes soundBar2 { from { transform: scaleY(0.6); } to { transform: scaleY(0.3); } }
        @keyframes soundBar3 { from { transform: scaleY(1); } to { transform: scaleY(0.5); } }
        @keyframes soundBar4 { from { transform: scaleY(0.3); } to { transform: scaleY(0.9); } }
      `}</style>
    </div>
  );
}
