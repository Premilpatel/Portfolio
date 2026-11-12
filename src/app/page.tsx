'use client';

import React, { useState, useEffect } from 'react';
import MacOSMenuBar from '@/components/ui/mac-os-menu-bar';
import MacOSDock, { type DockApp } from '@/components/ui/mac-os-dock';
import DesktopIcons from '@/components/desktop/desktop-icons';
import MacWindow from '@/components/desktop/mac-window';

// Apps
import FinderApp from '@/components/apps/finder-app';
import GalleryApp from '@/components/apps/gallery-app';
import TerminalApp from '@/components/apps/terminal-app';
import SafariApp from '@/components/apps/safari-app';
import NotesApp from '@/components/apps/notes-app';
import CalculatorApp from '@/components/apps/calculator-app';
import MusicApp from '@/components/apps/music-app';
import MailApp from '@/components/apps/mail-app';
import AboutMacModal from '@/components/apps/about-mac-modal';

interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

const DOCK_APPS: DockApp[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: 'https://cdn.21st.dev/assets/mirror/99/9963f31f43cd77b0c28981ba7bac04db749a5749019f554d1afb75225a3e9151.png'
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: 'https://cdn.21st.dev/assets/mirror/d5/d558230225bb0dd1897db6c7cf0d03b29506eef8078fe25313c48cd8f72d05ad.png'
  },
  {
    id: 'photos',
    name: 'Photos',
    icon: 'https://cdn.21st.dev/assets/mirror/45/45c61147b702b2765802969df55878aa5f69e27abe656174339dc661d0f9a31d.png'
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: 'https://cdn.21st.dev/assets/mirror/cb/cbfa4e5db383bbb86683edc2f7d309e9fd7000d07833f6449837be51b77558fa.png'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: 'https://cdn.21st.dev/assets/mirror/11/11d8587bae8852b8232d1f37e318c4b0fbbd2b0f2b61c71a79dbae327b4fa0c1.webp'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: 'https://cdn.21st.dev/assets/mirror/96/9639bd0ec3bae0b56bd8812f61c39d72123c6de272922e5bc7f3a24264112953.png'
  },
  {
    id: 'music',
    name: 'Spotify',
    icon: 'https://cdn.21st.dev/assets/mirror/03/035600d3c05ccbfc974888a3319fa721dac7321dd18734a5d0405af1fd259c41.png'
  },
  {
    id: 'mail',
    name: 'Mail',
    icon: 'https://cdn.21st.dev/assets/mirror/7b/7bb8671183d2a2bbb8a3858b1971cc5699ba0103673b011590d22f0fa309bb87.png'
  },
  {
    id: 'github',
    name: 'GitHub Repo',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
  }
];

