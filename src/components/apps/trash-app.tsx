'use client';

import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

export const TrashApp: React.FC = () => {
  return (
    <div className="h-full w-full bg-[#1e1e1e] text-neutral-200 select-none flex flex-col">
      {/* Trash Toolbar */}
      <div className="h-10 bg-[#252525] border-b border-white/10 px-4 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center space-x-1.5">
          <span className="text-neutral-500">Macintosh HD</span>
          <span className="text-neutral-500">▸</span>
          <span className="text-neutral-500">Users</span>
          <span className="text-neutral-500">▸</span>
          <span className="text-neutral-500">premil</span>
          <span className="text-neutral-500">▸</span>
          <span className="font-semibold text-white">.Trash</span>
        </div>

        <button
          disabled
          className="px-2.5 py-1 rounded bg-white/5 text-neutral-500 text-xs font-medium cursor-not-allowed border border-white/5"
        >
          Empty Trash
        </button>
      </div>

      {/* Trash Contents Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 bg-[#181818]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/trash.png"
          alt="Trash"
          className="w-24 h-24 object-contain opacity-80 mb-2 drop-shadow-xl"
        />
        <h3 className="text-sm font-semibold text-neutral-200">The Trash is Empty</h3>
        <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
          Deleted files and folders will appear here before being permanently removed.
        </p>
      </div>

      {/* Status Bar */}
      <div className="h-6 border-t border-white/10 px-3 flex items-center justify-between text-[11px] text-neutral-500 bg-[#151515]">
        <span>0 items</span>
        <span>Available: 412.5 GB</span>
      </div>
    </div>
  );
};

export default TrashApp;
