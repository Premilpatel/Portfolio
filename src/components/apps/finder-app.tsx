'use client';

import React, { useState, useEffect } from 'react';
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
  Link as LinkIcon,
  GraduationCap,
  User,
  Calendar,
  Building,
  Award
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'image' | 'code' | 'link' | 'course';
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
  instructor?: string;
  term?: string;
  credits?: string;
  department?: string;
  institution?: string;
  description?: string;
  url?: string;
}

const INITIAL_FILES: FileItem[] = [
  // ==============================
  // 1. ROOT LEVEL
  // ==============================
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
    id: 'f-courses', 
    name: 'Courses', 
    type: 'folder', 
    kind: 'Folder',
    size: '4 folders',
    fullSize: '50 items across 4 institutions/programs',
    date: 'Nov 12, 2026', 
    createdDate: 'September 1, 2024 at 8:00 AM',
    modifiedDate: 'November 12, 2026 at 12:00 AM',
    lastOpened: 'Today at 12:00 AM',
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
    id: 'img-homelab-diagram', 
    name: 'Homelab_Architecture.jpg', 
    type: 'image', 
    kind: 'JPEG Image Diagram',
    size: '110 KB', 
    fullSize: '110,245 bytes on disk',
    date: 'Nov 12, 2026', 
    createdDate: 'November 12, 2026',
    modifiedDate: 'November 12, 2026',
    lastOpened: 'Today at 1:00 AM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil',
    url: '/homelab-architecture.jpg',
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

  // ==============================
  // 2. COURSES SUBFOLDERS
  // ==============================
  { 
    id: 'f-depaul-courses', 
    name: 'DePaul Courses', 
    type: 'folder', 
    kind: 'Folder',
    size: '34 courses',
    fullSize: '34 courses in Cybersecurity & Computer Science',
    date: 'Nov 2026', 
    createdDate: 'September 1, 2024',
    modifiedDate: 'November 12, 2026',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Courses',
    institution: 'DePaul University',
    folder: 'Courses' 
  },
  { 
    id: 'f-uiuc-transfer', 
    name: 'UIUC Transfer Credits', 
    type: 'folder', 
    kind: 'Folder',
    size: '1 course',
    fullSize: '1 transferred course (6.0 credits)',
    date: 'Fall 2023', 
    createdDate: 'August 2023',
    modifiedDate: 'Autumn 2024',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Courses',
    institution: 'University of Illinois, Urbana-Champaign',
    folder: 'Courses' 
  },
  { 
    id: 'f-harper-transfer', 
    name: 'Harper College Transfer Credits', 
    type: 'folder', 
    kind: 'Folder',
    size: '2 courses',
    fullSize: '2 transferred courses (9.0 credits)',
    date: 'Spring 2024', 
    createdDate: 'August 2023',
    modifiedDate: 'Autumn 2024',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Courses',
    institution: 'William Rainey Harper College',
    folder: 'Courses' 
  },
  { 
    id: 'f-ap-credits', 
    name: 'AP & Test Credits', 
    type: 'folder', 
    kind: 'Folder',
    size: '13 courses',
    fullSize: '48.0 credits earned via AP Examination',
    date: 'Autumn 2024', 
    createdDate: 'August 2024',
    modifiedDate: 'Autumn 2024',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Courses',
    institution: 'College Board AP Examinations',
    folder: 'Courses' 
  },

  // ==============================
  // 3. PROJECTS (Folder Links)
  // ==============================
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
  },
  { 
    id: 'proj-homelab-diagram', 
    name: 'Homelab_Architecture.jpg', 
    type: 'image', 
    kind: 'JPEG Image Diagram',
    size: '110 KB', 
    fullSize: '110,245 bytes on disk',
    date: 'Nov 12, 2026', 
    createdDate: 'November 12, 2026',
    modifiedDate: 'November 12, 2026',
    lastOpened: 'Today at 1:00 AM',
    whereLocation: 'Macintosh HD ▸ Users ▸ premil ▸ Projects',
    url: '/homelab-architecture.jpg',
    folder: 'Projects' 
  },

  // ==============================
  // 4. DEPAUL COURSES
  // ==============================
  // 2024-2025 Autumn
  {
    id: 'depaul-csc243',
    name: 'CSC 243 - Intro to CS for Programmers',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2024',
    instructor: 'Kevin Endres',
    term: '2024-2025 Autumn',
    credits: '4.0 Credits',
    department: 'Computer Science',
    institution: 'DePaul University',
    description: 'Foundations of programming, algorithmic problem-solving, and object-oriented design.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csec100',
    name: 'CSEC 100 - Cybersecurity Orientation',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '2.0 Credits',
    date: 'Autumn 2024',
    instructor: 'Ryan Haley',
    term: '2024-2025 Autumn',
    credits: '2.0 Credits',
    department: 'Cybersecurity',
    institution: 'DePaul University',
    description: 'Introduction to cybersecurity career pathways, ethical obligations, and foundational tooling.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-cth244',
    name: 'CTH 244 - Debates About God',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2024',
    instructor: 'Rocco Sacconaghi',
    term: '2024-2025 Autumn',
    credits: '4.0 Credits',
    department: 'Religious Dimensions',
    institution: 'DePaul University',
    description: 'Philosophical and theological inquiry into divine existence, faith, and secular reasoning.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-it263',
    name: 'IT 263 - Applied Networks and Security',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2024',
    instructor: 'Sharief Oteafy',
    term: '2024-2025 Autumn',
    credits: '4.0 Credits',
    department: 'Network Engineering & Security',
    institution: 'DePaul University',
    description: 'OSI and TCP/IP protocol suites, packet analysis, IP subnetting, and network security controls.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-lsp111',
    name: 'LSP 111 - Explore Chicago: Chicago Foods',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2024',
    instructor: 'Joel Reynolds',
    term: '2024-2025 Autumn',
    credits: '4.0 Credits',
    department: 'First Year Program',
    institution: 'DePaul University',
    description: 'Cultural, historical, and sociological survey of Chicago through its culinary evolution.',
    folder: 'DePaul Courses'
  },

  // 2024-2025 Winter
  {
    id: 'depaul-csec101',
    name: 'CSEC 101 - Cybersecurity Technologies',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '2.0 Credits',
    date: 'Winter 2025',
    instructor: 'Ryan Haley',
    term: '2024-2025 Winter',
    credits: '2.0 Credits',
    department: 'Cybersecurity',
    institution: 'DePaul University',
    description: 'Hands-on exposure to network firewalls, IDS/IPS, vulnerability scanning, and defense systems.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-hst112',
    name: 'HST 112 - The World, c.1500-1914',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2025',
    instructor: 'Babacar Mbengue',
    term: '2024-2025 Winter',
    credits: '4.0 Credits',
    department: 'Historical Inquiry / Global Learning',
    institution: 'DePaul University',
    description: 'Global interactions, empires, trade networks, and modern socio-political revolutions.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-mat140',
    name: 'MAT 140 - Discrete Mathematics I',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2025',
    instructor: 'Javid Validashti',
    term: '2024-2025 Winter',
    credits: '4.0 Credits',
    department: 'Mathematics',
    institution: 'DePaul University',
    description: 'Propositional logic, set theory, combinatorics, proof techniques, and relations for CS.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-net363',
    name: 'NET 363 - Intro to Local Area Networks',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2025',
    instructor: 'Dale Buchholz',
    term: '2024-2025 Winter',
    credits: '4.0 Credits',
    department: 'Network Engineering',
    institution: 'DePaul University',
    description: 'Ethernet framing, VLAN configuration, spanning tree protocol, and switch security.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-wrd104',
    name: 'WRD 104 - Composition & Rhetoric II',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2025',
    instructor: 'Edward Barnes',
    term: '2024-2025 Winter',
    credits: '4.0 Credits',
    department: 'Writing & Rhetoric',
    institution: 'DePaul University',
    description: 'Advanced research methodology, academic argument construction, and digital publication.',
    folder: 'DePaul Courses'
  },

  // 2024-2025 Spring
  {
    id: 'depaul-csc300',
    name: 'CSC 300 - Data Structures I',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Spring 2025',
    instructor: 'Wilfredo Marrero',
    term: '2024-2025 Spring',
    credits: '4.0 Credits',
    department: 'Computer Science',
    institution: 'DePaul University',
    description: 'Linear data structures: dynamic arrays, linked lists, stacks, queues, and asymptotic complexity.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csec340',
    name: 'CSEC 340 - Fundamentals of Info Assurance',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Spring 2025',
    instructor: 'Ryan Haley',
    term: '2024-2025 Spring',
    credits: '4.0 Credits',
    department: 'Cybersecurity',
    institution: 'DePaul University',
    description: 'Risk management frameworks, access control models, cryptography basics, and compliance.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-lsp112',
    name: 'LSP 112 - Focal Point Seminar: Talk Show Culture',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Spring 2025',
    instructor: 'Sarah Fay',
    term: '2024-2025 Spring',
    credits: '4.0 Credits',
    department: 'First Year Program',
    institution: 'DePaul University',
    description: 'Media analysis and philosophical discourse tracing public talk shows from Plato to Fallon.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-net365',
    name: 'NET 365 - Network Interconnection Tech',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Spring 2025',
    instructor: 'Anthony Lombardo',
    term: '2024-2025 Spring',
    credits: '4.0 Credits',
    department: 'Network Engineering',
    institution: 'DePaul University',
    description: 'Inter-domain routing, OSPF, BGP, NAT/PAT, and enterprise WAN connectivity architectures.',
    folder: 'DePaul Courses'
  },

  // 2025-2026 Autumn
  {
    id: 'depaul-csc208',
    name: 'CSC 208 - Ethics in Technology',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2025',
    instructor: 'John Paulett',
    term: '2025-2026 Autumn',
    credits: '4.0 Credits',
    department: 'Philosophy & CS',
    institution: 'DePaul University',
    description: 'Ethical dilemmas in AI, surveillance, digital intellectual property, and computing accountability.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csc301',
    name: 'CSC 301 - Data Structures II',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2025',
    instructor: 'Wilfredo Marrero',
    term: '2025-2026 Autumn',
    credits: '4.0 Credits',
    department: 'Computer Science',
    institution: 'DePaul University',
    description: 'Non-linear data structures: balanced binary search trees, hash tables, heaps, and graph algorithms.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csec378',
    name: 'CSEC 378 - Host Based Security',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2025',
    instructor: 'Kevin Naughton',
    term: '2025-2026 Autumn',
    credits: '4.0 Credits',
    department: 'Cybersecurity',
    institution: 'DePaul University',
    description: 'Operating system hardening, endpoint detection and response (EDR), kernel security, and logging.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-net377',
    name: 'NET 377 - Fundamentals Network Security',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2025',
    instructor: 'Dale Buchholz',
    term: '2025-2026 Autumn',
    credits: '4.0 Credits',
    department: 'Network Engineering',
    institution: 'DePaul University',
    description: 'Stateful firewall design, cryptographic protocols (IPsec, SSL/TLS), and perimeter defense.',
    folder: 'DePaul Courses'
  },

  // 2025-2026 Winter
  {
    id: 'depaul-csc373',
    name: 'CSC 373 - Computer Systems I',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2026',
    instructor: 'Ljubomir Perkovic',
    term: '2025-2026 Winter',
    credits: '4.0 Credits',
    department: 'Computer Science',
    institution: 'DePaul University',
    description: 'Computer architecture, x86 assembly, memory hierarchy, caching mechanisms, and system performance.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csec450',
    name: 'CSEC 450 - Digital Forensic Techniques',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2026',
    instructor: 'Zhen Huang',
    term: '2025-2026 Winter',
    credits: '4.0 Credits',
    department: 'Cybersecurity / Forensics',
    institution: 'DePaul University',
    description: 'Live memory analysis, filesystem forensics, artifact recovery, and incident reconstruction.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-net593',
    name: 'NET 593 - Telecom & Net Sec Practicum',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2026',
    instructor: 'Jean-Philippe Labruyere',
    term: '2025-2026 Winter',
    credits: '4.0 Credits',
    department: 'Graduate Network Security',
    institution: 'DePaul University',
    description: 'Advanced hands-on lab practicum in enterprise network defense and red/blue team simulations.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-post120',
    name: 'POST 120 - Audio for Podcasts & Media',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2026',
    instructor: 'Derek Katzer',
    term: '2025-2026 Winter',
    credits: '4.0 Credits',
    department: 'Arts & Media Studio',
    institution: 'DePaul University',
    description: 'Digital audio production, frequency equalization, podcast engineering, and studio mixing.',
    folder: 'DePaul Courses'
  },

  // 2025-2026 Spring
  {
    id: 'depaul-csc355',
    name: 'CSC 355 - Database Systems',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Spring 2026',
    instructor: 'Eliecer Peraza Ayala',
    term: '2025-2026 Spring',
    credits: '4.0 Credits',
    department: 'Computer Science',
    institution: 'DePaul University',
    description: 'Relational database schema design, SQL query optimization, transactions, and indexing.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csc374',
    name: 'CSC 374 - Computer Systems II',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Spring 2026',
    instructor: 'Joseph Phillips',
    term: '2025-2026 Spring',
    credits: '4.0 Credits',
    department: 'Computer Science',
    institution: 'DePaul University',
    description: 'Unix system programming, process management, virtual memory, threads, and socket IPC.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csec228',
    name: 'CSEC 228 - Issues in Information Security',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Spring 2026',
    instructor: 'Brian Greenberg',
    term: '2025-2026 Spring',
    credits: '4.0 Credits',
    department: 'Cybersecurity',
    institution: 'DePaul University',
    description: 'Contemporary threat landscapes, nation-state attacks, privacy regulations, and risk governance.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-film100',
    name: 'FILM 100 - Introduction to Cinema',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Spring 2026',
    instructor: 'Nick Schmidt',
    term: '2025-2026 Spring',
    credits: '4.0 Credits',
    department: 'Arts & Literature',
    institution: 'DePaul University',
    description: 'Formal cinematic language, cinematography, visual narrative structure, and auteur analysis.',
    folder: 'DePaul Courses'
  },

  // 2026-2027 Autumn
  {
    id: 'depaul-csec388',
    name: 'CSEC 388 - Security Testing & Assessment',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2026',
    instructor: 'Ryan Haley',
    term: '2026-2027 Autumn',
    credits: '4.0 Credits',
    department: 'Cybersecurity',
    institution: 'DePaul University',
    description: 'Penetration testing methodology, vulnerability scanning, exploitation frameworks, and report writing.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csec480',
    name: 'CSEC 480 - Cybersec Automation Operations',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2026',
    instructor: 'Kurt Wickboldt',
    term: '2026-2027 Autumn',
    credits: '4.0 Credits',
    department: 'Cybersecurity / Automation',
    institution: 'DePaul University',
    description: 'SOAR platforms, automated incident response playbooks, Python/PowerShell security scripting.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-haa263',
    name: 'HAA 263 - History of Interior Design',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2026',
    instructor: 'Glenn Socki',
    term: '2026-2027 Autumn',
    credits: '4.0 Credits',
    department: 'Arts & Literature / Global Learning',
    institution: 'DePaul University',
    description: 'Evolution of architectural interiors, spatial ergonomics, materials, and decorative arts.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-mgt248',
    name: 'MGT 248 - Business Ethics',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Autumn 2026',
    instructor: 'Joseph Bermas-Dawes',
    term: '2026-2027 Autumn',
    credits: '4.0 Credits',
    department: 'Management & Philosophy',
    institution: 'DePaul University',
    description: 'Corporate social responsibility, stakeholder ethics, executive accountability, and moral theory.',
    folder: 'DePaul Courses'
  },

  // 2026-2027 Winter
  {
    id: 'depaul-csc233',
    name: 'CSC 233 - Codes and Ciphers',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2027',
    instructor: 'Fei Xu',
    term: '2026-2027 Winter',
    credits: '4.0 Credits',
    department: 'Computer Science',
    institution: 'DePaul University',
    description: 'Historical cryptosystems, modern symmetric and asymmetric cipher mathematics, and cryptanalysis.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csec342',
    name: 'CSEC 342 - Cybersecurity Operations',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2027',
    instructor: 'Rami Salahieh',
    term: '2026-2027 Winter',
    credits: '4.0 Credits',
    department: 'Cybersecurity',
    institution: 'DePaul University',
    description: 'Security Operations Center (SOC) workflows, SIEM alerting, threat hunting, and containment.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-csec394',
    name: 'CSEC 394 - Info Security Engineering I',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2027',
    instructor: 'Matthew Dudlo',
    term: '2026-2027 Winter',
    credits: '4.0 Credits',
    department: 'Cybersecurity Engineering',
    institution: 'DePaul University',
    description: 'Engineering resilient enterprise security architectures and zero-trust verification pipelines.',
    folder: 'DePaul Courses'
  },
  {
    id: 'depaul-hst259',
    name: 'HST 259 - History of Western Science',
    type: 'course',
    kind: 'DePaul Course Document',
    size: '4.0 Credits',
    date: 'Winter 2027',
    instructor: 'Christopher Martinuzzi',
    term: '2026-2027 Winter',
    credits: '4.0 Credits',
    department: 'Historical Inquiry',
    institution: 'DePaul University',
    description: 'Intellectual history of scientific discovery from antiquity through the scientific revolution.',
    folder: 'DePaul Courses'
  },

  // ==============================
  // 5. UIUC TRANSFER CREDITS
  // ==============================
  {
    id: 'uiuc-mat261',
    name: 'MAT 261 - Multivariable Calculus II',
    type: 'course',
    kind: 'Transfer Credit Document',
    size: '6.0 Credits',
    date: 'Fall 2023',
    term: '2023 Fall Semester (Transferred to Autumn 2024)',
    credits: '6.0 Quarter Credits (4.0 Semester Credits)',
    department: 'Mathematics',
    institution: 'University of Illinois, Urbana-Champaign',
    description: 'Vector calculus, partial differentiation, multiple integrals, Green’s and Stokes’ theorems. Incoming Course: MATH 241 Calculus III at UIUC.',
    folder: 'UIUC Transfer Credits'
  },

  // ==============================
  // 6. HARPER COLLEGE TRANSFER CREDITS
  // ==============================
  {
    id: 'harper-cmn104',
    name: 'CMN 104 - Public Speaking',
    type: 'course',
    kind: 'Transfer Credit Document',
    size: '4.5 Credits',
    date: 'Fall 2023',
    term: '2023 Fall Semester (Transferred to Autumn 2024)',
    credits: '4.5 Quarter Credits (3.0 Semester Credits)',
    department: 'Communication',
    institution: 'William Rainey Harper College',
    description: 'Public presentation design, speech delivery, rhetorical devices, and audience engagement. Incoming Course: SPE 101 at Harper College.',
    folder: 'Harper College Transfer Credits'
  },
  {
    id: 'harper-wrd103',
    name: 'WRD 103 - Composition & Rhetoric I',
    type: 'course',
    kind: 'Transfer Credit Document',
    size: '4.5 Credits',
    date: 'Spring 2024',
    term: '2024 Spring Semester (Transferred to Autumn 2024)',
    credits: '4.5 Quarter Credits (3.0 Semester Credits)',
    department: 'Writing & Rhetoric',
    institution: 'William Rainey Harper College',
    description: 'College expository writing, critical reading, argumentation, and document drafting. Incoming Course: ENG 101 at Harper College.',
    folder: 'Harper College Transfer Credits'
  },

  // ==============================
  // 7. AP & TEST CREDITS
  // ==============================
  {
    id: 'ap-mat150',
    name: 'MAT 150 - Calculus I',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Mathematics',
    institution: 'College Board Advanced Placement',
    description: 'Differential calculus: limits, derivatives, mean value theorem, and applications of differentiation.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-mat151',
    name: 'MAT 151 - Calculus II',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Mathematics',
    institution: 'College Board Advanced Placement',
    description: 'Integral calculus: fundamental theorem of calculus, integration techniques, and area/volume calculations.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-mat152',
    name: 'MAT 152 - Calculus III',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Mathematics',
    institution: 'College Board Advanced Placement',
    description: 'Infinite sequences, power series, Taylor series expansions, and polar coordinate calculus.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-mat242',
    name: 'MAT 242 - Elements of Statistics',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Mathematics & Statistics',
    institution: 'College Board Advanced Placement',
    description: 'Descriptive statistics, probability distributions, hypothesis testing, confidence intervals, and regression.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-it130',
    name: 'IT 130 - Intro to Web Computing',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Information Technology / CS',
    institution: 'College Board Advanced Placement',
    description: 'Client-server architecture, internet fundamentals, structural HTML, CSS formatting, and scripting.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-che130',
    name: 'CHE 130 - General Chemistry I',
    type: 'course',
    kind: 'AP Credit Document',
    size: '3.0 Credits',
    date: 'AP Exam',
    credits: '3.0 Credits',
    department: 'Chemistry',
    institution: 'College Board Advanced Placement',
    description: 'Atomic structure, stoichiometry, chemical bonding, molecular geometry, and thermochemistry.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-che131',
    name: 'CHE 131 - General Chemistry I Lab',
    type: 'course',
    kind: 'AP Credit Document',
    size: '1.0 Credit',
    date: 'AP Exam',
    credits: '1.0 Credit',
    department: 'Chemistry',
    institution: 'College Board Advanced Placement',
    description: 'Laboratory safety, quantitative measurement, volumetric titrations, and chemical reactions.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-eco106',
    name: 'ECO 106 - Principles of Macroeconomics',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Economics',
    institution: 'College Board Advanced Placement',
    description: 'Aggregate supply and demand, fiscal/monetary policy, inflation metrics, GDP, and global currency markets.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-psc120',
    name: 'PSC 120 - American Political System',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Political Science',
    institution: 'College Board Advanced Placement',
    description: 'Constitutional frameworks, separation of powers, federalism, judicial review, and civil liberties.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-psy105',
    name: 'PSY 105 - Introductory Psychology I',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Psychology',
    institution: 'College Board Advanced Placement',
    description: 'Biological bases of behavior, neuroanatomy, sensation and perception, memory, and cognitive modeling.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-psy106',
    name: 'PSY 106 - Introductory Psychology II',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Psychology',
    institution: 'College Board Advanced Placement',
    description: 'Developmental psychology, personality theories, psychological disorders, and social behavioral dynamics.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-geo101',
    name: 'GEO 101 - Environmental Geography',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Geography',
    institution: 'College Board Advanced Placement',
    description: 'Earth system science, atmospheric circulation, climate patterns, ecosystems, and human environmental impacts.',
    folder: 'AP & Test Credits'
  },
  {
    id: 'ap-geotr100',
    name: 'GEO TR100 - 100-Level Geography Transfer',
    type: 'course',
    kind: 'AP Credit Document',
    size: '4.0 Credits',
    date: 'AP Exam',
    credits: '4.0 Credits',
    department: 'Geography',
    institution: 'College Board Advanced Placement',
    description: 'Introductory physical and regional spatial analysis credit granted via examination.',
    folder: 'AP & Test Credits'
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

  // Sync when parent switches initialFolder (e.g. clicking Desktop Courses or Projects)
  useEffect(() => {
    if (initialFolder && initialFolder !== currentFolder) {
      setCurrentFolder(initialFolder);
      setHistory(prev => [...prev, initialFolder]);
      setHistoryIndex(prev => prev + 1);
      setSelectedFile(null);
    }
  }, [initialFolder]);

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
      return (
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (file.instructor && file.instructor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (file.department && file.department.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return file.folder === currentFolder;
  }).sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
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

  const getBreadcrumb = () => {
    if (currentFolder === 'root') {
      return (
        <span className="font-semibold text-white">premil</span>
      );
    }
    if (currentFolder === 'Projects') {
      return (
        <>
          <span className="text-neutral-500 hover:text-white cursor-pointer" onClick={() => navigateTo('root')}>premil</span>
          <span className="text-neutral-500">▸</span>
          <span className="font-semibold text-white">Projects</span>
        </>
      );
    }
    if (currentFolder === 'Courses') {
      return (
        <>
          <span className="text-neutral-500 hover:text-white cursor-pointer" onClick={() => navigateTo('root')}>premil</span>
          <span className="text-neutral-500">▸</span>
          <span className="font-semibold text-white">Courses</span>
        </>
      );
    }
    return (
      <>
        <span className="text-neutral-500 hover:text-white cursor-pointer" onClick={() => navigateTo('root')}>premil</span>
        <span className="text-neutral-500">▸</span>
        <span className="text-neutral-500 hover:text-white cursor-pointer" onClick={() => navigateTo('Courses')}>Courses</span>
        <span className="text-neutral-500">▸</span>
        <span className="font-semibold text-white">{currentFolder}</span>
      </>
    );
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
                onClick={() => navigateTo('Courses')}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${currentFolder === 'Courses' || currentFolder.includes('Courses') || currentFolder.includes('Credits') ? 'bg-blue-600 text-white font-medium' : 'text-neutral-300 hover:bg-white/10'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/mac-folder-blue.png" alt="Courses" className="w-4 h-4 object-contain" />
                <span>Courses</span>
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
          <div className="text-neutral-400 text-[10px]">DePaul Cybersecurity (B.S. + M.S.)</div>
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

            {/* Folder Breadcrumbs */}
            <div className="flex items-center space-x-1.5 text-xs text-neutral-300">
              <span className="text-neutral-500">Macintosh HD</span>
              <span className="text-neutral-500">▸</span>
              <span className="text-neutral-500">Users</span>
              <span className="text-neutral-500">▸</span>
              {getBreadcrumb()}
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
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 focus:w-44 transition-all h-7 bg-white/10 rounded-md px-3 text-xs text-white placeholder-neutral-400 outline-none focus:ring-1 focus:ring-blue-500"
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
                      {/* Icon Rendering */}
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
                        ) : file.type === 'course' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src="/icons/course-icon.png" 
                            alt="Course" 
                            className="w-13 h-14 object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
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
                      <span className={`text-xs text-center line-clamp-2 break-all px-1.5 py-0.5 rounded leading-tight ${isSelected ? 'bg-blue-600 text-white font-medium' : 'text-neutral-200'}`}>
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
                  <div className="col-span-5">Name</div>
                  <div className="col-span-4">Instructor / Detail</div>
                  <div className="col-span-3 text-right">Term / Size</div>
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
                        <div className="col-span-5 flex items-center space-x-2 truncate">
                          {file.type === 'link' ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/icons/folder-link.png" alt="Link" className="w-4 h-4 object-contain shrink-0" />
                          ) : file.type === 'folder' ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/icons/mac-folder-blue.png" alt="Folder" className="w-4 h-4 object-contain shrink-0" />
                          ) : file.type === 'course' ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/icons/course-icon.png" alt="Course" className="w-4 h-4 object-contain shrink-0" />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/icons/mac-pdf.png" alt="File" className="w-4 h-4 object-contain shrink-0" />
                          )}
                          <span className="truncate">{file.name}</span>
                        </div>
                        <div className="col-span-4 text-neutral-300 truncate">
                          {file.instructor ? `Prof. ${file.instructor}` : file.kind}
                        </div>
                        <div className="col-span-3 text-right text-neutral-400 truncate">
                          {file.term || file.size || '--'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Authentic macOS Metadata Preview Inspector Pane */}
          {selectedFile && (
            <div className="w-80 border-l border-white/10 bg-[#161616]/95 flex flex-col justify-between overflow-y-auto select-text">
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
                    ) : selectedFile.type === 'course' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src="/icons/course-icon.png" 
                        alt="Course" 
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
                  {/* Course Details (if course) */}
                  {selectedFile.type === 'course' && (
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 flex items-center space-x-1">
                        <Award className="w-3 h-3 text-sky-400" />
                        <span>Academic Information</span>
                      </div>
                      <div className="space-y-1.5 bg-white/5 rounded-lg p-2.5 border border-white/5">
                        {selectedFile.instructor && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400 flex items-center gap-1">
                              <User className="w-3 h-3 text-neutral-500" /> Instructor:
                            </span>
                            <span className="text-white font-medium text-right">Prof. {selectedFile.instructor}</span>
                          </div>
                        )}
                        {selectedFile.term && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-neutral-500" /> Term:
                            </span>
                            <span className="text-neutral-200 font-medium text-right">{selectedFile.term}</span>
                          </div>
                        )}
                        {selectedFile.department && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400">Department:</span>
                            <span className="text-neutral-200 text-right truncate max-w-[170px]">{selectedFile.department}</span>
                          </div>
                        )}
                        {selectedFile.institution && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400 flex items-center gap-1">
                              <Building className="w-3 h-3 text-neutral-500" /> School:
                            </span>
                            <span className="text-neutral-200 text-right truncate max-w-[170px]">{selectedFile.institution}</span>
                          </div>
                        )}
                        {selectedFile.credits && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400">Credits:</span>
                            <span className="text-emerald-400 font-medium">{selectedFile.credits}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Course Description */}
                  {selectedFile.description && (
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5">
                        Course Overview
                      </div>
                      <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-[11px] text-neutral-300 leading-relaxed">
                        {selectedFile.description}
                      </div>
                    </div>
                  )}

                  {/* General */}
                  <div>
                    <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 flex items-center space-x-1">
                      <Info className="w-3 h-3 text-blue-400" />
                      <span>General</span>
                    </div>
                    <div className="space-y-1.5 bg-white/5 rounded-lg p-2.5 border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Kind:</span>
                        <span className="text-neutral-200 text-right font-medium truncate max-w-[170px]">{selectedFile.kind}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Where:</span>
                        <span className="text-neutral-200 text-right truncate max-w-[170px]">{selectedFile.whereLocation || 'Macintosh HD'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Created:</span>
                        <span className="text-neutral-200 text-right">{selectedFile.createdDate || selectedFile.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Modified:</span>
                        <span className="text-neutral-200 text-right">{selectedFile.modifiedDate || selectedFile.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Target URL if link */}
                  {selectedFile.url && (
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5">
                        Target Link
                      </div>
                      <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-[10px]">
                        <span className="text-blue-400 break-all hover:underline cursor-pointer" onClick={() => window.open(selectedFile.url, '_blank')}>
                          {selectedFile.url}
                        </span>
                      </div>
                    </div>
                  )}

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
                        <span className="text-neutral-300">DePaul Records</span>
                        <span className="text-emerald-400">Verified Official</span>
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
                ) : selectedFile.type === 'image' ? (
                  <div className="space-y-1.5">
                    <button
                      onClick={() => onOpenFile && onOpenFile(selectedFile)}
                      className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Open in Preview</span>
                    </button>
                    {selectedFile.url && (
                      <a
                        href={selectedFile.url}
                        download={selectedFile.name}
                        className="w-full py-1.5 px-3 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-colors border border-white/10"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Diagram</span>
                      </a>
                    )}
                  </div>
                ) : null}
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
