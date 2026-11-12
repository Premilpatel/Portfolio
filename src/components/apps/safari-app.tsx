'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Lock, 
  ExternalLink, 
  X,
  Globe,
  Share2,
  Download,
  BookOpen,
  FileText
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

interface Tab {
  id: string;
  title: string;
  url: string;
  content: 'github' | 'notion' | 'gdrive';
}

export const SafariApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { 
      id: 'tab-github', 
      title: 'GitHub: Premil Patel (@Premilpatel)', 
      url: 'https://github.com/Premilpatel', 
      content: 'github' 
    },
    { 
      id: 'tab-notion', 
      title: 'Detection-Monitoring-Homelab-Writeup - Notion', 
      url: 'https://app.notion.com/p/Detection-Monitoring-Homelab-Writeup-2f8ee3aaf9948016a8f1fcdd386f39f2', 
      content: 'notion' 
    },
    { 
      id: 'tab-gdrive', 
      title: 'Network Security Architecture & Design - Google Drive', 
      url: 'https://drive.google.com/file/d/13I3Wrc7NriuGnpLBPH73tM6UrJ9xlRn7/view', 
      content: 'gdrive' 
    },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('tab-github');

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
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] text-neutral-100 select-none">
      {/* Safari Tab Bar */}
      <div className="h-10 bg-[#161616] border-b border-white/10 flex items-center px-2 space-x-1.5 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`group flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs max-w-xs cursor-pointer transition-colors ${isActive ? 'bg-[#2a2a2a] text-white shadow-sm border border-white/10 font-medium' : 'hover:bg-white/5 text-neutral-400'}`}
            >
              {tab.content === 'github' && <GithubIcon className="w-3.5 h-3.5 shrink-0 text-white" />}
              {tab.content === 'notion' && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/icons/notion.png" alt="Notion" className="w-3.5 h-3.5 rounded-sm shrink-0" />
              )}
              {tab.content === 'gdrive' && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/icons/gdrive.png" alt="Drive" className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="truncate max-w-[170px]">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded p-0.5 ml-1 transition-opacity"
                  title="Close Tab"
                >
                  <X className="w-2.5 h-2.5 text-neutral-400 hover:text-white" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Safari Navigation & URL Bar */}
      <div className="h-11 bg-[#1e1e1e] border-b border-white/10 px-3 flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-1.5 text-neutral-400">
          <button className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors" title="Back">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors" title="Forward">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors" title="Reload">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-xl bg-[#121212] border border-white/10 rounded-lg px-3 py-1 flex items-center justify-center space-x-2 text-xs text-neutral-300 shadow-inner">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">{activeTab.url}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 text-neutral-400">
          <a
            href={activeTab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded hover:bg-white/10 hover:text-white flex items-center space-x-1 text-xs transition-colors"
            title="Open in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="flex-1 overflow-y-auto bg-[#141414] select-text">
        {/* Tab 1: GitHub */}
        {activeTab.content === 'github' && (
          <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/10 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center space-x-3.5">
                  <div className="w-14 h-14 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center shadow">
                    <GithubIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      Premil Patel <span className="text-xs font-normal text-neutral-400">@Premilpatel</span>
                    </h2>
                    <p className="text-xs text-neutral-300">Cybersecurity & Software Engineering @ DePaul University</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Chicago, IL • patelpremil70@gmail.com</p>
                  </div>
                </div>

                <a
                  href="https://github.com/Premilpatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-medium text-white flex items-center space-x-1.5 transition-colors shadow"
                >
                  <span>Open GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Featured Repositories */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Featured Repositories
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                  <a 
                    href="https://github.com/Premilpatel/Portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors block group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-blue-400 group-hover:underline text-xs">Portfolio</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">TypeScript</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                      Interactive macOS Yosemite desktop portfolio simulator with window management, magnification dock, and Finder.
                    </p>
                  </a>

                  <a 
                    href="https://github.com/Premilpatel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors block group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-blue-400 group-hover:underline text-xs">Blue-Team-Detection-Homelab</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Security</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                      VirtualBox enterprise lab simulating Kerberoasting, AS-REP roasting, and Wazuh SIEM detection authoring.
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Notion Writeup */}
        {activeTab.content === 'notion' && (
          <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="p-6 bg-[#1f1f1f] rounded-2xl border border-white/10 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center space-x-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icons/notion.png" alt="Notion" className="w-12 h-12 rounded-xl object-contain shadow" />
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                      Notion Engineering Document
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                      Detection & Monitoring Homelab Writeup
                    </h2>
                    <p className="text-xs text-neutral-400">Published by Premil Patel</p>
                  </div>
                </div>

                <a
                  href="https://app.notion.com/p/Detection-Monitoring-Homelab-Writeup-2f8ee3aaf9948016a8f1fcdd386f39f2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#2eaadc] hover:bg-[#2597c4] rounded-lg text-xs font-semibold text-white flex items-center space-x-1.5 transition-colors shadow"
                >
                  <span>Open in Notion</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Document Overview Preview */}
              <div className="space-y-4 text-xs text-neutral-200 leading-relaxed font-sans">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <h3 className="font-semibold text-white text-sm">Executive Overview</h3>
                  <p className="text-neutral-300">
                    This comprehensive homelab writeup documents the deployment of an isolated VirtualBox environment mirroring an enterprise security operations center (SOC). It details adversary emulation against Active Directory, continuous log pipeline telemetry, and Wazuh SIEM alert engineering.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1.5">
                    <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Attack Vectors Analyzed</span>
                    </div>
                    <ul className="list-disc ml-5 space-y-1 text-neutral-300 text-[11px]">
                      <li>Kerberoasting service account SPNs</li>
                      <li>AS-REP roasting without pre-auth</li>
                      <li>Credential brute-force & password spraying</li>
                      <li>Privilege escalation via shadow credentials</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1.5">
                    <div className="font-semibold text-blue-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Defensive Engineering</span>
                    </div>
                    <ul className="list-disc ml-5 space-y-1 text-neutral-300 text-[11px]">
                      <li>Sysmon Event ID 1, 3, 11 fine-tuning</li>
                      <li>Custom Wazuh rules (decoders & alert levels)</li>
                      <li>Sigma detection correlation rules</li>
                      <li>Telemetry validation and alert tuning</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="https://app.notion.com/p/Detection-Monitoring-Homelab-Writeup-2f8ee3aaf9948016a8f1fcdd386f39f2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-xs text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    <span>Read full writeup and diagrams directly on Notion</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Google Drive */}
        {activeTab.content === 'gdrive' && (
          <div className="h-full flex flex-col p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div className="flex items-center space-x-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/gdrive.png" alt="Google Drive" className="w-8 h-8 object-contain" />
                <div>
                  <h2 className="text-sm font-semibold text-white">Network Security Architecture & Design Document</h2>
                  <p className="text-[11px] text-neutral-400">Google Drive Document • Premil Patel</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="https://drive.google.com/file/d/13I3Wrc7NriuGnpLBPH73tM6UrJ9xlRn7/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-medium text-white flex items-center space-x-1.5 transition-colors shadow"
                >
                  <span>Open in Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Google Drive Viewer */}
            <div className="flex-1 w-full bg-neutral-900 rounded-xl overflow-hidden border border-white/10 min-h-[500px]">
              <iframe
                src="https://drive.google.com/file/d/13I3Wrc7NriuGnpLBPH73tM6UrJ9xlRn7/preview"
                className="w-full h-full border-none"
                title="Google Drive Document Preview"
                allow="autoplay"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;
