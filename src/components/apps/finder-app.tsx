'use client';

import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  Code2, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft, 
  Grid, 
  List, 
  Search, 
  ShieldCheck,
  Server,
  Terminal,
  Download
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'image' | 'code' | 'link';
  size?: string;
  date: string;
  folder?: string;
  content?: string;
  url?: string;
}

const INITIAL_FILES: FileItem[] = [
  // Root Folders & Files
  { id: 'f-projects', name: 'Projects', type: 'folder', date: 'Oct 23, 2026', folder: 'root' },
  { 
    id: 'doc-resume', 
    name: 'Premil_Patel_Resume.pdf', 
    type: 'pdf', 
    size: '142 KB', 
    date: 'Oct 2026', 
    folder: 'root',
    content: `Premil Patel - Cybersecurity & Software Engineering\nDePaul University (GPA: 4.0/4.0)\n\nExperience:\n• Relativity — Security Engineer Intern (Detection & IR)\n• ComEd — Data Engineer Intern\n• Seva App — Technical Project Manager Intern\n\nContact: patelpremil70@gmail.com | 224-477-3511`
  },
  { 
    id: 'doc-about', 
    name: 'About_Premil.txt', 
    type: 'doc', 
    size: '1.8 KB', 
    date: 'Oct 2026', 
    folder: 'root',
    content: `Premil Patel\nCybersecurity & Software Engineering Student @ DePaul University\n\nExperienced in threat detection pipelines (WIZ, ThreatStream, Sentinel, Sigma rules), enterprise homelabs, data engineering (SQL, Microsoft Fabric, Power BI), and modern web technologies.`
  },

  // Files inside "Projects"
  { 
    id: 'proj-homelab', 
    name: 'Blue_Team_Detection_Homelab.md', 
    type: 'doc', 
    size: '34 KB', 
    date: 'Oct 2026', 
    folder: 'Projects',
    content: `Blue Team Operations & Detection Homelab\n\n• Provisioned & configured virtual machines (Windows, Linux, Domain Controller, Security Server) using VirtualBox to analyze attacker techniques and defensive tooling.\n• Simulated credential brute-forcing & reverse-shell payloads against Active Directory to author Wazuh detection alerts.`,
    url: 'https://github.com/Premilpatel'
  },
  { 
    id: 'proj-network', 
    name: 'Network_Security_Architecture.md', 
    type: 'doc', 
    size: '22 KB', 
    date: 'Sep 2026', 
    folder: 'Projects',
    content: `Network Security Architecture & Design\n\n• Designed and implemented a Dual-Path Dual-Layer firewall architecture with segmented DMZ and Intranet networks.\n• Configured NAT/PAT, static routing, and firewall rules to secure public-facing services while isolating internal systems.`
  },
  { 
    id: 'proj-threat-pipeline', 
    name: 'Threat_Intelligence_Pipeline.py', 
    type: 'code', 
    size: '48 KB', 
    date: 'Aug 2026', 
    folder: 'Projects',
    content: `Threat Intelligence Pipeline (Relativity Detection & IR)\n\n• Ingests ~2,000 IOCs/articles daily from WIZ Graph API & ThreatStream API.\n• Filters against threat models and vulnerability data, surfacing ranked findings to Slack.`
  },
  { 
    id: 'proj-portfolio', 
    name: 'macOS_Portfolio_Website.tsx', 
    type: 'code', 
    size: '28 KB', 
    date: 'Oct 2026', 
    folder: 'Projects',
    content: `Interactive macOS Yosemite Portfolio\n\n• Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn styling.\n• Authentic cosine magnification dock, draggable window manager, functional Finder, and realistic Apple apps.`,
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
    } else {
      if (onOpenFile) {
        onOpenFile(item);
      } else {
        setSelectedFile(item);
      }
    }
  };

  return (
    <div className="flex h-full w-full bg-neutral-900/90 text-neutral-200 select-none">
      {/* Finder Left Sidebar */}
      <div className="w-48 bg-neutral-950/60 border-r border-white/10 p-3 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-2 mb-1.5">
              Favorites
            </div>
            <div className="space-y-0.5 text-xs">
              <button
                onClick={() => navigateTo('root')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'root' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
              >
                <Folder className="w-3.5 h-3.5 text-blue-400" />
                <span>All Files</span>
              </button>

              <button
                onClick={() => navigateTo('Projects')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'Projects' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
              >
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Projects</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-2 mb-1.5">
              Quick Links
            </div>
            <div className="space-y-1 text-xs">
              <a 
                href="https://github.com/Premilpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-neutral-300 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-neutral-300" />
                <span>GitHub Profile</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/premilpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-neutral-300 transition-colors"
              >
                <span className="w-3.5 h-3.5 bg-blue-600 text-[10px] font-bold rounded flex items-center justify-center text-white">in</span>
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
        <div className="h-11 border-b border-white/10 px-4 flex items-center justify-between bg-neutral-900/40">
          <div className="flex items-center space-x-3">
            {/* Back / Forward */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={goBack} 
                disabled={historyIndex === 0}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={goForward} 
                disabled={historyIndex >= history.length - 1}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Folder Name Breadcrumb */}
            <span className="text-xs font-semibold text-white">
              {currentFolder === 'root' ? 'Macintosh HD / Users / premil' : `Macintosh HD / Users / premil / ${currentFolder}`}
            </span>
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
                <Folder className="w-10 h-10 mb-2 stroke-1" />
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
                      {/* Icon */}
                      <div className="w-14 h-14 flex items-center justify-center mb-1">
                        {file.type === 'folder' && (
                          <Folder className="w-12 h-12 text-[#3dabf5] fill-[#3dabf5]/40" />
                        )}
                        {file.type === 'pdf' && (
                          <div className="w-10 h-12 rounded bg-red-600/20 border border-red-500/40 flex flex-col items-center justify-center text-[9px] font-bold text-red-300 shadow">
                            <FileText className="w-5 h-5 text-red-400 mb-0.5" />
                            PDF
                          </div>
                        )}
                        {file.type === 'code' && (
                          <div className="w-10 h-12 rounded bg-purple-600/20 border border-purple-500/40 flex flex-col items-center justify-center text-[9px] font-bold text-purple-300 shadow">
                            <Code2 className="w-5 h-5 text-purple-400 mb-0.5" />
                            CODE
                          </div>
                        )}
                        {file.type === 'doc' && (
                          <div className="w-10 h-12 rounded bg-sky-600/20 border border-sky-500/40 flex flex-col items-center justify-center text-[9px] font-bold text-sky-300 shadow">
                            <FileText className="w-5 h-5 text-sky-400 mb-0.5" />
                            DOC
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      <span className="text-xs text-center text-neutral-200 line-clamp-2 break-all px-1">
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
                          {file.type === 'folder' ? (
                            <Folder className="w-4 h-4 text-[#3dabf5] shrink-0" />
                          ) : (
                            <FileText className="w-4 h-4 text-neutral-400 shrink-0" />
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

          {/* Quick Preview Inspector on the Right */}
          {selectedFile && selectedFile.type !== 'folder' && (
            <div className="w-64 border-l border-white/10 p-4 bg-neutral-950/40 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center p-3 border-b border-white/10">
                  <FileText className="w-12 h-12 text-blue-400 mb-2" />
                  <div className="font-semibold text-xs text-white break-all">{selectedFile.name}</div>
                  <div className="text-[11px] text-neutral-400 mt-1">{selectedFile.size} • {selectedFile.date}</div>
                </div>

                {selectedFile.content && (
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">Preview</div>
                    <div className="text-xs text-neutral-300 bg-white/5 p-2.5 rounded-lg border border-white/10 whitespace-pre-wrap max-h-48 overflow-y-auto font-mono text-[11px] leading-relaxed">
                      {selectedFile.content}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4">
                {selectedFile.type === 'pdf' && (
                  <button
                    onClick={() => onOpenFile && onOpenFile(selectedFile)}
                    className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>Open Full Resume</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}

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
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="h-6 border-t border-white/10 px-3 flex items-center justify-between text-[11px] text-neutral-400 bg-neutral-950/40">
          <span>{currentFiles.length} items</span>
          <span>Premil's MacBook Pro</span>
        </div>
      </div>
    </div>
  );
};

export default FinderApp;
