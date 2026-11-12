'use client';

import React, { useState } from 'react';
import { 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft, 
  Grid, 
  List, 
  Search, 
  Info, 
  Download,
  FolderOpen,
  Link as LinkIcon
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'image' | 'code' | 'link';
  kind: string;
  size: string;
  fullSize?: string;
  date: string;
  createdDate?: string;
  modifiedDate?: string;
  lastOpened?: string;
  whereLocation?: string;
  folder?: string;
  pages?: string;
  author?: string;
  url?: string;
}

const INITIAL_FILES: FileItem[] = [
  // Root Folders & Files
  { 
    id: 'f-projects', 
    name: 'Projects', 
    type: 'folder', 
    kind: 'Folder',
    size: '4 items',
    fullSize: '16 KB on disk for 4 items',
    date: 'Oct 23, 2026', 
    createdDate: 'October 15, 2026 at 10:14 AM',
    modifiedDate: 'October 23, 2026 at 1:13 PM',
    lastOpened: 'Today at 1:13 PM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil',
    folder: 'root' 
  },
  { 
    id: 'doc-resume', 
    name: 'Premil_Patel_Resume.pdf', 
    type: 'pdf', 
    kind: 'Portable Document Format (PDF)',
    size: '182 KB', 
    fullSize: '181,854 bytes (182 KB on disk)',
    date: 'Oct 2026', 
    createdDate: 'October 20, 2026 at 3:42 PM',
    modifiedDate: 'October 23, 2026 at 1:13 PM',
    lastOpened: 'Today at 1:13 PM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil',
    pages: '1 page (8.5 × 11 in)',
    author: 'Premil Patel',
    folder: 'root'
  },
  { 
    id: 'doc-about', 
    name: 'About_Premil.txt', 
    type: 'doc', 
    kind: 'Plain Text Document',
    size: '1.8 KB', 
    fullSize: '1,842 bytes (4 KB on disk)',
    date: 'Oct 2026', 
    createdDate: 'October 20, 2026 at 8:30 AM',
    modifiedDate: 'October 23, 2026 at 1:13 PM',
    lastOpened: 'Today at 1:13 PM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil',
    author: 'Premil Patel',
    folder: 'root'
  },

  // Project Links inside "Projects" (using folder link icon)
  { 
    id: 'proj-homelab-notion', 
    name: 'Detection-Monitoring-Homelab-Writeup', 
    type: 'link', 
    kind: 'Folder Link (Notion Writeup)',
    size: '4 KB', 
    fullSize: '4,096 bytes (4 KB on disk)',
    date: 'Oct 2026', 
    createdDate: 'October 18, 2026 at 11:20 AM',
    modifiedDate: 'October 23, 2026 at 1:13 PM',
    lastOpened: 'Today at 1:13 PM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Projects',
    author: 'Premil Patel',
    folder: 'Projects',
    url: 'https://app.notion.com/p/Detection-Monitoring-Homelab-Writeup-2f8ee3aaf9948016a8f1fcdd386f39f2'
  },
  { 
    id: 'proj-network-gdrive', 
    name: 'Network-Security-Architecture-Report', 
    type: 'link', 
    kind: 'Folder Link (Google Drive)',
    size: '4 KB', 
    fullSize: '4,096 bytes (4 KB on disk)',
    date: 'Sep 2026', 
    createdDate: 'September 28, 2026 at 4:10 PM',
    modifiedDate: 'October 19, 2026 at 2:00 PM',
    lastOpened: 'October 22, 2026 at 5:00 PM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Projects',
    author: 'Premil Patel',
    folder: 'Projects',
    url: 'https://drive.google.com/file/d/13I3Wrc7NriuGnpLBPH73tM6UrJ9xlRn7/view'
  },
  { 
    id: 'proj-threat-pipeline', 
    name: 'Threat-Intelligence-Pipeline', 
    type: 'link', 
    kind: 'Folder Link (GitHub Repo)',
    size: '4 KB', 
    fullSize: '4,096 bytes (4 KB on disk)',
    date: 'Aug 2026', 
    createdDate: 'August 12, 2026 at 2:15 PM',
    modifiedDate: 'October 20, 2026 at 4:30 PM',
    lastOpened: 'October 23, 2026 at 11:00 AM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Projects',
    author: 'Premil Patel (Relativity IR)',
    folder: 'Projects',
    url: 'https://github.com/Premilpatel'
  },
  { 
    id: 'proj-portfolio', 
    name: 'macOS-Portfolio-Website', 
    type: 'link', 
    kind: 'Folder Link (GitHub Repo)',
    size: '4 KB', 
    fullSize: '4,096 bytes (4 KB on disk)',
    date: 'Oct 2026', 
    createdDate: 'October 20, 2026 at 9:00 AM',
    modifiedDate: 'October 23, 2026 at 1:13 PM',
    lastOpened: 'Today at 1:13 PM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Projects',
    author: 'Premil Patel',
    folder: 'Projects',
    url: 'https://github.com/Premilpatel/Portfolio'
  }
];

