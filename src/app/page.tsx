'use client';

import React, { useState, useEffect } from 'react';
import MacOSMenuBar from '@/components/ui/mac-os-menu-bar';
import MacOSDock, { type DockApp } from '@/components/ui/mac-os-dock';
import DesktopIcons from '@/components/desktop/desktop-icons';
import MacWindow from '@/components/desktop/mac-window';

// Apps
import FinderApp from '@/components/apps/finder-app';
import GalleryApp from '@/components/apps/gallery-app';
import SafariApp from '@/components/apps/safari-app';
import NotesApp from '@/components/apps/notes-app';
import MailApp from '@/components/apps/mail-app';
import ResumeViewer from '@/components/apps/resume-viewer';
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
    id: 'projects',
    name: 'Projects',
    icon: '/icons/projects-folder.png'
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: '/icons/mac-pdf.png'
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
    id: 'notion',
    name: 'Notion',
    icon: '/icons/notion.png'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/icons/linkedin.png'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: '/icons/gmail.png'
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    icon: '/icons/gdrive.png'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
  }
];

export default function Home() {
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    finder: { id: 'finder', isOpen: true, isMinimized: false, zIndex: 10 },
    resume: { id: 'resume', isOpen: false, isMinimized: false, zIndex: 11 },
    gallery: { id: 'gallery', isOpen: false, isMinimized: false, zIndex: 12 },
    safari: { id: 'safari', isOpen: false, isMinimized: false, zIndex: 13 },
    notes: { id: 'notes', isOpen: false, isMinimized: false, zIndex: 14 },
    mail: { id: 'mail', isOpen: false, isMinimized: false, zIndex: 15 },
    gdrive: { id: 'gdrive', isOpen: false, isMinimized: false, zIndex: 16 },
  });

  const [topZIndex, setTopZIndex] = useState(25);
  const [activeAppName, setActiveAppName] = useState<string>('Finder');
  const [finderFolder, setFinderFolder] = useState<string>('root');
  const [aboutMacOpen, setAboutMacOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightSearch, setSpotlightSearch] = useState('');

  // Brightness and Theme state
  const [brightness, setBrightness] = useState<number>(100);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

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
      resume: 'Resume Viewer',
      gallery: 'Photos',
      safari: 'Safari',
      notes: 'Notes',
      mail: 'Gmail',
      gdrive: 'Google Drive'
    };
    if (appTitles[appId]) {
      setActiveAppName(appTitles[appId]);
    }
  };

  // Open / Toggle App
  const openApp = (appId: string) => {
    if (appId === 'photos') appId = 'gallery';
    if (appId === 'gmail') appId = 'mail';
    
    // Direct link triggers
    if (appId === 'github') {
      window.open('https://github.com/Premilpatel', '_blank');
      return;
    }
    if (appId === 'linkedin') {
      window.open('https://www.linkedin.com/in/premilpatel', '_blank');
      return;
    }
    if (appId === 'notion') {
      openApp('notes');
      return;
    }
    if (appId === 'projects') {
      setFinderFolder('Projects');
      openApp('finder');
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
      case 'open-resume':
        openApp('resume');
        break;
      case 'open-projects':
        openApp('projects');
        break;
      case 'open-mail':
        openApp('mail');
        break;
      case 'open-github':
        window.open('https://github.com/Premilpatel', '_blank');
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
      className="relative w-screen h-screen overflow-hidden select-none transition-all duration-300"
      style={{
        backgroundImage: `url('/yosemite.jpg'), url('/yosemite_sunset.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: brightness < 100 ? `brightness(${brightness}%)` : undefined
      }}
    >
      {/* Dim / Theme Tint overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isDarkMode ? 'bg-black/15' : 'bg-white/10'
        }`} 
      />

      {/* Top macOS Menu Bar */}
      <MacOSMenuBar
        appName={activeAppName}
        onMenuAction={handleMenuAction}
        brightness={brightness}
        onBrightnessChange={setBrightness}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />

      {/* Desktop Clickable Icons */}
      <DesktopIcons
        onOpenApp={openApp}
        onOpenFolder={(folder) => {
          setFinderFolder(folder);
          openApp('finder');
        }}
        onOpenResume={() => openApp('resume')}
        isDarkMode={isDarkMode}
      />

      {/* Windows Area */}
      {/* 1. Finder Window */}
      <MacWindow
        id="finder"
        title="Finder — Premil Patel"
        icon="https://cdn.21st.dev/assets/mirror/99/9963f31f43cd77b0c28981ba7bac04db749a5749019f554d1afb75225a3e9151.png"
        isOpen={windows.finder?.isOpen}
        isMinimized={windows.finder?.isMinimized}
        zIndex={windows.finder?.zIndex || 10}
        initialPosition={{ x: 70, y: 55 }}
        initialSize={{ width: 840, height: 530 }}
        onClose={() => closeWindow('finder')}
        onMinimize={() => minimizeWindow('finder')}
        onFocus={() => focusWindow('finder')}
        isDarkMode={isDarkMode}
      >
        <FinderApp
          initialFolder={finderFolder}
          onOpenFile={(file) => {
            if (file.type === 'pdf' || file.id === 'doc-resume') {
              openApp('resume');
            } else if (file.type === 'image') {
              openApp('gallery');
            } else {
              openApp('notes');
            }
          }}
        />
      </MacWindow>

      {/* 2. Resume Viewer Window */}
      <MacWindow
        id="resume"
        title="Premil_Patel_Resume.pdf — Preview"
        icon="/icons/resume-folder.svg"
        isOpen={windows.resume?.isOpen}
        isMinimized={windows.resume?.isMinimized}
        zIndex={windows.resume?.zIndex || 11}
        initialPosition={{ x: 120, y: 60 }}
        initialSize={{ width: 860, height: 580 }}
        onClose={() => closeWindow('resume')}
        onMinimize={() => minimizeWindow('resume')}
        onFocus={() => focusWindow('resume')}
        isDarkMode={isDarkMode}
      >
        <ResumeViewer />
      </MacWindow>

      {/* 3. Photos Window */}
      <MacWindow
        id="gallery"
        title="Photos — Gallery & Highlights"
        icon="https://cdn.21st.dev/assets/mirror/45/45c61147b702b2765802969df55878aa5f69e27abe656174339dc661d0f9a31d.png"
        isOpen={windows.gallery?.isOpen}
        isMinimized={windows.gallery?.isMinimized}
        zIndex={windows.gallery?.zIndex || 12}
        initialPosition={{ x: 140, y: 75 }}
        initialSize={{ width: 860, height: 550 }}
        onClose={() => closeWindow('gallery')}
        onMinimize={() => minimizeWindow('gallery')}
        onFocus={() => focusWindow('gallery')}
        isDarkMode={isDarkMode}
      >
        <GalleryApp />
      </MacWindow>

      {/* 4. Safari Browser Window */}
      <MacWindow
        id="safari"
        title="Safari — Premil Patel Online"
        icon="https://cdn.21st.dev/assets/mirror/d5/d558230225bb0dd1897db6c7cf0d03b29506eef8078fe25313c48cd8f72d05ad.png"
        isOpen={windows.safari?.isOpen}
        isMinimized={windows.safari?.isMinimized}
        zIndex={windows.safari?.zIndex || 13}
        initialPosition={{ x: 110, y: 65 }}
        initialSize={{ width: 850, height: 540 }}
        onClose={() => closeWindow('safari')}
        onMinimize={() => minimizeWindow('safari')}
        onFocus={() => focusWindow('safari')}
        isDarkMode={isDarkMode}
      >
        <SafariApp />
      </MacWindow>

      {/* 5. Notes Window */}
      <MacWindow
        id="notes"
        title="Notes — Premil Patel"
        icon="https://cdn.21st.dev/assets/mirror/cb/cbfa4e5db383bbb86683edc2f7d309e9fd7000d07833f6449837be51b77558fa.png"
        isOpen={windows.notes?.isOpen}
        isMinimized={windows.notes?.isMinimized}
        zIndex={windows.notes?.zIndex || 14}
        initialPosition={{ x: 190, y: 80 }}
        initialSize={{ width: 750, height: 500 }}
        onClose={() => closeWindow('notes')}
        onMinimize={() => minimizeWindow('notes')}
        onFocus={() => focusWindow('notes')}
        isDarkMode={isDarkMode}
      >
        <NotesApp />
      </MacWindow>

      {/* 6. Gmail / Contact Window */}
      <MacWindow
        id="mail"
        title="Gmail — patelpremil70@gmail.com"
        icon="/icons/gmail.png"
        isOpen={windows.mail?.isOpen}
        isMinimized={windows.mail?.isMinimized}
        zIndex={windows.mail?.zIndex || 15}
        initialPosition={{ x: 180, y: 90 }}
        initialSize={{ width: 620, height: 510 }}
        onClose={() => closeWindow('mail')}
        onMinimize={() => minimizeWindow('mail')}
        onFocus={() => focusWindow('mail')}
        isDarkMode={isDarkMode}
      >
        <MailApp />
      </MacWindow>

      {/* 7. Google Drive Window */}
      <MacWindow
        id="gdrive"
        title="Google Drive — Premil Patel"
        icon="/icons/gdrive.png"
        isOpen={windows.gdrive?.isOpen}
        isMinimized={windows.gdrive?.isMinimized}
        zIndex={windows.gdrive?.zIndex || 16}
        initialPosition={{ x: 230, y: 110 }}
        initialSize={{ width: 560, height: 380 }}
        onClose={() => closeWindow('gdrive')}
        onMinimize={() => minimizeWindow('gdrive')}
        onFocus={() => focusWindow('gdrive')}
        isDarkMode={isDarkMode}
      >
        <div className="h-full w-full bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/gdrive.png" alt="Google Drive" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Google Drive</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm">
              Cloud drive connected to <span className="text-blue-400">patelpremil70@gmail.com</span>. Folder sync is active.
            </p>
          </div>
          <button
            onClick={() => openApp('resume')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-medium text-white transition-colors"
          >
            View Premil_Patel_Resume.pdf
          </button>
        </div>
      </MacWindow>

      {/* "About This Mac" Modal */}
      <AboutMacModal
        isOpen={aboutMacOpen}
        onClose={() => setAboutMacOpen(false)}
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
                placeholder="Spotlight Search (type 'resume', 'projects', 'safari', 'notion'...)"
                value={spotlightSearch}
                onChange={(e) => setSpotlightSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = spotlightSearch.toLowerCase();
                    if (q.includes('res') || q.includes('pdf')) openApp('resume');
                    else if (q.includes('photo') || q.includes('gall')) openApp('gallery');
                    else if (q.includes('safari') || q.includes('web')) openApp('safari');
                    else if (q.includes('note') || q.includes('notion')) openApp('notes');
                    else if (q.includes('mail') || q.includes('gmail')) openApp('mail');
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
