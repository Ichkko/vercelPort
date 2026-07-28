"use client";

import { useState, useRef, useEffect, useCallback } from "react";

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YTPlayerInstance }) => void;
            onStateChange?: (e: { data: number; target: YTPlayerInstance }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(v: number): void;
  destroy(): void;
  getPlayerState(): number;
}

const TRACKS = [
  { id: "b83LryMe7s4", title: "Lo-fi Chill #1" },
  { id: "uLF1lW3Ffrg", title: "Lo-fi Chill #2" },
];

export function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [trackIndex, setTrackIndex] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackIndexRef = useRef(trackIndex);
  const volumeRef2 = useRef(volume);
  const isPlayingRef = useRef(isPlaying);

  // Keep refs in sync
  useEffect(() => { trackIndexRef.current = trackIndex; }, [trackIndex]);
  useEffect(() => { volumeRef2.current = volume; }, [volume]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  const currentTrack = TRACKS[trackIndex];

  // Load YouTube IFrame API script once
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }
    const existing = document.getElementById("yt-iframe-api");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "yt-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      setApiReady(true);
    };
  }, []);

  const destroyPlayer = useCallback(() => {
    if (ytPlayerRef.current) {
      try { ytPlayerRef.current.destroy(); } catch { /* ignore */ }
      ytPlayerRef.current = null;
    }
  }, []);

  const createPlayer = useCallback((videoId: string, autoplay: boolean) => {
    if (!apiReady || !containerRef.current) return;
    destroyPlayer();

    // Create a fresh div for YT.Player to replace
    const div = document.createElement("div");
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(div);

    ytPlayerRef.current = new window.YT.Player(div, {
      videoId,
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        enablejsapi: 1,
        start: videoId === TRACKS[0].id ? 6 : 2,
        
      },
      events: {
        onReady: (e) => {
          e.target.setVolume(Math.round(volumeRef2.current * 100));
          if (autoplay) {
            e.target.playVideo();
            setIsPlaying(true);
          }
        },
        onStateChange: (e) => {
          const YTState = window.YT?.PlayerState;
          if (!YTState) return;
          if (e.data === YTState.PLAYING) {
            setIsPlaying(true);
          } else if (e.data === YTState.PAUSED) {
            setIsPlaying(false);
          } else if (e.data === YTState.ENDED) {
            // Auto-advance to next track
            const nextIndex = (trackIndexRef.current + 1) % TRACKS.length;
            setIsPlaying(false);
            setTrackIndex(nextIndex);
            // Small delay then create next player with autoplay
            setTimeout(() => {
              createPlayer(TRACKS[nextIndex].id, true);
            }, 300);
          }
        },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiReady, destroyPlayer]);

  // When player opens for the first time, create player
  useEffect(() => {
    if (isOpen && apiReady) {
      setTimeout(() => {
        createPlayer(currentTrack.id, true);
      }, 400);
    }
    if (!isOpen) {
      destroyPlayer();
      setIsPlaying(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, apiReady]);

  const togglePlay = () => {
    if (!ytPlayerRef.current) return;
    if (isPlaying) {
      ytPlayerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      ytPlayerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const changeTrack = (dir: 1 | -1) => {
    const nextIndex = (trackIndex + dir + TRACKS.length) % TRACKS.length;
    setTrackIndex(nextIndex);
    createPlayer(TRACKS[nextIndex].id, isPlaying);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ytPlayerRef.current?.setVolume(Math.round(val * 100));
  };

  // Collapse to mini pill on scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsMini(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Collapse to mini pill on click outside
  useEffect(() => {
    if (!isOpen || isMini) return;
    const handleClick = (e: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(e.target as Node)) {
        setIsMini(true);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, isMini]);

  // Collapse volume on outside click
  useEffect(() => {
    if (!showVolume) return;
    const handleClick = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setShowVolume(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showVolume]);

  const handleToggleButton = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMini(false);
    } else if (isMini) {
      setIsMini(false);
    } else {
      setIsOpen(false);
      setIsPlaying(false);
      destroyPlayer();
    }
  };

  return (
    <div ref={playerRef} className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2">
      {/* Hidden YT.Player container */}
      <div
        ref={containerRef}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none", overflow: "hidden" }}
        aria-hidden="true"
      />

      {/* Expanded audio player panel */}
      {isOpen && !isMini && (
        <div
          className="rounded-2xl shadow-2xl border px-4 py-3"
          style={{
            width: 220,
            background: "rgba(10,10,10,0.94)",
            backdropFilter: "blur(16px)",
            borderColor: "rgba(74,222,128,0.3)",
          }}
        >
          {/* Title row */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-[2px] h-3.5">
                {[60, 100, 75, 90].map((h, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full"
                    style={{
                      background: "#4ade80",
                      height: `${h}%`,
                      animation: isPlaying
                        ? `soundBar${i + 1} 0.8s ${i * 0.15}s ease-in-out infinite alternate`
                        : "none",
                      opacity: isPlaying ? 1 : 0.35,
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-white/80 leading-none">
                {currentTrack.title}
              </span>
            </div>
            <button
              onClick={() => { setIsOpen(false); setIsPlaying(false); destroyPlayer(); }}
              className="text-white/30 hover:text-white/70 transition-colors text-xs leading-none ml-1"
              aria-label="Close player"
            >
              ✕
            </button>
          </div>

          {/* Track counter */}
          <div className="text-[9px] text-white/30 mb-2 text-center">
            {trackIndex + 1} / {TRACKS.length}
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => changeTrack(-1)}
              className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:scale-110 active:scale-95 flex-shrink-0"
              style={{ color: "rgba(74,222,128,0.7)" }}
              aria-label="Previous track"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all hover:scale-110 active:scale-95 flex-shrink-0"
              style={{
                background: "rgba(74,222,128,0.18)",
                border: "1px solid rgba(74,222,128,0.5)",
                color: "#4ade80",
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="5" y="4" width="4" height="16" rx="1" />
                  <rect x="15" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              onClick={() => changeTrack(1)}
              className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:scale-110 active:scale-95 flex-shrink-0"
              style={{ color: "rgba(74,222,128,0.7)" }}
              aria-label="Next track"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 4V8z" />
                <path d="M16 6h2v12h-2z" />
              </svg>
            </button>

            {/* Volume control */}
            <div ref={volumeRef} className="relative flex items-center ml-auto">
              <button
                onClick={() => setShowVolume((v) => !v)}
                className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:scale-110 flex-shrink-0"
                style={{ color: showVolume ? "#4ade80" : "rgba(74,222,128,0.55)" }}
                aria-label="Toggle volume"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              </button>

              {showVolume && (
                <div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-xl px-3 py-2 flex flex-col items-center gap-1.5 shadow-xl"
                  style={{
                    background: "rgba(10,10,10,0.96)",
                    border: "1px solid rgba(74,222,128,0.25)",
                    backdropFilter: "blur(12px)",
                    width: 36,
                  }}
                >
                  <span className="text-[9px] text-white/40">{Math.round(volume * 100)}</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolume}
                    className="volume-slider-vertical cursor-pointer"
                    style={{ writingMode: "vertical-lr", direction: "rtl", width: 4, height: 60, accentColor: "#4ade80" }}
                    aria-label="Volume"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mini "Now Playing" pill */}
      {isOpen && isMini && (
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg cursor-pointer transition-all hover:scale-105"
          style={{
            background: "rgba(10,10,10,0.90)",
            border: "1px solid rgba(74,222,128,0.4)",
            backdropFilter: "blur(10px)",
          }}
          onClick={() => setIsMini(false)}
          title="Expand player"
        >
          <div className="flex items-end gap-[2px] h-3">
            {[60, 100, 70].map((h, i) => (
              <span
                key={i}
                className="w-[2px] rounded-full"
                style={{
                  background: "#4ade80",
                  height: `${h}%`,
                  animation: isPlaying
                    ? `soundBar${i + 1} 0.7s ${i * 0.2}s ease-in-out infinite alternate`
                    : "none",
                  opacity: isPlaying ? 1 : 0.4,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-semibold text-white/70 whitespace-nowrap">
            Now Playing
          </span>
          <span className="text-[9px] text-white/40 whitespace-nowrap">
            {currentTrack.title}
          </span>
        </div>
      )}

      {/* Toggle pill button */}
      <div className="relative">
        {isOpen && isPlaying && (
          <>
            <span
              className="absolute pointer-events-none select-none"
              style={{
                top: -6, right: -8, fontSize: 11, color: "#4ade80",
                animation: "floatNote1 2.2s ease-in-out infinite", opacity: 0.85,
              }}
            >♪</span>
            <span
              className="absolute pointer-events-none select-none"
              style={{
                top: -14, right: 4, fontSize: 9, color: "#86efac",
                animation: "floatNote2 2.8s ease-in-out infinite 0.6s", opacity: 0.65,
              }}
            >♫</span>
          </>
        )}

        <button
          onClick={handleToggleButton}
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: isOpen ? "rgba(74,222,128,0.15)" : "rgba(15,15,15,0.88)",
            border: "1.5px solid rgba(74,222,128,0.55)",
            backdropFilter: "blur(10px)",
            color: "#4ade80",
            boxShadow: isOpen ? "0 0 12px rgba(74,222,128,0.25)" : "0 2px 12px rgba(0,0,0,0.4)",
          }}
          aria-label={isOpen ? "Hide music player" : "Play ambient music"}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
          </svg>
          <span className="text-[11px] font-semibold whitespace-nowrap">
            {isOpen && isMini ? "Ambient" : isOpen ? (isPlaying ? "Now Playing" : "Ambient") : "Ambient Music"}
          </span>
          {isOpen && isPlaying && !isMini && (
            <span className="flex gap-[2px] items-end h-3">
              {[50, 100, 70].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] rounded-full bg-green-400"
                  style={{
                    height: `${h}%`,
                    animation: `soundBar${i + 1} 0.7s ${i * 0.2}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes soundBar1 { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }
        @keyframes soundBar2 { from { transform: scaleY(0.6); } to { transform: scaleY(0.3); } }
        @keyframes soundBar3 { from { transform: scaleY(1); } to { transform: scaleY(0.5); } }
        @keyframes soundBar4 { from { transform: scaleY(0.3); } to { transform: scaleY(0.9); } }
        @keyframes floatNote1 {
          0%   { transform: translate(0, 0) rotate(-10deg); opacity: 0.85; }
          50%  { transform: translate(4px, -10px) rotate(8deg); opacity: 0.5; }
          100% { transform: translate(-2px, -18px) rotate(-5deg); opacity: 0; }
        }
        @keyframes floatNote2 {
          0%   { transform: translate(0, 0) rotate(5deg); opacity: 0.65; }
          50%  { transform: translate(-3px, -8px) rotate(-10deg); opacity: 0.35; }
          100% { transform: translate(2px, -16px) rotate(6deg); opacity: 0; }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #4ade80;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #4ade80;
          border: none;
          cursor: pointer;
        }
        input[type=range] { -webkit-appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-runnable-track {
          background: rgba(255,255,255,0.12);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
