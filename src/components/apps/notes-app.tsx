'use client';

import React, { useState } from 'react';
import { FileText, Plus, Trash2, Search, Calendar } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  date: string;
  preview: string;
  body: string;
}

const INITIAL_NOTES: Note[] = [
  {
    id: 'n1',
    title: '👋 Welcome to my Portfolio',
    date: 'Oct 23, 2026',
    preview: 'Hi! I am Premil Patel. This portfolio is built as an interactive...',
    body: `Hi there! Welcome to my interactive macOS portfolio website.

I designed this project to demonstrate creative front-end architecture, clean component design, and attention to detail. Every window can be moved, minimized, or maximized, and the dock features authentic magnification and bounce animations.

Feel free to browse through the Finder folders, inspect my photo gallery, test the Terminal with commands like 'skills' and 'projects', and view my resume!`
  },
  {
    id: 'n2',
    title: '🛠️ Technical Skills & Proficiencies',
    date: 'Oct 20, 2026',
    preview: 'Languages: TypeScript, JavaScript, Python, HTML/CSS...',
    body: `Comprehensive Technical Skills Breakdown:

Frontend Development:
• React 19 & Next.js App Router
• TypeScript & Modern JavaScript (ESNext)
• Tailwind CSS, shadcn/ui, Radix UI Primitives
• Responsive Design, CSS Grid, Flexbox, Micro-animations

Backend & Systems:
• Node.js, Express, RESTful APIs, GraphQL
• Python, FastAPI
• PostgreSQL, MongoDB, Redis, Prisma ORM
• Authentication (OAuth, JWT, NextAuth)

DevOps & Engineering Practices:
• Git, GitHub Actions, CI/CD
• Docker & Containerization
• Vercel, AWS (S3, CloudFront, EC2)
• Unit & Integration Testing, Web Performance Optimization`
  },
  {
    id: 'n3',
    title: '🚀 Featured Project Highlights',
    date: 'Oct 18, 2026',
    preview: '1. macOS Portfolio Experience 2. Enterprise SaaS Platform...',
    body: `Featured Projects:

1. Interactive macOS Desktop Portfolio
• Tech: Next.js 16, TypeScript, Tailwind CSS, Framer Motion
• Highlights: Authentic cosine magnification dock, draggable window manager, functional Finder file explorer, Terminal simulator.

2. Enterprise SaaS Platform & Analytics
• Tech: Next.js, PostgreSQL, Prisma, Stripe, Tailwind
• Highlights: Multi-tenant dashboard, real-time metrics, role-based authentication.

3. AI Workflow & Agent Chaining
• Tech: Python, FastAPI, LangChain, Vector Search
• Highlights: Streamed generation, multimodal pipelines, task automation.`
  },
  {
    id: 'n4',
    title: '📫 Contact & Social Links',
    date: 'Oct 15, 2026',
    preview: 'GitHub: Premilpatel, Email: premilpatel.dev@gmail.com...',
    body: `Get in Touch:

I am open to software engineering roles, collaborative projects, and freelance opportunities.

• GitHub: https://github.com/Premilpatel
• Repository: https://github.com/Premilpatel/Portfolio
• Email: premilpatel.dev@gmail.com
• Location: United States

Feel free to reach out anytime!`
  }
];

export const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [activeNoteId, setActiveNoteId] = useState<string>('n1');
  const [searchQuery, setSearchQuery] = useState('');

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-full bg-neutral-900 text-neutral-100 select-none">
      {/* Notes Sidebar */}
      <div className="w-56 bg-neutral-950/70 border-r border-white/10 flex flex-col shrink-0">
        <div className="p-3 border-b border-white/10">
          <div className="relative">
            <Search className="w-3 h-3 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search Notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 bg-white/10 rounded-lg pl-8 pr-2 text-xs text-white placeholder-neutral-400 outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {filteredNotes.map((note) => {
            const isActive = note.id === activeNoteId;
            return (
              <div
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`p-3 cursor-pointer transition-colors ${isActive ? 'bg-amber-500/20 text-white' : 'hover:bg-white/5 text-neutral-300'}`}
              >
                <div className="font-semibold text-xs truncate">{note.title}</div>
                <div className="text-[10px] text-amber-400/80 mt-0.5">{note.date}</div>
                <div className="text-[11px] text-neutral-400 truncate mt-1 leading-snug">
                  {note.preview}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note Editor / Reader View */}
      <div className="flex-1 flex flex-col bg-neutral-900 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full space-y-4">
          <div className="text-[11px] text-neutral-400 flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeNote.date}</span>
          </div>

          <h1 className="text-xl font-bold text-white tracking-tight">
            {activeNote.title}
          </h1>

          <div className="border-t border-white/10 pt-4 text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans">
            {activeNote.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
