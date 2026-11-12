'use client';

import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  ShieldAlert
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

export interface DesktopIconItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'app' | 'image';
  iconType: 'resume' | 'projects' | 'courses' | 'notion' | 'github';
  action: () => void;
}

interface DesktopIconsProps {
  onOpenApp: (appId: string) => void;
  onOpenFolder?: (folderName: string) => void;
  onOpenResume?: () => void;
  onOpenImage?: (src: string, title?: string) => void;
  isDarkMode?: boolean;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({
  onOpenApp,
  onOpenFolder,
  onOpenResume,
  onOpenImage,
  isDarkMode = true
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const desktopItems: DesktopIconItem[] = [
    {
      id: 'resume-file',
      name: 'Premil_Patel_Resume.pdf',
      type: 'pdf',
      iconType: 'resume',
      action: () => {
        if (onOpenResume) onOpenResume();
        else onOpenApp('resume');
      }
    },
    {
      id: 'homelab-diagram-file',
      name: 'Homelab_Architecture.jpg',
      type: 'image',
      iconType: 'resume',
      action: () => {
        if (onOpenImage) onOpenImage('/homelab-architecture.jpg', 'Homelab_Architecture.jpg');
        else onOpenApp('gallery');
      }
    },
    {
      id: 'projects-folder',
      name: 'Projects',
      type: 'folder',
      iconType: 'projects',
      action: () => {
        onOpenApp('finder');
        if (onOpenFolder) onOpenFolder('Projects');
      }
    },
    {
      id: 'courses-folder',
      name: 'Courses',
      type: 'folder',
      iconType: 'courses',
      action: () => {
        onOpenApp('finder');
        if (onOpenFolder) onOpenFolder('Courses');
      }
    },
    {
      id: 'notion-app',
      name: 'Notion Writeup',
      type: 'app',
      iconType: 'notion',
      action: () => window.open('https://app.notion.com/p/Detection-Monitoring-Homelab-Writeup-2f8ee3aaf9948016a8f1fcdd386f39f2', '_blank')
    },
    {
      id: 'github-shortcut',
      name: 'GitHub Profile',
      type: 'app',
      iconType: 'github',
      action: () => window.open('https://github.com/Premilpatel', '_blank')
    }
  ];

  const renderIcon = (item: DesktopIconItem) => {
    switch (item.iconType) {
      case 'resume':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src="/icons/mac-pdf.png" 
            alt={item.name} 
            className="w-12 h-14 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
          />
        );

      case 'projects':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src="/icons/projects-folder.png" 
            alt="Projects" 
            className="w-13 h-13 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
          />
        );

      case 'courses':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src="/icons/mac-folder-blue.png" 
            alt="Courses" 
            className="w-13 h-13 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
          />
        );

      case 'notion':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src="/icons/notion.png" 
            alt="Notion" 
            className="w-12 h-12 rounded-xl object-contain shadow-lg group-hover:scale-105 transition-transform"
          />
        );

      case 'github':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src="/icons/github-mac.png" 
            alt="GitHub" 
            className="w-13 h-13 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
          />
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
      {/* Column 1 */}
      <div className="flex flex-col gap-5">
        {desktopItems.slice(0, 3).map((item) => {
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
                  isSelected ? 'bg-blue-600 text-white' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-5">
        {desktopItems.slice(3).map((item) => {
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
                  isSelected ? 'bg-blue-600 text-white' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
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
