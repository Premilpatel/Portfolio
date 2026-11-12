'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Heart } from 'lucide-react';

export const MusicApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="h-full w-full bg-gradient-to-b from-neutral-800 to-neutral-950 p-6 flex flex-col justify-between select-none text-white">
      {/* Album Artwork & Track Info */}
      <div className="flex flex-col items-center text-center space-y-4 my-auto">
        <div className="relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
            alt="Album Art"
            className="w-48 h-48 rounded-2xl object-cover shadow-2xl border border-white/10"
          />
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:scale-110 transition-transform"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'text-emerald-400 fill-emerald-400' : 'text-neutral-400'}`} />
          </button>
        </div>

        <div>
          <h2 className="text-base font-bold text-white tracking-tight">Code & Flow State</h2>
          <p className="text-xs text-neutral-400 mt-0.5">Premil's Dev Playlist • Lo-Fi Chill Beats</p>
        </div>
      </div>

      {/* Progress & Controls */}
      <div className="space-y-4 mt-auto">
        {/* Progress Bar */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1 bg-white/20 accent-emerald-400 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>1:24</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Playback Buttons */}
        <div className="flex items-center justify-center space-x-6">
          <button className="text-neutral-400 hover:text-white transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button className="text-neutral-400 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-3 px-4">
          <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1 bg-white/20 accent-neutral-400 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
