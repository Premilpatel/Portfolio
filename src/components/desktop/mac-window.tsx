'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

interface MacWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized?: boolean;
  zIndex: number;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  icon?: string;
  className?: string;
  isDarkMode?: boolean;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized = false,
  zIndex,
  initialPosition = { x: 100, y: 70 },
  initialSize = { width: 760, height: 500 },
  minWidth = 360,
  minHeight = 260,
  onClose,
  onMinimize,
  onFocus,
  children,
  icon,
  className = '',
  isDarkMode = true
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0
  });

  const prevPositionSizeRef = useRef<{ position: { x: number; y: number }; size: { width: number; height: number } }>({
    position: initialPosition,
    size: initialSize
  });

  // Handle window dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-control-btn')) return;
    
    onFocus();
    if (isMaximized) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      const newX = Math.max(10, Math.min(window.innerWidth - size.width - 10, dragRef.current.posX + dx));
      const newY = Math.max(30, Math.min(window.innerHeight - 100, dragRef.current.posY + dy));

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
  }, [isDragging, size.width]);

  const toggleMaximize = () => {
    if (!isMaximized) {
      prevPositionSizeRef.current = { position, size };
      setPosition({ x: 16, y: 36 });
      setSize({
        width: window.innerWidth - 32,
        height: window.innerHeight - 120
      });
      setIsMaximized(true);
    } else {
      setPosition(prevPositionSizeRef.current.position);
      setSize(prevPositionSizeRef.current.size);
      setIsMaximized(false);
    }
  };

  if (!isOpen || isMinimized) return null;

  return (
    <div
      onClick={onFocus}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`
      }}
      className={`fixed top-0 left-0 rounded-xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-2xl select-auto animate-in fade-in zoom-in-95 duration-200 ${
        isDarkMode 
          ? 'border border-white/20 bg-neutral-900/85 text-neutral-100' 
          : 'border border-black/15 bg-white/95 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.25)]'
      } ${className}`}
    >
      {/* macOS Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
        className={`h-10 px-3.5 flex items-center justify-between cursor-default select-none shrink-0 ${
          isDarkMode 
            ? 'bg-neutral-800/80 border-b border-white/10 text-neutral-300' 
            : 'bg-neutral-100/95 border-b border-black/10 text-neutral-700'
        }`}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center space-x-2 group/lights">
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="window-control-btn w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center transition-all hover:brightness-90 active:brightness-75"
            title="Close"
          >
            <X className="w-2 h-2 text-[#4a0002] opacity-0 group-hover/lights:opacity-100 transition-opacity" />
          </button>

          {/* Minimize button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) onMinimize();
            }}
            className="window-control-btn w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] flex items-center justify-center transition-all hover:brightness-90 active:brightness-75"
            title="Minimize"
          >
            <Minus className="w-2 h-2 text-[#5a3a00] opacity-0 group-hover/lights:opacity-100 transition-opacity" />
          </button>

          {/* Maximize button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
            className="window-control-btn w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center transition-all hover:brightness-90 active:brightness-75"
            title="Zoom"
          >
            <Maximize2 className="w-1.5 h-1.5 text-[#004609] opacity-0 group-hover/lights:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Window Title & Icon */}
        <div className="flex items-center space-x-2 text-xs font-medium pointer-events-none truncate max-w-[65%]">
          {icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={icon} alt="" className="w-3.5 h-3.5 object-contain" />
          )}
          <span className="truncate">{title}</span>
        </div>

        {/* Right side spacer for balance */}
        <div className="w-12"></div>
      </div>

      {/* Window Body */}
      <div className={`flex-1 overflow-auto relative ${
        isDarkMode ? 'bg-neutral-900/60 backdrop-blur-md' : 'bg-white/95'
      }`}>
        {children}
      </div>
    </div>
  );
};

export default MacWindow;
