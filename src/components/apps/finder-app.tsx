'use client';

import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Code2, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft, 
  Grid, 
  List, 
  Search, 
  Download,
  Clock,
  Sparkles,
  Award,
  Briefcase,
  User
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'image' | 'code' | 'link';
  size?: string;
  date: string;
  folder?: string;
  content?: string;
  url?: string;
  previewImage?: string;
}

const INITIAL_FILES: FileItem[] = [
  // Folders
  { id: 'f-projects', name: 'Projects', type: 'folder', date: 'Oct 23, 2026', folder: 'root' },
  { id: 'f-resume', name: 'Resume & Bio', type: 'folder', date: 'Oct 20, 2026', folder: 'root' },
  { id: 'f-skills', name: 'Skills & Tech', type: 'folder', date: 'Oct 18, 2026', folder: 'root' },
  { id: 'f-certs', name: 'Certifications', type: 'folder', date: 'Sep 15, 2026', folder: 'root' },
  { id: 'f-experience', name: 'Experience', type: 'folder', date: 'Aug 10, 2026', folder: 'root' },

  // Resume & Bio Files
  { 
    id: 'doc-resume', 
    name: 'Premil_Patel_Resume.pdf', 
    type: 'pdf', 
    size: '184 KB', 
    date: 'Oct 23, 2026', 
    folder: 'Resume & Bio',
    content: 'Full Stack Engineer & Creative Developer with expertise in React, Next.js, TypeScript, Node.js, and Modern Web UI. Passionate about crafting high-performance, polished user experiences.'
  },
  { 
    id: 'doc-cover', 
    name: 'About_Premil.txt', 
    type: 'doc', 
    size: '2.4 KB', 
    date: 'Oct 22, 2026', 
    folder: 'Resume & Bio',
    content: `Hi! I am Premil Patel.\n\nI build fast, interactive, and beautiful digital experiences. My work spans modern full-stack web applications, responsive user interfaces, and cloud architectures.\n\nKey Strengths:\n• Clean, maintainable TypeScript & React architecture\n• High fidelity UX design & micro-interactions\n• Scalable APIs, databases & full-stack implementations\n• Eager to learn, innovate, and contribute to cutting-edge products.`
  },

  // Projects Files
  { 
    id: 'proj-1', 
    name: 'Fullstack_SaaS_Platform.ts', 
    type: 'code', 
    size: '42 KB', 
    date: 'Oct 20, 2026', 
    folder: 'Projects',
    content: 'An enterprise SaaS dashboard built with Next.js App Router, Tailwind CSS, PostgreSQL, Prisma, and Stripe billing. Features real-time telemetry and user role management.',
    url: 'https://github.com/Premilpatel/Portfolio'
  },
  { 
    id: 'proj-2', 
    name: 'macOS_Portfolio_Experience.tsx', 
    type: 'code', 
    size: '18 KB', 
    date: 'Oct 23, 2026', 
    folder: 'Projects',
    content: 'An interactive macOS desktop simulator with a live dock, window manager, file browser, terminal, and photo gallery.',
    url: 'https://github.com/Premilpatel/Portfolio'
  },
  { 
    id: 'proj-3', 
    name: 'AI_Workflow_Automation.py', 
    type: 'code', 
    size: '28 KB', 
    date: 'Sep 30, 2026', 
    folder: 'Projects',
    content: 'LLM agentic automation pipeline with streaming generation, prompt orchestration, and vector search embeddings.',
    url: 'https://github.com/Premilpatel'
  },
  { 
    id: 'proj-4', 
    name: '3D_Interactive_Studio.js', 
    type: 'code', 
    size: '35 KB', 
    date: 'Aug 14, 2026', 
    folder: 'Projects',
    content: 'WebGL and Three.js interactive 3D model customizer with dynamic lighting and camera physics.',
    url: 'https://github.com/Premilpatel'
  },

  // Skills Files
  { 
    id: 'skill-frontend', 
    name: 'Frontend_Mastery.json', 
    type: 'code', 
    size: '3.1 KB', 
    date: 'Oct 15, 2026', 
    folder: 'Skills & Tech',
    content: `{\n  "languages": ["TypeScript", "JavaScript", "HTML5", "CSS3/Tailwind"],\n  "frameworks": ["React 19", "Next.js", "Vite", "Vue.js"],\n  "state_and_animation": ["Zustand", "Framer Motion", "GSAP"],\n  "styling": ["Tailwind CSS", "shadcn/ui", "Radix Primitives"]\n}`
  },
  { 
    id: 'skill-backend', 
    name: 'Backend_And_Cloud.json', 
    type: 'code', 
    size: '2.8 KB', 
    date: 'Oct 15, 2026', 
    folder: 'Skills & Tech',
    content: `{\n  "runtime": ["Node.js", "Python", "Go"],\n  "databases": ["PostgreSQL", "MongoDB", "Redis", "Supabase"],\n  "devops_and_tools": ["Docker", "Git/GitHub", "Vercel", "AWS S3/EC2"]\n}`
  },

  // Certifications Files
  { 
    id: 'cert-1', 
    name: 'AWS_Certified_Cloud_Practitioner.pdf', 
    type: 'pdf', 
    size: '240 KB', 
    date: '2025', 
    folder: 'Certifications',
    content: 'Demonstrated overall understanding of cloud concepts, security, architecture, pricing, and support services on Amazon Web Services.'
  },
  { 
    id: 'cert-2', 
    name: 'Advanced_React_Architecture.pdf', 
    type: 'pdf', 
    size: '190 KB', 
    date: '2026', 
    folder: 'Certifications',
    content: 'Advanced patterns in React 19, Server Components, State Optimization, Concurrent Rendering, and Custom Hooks.'
  },

  // Experience Files
  { 
    id: 'exp-1', 
    name: 'Software_Engineering_Role.doc', 
    type: 'doc', 
    size: '4.2 KB', 
    date: '2025 - Present', 
    folder: 'Experience',
    content: 'Built scalable client-facing applications, reduced bundle size by 35%, and led the redesign of core user dashboards with Next.js and Tailwind.'
  }
];

