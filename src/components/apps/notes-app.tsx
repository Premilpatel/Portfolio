'use client';

import React, { useState } from 'react';
import { Search, Calendar, Shield, GraduationCap, Briefcase, Mail } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  date: string;
  category: string;
  preview: string;
  body: string;
}

const INITIAL_NOTES: Note[] = [
  {
    id: 'n1',
    title: '👋 About Premil Patel',
    date: 'Oct 2026',
    category: 'Profile',
    preview: 'B.S. + M.S. in Cybersecurity student at DePaul University (GPA 4.0)...',
    body: `Premil Patel
Chicago, IL • 224-477-3511 • patelpremil70@gmail.com
LinkedIn: linkedin.com/in/premilpatel
GitHub: github.com/Premilpatel

Education:
DePaul University | Chicago, IL (Sep. 2024 - June 2028)
• B.S. + M.S. in Cybersecurity, Minor in Computer Science | GPA: 4.0/4.0
• Coursework: IR & Forensics, Security Testing & Assessment, Security Automation, Computer Systems, Database Systems
• Honors & Awards: Presidential Scholar, Double Demon Scholarship, Future Forward Scholarship, Blue Demon Impact Award`
  },
  {
    id: 'n2',
    title: '🛡️ Blue Team Homelab Architecture',
    date: 'Oct 2026',
    category: 'Projects',
    preview: 'Enterprise lab environment with Active Directory, Windows, Linux, and Wazuh...',
    body: `Blue Team Operations & Detection Homelab

Overview:
Provisioned and configured virtual machines (Windows, Linux, Domain Controller, security server) using VirtualBox to support a simulated enterprise lab environment to analyze attacker techniques and defensive controls and tools.

Highlights:
• Simulated credential brute-forcing and reverse-shell payloads against Active Directory.
• Configured Wazuh SIEM & agent telemetry to capture endpoint events and author alert rules.
• Evaluated Sigma detection logic and tested alert efficacy against credential dumping and persistence techniques.`
  },
  {
    id: 'n3',
    title: '💼 Professional Experience Highlights',
    date: 'Sep 2026',
    category: 'Experience',
    preview: 'Relativity (Detection & IR), ComEd (Data Engineer), Seva App (Technical PM)...',
    body: `Work Experience:

1. Relativity — Security Engineer Intern (Detection & IR) | June 2026 – Aug. 2026
• Developed a full-stack threat intelligence pipeline ingesting ~2,000 IOCs/articles daily from WIZ Graph API & ThreatStream API.
• Surfaced ranked findings directly to incident managers via Slack.
• Tuned Sigma detection rules in Microsoft Sentinel, Defender, and ThreatStream.
• Triaged and resolved 30+ low-to-high security incidents; drafted SOC playbooks/SOPs.

2. ComEd — Data Engineer Intern (Operational Analytics) | June 2025 – Aug. 2025
• Built SharePoint app & Power BI dashboard for arranger reallocation, projecting $40K in savings.
• Modified 1.5M+ records using SQL scripts and managed data warehouse access control.
• Automated data pipelines with Microsoft Fabric & Power Apps.

3. Seva App — Technical Project Manager Intern (Software Dev) | Sept. 2024 – May 2025
• Implemented Role-Based Access Control (RBAC) and led zero-downtime CMS migration.
• Directed a team of 6 developers and product owners across bi-weekly sprints.`
  },
  {
    id: 'n4',
    title: '🎹 Musical Leadership & Associations',
    date: 'Aug 2026',
    category: 'Leadership',
    preview: 'Lead Keyboardist at SMK (12,000+ audience), Security Daemons Club at DePaul...',
    body: `Extracurricular & Leadership:

• Lead Keyboardist @ SMK (May 2021 – Present)
  Performing Indian classical music internationally across the US and India, including a concert for a live audience of 12,000+.
  Coordinating with a core team of 5 musicians across 100+ live religious gatherings and events, while managing sound setup, mixers, speakers, and acoustic equipment.

• Security Daemons Club @ DePaul (Sept. 2024 – Present)
  Active participant in CCDC practices, workshops, and competitions including Hivestorm.
  Engaged in CTF challenges spanning web exploitation, cryptography, open-source intelligence, and forensics.`
  }
];

export const NotesApp: React.FC = () => {
  const [notes] = useState<Note[]>(INITIAL_NOTES);
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
      <div className="w-60 bg-neutral-950/70 border-r border-white/10 flex flex-col shrink-0">
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
                <div className="text-[10px] text-amber-400/80 mt-0.5">{note.date} • {note.category}</div>
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
