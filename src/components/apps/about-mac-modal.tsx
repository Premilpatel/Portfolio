'use client';

import React from 'react';
import { X } from 'lucide-react';

interface AboutMacModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
  onOpenFinder?: () => void;
}

export const AboutMacModal: React.FC<AboutMacModalProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenFinder
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-80 bg-neutral-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center text-neutral-100 select-none animate-in zoom-in-95 duration-150"
      >
        {/* Close Button top left */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <X className="w-2 h-2 text-[#4a0002] opacity-70" />
        </button>

        {/* Big Apple Logo */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/10 flex items-center justify-center shadow-lg mb-3">
          <span className="text-3xl text-white"></span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-white tracking-tight">macOS Yosemite</h2>
        <span className="text-xs text-neutral-400 mb-4">Premil Portfolio Edition</span>

        {/* Hardware & Spec List */}
        <div className="w-full bg-white/5 rounded-xl p-3 border border-white/10 space-y-1.5 text-left text-xs mb-4">
          <div className="flex justify-between">
            <span className="text-neutral-400">Developer</span>
            <span className="font-semibold text-white">Premil Patel</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Role</span>
            <span className="font-medium text-emerald-400">Full Stack Engineer</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Tech Engine</span>
            <span className="text-neutral-200">React 19 • Next.js 16</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Styling Core</span>
            <span className="text-neutral-200">Tailwind CSS 4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">GitHub</span>
            <span className="text-blue-400 font-mono text-[11px]">Premilpatel</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 w-full text-xs">
          <button
            onClick={() => {
              onClose();
              if (onOpenTerminal) onOpenTerminal();
            }}
            className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 rounded-lg text-neutral-200 transition-colors font-medium"
          >
            Terminal...
          </button>
          <button
            onClick={() => {
              onClose();
              if (onOpenFinder) onOpenFinder();
            }}
            className="flex-1 py-1.5 px-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors font-medium"
          >
            Open Finder
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutMacModal;