export const FinderApp: React.FC<{
  onOpenFile?: (file: FileItem) => void;
  initialFolder?: string;
}> = ({ onOpenFile, initialFolder = 'root' }) => {
  const [currentFolder, setCurrentFolder] = useState<string>(initialFolder);
  const [history, setHistory] = useState<string[]>([initialFolder]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [viewMode, setViewMode] = useState<'icons' | 'list'>('icons');
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (folder: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folder);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFolder(folder);
    setSelectedFile(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentFolder(history[historyIndex - 1]);
      setSelectedFile(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentFolder(history[historyIndex + 1]);
      setSelectedFile(null);
    }
  };

  const currentFiles = INITIAL_FILES.filter(file => {
    if (searchQuery.trim()) {
      return file.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return file.folder === currentFolder;
  });

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateTo(item.name);
    } else if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank');
    } else {
      if (onOpenFile) {
        onOpenFile(item);
      } else {
        setSelectedFile(item);
      }
    }
  };

  return (
    <div className="flex h-full w-full bg-[#1e1e1e]/95 text-neutral-200 select-none">
      {/* Finder Left Sidebar */}
      <div className="w-52 bg-[#181818]/90 border-r border-white/10 p-3 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-2 mb-1.5">
              Favorites
            </div>
            <div className="space-y-0.5 text-xs">
              <button
                onClick={() => navigateTo('root')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'root' ? 'bg-blue-600 text-white font-medium' : 'text-neutral-300 hover:bg-white/10'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/mac-folder-blue.png" alt="Home" className="w-4 h-4 object-contain" />
                <span>premil</span>
              </button>

              <button
                onClick={() => navigateTo('Projects')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'Projects' ? 'bg-blue-600 text-white font-medium' : 'text-neutral-300 hover:bg-white/10'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/projects-folder.png" alt="Projects" className="w-4 h-4 object-contain" />
                <span>Projects</span>
              </button>

              <button
                onClick={() => {
                  const resumeFile = INITIAL_FILES.find(f => f.id === 'doc-resume');
                  if (resumeFile && onOpenFile) {
                    onOpenFile(resumeFile);
                  } else {
                    navigateTo('root');
                    setSelectedFile(resumeFile || null);
                  }
                }}
                className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-neutral-300 hover:bg-white/10 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/mac-pdf.png" alt="Resume" className="w-4 h-4 object-contain" />
                <span>Resume (PDF)</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-2 mb-1.5">
              Locations
            </div>
            <div className="space-y-0.5 text-xs">
              <button 
                onClick={() => navigateTo('root')}
                className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-neutral-400 hover:bg-white/10 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/mac-folder-gray.png" alt="Macintosh HD" className="w-4 h-4 object-contain opacity-80" />
                <span>Macintosh HD</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-2 mb-1.5">
              Links
            </div>
            <div className="space-y-0.5 text-xs">
              <a
                href="https://github.com/Premilpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-neutral-300 hover:bg-white/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>GitHub Profile</span>
              </a>

              <a
                href="https://app.notion.com/p/Detection-Monitoring-Homelab-Writeup-2f8ee3aaf9948016a8f1fcdd386f39f2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-neutral-300 hover:bg-white/10 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/notion.png" alt="Notion" className="w-4 h-4 object-contain rounded-sm" />
                <span>Notion Writeup</span>
              </a>

              <a
                href="https://drive.google.com/file/d/13I3Wrc7NriuGnpLBPH73tM6UrJ9xlRn7/view"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-neutral-300 hover:bg-white/10 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/gdrive.png" alt="Google Drive" className="w-4 h-4 object-contain" />
                <span>Google Drive</span>
              </a>

              <a
                href="https://www.linkedin.com/in/premilpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-neutral-300 hover:bg-white/10 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4 object-contain rounded-sm" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact info card at bottom of sidebar */}
        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[11px] text-neutral-300 space-y-1">
          <div className="font-semibold text-white">Premil Patel</div>
          <div className="text-neutral-400 text-[10px] truncate">patelpremil70@gmail.com</div>
          <div className="text-neutral-400 text-[10px]">224-477-3511</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Finder Toolbar */}
        <div className="h-11 border-b border-white/10 px-4 flex items-center justify-between bg-neutral-900/60 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            {/* Back / Forward */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={goBack} 
                disabled={historyIndex === 0}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Go Back"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={goForward} 
                disabled={historyIndex >= history.length - 1}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Go Forward"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Folder Name Breadcrumb */}
            <div className="flex items-center space-x-1.5 text-xs text-neutral-300">
              <span className="text-neutral-500">Macintosh HD</span>
              <span className="text-neutral-500">▸</span>
              <span className="text-neutral-500">Users</span>
              <span className="text-neutral-500">▸</span>
              <span className="font-semibold text-white">
                {currentFolder === 'root' ? 'premil' : currentFolder}
              </span>
            </div>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('icons')}
                className={`p-1 rounded ${viewMode === 'icons' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'}`}
                title="Icons View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-3 h-3 text-neutral-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 focus:w-44 transition-all h-7 bg-white/10 rounded-md pl-7 pr-2 text-xs text-white placeholder-neutral-400 outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* File Grid / List View */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto">
            {currentFiles.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/mac-folder-blue.png" alt="Empty" className="w-16 h-16 opacity-40 mb-2 object-contain" />
                <span>This folder is empty</span>
              </div>
            ) : viewMode === 'icons' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {currentFiles.map((file) => {
                  const isSelected = selectedFile?.id === file.id;
                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      onDoubleClick={() => handleItemDoubleClick(file)}
                      className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-colors group ${isSelected ? 'bg-blue-600/40 border border-blue-500/60' : 'hover:bg-white/10 border border-transparent'}`}
                    >
                      {/* Authentic Icon rendering */}
                      <div className="w-16 h-16 flex items-center justify-center mb-1">
                        {file.type === 'link' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src="/icons/folder-link.png" 
                            alt="Folder Link" 
                            className="w-14 h-14 object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
                          />
                        ) : file.type === 'folder' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={file.name === 'Projects' ? '/icons/projects-folder.png' : '/icons/mac-folder-blue.png'} 
                            alt="Folder" 
                            className="w-14 h-14 object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
                          />
                        ) : file.type === 'pdf' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src="/icons/mac-pdf.png" 
                            alt="PDF" 
                            className="w-12 h-14 object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src="/icons/mac-pdf.png" 
                            alt="File" 
                            className="w-12 h-14 object-contain drop-shadow-md opacity-90 group-hover:scale-105 transition-transform" 
                          />
                        )}
                      </div>

                      {/* Label */}
                      <span className={`text-xs text-center line-clamp-2 break-all px-1.5 py-0.5 rounded ${isSelected ? 'bg-blue-600 text-white font-medium' : 'text-neutral-200'}`}>
                        {file.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List Mode */
              <div className="w-full text-xs">
                <div className="grid grid-cols-12 pb-2 border-b border-white/10 text-neutral-400 font-medium px-2">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-3">Date Modified</div>
                  <div className="col-span-3 text-right">Size</div>
                </div>
                <div className="divide-y divide-white/5">
                  {currentFiles.map((file) => {
                    const isSelected = selectedFile?.id === file.id;
                    return (
                      <div
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        onDoubleClick={() => handleItemDoubleClick(file)}
                        className={`grid grid-cols-12 py-1.5 px-2 cursor-pointer items-center transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-white/10'}`}
                      >
                        <div className="col-span-6 flex items-center space-x-2 truncate">
                          {file.type === 'link' ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/icons/folder-link.png" alt="Link" className="w-4 h-4 object-contain shrink-0" />
                          ) : file.type === 'folder' ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/icons/mac-folder-blue.png" alt="Folder" className="w-4 h-4 object-contain shrink-0" />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/icons/mac-pdf.png" alt="File" className="w-4 h-4 object-contain shrink-0" />
                          )}
                          <span className="truncate">{file.name}</span>
                        </div>
                        <div className="col-span-3 text-neutral-400">{file.date}</div>
                        <div className="col-span-3 text-right text-neutral-400">{file.size || '--'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Authentic macOS Metadata Preview Inspector Pane */}
          {selectedFile && (
            <div className="w-72 border-l border-white/10 bg-[#161616]/95 flex flex-col justify-between overflow-y-auto select-text">
              <div className="p-4 space-y-4">
                {/* Header with Large Icon & File Name */}
                <div className="flex flex-col items-center text-center pb-3 border-b border-white/10">
                  <div className="w-20 h-20 flex items-center justify-center mb-2">
                    {selectedFile.type === 'link' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src="/icons/folder-link.png" 
                        alt="Folder Link" 
                        className="w-18 h-18 object-contain drop-shadow-lg" 
                      />
                    ) : selectedFile.type === 'folder' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={selectedFile.name === 'Projects' ? '/icons/projects-folder.png' : '/icons/mac-folder-blue.png'} 
                        alt="Folder" 
                        className="w-18 h-18 object-contain drop-shadow-lg" 
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src="/icons/mac-pdf.png" 
                        alt="PDF" 
                        className="w-16 h-18 object-contain drop-shadow-lg" 
                      />
                    )}
                  </div>
                  <div className="font-semibold text-xs text-white break-all leading-tight">{selectedFile.name}</div>
                  <div className="text-[11px] text-neutral-400 mt-1">{selectedFile.kind}</div>
                </div>

                {/* Structured Metadata Inspector */}
                <div className="space-y-3 text-[11px]">
                  <div>
                    <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 flex items-center space-x-1">
                      <Info className="w-3 h-3 text-blue-400" />
                      <span>General</span>
                    </div>
                    <div className="space-y-1.5 bg-white/5 rounded-lg p-2.5 border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Kind:</span>
                        <span className="text-neutral-200 text-right font-medium truncate max-w-[150px]">{selectedFile.kind}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Size:</span>
                        <span className="text-neutral-200 text-right">{selectedFile.fullSize || selectedFile.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Where:</span>
                        <span className="text-neutral-200 text-right truncate max-w-[150px]">{selectedFile.whereLocation || 'Macintosh HD'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Created:</span>
                        <span className="text-neutral-200 text-right">{selectedFile.createdDate || selectedFile.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Modified:</span>
                        <span className="text-neutral-200 text-right">{selectedFile.modifiedDate || selectedFile.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Last opened:</span>
                        <span className="text-neutral-200 text-right">{selectedFile.lastOpened || 'Today'}</span>
                      </div>
                    </div>
                  </div>

                  {/* More Info */}
                  <div>
                    <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5">
                      More Info
                    </div>
                    <div className="space-y-1.5 bg-white/5 rounded-lg p-2.5 border border-white/5">
                      {selectedFile.url && (
                        <div className="flex flex-col space-y-1">
                          <span className="text-neutral-400">Target URL:</span>
                          <span className="text-blue-400 break-all text-[10px] hover:underline cursor-pointer" onClick={() => window.open(selectedFile.url, '_blank')}>
                            {selectedFile.url}
                          </span>
                        </div>
                      )}
                      {selectedFile.pages && (
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Pages:</span>
                          <span className="text-neutral-200 font-medium">{selectedFile.pages}</span>
                        </div>
                      )}
                      {selectedFile.author && (
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Author:</span>
                          <span className="text-neutral-200 font-medium">{selectedFile.author}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Security:</span>
                        <span className="text-emerald-400 font-medium">Verified Link</span>
                      </div>
                    </div>
                  </div>

                  {/* Sharing & Permissions */}
                  <div>
                    <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5">
                      Sharing & Permissions
                    </div>
                    <div className="space-y-1 bg-white/5 rounded-lg p-2.5 border border-white/5 text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-neutral-300">premil (Me)</span>
                        <span className="text-neutral-400">Read & Write</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-300">staff</span>
                        <span className="text-neutral-400">Read only</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-300">everyone</span>
                        <span className="text-neutral-400">Read only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons at bottom of Inspector */}
              <div className="p-4 border-t border-white/10 space-y-2 bg-neutral-900/60">
                {selectedFile.type === 'folder' ? (
                  <button
                    onClick={() => navigateTo(selectedFile.name)}
                    className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Open Folder</span>
                  </button>
                ) : selectedFile.type === 'link' ? (
                  <a
                    href={selectedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Open Link</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>
                ) : selectedFile.type === 'pdf' ? (
                  <div className="space-y-1.5">
                    <button
                      onClick={() => onOpenFile && onOpenFile(selectedFile)}
                      className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                    >
                      <span>Open in Resume Viewer</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href="/Premil_Patel_Resume.pdf"
                      download="Premil_Patel_Resume.pdf"
                      className="w-full py-1.5 px-3 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors border border-white/10"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {selectedFile.url && (
                      <a
                        href={selectedFile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors border border-white/10"
                      >
                        <span>View on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="h-6 border-t border-white/10 px-3 flex items-center justify-between text-[11px] text-neutral-400 bg-[#161616]">
          <span>{currentFiles.length} items</span>
          <span>Premil's MacBook Pro</span>
        </div>
      </div>
    </div>
  );
};

export default FinderApp;
