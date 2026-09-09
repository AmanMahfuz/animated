"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { animate } from "animejs";

const TOTAL_FRAMES = 192;

export function HeroSection({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  const stateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    progress: 0,
    lastDrawnFrame: -1,
    canvasWidth: 0,
    canvasHeight: 0,
    dpr: 1,
  });

  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, "0");
    return `/roller_blinds_frames/frame_${frameNum}.webp`;
  };

  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete) {
      for (let offset = 1; offset < 35; offset++) {
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

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 3);
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

  // Fast Two-Pass Preloader for 192 frames
  useEffect(() => {
    let isCancelled = false;

    const loadSingle = async (idx: number): Promise<void> => {
      if (imagesRef.current[idx] && imagesRef.current[idx]?.complete) return;
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = async () => {
          if (!isCancelled) {
            try {
              await img.decode();
            } catch {}
            imagesRef.current[idx] = img;
            if (idx === 0) {
              resizeCanvas();
              drawFrame(0);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const runPreload = async () => {
      // Pass 1: Load frame 0 immediately
      await loadSingle(0);
      if (isCancelled) return;

      // Pass 2: Eagerly load keyframes across the entire 0..191 range (every 4th frame + end)
      const keyframePromises: Promise<void>[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i += 4) {
        keyframePromises.push(loadSingle(i));
      }
      keyframePromises.push(loadSingle(TOTAL_FRAMES - 1));
      await Promise.all(keyframePromises);
      if (isCancelled) return;

      // Pass 3: Background stream remaining intermediate frames
      const remainingBatches: Promise<void>[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!imagesRef.current[i]) {
          remainingBatches.push(loadSingle(i));
          if (remainingBatches.length >= 8) {
            await Promise.all(remainingBatches);
            remainingBatches.length = 0;
            if (isCancelled) return;
          }
        }
      }
      if (remainingBatches.length > 0) {
        await Promise.all(remainingBatches);
      }
    };

    runPreload();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, resizeCanvas]);

  // Momentum lerp loop
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      const state = stateRef.current;
      const diff = state.targetFrame - state.currentFrame;

      if (Math.abs(diff) > 0.001) {
        state.currentFrame += diff * 0.095;
      } else {
        state.currentFrame = state.targetFrame;
      }

      const roundedFrame = Math.round(
        Math.max(0, Math.min(TOTAL_FRAMES - 1, state.currentFrame))
      );

      if (roundedFrame !== state.lastDrawnFrame) {
        drawFrame(roundedFrame);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawFrame]);

  // Scroll handler over full container height
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

  // Anime.js smooth editorial entrance
  useEffect(() => {
    if (heroContentRef.current) {
      animate(heroContentRef.current, {
        opacity: [0, 1],
        translateY: [28, 0],
        duration: 900,
        ease: "outCubic",
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full h-[240vh] sm:h-[300vh] md:h-[360vh] bg-[#1b1c1a]"
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-14 bg-[#1b1c1a]">
        
        {/* Canvas Engine — Pure, Unaltered, Crisp 192-Frame Imagery */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block will-change-transform"
        />

        {/* Minimal Soft Shadow for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1a]/85 via-[#1b1c1a]/25 to-black/40 pointer-events-none" />

        {/* Central Editorial Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 my-auto py-6 sm:py-8 will-change-transform"
        >
          <div className="max-w-3xl flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-8 sm:w-10 bg-[#80a8d8]" />
              <p className="font-mono text-[10px] sm:text-[11px] text-[#cbe0f8] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold">
                Architectural Concealed Systems • Dusk Lowering
              </p>
            </div>

            <h1 className="font-serif text-[34px] sm:text-[48px] md:text-[64px] lg:text-[78px] leading-[1.05] sm:leading-[1.0] text-white tracking-[-0.02em] drop-shadow-md font-light">
              YOUR WINDOWS.<br />
              <span className="italic font-serif font-light text-[#80a8d8]">YOUR LIGHT.</span><br />
              YOUR SPACE.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#f1f5f9] max-w-xl font-light leading-relaxed drop-shadow">
              Transform your home with premium window furnishings designed for Queensland living. Crafted by master guild artisans with whisper-quiet smart motorisation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 sm:px-8 bg-gradient-to-r from-[#3b71ad] to-[#518ad0] text-white font-mono text-[11px] uppercase font-bold rounded-full shadow-lg shadow-[#3b71ad]/30 hover:from-[#2d5b8f] hover:to-[#3b71ad] transition-all duration-300 tracking-widest hover:scale-[1.02] cursor-pointer"
              >
                Book Free Measure &amp; Quote
              </button>
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-7 bg-white/95 hover:bg-white text-[#0f172a] font-mono text-[11px] uppercase font-semibold rounded-full backdrop-blur-md shadow-sm transition-all duration-300 tracking-wider cursor-pointer"
              >
                Explore Products
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Scroll Indicator */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/75 font-mono text-[10px] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e86b73] animate-pulse" />
            Scroll to Lower
          </div>

          <a
            href="#about-us"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Discover BWF
            </span>
            <div className="w-7 h-7 rounded-full bg-white/90 group-hover:bg-white text-[#0f172a] flex items-center justify-center transition-all duration-300 group-hover:translate-y-1">
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
