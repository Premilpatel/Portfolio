'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Wifi, 
  Battery, 
  Search, 
  Sliders, 
  Volume2, 
  Check, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

interface MenuItemOption {
  label?: string;
  action?: string;
  shortcut?: string;
  type?: 'item' | 'separator';
  hasSubmenu?: boolean;
}

interface MenuConfig {
  label: string;
  items: MenuItemOption[];
}

interface MacOSMenuBarProps {
  appName?: string;
  onMenuAction?: (action: string) => void;
  className?: string;
}

export const MacOSMenuBar: React.FC<MacOSMenuBarProps> = ({
  appName = 'Finder',
  onMenuAction,
  className = ''
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [brightness, setBrightness] = useState(90);
  const [volume, setVolume] = useState(75);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuBarRef = useRef<HTMLDivElement>(null);

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      setCurrentTime(now.toLocaleString('en-US', options).replace(/,/g, ''));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setControlCenterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const appleMenuItems: MenuItemOption[] = [
    { label: 'About This Mac', action: 'about-mac' },
    { type: 'separator' },
    { label: 'System Settings...', action: 'settings' },
    { label: 'App Store...', action: 'app-store' },
    { type: 'separator' },
    { label: 'Recent Items', action: 'recent' },
    { type: 'separator' },
    { label: 'Force Quit...', shortcut: '⌥⌘⎋', action: 'force-quit' },
    { type: 'separator' },
    { label: 'Sleep', action: 'sleep' },
    { label: 'Restart...', action: 'restart' },
    { label: 'Shut Down...', action: 'shutdown' },
    { type: 'separator' },
    { label: 'Lock Screen', shortcut: '⌃⌘Q', action: 'lock' }
  ];

  const standardMenus: Record<string, MenuItemOption[]> = {
    File: [
      { label: 'New Finder Window', shortcut: '⌘N', action: 'open-finder' },
      { label: 'New Folder', shortcut: '⇧⌘N', action: 'new-folder' },
      { type: 'separator' },
      { label: 'Open Resume', shortcut: '⌘O', action: 'open-resume' },
      { label: 'Close Window', shortcut: '⌘W', action: 'close-active-window' }
    ],
    Edit: [
      { label: 'Undo', shortcut: '⌘Z', action: 'undo' },
      { label: 'Redo', shortcut: '⇧⌘Z', action: 'redo' },
      { type: 'separator' },
      { label: 'Cut', shortcut: '⌘X', action: 'cut' },
      { label: 'Copy', shortcut: '⌘C', action: 'copy' },
      { label: 'Paste', shortcut: '⌘V', action: 'paste' },
      { label: 'Select All', shortcut: '⌘A', action: 'select-all' }
    ],
    View: [
      { label: 'as Icons', shortcut: '⌘1', action: 'view-icons' },
      { label: 'as List', shortcut: '⌘2', action: 'view-list' },
      { label: 'as Columns', shortcut: '⌘3', action: 'view-columns' },
      { type: 'separator' },
      { label: 'Clean Up', action: 'clean-up' },
      { label: 'Toggle Fullscreen', shortcut: '⌃⌘F', action: 'toggle-fullscreen' }
    ],
    Go: [
      { label: 'Back', shortcut: '⌘[', action: 'go-back' },
      { label: 'Forward', shortcut: '⌘]', action: 'go-forward' },
      { type: 'separator' },
      { label: 'Projects', shortcut: '⇧⌘P', action: 'open-projects' },
      { label: 'Resume', shortcut: '⇧⌘R', action: 'open-resume' },
      { label: 'Gallery', shortcut: '⇧⌘G', action: 'open-gallery' },
      { label: 'Notes', shortcut: '⇧⌘N', action: 'open-guide' }
    ],
    Window: [
      { label: 'Minimize', shortcut: '⌘M', action: 'minimize-window' },
      { label: 'Zoom', action: 'zoom-window' },
      { type: 'separator' },
      { label: 'Bring All to Front', action: 'bring-all-front' }
    ],
    Help: [
      { label: 'Portfolio Guide', action: 'open-guide' },
      { label: 'Contact Premil', action: 'open-mail' },
      { label: 'GitHub Profile', action: 'open-github' }
    ]
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    setControlCenterOpen(false);
  };

  const handleItemClick = (action?: string) => {
    if (action && onMenuAction) {
      onMenuAction(action);
    }
    setActiveMenu(null);
  };

  return (
    <header 
      ref={menuBarRef}
      className={`fixed top-0 left-0 right-0 h-7 z-50 flex items-center justify-between px-3 text-xs text-white/90 select-none backdrop-blur-2xl bg-black/35 border-b border-white/10 shadow-sm ${className}`}
    >
      {/* Left Menu Section */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Apple Logo Dropdown */}
        <div className="relative">
          <button 
            onClick={() => handleMenuClick('apple')}
            className={`px-2 py-0.5 rounded transition-colors ${activeMenu === 'apple' ? 'bg-white/20' : 'hover:bg-white/15'}`}
            title="Apple"
          >
            <span className="text-sm font-semibold"></span>
          </button>

          {activeMenu === 'apple' && (
            <div className="absolute top-7 left-0 w-56 py-1 bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-lg shadow-2xl text-neutral-200 z-50">
              {appleMenuItems.map((item, idx) => {
                if (item.type === 'separator') {
                  return <div key={idx} className="my-1 border-t border-white/10" />;
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleItemClick(item.action)}
                    className="w-full px-3 py-1 text-left flex items-center justify-between hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.shortcut && <span className="text-neutral-400 text-[11px]">{item.shortcut}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Current Active App Name */}
        <span className="font-semibold px-2 py-0.5 rounded text-white tracking-wide">
          {appName}
        </span>

        {/* Menus */}
        {Object.keys(standardMenus).map((menuKey) => (
          <div key={menuKey} className="relative hidden md:block">
            <button
              onClick={() => handleMenuClick(menuKey)}
              className={`px-2 py-0.5 rounded transition-colors ${activeMenu === menuKey ? 'bg-white/20' : 'hover:bg-white/15'}`}
            >
              {menuKey}
            </button>

            {activeMenu === menuKey && (
              <div className="absolute top-7 left-0 w-52 py-1 bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-lg shadow-2xl text-neutral-200 z-50">
                {standardMenus[menuKey].map((item, idx) => {
                  if (item.type === 'separator') {
                    return <div key={idx} className="my-1 border-t border-white/10" />;
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleItemClick(item.action)}
                      className="w-full px-3 py-1 text-left flex items-center justify-between hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.shortcut && <span className="text-neutral-400 text-[11px]">{item.shortcut}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right System Status Tray */}
      <div className="flex items-center space-x-2.5 sm:space-x-3.5 pr-1">
        {/* Spotlight Search */}
        <button 
          onClick={() => onMenuAction && onMenuAction('spotlight')}
          className="p-1 hover:bg-white/15 rounded transition-colors"
          title="Spotlight Search"
        >
          <Search className="w-3.5 h-3.5 text-white/80" />
        </button>

        {/* Wi-Fi Indicator */}
        <button 
          onClick={() => setControlCenterOpen(!controlCenterOpen)}
          className="p-1 hover:bg-white/15 rounded transition-colors"
          title="Wi-Fi"
        >
          <Wifi className="w-3.5 h-3.5 text-white/80" />
        </button>

        {/* Battery */}
        <div className="flex items-center space-x-1 text-[11px] text-white/80">
          <span>98%</span>
          <Battery className="w-4 h-4 text-white/80" />
        </div>

        {/* Control Center */}
        <div className="relative">
          <button 
            onClick={() => {
              setControlCenterOpen(!controlCenterOpen);
              setActiveMenu(null);
            }}
            className={`p-1 rounded transition-colors ${controlCenterOpen ? 'bg-white/20' : 'hover:bg-white/15'}`}
            title="Control Center"
          >
            <Sliders className="w-3.5 h-3.5 text-white/80" />
          </button>

          {/* Control Center Panel */}
          {controlCenterOpen && (
            <div className="absolute right-0 top-7 w-72 p-3 bg-neutral-900/90 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl text-neutral-100 z-50 flex flex-col space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div 
                  onClick={() => setWifiEnabled(!wifiEnabled)}
                  className={`p-2.5 rounded-xl flex items-center space-x-2.5 cursor-pointer transition-colors ${wifiEnabled ? 'bg-blue-600 text-white' : 'bg-white/10 text-neutral-300'}`}
                >
                  <Wifi className="w-4 h-4" />
                  <div className="text-[11px]">
                    <div className="font-semibold">Wi-Fi</div>
                    <div className="opacity-80 text-[10px]">{wifiEnabled ? 'Connected' : 'Off'}</div>
                  </div>
                </div>

                <div 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2.5 rounded-xl flex items-center space-x-2.5 cursor-pointer transition-colors ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-white/10 text-neutral-300'}`}
                >
                  {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <div className="text-[11px]">
                    <div className="font-semibold">Theme</div>
                    <div className="opacity-80 text-[10px]">{isDarkMode ? 'Dark' : 'Light'}</div>
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="p-2.5 bg-white/10 rounded-xl space-y-2">
                <div className="text-[11px] font-medium text-neutral-300 flex items-center justify-between">
                  <span>Display</span>
                  <Sun className="w-3.5 h-3.5" />
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-2.5 bg-white/10 rounded-xl space-y-2">
                <div className="text-[11px] font-medium text-neutral-300 flex items-center justify-between">
                  <span>Sound</span>
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Live Date and Time */}
        <span className="font-medium tracking-tight cursor-default text-white">
          {currentTime || 'Sunday Oct 23 1:13 PM'}
        </span>
      </div>
    </header>
  );
};

export default MacOSMenuBar;
