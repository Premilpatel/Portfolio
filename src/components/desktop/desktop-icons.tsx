'use client';

import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  GraduationCap, 
  Globe, 
  Sparkles, 
  Palette, 
  Code2,
  Info
} from 'lucide-react';
import { YoutubeIcon } from '@/components/ui/brand-icons';

export interface DesktopIconItem {
  id: string;
  name: string;
  type: 'folder' | 'doc' | 'app';
  iconType: 'figma' | 'readme' | 'courses' | 'website' | 'info' | '3dart' | 'projects' | 'uiux' | 'youtube';
  action: () => void;
  folderTarget?: string;
}

interface DesktopIconsProps {
  onOpenApp: (appId: string) => void;
  onOpenFolder?: (folderName: string) => void;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({
  onOpenApp,
  onOpenFolder
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const desktopItems: DesktopIconItem[] = [
    // Column 1
    {
      id: 'figma',
      name: 'Figma',
      type: 'app',
      iconType: 'figma',
      action: () => onOpenApp('gallery')
    },
    {
      id: 'courses',
      name: 'Courses',
      type: 'folder',
      iconType: 'courses',
      action: () => {
        onOpenApp('finder');
        if (onOpenFolder) onOpenFolder('Certifications');
      }
    },
    {
      id: 'you-need-to-know',
      name: 'You need to know',
      type: 'folder',
      iconType: 'info',
      action: () => {
        onOpenApp('finder');
        if (onOpenFolder) onOpenFolder('Resume & Bio');
      }
    },
    {
      id: 'projects',
      name: 'Projects',
      type: 'folder',
      iconType: 'projects',
      action: () => {
        onOpenApp('finder');
        if (onOpenFolder) onOpenFolder('Projects');
      }
    },

    // Column 2
    {
      id: 'readme',
      name: 'Read me',
      type: 'doc',
      iconType: 'readme',
      action: () => onOpenApp('notes')
    },
    {
      id: 'website',
      name: 'Website',
      type: 'folder',
      iconType: 'website',
      action: () => onOpenApp('safari')
    },
    {
      id: '3d-art',
      name: '3D Art',
      type: 'folder',
      iconType: '3dart',
      action: () => onOpenApp('gallery')
    },
    {
      id: 'ui-ux',
      name: 'UI / UX Design',
      type: 'folder',
      iconType: 'uiux',
      action: () => onOpenApp('gallery')
    },
    {
      id: 'youtube',
      name: 'Youtube',
      type: 'app',
      iconType: 'youtube',
      action: () => window.open('https://github.com/Premilpatel/Portfolio', '_blank')
    }
  ];

  const renderIcon = (item: DesktopIconItem) => {
    switch (item.iconType) {
      case 'figma':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1e1e1e] to-[#2c2d30] border border-white/20 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 38 57" className="w-6 h-6">
              <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
              <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
              <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
              <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
              <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
            </svg>
          </div>
        );

      case 'readme':
        return (
          <div className="w-11 h-13 rounded-lg bg-white/90 border border-white/40 flex flex-col items-center justify-center shadow-lg relative p-1.5">
            <FileText className="w-6 h-6 text-neutral-600 mb-0.5" />
            <span className="text-[8px] font-bold text-neutral-600 tracking-tighter uppercase">TXT</span>
          </div>
        );

      case 'courses':
        return (
          <div className="relative">
            <Folder className="w-13 h-13 text-[#3dabf5] fill-[#3dabf5]/70 drop-shadow-md stroke-1" />
            <GraduationCap className="w-5 h-5 text-white absolute top-4 left-4 drop-shadow" />
          </div>
        );

      case 'website':
      case 'info':
      case '3dart':
      case 'projects':
      case 'uiux':
        return (
          <div className="relative">
            <Folder className="w-13 h-13 text-[#3dabf5] fill-[#3dabf5]/70 drop-shadow-md stroke-1" />
          </div>
        );

      case 'youtube':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 border border-white/20 flex items-center justify-center shadow-lg">
            <YoutubeIcon className="w-7 h-7 text-white fill-white" />
          </div>
        );

      default:
        return <Folder className="w-13 h-13 text-[#3dabf5] fill-[#3dabf5]/70 drop-shadow-md stroke-1" />;
    }
  };

  return (
    <div 
      className="absolute top-10 right-4 sm:right-6 bottom-24 flex flex-row-reverse gap-4 pointer-events-auto select-none"
      onClick={() => setSelectedId(null)}
    >
      {/* 2 columns of desktop icons on the right, matching the screenshot */}
      <div className="flex flex-col gap-5">
        {desktopItems.slice(4).map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(item.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                item.action();
              }}
              className={`w-20 flex flex-col items-center p-1.5 rounded-lg cursor-pointer transition-all ${
                isSelected ? 'bg-blue-600/40 ring-1 ring-blue-400/60 backdrop-blur-xs' : 'hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                {renderIcon(item)}
              </div>
              <span 
                className={`text-[11px] text-center font-medium leading-tight px-1 py-0.5 rounded break-words max-w-full ${
                  isSelected ? 'bg-blue-600 text-white' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-5">
        {desktopItems.slice(0, 4).map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(item.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                item.action();
              }}
              className={`w-20 flex flex-col items-center p-1.5 rounded-lg cursor-pointer transition-all ${
                isSelected ? 'bg-blue-600/40 ring-1 ring-blue-400/60 backdrop-blur-xs' : 'hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                {renderIcon(item)}
              </div>
              <span 
                className={`text-[11px] text-center font-medium leading-tight px-1 py-0.5 rounded break-words max-w-full ${
                  isSelected ? 'bg-blue-600 text-white' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopIcons;
