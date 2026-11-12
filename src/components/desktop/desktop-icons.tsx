'use client';

import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  Code2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

export interface DesktopIconItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'app';
  iconType: 'resume' | 'projects' | 'notion' | 'figma' | 'readme' | 'homelab' | 'github';
  action: () => void;
}

interface DesktopIconsProps {
  onOpenApp: (appId: string) => void;
  onOpenFolder?: (folderName: string) => void;
  onOpenResume?: () => void;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({
  onOpenApp,
  onOpenFolder,
  onOpenResume
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const desktopItems: DesktopIconItem[] = [
    // Column 1
    {
      id: 'resume-pdf',
      name: 'Premil_Patel_Resume.pdf',
      type: 'pdf',
      iconType: 'resume',
      action: () => {
        if (onOpenResume) onOpenResume();
        else onOpenApp('resume');
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
      id: 'readme-doc',
      name: 'Read me',
      type: 'doc',
      iconType: 'readme',
      action: () => onOpenApp('notes')
    },
    {
      id: 'homelab',
      name: 'Blue Team Homelab',
      type: 'app',
      iconType: 'homelab',
      action: () => {
        onOpenApp('finder');
        if (onOpenFolder) onOpenFolder('Projects');
      }
    },

    // Column 2
    {
      id: 'figma-app',
      name: 'Figma',
      type: 'app',
      iconType: 'figma',
      action: () => onOpenApp('gallery')
    },
    {
      id: 'notion-app',
      name: 'Notion',
      type: 'app',
      iconType: 'notion',
      action: () => onOpenApp('notes')
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
          <div className="w-12 h-14 rounded-lg bg-white/95 border border-red-500/50 flex flex-col items-center justify-between p-1.5 shadow-xl relative group">
            <div className="w-full flex justify-between items-center text-[7px] font-bold text-red-600 border-b border-red-200 pb-0.5">
              <span>PDF</span>
              <span>4.0</span>
            </div>
            <FileText className="w-6 h-6 text-red-500 my-auto" />
            <div className="w-full bg-red-600 text-white text-[7px] text-center font-bold rounded-xs py-0.2">
              RESUME
            </div>
          </div>
        );

      case 'projects':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src="/icons/projects-folder.png" 
            alt="Projects" 
            className="w-13 h-13 object-contain drop-shadow-lg"
          />
        );

      case 'readme':
        return (
          <div className="w-11 h-13 rounded-lg bg-white/90 border border-white/40 flex flex-col items-center justify-center shadow-lg relative p-1.5">
            <FileText className="w-6 h-6 text-neutral-600 mb-0.5" />
            <span className="text-[8px] font-bold text-neutral-600 tracking-tighter uppercase">TXT</span>
          </div>
        );

      case 'notion':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src="/icons/notion.png" 
            alt="Notion" 
            className="w-12 h-12 rounded-xl object-contain shadow-lg"
          />
        );

      case 'figma':
        return (
          <div className="w-12 h-12 rounded-xl bg-[#2c2d30] border border-white/20 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 38 57" className="w-6 h-6">
              <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
              <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
              <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
              <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
              <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
            </svg>
          </div>
        );

      case 'homelab':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-indigo-500/40 flex items-center justify-center shadow-lg">
            <ShieldAlert className="w-6 h-6 text-indigo-400" />
          </div>
        );

      case 'github':
        return (
          <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center shadow-lg">
            <GithubIcon className="w-6 h-6 text-white" />
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
      {/* Column 1 */}
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

      {/* Column 2 */}
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
    </div>
  );
};

export default DesktopIcons;
