"use client";

import { useState, useRef, useEffect } from "react";

export function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Hidden iframe for audio only — no visible video
  const playlistUrl = `https://www.youtube.com/embed/b83LryMe7s4?list=RDb83LryMe7s4&autoplay=0&loop=1&mute=0&controls=0&rel=0&modestbranding=1&enablejsapi=1`;

  const togglePlay = () => {
    if (iframeRef.current) {
      const cmd = isPlaying ? "pauseVideo" : "playVideo";
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: cmd, args: [] }),
        "*"
      );
    }
    setIsPlaying((v) => !v);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [Math.round(val * 100)] }),
        "*"
      );
    }
  };

  // Auto-play when opened
  useEffect(() => {
    if (isOpen && !isPlaying) {
      const timer = setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(
            JSON.stringify({ event: "command", func: "playVideo", args: [] }),
            "*"
          );
        }
        setIsPlaying(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-1.5">
      {/* Hidden YouTube iframe — audio source only */}
      <iframe
        ref={iframeRef}
        src={playlistUrl}
        width="1"
        height="1"
        allow="autoplay; encrypted-media"
        title="Lo-fi ambient audio"
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", border: "none" }}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Expanded audio player panel */}
      {isOpen && (
        <div
          className="rounded-xl shadow-xl border border-white/10 px-3 py-2.5"
          style={{
            width: 200,
            background: "rgba(12,12,12,0.92)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Title row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-[2px] h-3">
                {[60, 100, 75, 90].map((h, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full"
                    style={{
                      background: "#4ade80",
                      height: `${h}%`,
                      animation: isPlaying
                        ? `soundBar${i + 1} 0.8s ease-in-out infinite alternate`
                        : "none",
                      animationDelay: `${i * 0.15}s`,
                      opacity: isPlaying ? 1 : 0.35,
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-medium text-white/70 leading-none">Lo-fi Ambient</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/30 hover:text-white/70 transition-colors text-xs leading-none ml-1"
              aria-label="Close player"
            >
              ✕
            </button>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all hover:scale-110 active:scale-95 flex-shrink-0"
              style={{
                background: "rgba(74,222,128,0.15)",
                border: "1px solid rgba(74,222,128,0.4)",
                color: "#4ade80",
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                /* Pause icon */
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="5" y="4" width="4" height="16" rx="1" />
                  <rect x="15" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                /* Play icon */
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Volume icon */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(74,222,128,0.7)" className="flex-shrink-0">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>

            {/* Volume slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolume}
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4ade80 ${volume * 100}%, rgba(255,255,255,0.15) ${volume * 100}%)`,
                accentColor: "#4ade80",
              }}
              aria-label="Volume"
            />
          </div>
        </div>
      )}

      {/* Toggle pill button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: isOpen ? "rgba(74,222,128,0.12)" : "rgba(12,12,12,0.82)",
          border: "1px solid rgba(74,222,128,0.35)",
          backdropFilter: "blur(8px)",
          color: "#4ade80",
        }}
        aria-label={isOpen ? "Hide music player" : "Play ambient music"}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
        <span className="text-[10px] font-medium whitespace-nowrap">
          {isOpen ? (isPlaying ? "Now Playing" : "Ambient") : "Ambient"}
        </span>
        {isOpen && isPlaying && (
          <span className="flex gap-[2px] items-end h-2.5">
            {[50, 100, 70].map((h, i) => (
              <span
                key={i}
                className="w-[2px] rounded-full bg-green-400"
                style={{
                  height: `${h}%`,
                  animation: `soundBar${i + 1} 0.7s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.2}s`,
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
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
