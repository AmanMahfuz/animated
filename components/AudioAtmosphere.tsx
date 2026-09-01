"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface AudioAtmosphereProps {
  scrollProgress: number;
}

export function AudioAtmosphere({ scrollProgress }: AudioAtmosphereProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const motorGainRef = useRef<GainNode | null>(null);
  const lastProgressRef = useRef(scrollProgress);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master gain
      const master = ctx.createGain();
      master.gain.value = 0.15;
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // 1. Soothing Ambient Drone (Warm fundamental + fifths)
      const freqs = [110, 164.81, 220, 329.63];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.04 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(master);
        osc.start();
      });

      // 2. Filtered Alpine Breeze (Pink Noise generator)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filterRef.current = filter;

      whiteNoise.connect(filter);
      filter.connect(master);
      whiteNoise.start();

      // 3. Ultra-quiet Motor Whisper harmonic (active when scrolling)
      const motorOsc = ctx.createOscillator();
      const motorGain = ctx.createGain();
      motorOsc.type = "sine";
      motorOsc.frequency.setValueAtTime(86, ctx.currentTime);
      motorGain.gain.setValueAtTime(0, ctx.currentTime);
      motorGainRef.current = motorGain;

      motorOsc.connect(motorGain);
      motorGain.connect(master);
      motorOsc.start();
    } catch {
      // AudioContext fallback
    }
  };

  const toggleSound = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        initAudio();
      } else if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  // React to scroll velocity and progress
  useEffect(() => {
    if (!isPlaying || !audioCtxRef.current || !filterRef.current) return;

    const delta = Math.abs(scrollProgress - lastProgressRef.current);
    lastProgressRef.current = scrollProgress;

    // Adjust filter cutoff based on evening duskiness (warmer as curtains close)
    const baseCutoff = 550 - scrollProgress * 300;
    filterRef.current.frequency.setTargetAtTime(
      Math.max(160, baseCutoff),
      audioCtxRef.current.currentTime,
      0.2
    );

    // Motor whisper swell on movement
    if (motorGainRef.current) {
      const motorVolume = Math.min(0.06, delta * 2.5);
      motorGainRef.current.gain.setTargetAtTime(
        motorVolume,
        audioCtxRef.current.currentTime,
        0.1
      );
    }
  }, [scrollProgress, isPlaying]);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute Atmospheric Soundscape" : "Enable Luxury Soundscape"}
      className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel hover:bg-white/10 transition-all duration-300 text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white border border-white/10 hover:border-amber-400/40 shadow-lg cursor-pointer"
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
            </span>
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200" />
        )}
      </div>

      <span className="hidden sm:inline">
        {isPlaying ? "Soundscape On" : "Atmosphere"}
      </span>

      {isPlaying && (
        <div className="flex items-center gap-0.5 h-3">
          <span className="w-0.5 bg-amber-400/80 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2"></span>
          <span className="w-0.5 bg-amber-400/80 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-3"></span>
          <span className="w-0.5 bg-amber-400/80 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-1.5"></span>
        </div>
      )}
    </button>
  );
}
