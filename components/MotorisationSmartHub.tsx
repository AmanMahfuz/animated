"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { animate } from "animejs";

interface MotorisationSmartHubProps {
  onOpenBooking?: () => void;
}

const TOTAL_ROLLER_FRAMES = 192;

export function MotorisationSmartHub({ onOpenBooking }: MotorisationSmartHubProps) {
  const [remotePos, setRemotePos] = useState<number>(50);
  const [remoteLabel, setRemoteLabel] = useState<string>("50% Mid Level");
  const [isLowering, setIsLowering] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_ROLLER_FRAMES).fill(null));
  
  const stateRef = useRef({
    currentFrame: 96,
    targetFrame: 96,
    lastDrawnFrame: -1,
  });

  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, "0");
    return `/roller_blinds_frames/frame_${frameNum}.jpg`;
  };

  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete) {
      for (let offset = 1; offset < 20; offset++) {
        const prev = imagesRef.current[Math.max(0, frameIdx - offset)];
        if (prev && prev.complete) {
          img = prev;
          break;
        }
        const next = imagesRef.current[Math.min(TOTAL_ROLLER_FRAMES - 1, frameIdx + offset)];
        if (next && next.complete) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
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

  // Preload roller blind frames
  useEffect(() => {
    let isCancelled = false;

    const loadInitial = async () => {
      const img = new Image();
      img.src = getFrameUrl(0);
      try {
        await img.decode();
        if (!isCancelled) {
          imagesRef.current[0] = img;
          drawFrame(0);
        }
      } catch {}
    };

    loadInitial();

    const preloadAll = async () => {
      const batchSize = 16;
      for (let i = 0; i < TOTAL_ROLLER_FRAMES; i += batchSize) {
        if (isCancelled) break;
        const batchPromises: Promise<void>[] = [];

        for (let j = i; j < Math.min(TOTAL_ROLLER_FRAMES, i + batchSize); j++) {
          if (imagesRef.current[j]) continue;
          const p = new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getFrameUrl(j);
            img.onload = async () => {
              if (!isCancelled) {
                try {
                  await img.decode();
                } catch {}
                imagesRef.current[j] = img;
              }
              resolve();
            };
            img.onerror = () => resolve();
          });
          batchPromises.push(p);
        }

        await Promise.all(batchPromises);
      }
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Frame interpolation render loop
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const state = stateRef.current;
      const diff = state.targetFrame - state.currentFrame;

      if (Math.abs(diff) > 0.01) {
        state.currentFrame += diff * 0.1;
      } else {
        state.currentFrame = state.targetFrame;
      }

      const rounded = Math.round(
        Math.max(0, Math.min(TOTAL_ROLLER_FRAMES - 1, state.currentFrame))
      );

      if (rounded !== state.lastDrawnFrame) {
        drawFrame(rounded);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [drawFrame]);

  const simulateRemote = (pos: number, label: string) => {
    setRemotePos(pos);
    setRemoteLabel(label);
    setIsLowering(true);

    const targetFrameIdx = Math.round((pos / 100) * (TOTAL_ROLLER_FRAMES - 1));
    stateRef.current.targetFrame = targetFrameIdx;

    if (progressBarRef.current) {
      animate(progressBarRef.current, {
        width: `${pos}%`,
        ease: "outCubic",
        duration: 900,
      });
    }

    if (terminalRef.current) {
      animate(terminalRef.current, {
        scale: [0.98, 1],
        ease: "outElastic(1, .8)",
        duration: 500,
      });
    }

    setTimeout(() => setIsLowering(false), 900);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setRemotePos(val);
    setRemoteLabel(`${val}% Custom Height`);
    const targetFrameIdx = Math.round((val / 100) * (TOTAL_ROLLER_FRAMES - 1));
    stateRef.current.targetFrame = targetFrameIdx;

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${val}%`;
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#efeeeb] text-[#1b1c1a]" id="motorisation">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Smart Editorial Description & 4 Bullets (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-[#7c572d]" />
              <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-widest font-semibold">
                Intelligent Living • Smart Automation
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-light tracking-tight">
              ONE TAP CHANGES THE ROOM
            </h2>

            <p className="text-sm sm:text-base text-[#50453b] font-light leading-relaxed">
              Window furnishings that adapt organically to the world outside. Integrating invisibly with Apple Home, Google Home, Control4, and Lutron via the universal Matter protocol.
            </p>

            {/* Feature Bullets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-xl bg-white flex flex-col gap-1.5 shadow-sm border border-[#e4e2df]">
                <span className="material-symbols-outlined text-[#7c572d] text-[22px]">volume_off</span>
                <h4 className="font-serif text-sm font-medium text-[#1b1c1a]">Whisper Drive (&lt;28 dB)</h4>
                <p className="text-xs text-[#50453b] font-light leading-relaxed">
                  Brushless acoustic isolation motors ensure silent motion during early dawn and quiet evenings.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white flex flex-col gap-1.5 shadow-sm border border-[#e4e2df]">
                <span className="material-symbols-outlined text-[#7c572d] text-[22px]">schedule</span>
                <h4 className="font-serif text-sm font-medium text-[#1b1c1a]">Circadian Light Sync</h4>
                <p className="text-xs text-[#50453b] font-light leading-relaxed">
                  Automated gradual dusk lowering and morning ingress matching Queensland celestial cycles.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white flex flex-col gap-1.5 shadow-sm border border-[#e4e2df]">
                <span className="material-symbols-outlined text-[#7c572d] text-[22px]">solar_power</span>
                <h4 className="font-serif text-sm font-medium text-[#1b1c1a]">Solar Trickle Recharging</h4>
                <p className="text-xs text-[#50453b] font-light leading-relaxed">
                  Slimline discreet photovoltaic strips fitted to transoms eliminate hardwiring requirements.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white flex flex-col gap-1.5 shadow-sm border border-[#e4e2df]">
                <span className="material-symbols-outlined text-[#7c572d] text-[22px]">hub</span>
                <h4 className="font-serif text-sm font-medium text-[#1b1c1a]">Matter &amp; Thread Native</h4>
                <p className="text-xs text-[#50453b] font-light leading-relaxed">
                  Future-proof unified local networking with instant response without secondary bridges.
                </p>
              </div>

            </div>
          </div>

          {/* Right: Live Interactive Roller Blinds Canvas + Matter Remote (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Live Interactive Cinema Viewport */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] bg-[#1b1c1a] rounded-3xl overflow-hidden shadow-2xl border border-[#e4e2df] group">
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="w-full h-full object-cover will-change-transform"
              />

              {/* Viewport HUD Overlays */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white">
                  <div className={`w-2 h-2 rounded-full ${isLowering ? "bg-amber-400 animate-ping" : "bg-[#0d6c43]"}`} />
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                    {isLowering ? "Motor Active • Lowering at Dusk" : "Matter 1.3 • Motor Idle"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 font-mono text-[10px] font-semibold uppercase">
                  <span className="material-symbols-outlined text-[14px]">roller_shades</span>
                  192 Frames Dusk Simulation
                </div>
              </div>

              {/* Bottom Scrubber Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col gap-2 z-10">
                <div className="flex items-center justify-between text-white font-mono text-[10px]">
                  <span className="uppercase text-[#d4a574] font-semibold">Live Roller Position</span>
                  <span>{remoteLabel} ({stateRef.current.targetFrame + 1}/192f)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={remotePos}
                  onChange={handleSliderChange}
                  className="w-full accent-[#d4a574] cursor-pointer h-2 bg-white/20 rounded-lg"
                />
              </div>
            </div>

            {/* Remote Wand Buttons & Quick Preset Dock */}
            <div 
              ref={terminalRef}
              className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#e4e2df] flex flex-col gap-4"
            >
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <button
                  onClick={() => simulateRemote(0, "0% Full Daylight Ingress")}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    remotePos === 0
                      ? "bg-[#7c572d] text-white shadow-sm"
                      : "bg-[#f5f3f0] hover:bg-[#7c572d] hover:text-white text-[#1b1c1a]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">vertical_align_top</span>
                  <span className="font-mono text-[10px] uppercase font-bold">Open</span>
                </button>

                <button
                  onClick={() => simulateRemote(25, "25% High Glare Shield")}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    remotePos === 25
                      ? "bg-[#7c572d] text-white shadow-sm"
                      : "bg-[#f5f3f0] hover:bg-[#7c572d] hover:text-white text-[#1b1c1a]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
                  <span className="font-mono text-[10px] uppercase font-bold">25% Glare</span>
                </button>

                <button
                  onClick={() => simulateRemote(50, "50% Mid Level")}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    remotePos === 50
                      ? "bg-[#7c572d] text-white shadow-sm"
                      : "bg-[#f5f3f0] hover:bg-[#7c572d] hover:text-white text-[#1b1c1a]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">pause</span>
                  <span className="font-mono text-[10px] uppercase font-bold">50% Mid</span>
                </button>

                <button
                  onClick={() => simulateRemote(75, "75% Sunset Warmth")}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    remotePos === 75
                      ? "bg-[#7c572d] text-white shadow-sm"
                      : "bg-[#f5f3f0] hover:bg-[#7c572d] hover:text-white text-[#1b1c1a]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">bedtime</span>
                  <span className="font-mono text-[10px] uppercase font-bold">75% Dusk</span>
                </button>

                <button
                  onClick={() => simulateRemote(100, "100% Evening Privacy")}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    remotePos === 100
                      ? "bg-[#7c572d] text-white shadow-sm"
                      : "bg-[#f5f3f0] hover:bg-[#7c572d] hover:text-white text-[#1b1c1a]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">vertical_align_bottom</span>
                  <span className="font-mono text-[10px] uppercase font-bold">Secluded</span>
                </button>
              </div>

              {/* Telemetry Status Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="px-3 py-2 rounded-lg bg-[#f5f3f0] border border-[#e4e2df] flex flex-col">
                  <span className="font-mono text-[9px] text-[#827569] uppercase font-semibold">Battery / Solar</span>
                  <span className="font-mono text-xs font-semibold text-[#0d6c43]">98% (Trickle)</span>
                </div>
                <div className="px-3 py-2 rounded-lg bg-[#f5f3f0] border border-[#e4e2df] flex flex-col">
                  <span className="font-mono text-[9px] text-[#827569] uppercase font-semibold">Acoustic Sound</span>
                  <span className="font-mono text-xs font-semibold text-[#1b1c1a]">27.8 dB (Silent)</span>
                </div>
                <div className="px-3 py-2 rounded-lg bg-[#f5f3f0] border border-[#e4e2df] flex flex-col">
                  <span className="font-mono text-[9px] text-[#827569] uppercase font-semibold">Thread Mesh</span>
                  <span className="font-mono text-xs font-semibold text-[#7c572d]">12ms Latency</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
