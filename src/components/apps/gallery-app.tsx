'use client';

import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Laptop,
  Shield,
  Music2,
  Building2,
  Maximize2
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'security' | 'tech' | 'music' | 'chicago';
  image: string;
  description: string;
  tags: string[];
  date: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Blue Team Threat Detection Lab',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85',
    description: 'Enterprise virtualized security lab analyzing attacker telemetry, Active Directory brute-force detection, and Wazuh alert tuning.',
    tags: ['Cybersecurity', 'Wazuh', 'Active Directory', 'VirtualBox'],
    date: 'Oct 2026'
  },
  {
    id: 'gal-2',
    title: 'Cyber Threat Intelligence Pipeline',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85',
    description: 'Automated threat ingestion pipeline evaluating ~2,000 daily IOCs across WIZ and ThreatStream with Slack incident routing.',
    tags: ['Threat Intel', 'Sentinel', 'Sigma Rules', 'Python'],
    date: 'Relativity 2026'
  },
  {
    id: 'gal-3',
    title: 'Chicago Skyline & Tech Community',
    category: 'chicago',
    image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1400&q=85',
    description: 'DePaul University Loop Campus & downtown Chicago. Cybersecurity testing, CCDC competitions, and research labs.',
    tags: ['Chicago', 'DePaul University', 'Cybersecurity Daemons'],
    date: '2024 - 2028'
  },
  {
    id: 'gal-4',
    title: 'Minimalist Engineering Workspace',
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85',
    description: 'High-focus software development and security architecture environment running Linux, macOS, and containerized tools.',
    tags: ['Development', 'Next.js', 'TypeScript', 'Linux'],
    date: '2026'
  },
  {
    id: 'gal-5',
    title: 'Live Musical Performance & Synthesis',
    category: 'music',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=85',
    description: 'Lead Keyboardist at SMK performing Indian classical music internationally across the US and India for audiences of up to 12,000+.',
    tags: ['Music', 'SMK', 'Lead Keyboardist', 'Live Sound'],
    date: '2021 - Present'
  },
  {
    id: 'gal-6',
    title: 'Network Security Architecture & DMZ',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85',
    description: 'Dual-Path Dual-Layer firewall design with segmented DMZ and Intranet isolation, NAT/PAT, and access control policies.',
    tags: ['Firewall', 'Network Security', 'DMZ', 'Routing'],
    date: '2026'
  }
];

export const GalleryApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const currentIndex = selectedImage 
    ? filteredItems.findIndex(i => i.id === selectedImage.id) 
    : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    } else {
      setSelectedImage(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    } else {
      setSelectedImage(filteredItems[0]);
    }
  };

  return (
    <div className="flex h-full w-full bg-neutral-900 text-neutral-100 select-none">
      {/* Left Sidebar */}
      <div className="w-52 bg-neutral-950/70 border-r border-white/10 p-3 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-2 mb-1.5">
            Photos & Albums
          </div>
          <div className="space-y-0.5 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>All Photos ({GALLERY_ITEMS.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('security')}
              className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg transition-colors ${activeCategory === 'security' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Cybersecurity</span>
            </button>

            <button
              onClick={() => setActiveCategory('tech')}
              className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg transition-colors ${activeCategory === 'tech' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <Laptop className="w-4 h-4 text-purple-400" />
              <span>Tech & Projects</span>
            </button>

            <button
              onClick={() => setActiveCategory('music')}
              className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg transition-colors ${activeCategory === 'music' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <Music2 className="w-4 h-4 text-amber-400" />
              <span>Music & SMK</span>
            </button>

            <button
              onClick={() => setActiveCategory('chicago')}
              className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg transition-colors ${activeCategory === 'chicago' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Chicago & Campus</span>
            </button>
          </div>
        </div>

        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-neutral-400">
          <div className="font-semibold text-white mb-0.5">High-Res Gallery</div>
          Click any card to open full-screen preview.
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-xl overflow-hidden bg-neutral-800 border border-white/10 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl hover:border-white/30"
            >
              <div className="aspect-video w-full overflow-hidden bg-neutral-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3.5 bg-neutral-900/90 backdrop-blur-md">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-xs text-white truncate">{item.title}</h3>
                  <span className="text-[10px] text-neutral-400 shrink-0 ml-1">{item.date}</span>
                </div>
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed mb-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-neutral-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header controls */}
            <div className="h-10 px-4 bg-neutral-950/80 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-white">{selectedImage.title}</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full hover:bg-white/15 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Preview with Arrows */}
            <div className="relative flex-1 bg-black/90 flex items-center justify-center overflow-hidden max-h-[60vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-full max-w-full object-contain"
              />

              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption & details */}
            <div className="p-4 bg-neutral-900 flex items-center justify-between border-t border-white/10">
              <div className="space-y-1 pr-4">
                <div className="text-sm font-semibold text-white">{selectedImage.title}</div>
                <div className="text-xs text-neutral-300">{selectedImage.description}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedImage.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryApp;
