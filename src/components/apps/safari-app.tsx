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
  Star,
  Shield,
  ShieldCheck,
  Server
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

interface Tab {
  id: string;
  title: string;
  url: string;
  content: 'github' | 'homelab' | 'network';
}

export const SafariApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 't1', title: 'Premilpatel (Premil Patel) - GitHub', url: 'https://github.com/Premilpatel', content: 'github' },
    { id: 't2', title: 'Blue Team Detection Homelab - Writeup', url: 'https://premilpatel.notion.site/homelab', content: 'homelab' },
    { id: 't3', title: 'Network Security Architecture & Design', url: 'https://premilpatel.dev/network-architecture', content: 'network' },
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
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <GithubIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Premil Patel (@Premilpatel)</h2>
                    <p className="text-xs text-neutral-400">Cybersecurity & Software Engineering @ DePaul University</p>
                  </div>
                </div>

                <a
                  href="https://github.com/Premilpatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-medium text-white flex items-center space-x-1.5"
                >
                  <span>Follow on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 bg-black/60 rounded-xl space-y-3 font-mono text-xs text-neutral-300">
                <div className="text-emerald-400 font-semibold">// Featured Repositories</div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                    <div>
                      <a href="https://github.com/Premilpatel/Portfolio" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:underline">Portfolio</a>
                      <p className="text-[11px] text-neutral-400 font-sans">macOS Yosemite desktop simulator portfolio website.</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-sans">TypeScript</span>
                  </div>

                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-blue-400">Blue-Team-Detection-Homelab</span>
                      <p className="text-[11px] text-neutral-400 font-sans">VirtualBox lab with Active Directory & Wazuh SIEM detection rules.</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-sans">Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab.content === 'homelab' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="p-6 bg-neutral-900 rounded-2xl border border-white/10 space-y-4">
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                Security Engineering Project
              </span>
              <h2 className="text-lg font-bold text-white">Blue Team Operations & Detection Homelab</h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                A multi-VM enterprise simulation deployed on VirtualBox incorporating Windows Server Domain Controller, Windows 11 endpoint, and Linux security sensors.
              </p>

              <div className="space-y-2 text-xs text-neutral-300">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-1">Key Objectives:</h4>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Simulated Kerberoasting, AS-REP roasting, and brute-force attacks against AD.</li>
                    <li>Authored Wazuh detection rules to alert SOC on suspicious ticket requests.</li>
                    <li>Benchmarked Sigma rules and evaluated telemetry ingestion pipeline.</li>
                  </ul>
                </div>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
                alt="Security Lab"
                className="w-full rounded-xl object-cover border border-white/10 shadow-lg"
              />
            </div>
          </div>
        )}

        {activeTab.content === 'network' && (
          <div className="max-w-2xl mx-auto bg-neutral-900 p-6 rounded-2xl border border-white/10 space-y-4">
            <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">
              Architecture & Infrastructure
            </span>
            <h2 className="text-lg font-bold text-white">Network Security Architecture & Design</h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Designed and implemented a Dual-Path Dual-Layer firewall topology establishing strict separation between the public-facing DMZ and internal corporate subnets.
            </p>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-neutral-300 space-y-2">
              <div className="font-semibold text-white">Implemented Security Controls:</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>NAT/PAT static address translation for isolated web application tiers.</li>
                <li>Stateful firewall inspection and explicit ingress/egress access control lists.</li>
                <li>Isolated management subnet preventing lateral traversal from perimeter hosts.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;
