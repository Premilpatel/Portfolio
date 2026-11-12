'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Folder, 
  GraduationCap, 
  Shield, 
  BookOpen, 
  Mail, 
  ExternalLink, 
  X, 
  Minus,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

interface StickyNoteProps {
  onOpenResume: () => void;
  onOpenProjects: () => void;
  onOpenCourses: () => void;
  onOpenDiagram: () => void;
  onOpenNotion: () => void;
  onOpenSafari: () => void;
  onOpenMail: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  onOpenResume,
  onOpenProjects,
  onOpenCourses,
  onOpenDiagram,
  onOpenNotion,
  onOpenSafari,
  onOpenMail,
  isOpen = true,
  onClose
}) => {
  const [position, setPosition] = useState({ x: 30, y: 70 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag from header or empty area
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.max(10, Math.min(window.innerWidth - 300, e.clientX - dragOffset.x));
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
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex: 40
      }}
      className={`fixed top-0 left-0 w-72 sm:w-80 select-none transition-shadow duration-200 ${
        isDragging ? 'shadow-2xl cursor-grabbing scale-[1.01]' : 'shadow-xl'
      }`}
    >
      {/* Yellow Stickies Paper Container */}
      <div className="bg-[#fef08a] border border-[#facc15]/80 rounded-sm shadow-lg text-neutral-900 overflow-hidden font-sans">
        {/* Authentic macOS Stickies Drag Bar */}
        <div
          onMouseDown={handleMouseDown}
          className="h-7 bg-[#fde047] border-b border-[#eab308]/60 px-2.5 flex items-center justify-between cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center space-x-1.5">
            {/* Close square button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose();
              }}
              className="w-3 h-3 rounded-xs border border-neutral-700/50 hover:bg-neutral-900/20 flex items-center justify-center transition-colors"
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
              className="w-3 h-3 rounded-xs border border-neutral-700/50 hover:bg-neutral-900/20 flex items-center justify-center transition-colors"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              <Minus className="w-2.5 h-2.5 text-neutral-800" />
            </button>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-700/80">
            Quick Guide
          </div>

          <div className="w-8" />
        </div>

        {/* Note Body */}
        {!isCollapsed && (
          <div className="p-4 space-y-3.5 bg-gradient-to-b from-[#fef08a] to-[#fef9c3]">
            {/* Header / Intro */}
            <div className="border-b border-neutral-900/15 pb-2">
              <h3 className="font-bold text-sm tracking-tight text-neutral-900 flex items-center gap-1.5">
                <span>Welcome to Premil's Portfolio</span>
                <span className="text-base">👋</span>
              </h3>
              <p className="text-[11px] text-neutral-700 mt-0.5 leading-snug">
                Cybersecurity & Software Engineering @ DePaul University. Here are quick links to explore:
              </p>
            </div>

            {/* Quick Links List with interactive bullets */}
            <div className="space-y-1.5 text-xs">
              <button
                onClick={onOpenResume}
                className="w-full text-left flex items-center justify-between p-1.5 rounded-md hover:bg-black/8 transition-colors group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm">📄</span>
                  <span className="font-semibold text-neutral-900 group-hover:text-blue-800 transition-colors">
                    Resume (PDF)
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Open ↗
                </span>
              </button>

              <button
                onClick={onOpenProjects}
                className="w-full text-left flex items-center justify-between p-1.5 rounded-md hover:bg-black/8 transition-colors group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm">📁</span>
                  <span className="font-semibold text-neutral-900 group-hover:text-blue-800 transition-colors">
                    Projects Folder
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View ↗
                </span>
              </button>

              <button
                onClick={onOpenCourses}
                className="w-full text-left flex items-center justify-between p-1.5 rounded-md hover:bg-black/8 transition-colors group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm">🎓</span>
                  <span className="font-semibold text-neutral-900 group-hover:text-blue-800 transition-colors">
                    Courses & Transcripts
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View ↗
                </span>
              </button>

              <button
                onClick={onOpenDiagram}
                className="w-full text-left flex items-center justify-between p-1.5 rounded-md hover:bg-black/8 transition-colors group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm">🛡️</span>
                  <span className="font-semibold text-neutral-900 group-hover:text-blue-800 transition-colors">
                    Homelab Architecture
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Diagram ↗
                </span>
              </button>

              <button
                onClick={onOpenNotion}
                className="w-full text-left flex items-center justify-between p-1.5 rounded-md hover:bg-black/8 transition-colors group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm">📝</span>
                  <span className="font-semibold text-neutral-900 group-hover:text-blue-800 transition-colors">
                    Homelab Notion Writeup
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Link ↗
                </span>
              </button>

              <button
                onClick={onOpenMail}
                className="w-full text-left flex items-center justify-between p-1.5 rounded-md hover:bg-black/8 transition-colors group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm">✉️</span>
                  <span className="font-semibold text-neutral-900 group-hover:text-blue-800 transition-colors">
                    Get in Touch
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Gmail ↗
                </span>
              </button>
            </div>

            {/* Bottom Footer Tip */}
            <div className="pt-2 border-t border-neutral-900/15 flex items-center justify-between text-[10px] text-neutral-600">
              <span>Tip: You can drag or close this note</span>
              <a
                href="https://github.com/Premilpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-neutral-800 hover:text-black flex items-center gap-1"
              >
                <GithubIcon className="w-3 h-3 inline" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyNote;
