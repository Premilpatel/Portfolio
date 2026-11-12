'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Share, 
  Lock, 
  ExternalLink, 
  Plus, 
  X,
  Globe,
  Star,
  GitFork
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

interface Tab {
  id: string;
  title: string;
  url: string;
  content: 'github' | 'project' | 'resume';
}

export const SafariApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 't1', title: 'Premilpatel/Portfolio - GitHub', url: 'https://github.com/Premilpatel/Portfolio', content: 'github' },
    { id: 't2', title: 'Featured SaaS Web Application', url: 'https://premil-saas-demo.vercel.app', content: 'project' },
    { id: 't3', title: 'Interactive Resume Summary', url: 'https://premilpatel.dev/resume', content: 'resume' },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('t1');

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const remaining = tabs.filter(t => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id) {
      setActiveTabId(remaining[0].id);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-900 text-neutral-100 select-none">
      {/* Safari Tab Bar */}
      <div className="h-9 bg-neutral-950/80 border-b border-white/10 flex items-center px-2 space-x-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`group flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs max-w-xs cursor-pointer transition-colors ${isActive ? 'bg-neutral-800 text-white shadow-sm border border-white/10' : 'hover:bg-white/5 text-neutral-400'}`}
            >
              <Globe className="w-3.5 h-3.5 shrink-0 text-blue-400" />
              <span className="truncate">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded p-0.5"
                >
                  <X className="w-2.5 h-2.5 text-neutral-400" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Safari Navigation Bar */}
      <div className="h-11 bg-neutral-900 border-b border-white/10 px-3 flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-1.5 text-neutral-400">
          <button className="p-1 rounded hover:bg-white/10 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 hover:text-white">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-xl bg-neutral-950/70 border border-white/10 rounded-lg px-3 py-1 flex items-center justify-center space-x-2 text-xs text-neutral-300">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span className="truncate">{activeTab.url}</span>
        </div>

        <div className="flex items-center space-x-2 text-neutral-400">
          <a
            href={activeTab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded hover:bg-white/10 hover:text-white flex items-center space-x-1 text-xs"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="flex-1 overflow-y-auto bg-neutral-950 p-6">
        {activeTab.content === 'github' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 bg-neutral-900 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <GithubIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">Premilpatel / Portfolio</h2>
                    <p className="text-xs text-neutral-400">Interactive macOS Desktop Portfolio Website</p>
                  </div>
                </div>

                <a
                  href="https://github.com/Premilpatel/Portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-medium text-white flex items-center space-x-1.5"
                >
                  <span>Star Repo</span>
                  <Star className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 bg-black/50 rounded-xl font-mono text-xs text-neutral-300 space-y-2">
                <div className="text-emerald-400"># Clone this repository</div>
                <div>git clone https://github.com/Premilpatel/Portfolio.git</div>
                <div className="text-emerald-400 mt-2"># Install dependencies & run</div>
                <div>npm install</div>
                <div>npm run dev</div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Built with Next.js 16, TypeScript & Tailwind CSS</span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                  <span>TypeScript 100%</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab.content === 'project' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 bg-neutral-900 rounded-2xl border border-white/10 space-y-4">
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                Live Project Showcase
              </span>
              <h2 className="text-lg font-bold text-white">Full-Stack Cloud Telemetry Platform</h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                An end-to-end monitoring service designed for serverless architectures, capturing live metrics, execution logs, and automated alerts. Built with Next.js App Router, Prisma ORM, Redis caching, and Tailwind CSS.
              </p>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                alt="Dashboard"
                className="w-full rounded-xl object-cover border border-white/10 shadow-lg"
              />
            </div>
          </div>
        )}

        {activeTab.content === 'resume' && (
          <div className="max-w-2xl mx-auto bg-neutral-900 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-4">
              <h1 className="text-xl font-bold text-white">Premil Patel</h1>
              <p className="text-xs text-blue-400 mt-1">Full Stack Software Engineer • Creative Developer</p>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div>
                <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">Education</h3>
                <p>Bachelor of Science in Computer Science / Software Engineering</p>
              </div>

              <div>
                <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">Core Tech Stack</h3>
                <p>React 19, Next.js, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, MongoDB, Docker, Git.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">Career Goal</h3>
                <p>Developing high-impact digital tools, polished user experiences, and scalable cloud solutions.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;
