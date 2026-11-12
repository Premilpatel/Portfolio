'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, ExternalLink } from 'lucide-react';

interface StickyNoteProps {
  onOpenResume: () => void;
  onOpenProjects: () => void;
  onOpenCourses: () => void;
  onOpenDiagram: () => void;
  onOpenNotion: () => void;
  onOpenPhotos: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  zIndex?: number;
  onFocus?: () => void;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  onOpenResume,
  onOpenProjects,
  onOpenCourses,
  onOpenDiagram,
  onOpenNotion,
  onOpenPhotos,
  isOpen = true,
  onClose,
  zIndex = 15,
  onFocus
}) => {
  const [position, setPosition] = useState({ x: 45, y: 70 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.max(10, Math.min(window.innerWidth - 320, e.clientX - dragOffset.x));
      const newY = Math.max(35, Math.min(window.innerHeight - 150, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <div
      ref={noteRef}
      onMouseDown={() => {
        if (onFocus) onFocus();
      }}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex: zIndex
      }}
      className={`fixed top-0 left-0 w-76 sm:w-80 select-none transition-shadow duration-200 ${
        isDragging ? 'shadow-2xl cursor-grabbing scale-[1.01]' : 'shadow-xl'
      }`}
    >
      {/* Yellow Stickies Paper Container */}
      <div className="bg-[#fef08a] border border-[#facc15]/80 rounded-sm shadow-xl text-neutral-900 overflow-hidden font-sans">
        {/* Authentic macOS Stickies Drag Bar */}
        <div
          onMouseDown={handleMouseDown}
          className="h-8 bg-[#fde047] border-b border-[#eab308]/60 px-3 flex items-center justify-between cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center space-x-1.5">
            {/* Close square button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose();
              }}
              className="w-3.5 h-3.5 rounded-xs border border-neutral-700/50 hover:bg-neutral-900/20 flex items-center justify-center transition-colors"
              title="Close Note"
            >
              <X className="w-2.5 h-2.5 text-neutral-800" />
            </button>
            {/* Collapse button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(prev => !prev);
              }}
              className="w-3.5 h-3.5 rounded-xs border border-neutral-700/50 hover:bg-neutral-900/20 flex items-center justify-center transition-colors"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              <Minus className="w-2.5 h-2.5 text-neutral-800" />
            </button>
          </div>

          <div className="text-xs font-semibold tracking-wide text-neutral-800">
            Notes
          </div>

          <div className="w-8" />
        </div>

        {/* Note Body: Only Bullet Points with Hyperlinks */}
        {!isCollapsed && (
          <div className="p-4 sm:p-5 bg-gradient-to-b from-[#fef08a] to-[#fef9c3]">
            <ul className="space-y-2.5 text-[13px]">
              {/* 1. Resume */}
              <li className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                <button
                  onClick={onOpenResume}
                  className="text-neutral-900 font-medium hover:text-blue-700 hover:underline underline-offset-2 transition-colors text-left cursor-pointer"
                >
                  Resume (PDF)
                </button>
              </li>

              {/* 2. Projects & Sub-bullets */}
              <li>
                <div className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                  <button
                    onClick={onOpenProjects}
                    className="text-neutral-900 font-medium hover:text-blue-700 hover:underline underline-offset-2 transition-colors text-left cursor-pointer"
                  >
                    Projects
                  </button>
                </div>

                {/* Sub-bullets under Projects */}
                <ul className="ml-4 mt-2 space-y-2 border-l border-neutral-800/20 pl-3 text-[12.5px]">
                  <li className="flex items-center space-x-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-700 shrink-0" />
                    <button
                      onClick={onOpenDiagram}
                      className="text-neutral-800 hover:text-blue-700 hover:underline underline-offset-2 transition-colors text-left cursor-pointer"
                    >
                      Homelab Architecture
                    </button>
                  </li>

                  <li className="flex items-center space-x-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-700 shrink-0" />
                    <button
                      onClick={onOpenNotion}
                      className="text-neutral-800 hover:text-blue-700 hover:underline underline-offset-2 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                    >
                      <span>Homelab Notion Writeup</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-blue-700 opacity-70 group-hover:opacity-100" />
                    </button>
                  </li>

                  <li className="flex items-center space-x-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-700 shrink-0" />
                    <span className="text-neutral-600 cursor-default select-none">
                      CTFs
                    </span>
                  </li>
                </ul>
              </li>

              {/* 3. Courses */}
              <li className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                <button
                  onClick={onOpenCourses}
                  className="text-neutral-900 font-medium hover:text-blue-700 hover:underline underline-offset-2 transition-colors text-left cursor-pointer"
                >
                  Courses
                </button>
              </li>

              {/* 4. Photo Gallery */}
              <li className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                <button
                  onClick={onOpenPhotos}
                  className="text-neutral-900 font-medium hover:text-blue-700 hover:underline underline-offset-2 transition-colors text-left cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyNote;