export default function Home() {
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    finder: { id: 'finder', isOpen: true, isMinimized: false, zIndex: 10 },
    gallery: { id: 'gallery', isOpen: false, isMinimized: false, zIndex: 11 },
    terminal: { id: 'terminal', isOpen: false, isMinimized: false, zIndex: 12 },
    safari: { id: 'safari', isOpen: false, isMinimized: false, zIndex: 13 },
    notes: { id: 'notes', isOpen: false, isMinimized: false, zIndex: 14 },
    calculator: { id: 'calculator', isOpen: false, isMinimized: false, zIndex: 15 },
    music: { id: 'music', isOpen: false, isMinimized: false, zIndex: 16 },
    mail: { id: 'mail', isOpen: false, isMinimized: false, zIndex: 17 },
  });

  const [topZIndex, setTopZIndex] = useState(20);
  const [activeAppName, setActiveAppName] = useState<string>('Finder');
  const [aboutMacOpen, setAboutMacOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightSearch, setSpotlightSearch] = useState('');

  // Bring window to focus
  const focusWindow = (appId: string) => {
    setTopZIndex(prev => prev + 1);
    setWindows(prev => ({
      ...prev,
      [appId]: {
        ...(prev[appId] || { id: appId, isOpen: true, isMinimized: false }),
        isMinimized: false,
        zIndex: topZIndex + 1
      }
    }));

    const appTitles: Record<string, string> = {
      finder: 'Finder',
      gallery: 'Photos',
      terminal: 'Terminal',
      safari: 'Safari',
      notes: 'Notes',
      calculator: 'Calculator',
      music: 'Music',
      mail: 'Mail'
    };
    if (appTitles[appId]) {
      setActiveAppName(appTitles[appId]);
    }
  };

  // Open / Toggle App
  const openApp = (appId: string) => {
    if (appId === 'photos') appId = 'gallery';
    if (appId === 'github') {
      window.open('https://github.com/Premilpatel/Portfolio', '_blank');
      return;
    }

    setWindows(prev => {
      const current = prev[appId];
      if (!current || !current.isOpen) {
        return {
          ...prev,
          [appId]: { id: appId, isOpen: true, isMinimized: false, zIndex: topZIndex + 1 }
        };
      }
      if (current.isMinimized) {
        return {
          ...prev,
          [appId]: { ...current, isMinimized: false, zIndex: topZIndex + 1 }
        };
      }
      // If already open, bring to front
      return {
        ...prev,
        [appId]: { ...current, zIndex: topZIndex + 1 }
      };
    });

    focusWindow(appId);
  };

  const closeWindow = (appId: string) => {
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isOpen: false }
    }));
  };

  const minimizeWindow = (appId: string) => {
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isMinimized: true }
    }));
  };

  // Handle Menu Bar actions
  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'about-mac':
        setAboutMacOpen(true);
        break;
      case 'open-finder':
        openApp('finder');
        break;
      case 'open-gallery':
        openApp('gallery');
        break;
      case 'open-terminal':
        openApp('terminal');
        break;
      case 'open-resume':
      case 'open-guide':
        openApp('notes');
        break;
      case 'open-projects':
        openApp('safari');
        break;
      case 'open-mail':
        openApp('mail');
        break;
      case 'open-github':
        window.open('https://github.com/Premilpatel/Portfolio', '_blank');
        break;
      case 'spotlight':
        setSpotlightOpen(prev => !prev);
        break;
      case 'toggle-fullscreen':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
        break;
      case 'close-active-window': {
        const openKeys = Object.keys(windows).filter(k => windows[k].isOpen && !windows[k].isMinimized);
        if (openKeys.length > 0) {
          const highestKey = openKeys.reduce((a, b) => (windows[a].zIndex > windows[b].zIndex ? a : b));
          closeWindow(highestKey);
        }
        break;
      }
      default:
        break;
    }
  };

  // Global keyboard shortcuts (Cmd+Space for Spotlight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openAppIds = Object.keys(windows).filter(k => windows[k].isOpen);

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        backgroundImage: `url('/yosemite.jpg'), url('/yosemite_sunset.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Top macOS Menu Bar */}
      <MacOSMenuBar
        appName={activeAppName}
        onMenuAction={handleMenuAction}
      />

      {/* Desktop Clickable Icons (Right side columns) */}
      <DesktopIcons
        onOpenApp={openApp}
        onOpenFolder={(folder) => {
          openApp('finder');
        }}
      />

      {/* Windows Area */}
      {/* 1. Finder Window */}
      <MacWindow
        id="finder"
        title="Finder — Premil's Portfolio"
        icon="https://cdn.21st.dev/assets/mirror/99/9963f31f43cd77b0c28981ba7bac04db749a5749019f554d1afb75225a3e9151.png"
        isOpen={windows.finder?.isOpen}
        isMinimized={windows.finder?.isMinimized}
        zIndex={windows.finder?.zIndex || 10}
        initialPosition={{ x: 80, y: 55 }}
        initialSize={{ width: 840, height: 530 }}
        onClose={() => closeWindow('finder')}
        onMinimize={() => minimizeWindow('finder')}
        onFocus={() => focusWindow('finder')}
      >
        <FinderApp
          onOpenFile={(file) => {
            if (file.type === 'image') openApp('gallery');
            else if (file.type === 'code') openApp('terminal');
            else openApp('notes');
          }}
        />
      </MacWindow>

      {/* 2. Gallery / Photos Window */}
      <MacWindow
        id="gallery"
        title="Photos — Design & Work Showcase"
        icon="https://cdn.21st.dev/assets/mirror/45/45c61147b702b2765802969df55878aa5f69e27abe656174339dc661d0f9a31d.png"
        isOpen={windows.gallery?.isOpen}
        isMinimized={windows.gallery?.isMinimized}
        zIndex={windows.gallery?.zIndex || 11}
        initialPosition={{ x: 130, y: 75 }}
        initialSize={{ width: 860, height: 550 }}
        onClose={() => closeWindow('gallery')}
        onMinimize={() => minimizeWindow('gallery')}
        onFocus={() => focusWindow('gallery')}
      >
        <GalleryApp />
      </MacWindow>

      {/* 3. Terminal Window */}
      <MacWindow
        id="terminal"
        title="Terminal — zsh — 80×24"
        icon="https://cdn.21st.dev/assets/mirror/11/11d8587bae8852b8232d1f37e318c4b0fbbd2b0f2b61c71a79dbae327b4fa0c1.webp"
        isOpen={windows.terminal?.isOpen}
        isMinimized={windows.terminal?.isMinimized}
        zIndex={windows.terminal?.zIndex || 12}
        initialPosition={{ x: 180, y: 110 }}
        initialSize={{ width: 680, height: 440 }}
        onClose={() => closeWindow('terminal')}
        onMinimize={() => minimizeWindow('terminal')}
        onFocus={() => focusWindow('terminal')}
      >
        <TerminalApp />
      </MacWindow>

      {/* 4. Safari Browser Window */}
      <MacWindow
        id="safari"
        title="Safari — Premilpatel Projects"
        icon="https://cdn.21st.dev/assets/mirror/d5/d558230225bb0dd1897db6c7cf0d03b29506eef8078fe25313c48cd8f72d05ad.png"
        isOpen={windows.safari?.isOpen}
        isMinimized={windows.safari?.isMinimized}
        zIndex={windows.safari?.zIndex || 13}
        initialPosition={{ x: 110, y: 65 }}
        initialSize={{ width: 850, height: 540 }}
        onClose={() => closeWindow('safari')}
        onMinimize={() => minimizeWindow('safari')}
        onFocus={() => focusWindow('safari')}
      >
        <SafariApp />
      </MacWindow>

      {/* 5. Notes Window */}
      <MacWindow
        id="notes"
        title="Notes — Resume & Experience Summary"
        icon="https://cdn.21st.dev/assets/mirror/cb/cbfa4e5db383bbb86683edc2f7d309e9fd7000d07833f6449837be51b77558fa.png"
        isOpen={windows.notes?.isOpen}
        isMinimized={windows.notes?.isMinimized}
        zIndex={windows.notes?.zIndex || 14}
        initialPosition={{ x: 220, y: 90 }}
        initialSize={{ width: 720, height: 480 }}
        onClose={() => closeWindow('notes')}
        onMinimize={() => minimizeWindow('notes')}
        onFocus={() => focusWindow('notes')}
      >
        <NotesApp />
      </MacWindow>

      {/* 6. Calculator Window */}
      <MacWindow
        id="calculator"
        title="Calculator"
        icon="https://cdn.21st.dev/assets/mirror/96/9639bd0ec3bae0b56bd8812f61c39d72123c6de272922e5bc7f3a24264112953.png"
        isOpen={windows.calculator?.isOpen}
        isMinimized={windows.calculator?.isMinimized}
        zIndex={windows.calculator?.zIndex || 15}
        initialPosition={{ x: 300, y: 120 }}
        initialSize={{ width: 260, height: 380 }}
        minWidth={240}
        minHeight={340}
        onClose={() => closeWindow('calculator')}
        onMinimize={() => minimizeWindow('calculator')}
        onFocus={() => focusWindow('calculator')}
      >
        <CalculatorApp />
      </MacWindow>

      {/* 7. Music / Spotify Window */}
      <MacWindow
        id="music"
        title="Spotify — Premil's Dev Playlist"
        icon="https://cdn.21st.dev/assets/mirror/03/035600d3c05ccbfc974888a3319fa721dac7321dd18734a5d0405af1fd259c41.png"
        isOpen={windows.music?.isOpen}
        isMinimized={windows.music?.isMinimized}
        zIndex={windows.music?.zIndex || 16}
        initialPosition={{ x: 260, y: 100 }}
        initialSize={{ width: 340, height: 480 }}
        minWidth={300}
        minHeight={420}
        onClose={() => closeWindow('music')}
        onMinimize={() => minimizeWindow('music')}
        onFocus={() => focusWindow('music')}
      >
        <MusicApp />
      </MacWindow>

      {/* 8. Mail / Contact Window */}
      <MacWindow
        id="mail"
        title="Mail — Contact Premil Patel"
        icon="https://cdn.21st.dev/assets/mirror/7b/7bb8671183d2a2bbb8a3858b1971cc5699ba0103673b011590d22f0fa309bb87.png"
        isOpen={windows.mail?.isOpen}
        isMinimized={windows.mail?.isMinimized}
        zIndex={windows.mail?.zIndex || 17}
        initialPosition={{ x: 190, y: 95 }}
        initialSize={{ width: 620, height: 490 }}
        onClose={() => closeWindow('mail')}
        onMinimize={() => minimizeWindow('mail')}
        onFocus={() => focusWindow('mail')}
      >
        <MailApp />
      </MacWindow>

      {/* "About This Mac" Modal */}
      <AboutMacModal
        isOpen={aboutMacOpen}
        onClose={() => setAboutMacOpen(false)}
        onOpenTerminal={() => openApp('terminal')}
        onOpenFinder={() => openApp('finder')}
      />

      {/* Spotlight Search Overlay */}
      {spotlightOpen && (
        <div 
          onClick={() => setSpotlightOpen(false)}
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-xs flex items-start justify-center pt-28"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-neutral-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-3 text-white animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center space-x-3 px-2 py-1">
              <span className="text-neutral-400">🔍</span>
              <input
                type="text"
                autoFocus
                placeholder="Spotlight Search (type 'projects', 'resume', 'skills', 'terminal'...)"
                value={spotlightSearch}
                onChange={(e) => setSpotlightSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = spotlightSearch.toLowerCase();
                    if (q.includes('term')) openApp('terminal');
                    else if (q.includes('photo') || q.includes('gall')) openApp('gallery');
                    else if (q.includes('safari') || q.includes('web')) openApp('safari');
                    else if (q.includes('calc')) openApp('calculator');
                    else if (q.includes('note') || q.includes('res')) openApp('notes');
                    else if (q.includes('mail') || q.includes('cont')) openApp('mail');
                    else openApp('finder');
                    setSpotlightOpen(false);
                  }
                }}
                className="w-full bg-transparent text-sm border-none outline-none text-white placeholder-neutral-400"
              />
            </div>

            <div className="border-t border-white/10 mt-2 pt-2 px-2 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Press <kbd className="bg-white/10 px-1 py-0.5 rounded text-white font-mono">Enter</kbd> to open match</span>
              <span>⌘ Space to toggle</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom macOS Dock */}
      <div className="fixed bottom-3 inset-x-0 flex items-center justify-center z-40 pointer-events-auto">
        <MacOSDock
          apps={DOCK_APPS}
          onAppClick={(id) => openApp(id)}
          openApps={openAppIds}
        />
      </div>
    </main>
  );
}