export const FinderApp: React.FC<{
  onOpenFile?: (file: FileItem) => void;
}> = ({ onOpenFile }) => {
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  const [history, setHistory] = useState<string[]>(['root']);
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
                <span>All Documents</span>
              </button>

              <button
                onClick={() => navigateTo('Projects')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'Projects' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
              >
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Projects</span>
              </button>

              <button
                onClick={() => navigateTo('Resume & Bio')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'Resume & Bio' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume & Bio</span>
              </button>

              <button
                onClick={() => navigateTo('Skills & Tech')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'Skills & Tech' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Skills</span>
              </button>

              <button
                onClick={() => navigateTo('Certifications')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'Certifications' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
              >
                <Award className="w-3.5 h-3.5 text-orange-400" />
                <span>Certifications</span>
              </button>

              <button
                onClick={() => navigateTo('Experience')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'Experience' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
              >
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span>Experience</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-2 mb-1.5">
              Tags
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2 px-2 py-1 text-neutral-400 hover:text-white cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span>Important</span>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 text-neutral-400 hover:text-white cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Work</span>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 text-neutral-400 hover:text-white cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub link in sidebar */}
        <a 
          href="https://github.com/Premilpatel" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-2 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs text-neutral-300 transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>Premil on GitHub</span>
        </a>
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
              {currentFolder === 'root' ? 'Portfolio Root' : currentFolder}
            </span>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center space-x-3">
            {/* View Switcher */}
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

            {/* Search Input */}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                          <div className="relative">
                            <Folder className="w-12 h-12 text-blue-400 fill-blue-500/30" />
                          </div>
                        )}
                        {file.type === 'pdf' && (
                          <div className="w-10 h-12 rounded bg-red-600/20 border border-red-500/40 flex flex-col items-center justify-center text-[9px] font-bold text-red-300">
                            <FileText className="w-5 h-5 text-red-400 mb-0.5" />
                            PDF
                          </div>
                        )}
                        {file.type === 'code' && (
                          <div className="w-10 h-12 rounded bg-purple-600/20 border border-purple-500/40 flex flex-col items-center justify-center text-[9px] font-bold text-purple-300">
                            <Code2 className="w-5 h-5 text-purple-400 mb-0.5" />
                            CODE
                          </div>
                        )}
                        {file.type === 'doc' && (
                          <div className="w-10 h-12 rounded bg-sky-600/20 border border-sky-500/40 flex flex-col items-center justify-center text-[9px] font-bold text-sky-300">
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
                            <Folder className="w-4 h-4 text-blue-400 shrink-0" />
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

              {selectedFile.url && (
                <a
                  href={selectedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Open on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
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
