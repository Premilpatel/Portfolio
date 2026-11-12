'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

export const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'Last login: ' + new Date().toLocaleDateString() + ' on ttys001' },
    { id: '2', type: 'system', text: 'Type "help" to see available commands or "skills" to view tech stack.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { id: Math.random().toString(), type: 'input', text: '' }]);
      return;
    }

    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      { id: Math.random().toString(), type: 'input', text: trimmed }
    ];

    const args = trimmed.toLowerCase().split(' ');
    const primary = args[0];

    switch (primary) {
      case 'help':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `Available Commands:
  • whoami     - Display profile summary & title
  • skills     - Technical proficiencies & tools
  • projects   - Showcase of featured software projects
  • resume     - Quick career and education highlights
  • contact    - Email, LinkedIn, and GitHub links
  • github     - Open GitHub profile
  • repo       - Open this project repository
  • clear      - Clear terminal screen
  • date       - Display current system time`
        });
        break;

      case 'whoami':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `Premil Patel - Full Stack Software Engineer
Passionate developer crafting modern, responsive, and performant web applications.
Specializing in Next.js, React, TypeScript, Node.js, and cloud systems.`
        });
        break;

      case 'skills':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `[Frontend]
  • React 19, Next.js App Router, TypeScript, JavaScript
  • Tailwind CSS, shadcn/ui, HTML5, CSS3, Framer Motion
[Backend]
  • Node.js, Express, Python, REST APIs, GraphQL
[Databases]
  • PostgreSQL, MongoDB, Redis, Prisma ORM, Supabase
[DevOps & Tools]
  • Git, GitHub Actions, Docker, Vercel, AWS S3/EC2, Linux`
        });
        break;

      case 'projects':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `1. macOS Portfolio & Desktop Simulator (Next.js, TypeScript, Tailwind)
   https://github.com/Premilpatel/Portfolio

2. Enterprise SaaS Analytics Dashboard (Next.js, Tailwind, PostgreSQL)
   Full-featured dashboard with user telemetry & role-based access.

3. AI Workflow & Agent Automation (Python, FastAPI, Vector DB)
   Autonomous agent task chaining and LLM streaming integration.`
        });
        break;

      case 'resume':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `Summary: Software Engineer with strong background in modern web architectures.
Education: Computer Science & Software Engineering
Experience: Full Stack Development, Cloud Integration, UI/UX Systems.
(Download full resume from the Finder > Resume folder!)`
        });
        break;

      case 'contact':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `• GitHub:   https://github.com/Premilpatel
• Repo:     https://github.com/Premilpatel/Portfolio
• Email:    premilpatel.dev@gmail.com
• Status:   Available for Full-time roles & exciting projects`
        });
        break;

      case 'github':
      case 'repo':
        window.open('https://github.com/Premilpatel/Portfolio', '_blank');
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: 'Opening GitHub repository in a new tab...'
        });
        break;

      case 'date':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: new Date().toString()
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        newLines.push({
          id: Math.random().toString(),
          type: 'error',
          text: `zsh: command not found: ${trimmed}. Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(prev => [...prev, ...newLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className="h-full w-full bg-black/95 text-neutral-200 font-mono text-xs p-4 overflow-y-auto cursor-text select-text flex flex-col"
    >
      <div className="space-y-1">
        {history.map(item => {
          if (item.type === 'input') {
            return (
              <div key={item.id} className="flex items-center space-x-2">
                <span className="text-emerald-400 font-semibold">premil@macbook-pro</span>
                <span className="text-cyan-400">~</span>
                <span className="text-white">%</span>
                <span className="text-white">{item.text}</span>
              </div>
            );
          }
          if (item.type === 'error') {
            return (
              <div key={item.id} className="text-red-400 whitespace-pre-wrap leading-relaxed">
                {item.text}
              </div>
            );
          }
          if (item.type === 'system') {
            return (
              <div key={item.id} className="text-neutral-500 whitespace-pre-wrap leading-relaxed">
                {item.text}
              </div>
            );
          }
          return (
            <div key={item.id} className="text-neutral-300 whitespace-pre-wrap leading-relaxed pl-2">
              {item.text}
            </div>
          );
        })}
      </div>

      {/* Active input prompt */}
      <div className="flex items-center space-x-2 mt-1">
        <span className="text-emerald-400 font-semibold">premil@macbook-pro</span>
        <span className="text-cyan-400">~</span>
        <span className="text-white">%</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs p-0 m-0"
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
};

export default TerminalApp;
