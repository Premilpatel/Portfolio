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
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  onOpenResume,
  onOpenProjects,
  onOpenCourses,
  onOpenDiagram,
  onOpenNotion,
  onOpenPhotos,
  isOpen = true,
  onClose
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

  const links = [
    { label: 'Resume (PDF)', action: onOpenResume, external: false },
    { label: 'Projects', action: onOpenProjects, external: false },
    { label: 'Courses', action: onOpenCourses, external: false },
    { label: 'Homelab Architecture', action: onOpenDiagram, external: false },
    { label: 'Homelab Notion Writeup', action: onOpenNotion, external: true },
    { label: 'Photo Gallery', action: onOpenPhotos, external: false }
  ];

  return (
    <div
      ref={noteRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex: 40
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
            <ul className="space-y-3 text-[13px]">
              {links.map((link) => (
                <li key={link.label} className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                  <button
                    onClick={link.action}
                    className="text-neutral-900 font-medium hover:text-blue-700 hover:underline underline-offset-2 transition-colors text-left flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    {link.external && (
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-blue-700 opacity-70 group-hover:opacity-100" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyNote;
