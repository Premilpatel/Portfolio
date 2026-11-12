'use client';

import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Layers, 
  Sparkles, 
  Palette, 
  Laptop,
  Maximize2
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'web' | 'ui' | '3d' | 'mobile';
  image: string;
  description: string;
  tags: string[];
  link?: string;
  date: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Modern Cloud Analytics Dashboard',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    description: 'Comprehensive telemetry and data visualization platform for real-time cloud resource monitoring and analytics.',
    tags: ['React', 'Next.js', 'Tailwind', 'Recharts'],
    link: 'https://github.com/Premilpatel/Portfolio',
    date: 'Oct 2026'
  },
  {
    id: 'gal-2',
    title: 'macOS Yosemite Aesthetic Interface',
    category: 'ui',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    description: 'Pixel-perfect replication of Apple macOS desktop ecosystem with interactive Dock, Finder, Window Manager, and live app simulations.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/Premilpatel/Portfolio',
    date: 'Oct 2026'
  },
  {
    id: 'gal-3',
    title: '3D Cybernetic Interactive Canvas',
    category: '3d',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'Experimental WebGL 3D procedural mesh generator with dynamic lighting, shader materials, and user orbit controls.',
    tags: ['Three.js', 'WebGL', 'GLSL Shaders', 'JavaScript'],
    link: 'https://github.com/Premilpatel',
    date: 'Aug 2026'
  },
  {
    id: 'gal-4',
    title: 'Fintech Mobile Banking Experience',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Sleek dark-mode financial dashboard showcasing instant transfers, crypto asset trackers, and biometric auth flows.',
    tags: ['React Native', 'TypeScript', 'Tailwind', 'Node.js'],
    link: 'https://github.com/Premilpatel',
    date: 'Jul 2026'
  },
  {
    id: 'gal-5',
    title: 'AI Generative Workflow Platform',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    description: 'Node-based visual AI agent pipeline builder allowing users to chain multimodal prompts and automated workflows.',
    tags: ['React Flow', 'FastAPI', 'Python', 'Tailwind CSS'],
    link: 'https://github.com/Premilpatel',
    date: 'Jun 2026'
  },
  {
    id: 'gal-6',
    title: 'Minimalist Portfolio Typography & Art',
    category: 'ui',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    description: 'Clean editorial layout emphasizing typography, generous whitespace, and fluid layout animations.',
    tags: ['Next.js', 'CSS Grid', 'Typography'],
    link: 'https://github.com/Premilpatel',
    date: 'May 2026'
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
      <div className="w-48 bg-neutral-950/70 border-r border-white/10 p-3 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-2 mb-1.5">
            Photos & Albums
          </div>
          <div className="space-y-0.5 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>All Media ({GALLERY_ITEMS.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('web')}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${activeCategory === 'web' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <Laptop className="w-3.5 h-3.5 text-emerald-400" />
              <span>Web Apps</span>
            </button>

            <button
              onClick={() => setActiveCategory('ui')}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${activeCategory === 'ui' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span>UI / UX Designs</span>
            </button>

            <button
              onClick={() => setActiveCategory('3d')}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${activeCategory === '3d' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>3D & Creative</span>
            </button>

            <button
              onClick={() => setActiveCategory('mobile')}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${activeCategory === 'mobile' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-white/10 text-neutral-300'}`}
            >
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              <span>Mobile Platforms</span>
            </button>
          </div>
        </div>

        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[11px] text-neutral-400">
          <div className="font-semibold text-white mb-0.5">Showcase Gallery</div>
          Click any visual card to preview in full resolution.
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

              <div className="p-3 bg-neutral-900/90 backdrop-blur-md">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-xs text-white truncate">{item.title}</h3>
                  <span className="text-[10px] text-neutral-400 shrink-0">{item.date}</span>
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
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

              {/* Prev / Next Arrows */}
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

              {selectedImage.link && (
                <a
                  href={selectedImage.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center space-x-1.5 shrink-0 transition-colors"
                >
                  <span>View Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryApp;
