"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 130; // Capped at 130 frames as requested

interface HeroCanvasProps {
  onChapterChange?: (chapterIndex: number, progress: number) => void;
}

export function HeroCanvas({ onChapterChange }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const stateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    progress: 0,
    lastDrawnFrame: -1,
    lastChapterIndex: -1,
    canvasWidth: 0,
    canvasHeight: 0,
    dpr: 1,
  });

  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, "0");
    return `/frames/ezgif-frame-${frameNum}.jpg`;
  };

  // High-clarity rendering with exact subpixel cover positioning
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];
    // Fallback if specific frame is not yet decoded
    if (!img || !img.complete) {
      for (let offset = 1; offset < 15; offset++) {
        const prev = imagesRef.current[Math.max(0, frameIdx - offset)];
        if (prev && prev.complete) {
          img = prev;
          break;
        }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES - 1, frameIdx + offset)];
        if (next && next.complete) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = stateRef.current.canvasWidth || window.innerWidth;
    const ch = stateRef.current.canvasHeight || window.innerHeight;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgRatio = imgW / imgH;
    const canvasRatio = cw / ch;

    let renderW = cw;
    let renderH = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderW = cw;
      renderH = cw / imgRatio;
      offsetY = (ch - renderH) / 2;
    } else {
      renderH = ch;
      renderW = ch * imgRatio;
      offsetX = (cw - renderW) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    stateRef.current.lastDrawnFrame = frameIdx;
  }, []);

  // Update canvas sizing on resize with full DPR sharpness
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 3); // Full crisp Retina fidelity
    const w = window.innerWidth;
    const h = window.innerHeight;

    stateRef.current.canvasWidth = w;
    stateRef.current.canvasHeight = h;
    stateRef.current.dpr = dpr;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    drawFrame(Math.round(stateRef.current.currentFrame));
  }, [drawFrame]);

  // Fast preloading with image.decode() for all 130 frames
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Load initial frame immediately
    const loadInitial = async () => {
      const img = new Image();
      img.src = getFrameUrl(0);
      try {
        await img.decode();
        if (!isCancelled) {
          imagesRef.current[0] = img;
          resizeCanvas();
          drawFrame(0);
        }
      } catch {
        // fallback
      }
    };

    loadInitial();

    // Concurrent preloader for frames 1..130
    const preloadAll = async () => {
      const batchSize = 16;
      for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
        if (isCancelled) break;
        const batchPromises: Promise<void>[] = [];

        for (let j = i; j < Math.min(TOTAL_FRAMES, i + batchSize); j++) {
          if (imagesRef.current[j]) continue;
          const p = new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getFrameUrl(j);
            img.onload = async () => {
              if (!isCancelled) {
                try {
                  await img.decode();
                } catch {
                  // ignore
                }
                imagesRef.current[j] = img;
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              }
              resolve();
            };
            img.onerror = () => resolve();
          });
          batchPromises.push(p);
        }

        await Promise.all(batchPromises);
      }

      if (!isCancelled) {
        setIsLoaded(true);
      }
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, resizeCanvas]);

  // Buttery-smooth physics interpolation (lerp: 0.08 for luxury weighted momentum)
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      const state = stateRef.current;
      const diff = state.targetFrame - state.currentFrame;

      if (Math.abs(diff) > 0.001) {
        state.currentFrame += diff * 0.085; // Ultra-smooth luxury momentum
      } else {
        state.currentFrame = state.targetFrame;
      }

      const roundedFrame = Math.round(
        Math.max(0, Math.min(TOTAL_FRAMES - 1, state.currentFrame))
      );

      if (roundedFrame !== state.lastDrawnFrame) {
        drawFrame(roundedFrame);

        const normProgress = roundedFrame / (TOTAL_FRAMES - 1);
        const percent = Math.round(normProgress * 100);

        // Update direct DOM refs for 120fps stutter-free updates
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${percent}%`;
        }
        if (frameCounterRef.current) {
          frameCounterRef.current.textContent = `FRAME ${String(roundedFrame + 1).padStart(3, "0")} / 130`;
        }
        if (percentTextRef.current) {
          percentTextRef.current.textContent = `${percent}%`;
        }

        // Chapter notification
        let currentChapter = 0;
        if (normProgress >= 0.28 && normProgress < 0.58) currentChapter = 1;
        else if (normProgress >= 0.58 && normProgress < 0.82) currentChapter = 2;
        else if (normProgress >= 0.82) currentChapter = 3;

        if (currentChapter !== state.lastChapterIndex) {
          state.lastChapterIndex = currentChapter;
          if (onChapterChange) {
            onChapterChange(currentChapter, normProgress);
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawFrame, onChapterChange]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = containerHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = window.scrollY - containerTop;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      stateRef.current.progress = progress;
      stateRef.current.targetFrame = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full h-[380vh] bg-[#060709]"
    >
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#060709]">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block will-change-transform"
          style={{
            filter: "contrast(1.06) saturate(1.10) brightness(1.02)",
            imageRendering: "-webkit-optimize-contrast"
          }}
        />

        {/* Minimal Bottom Timeline Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-4 pointer-events-auto flex flex-col items-center gap-2">
          {/* Progress Bar Container */}
          <div className="w-full h-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/15 overflow-hidden shadow-2xl">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-75 shadow-[0_0_12px_rgba(251,191,36,0.7)]"
              style={{ width: "0%" }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-[10px] font-mono tracking-widest text-zinc-300 drop-shadow-md">
            <span ref={frameCounterRef}>FRAME 001 / 130</span>
            <span className="text-amber-300 font-semibold uppercase">
              SMOOTH SCROLL TO ENGAGE
            </span>
            <span ref={percentTextRef} className="text-white font-bold">
              0%
            </span>
          </div>
        </div>

        {/* Caching pill if still loading */}
        {loadProgress < 100 && (
          <div className="absolute top-20 right-6 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-amber-300 backdrop-blur-md shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>BUFFERING {loadProgress}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
