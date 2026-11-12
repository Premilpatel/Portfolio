'use client';

import React from 'react';
import { Download, Mail, Phone, ExternalLink, Printer, Check, Copy } from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

export const ResumeViewer: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('patelpremil70@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#525659] text-neutral-800 select-text overflow-hidden">
      {/* PDF Viewer Toolbar */}
      <div className="h-10 bg-[#323639] text-white px-4 flex items-center justify-between text-xs border-b border-black/40 shrink-0 select-none">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-neutral-200">Premil_Patel_Resume.pdf</span>
          <span className="text-[11px] text-neutral-400">• Page 1 of 1</span>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={copyEmail}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-neutral-200 text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
          </button>

          <button 
            onClick={handlePrint}
            className="p-1.5 rounded hover:bg-white/10 text-neutral-300 hover:text-white"
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>

          <a 
            href="mailto:patelpremil70@gmail.com"
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors"
          >
            <Mail className="w-3.5 h-3.5 mr-1" />
            <span>Contact Premil</span>
          </a>
        </div>
      </div>

      {/* PDF Canvas Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-[#525659]">
        <div className="w-full max-w-3xl bg-white text-black p-8 sm:p-12 shadow-2xl rounded-sm font-sans leading-normal text-[13px] border border-neutral-300 min-h-[900px]">
          
          {/* Header */}
          <div className="text-center pb-4 border-b border-neutral-300">
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-neutral-900 mb-2">
              Premil Patel
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-700">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-neutral-500" /> 224-477-3511
              </span>
              <span>•</span>
              <a href="mailto:patelpremil70@gmail.com" className="flex items-center gap-1 text-blue-600 hover:underline">
                <Mail className="w-3 h-3 text-neutral-500" /> patelpremil70@gmail.com
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/premilpatel" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                linkedin.com/in/premilpatel
              </a>
              <span>•</span>
              <a href="https://github.com/Premilpatel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                <GithubIcon className="w-3 h-3 text-neutral-700 inline" /> github.com/Premilpatel
              </a>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mt-5">
            <h2 className="text-xs font-bold tracking-wider text-neutral-900 uppercase border-b border-neutral-800 pb-0.5 mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-neutral-900">DePaul University | Chicago, IL</span>
              <span className="text-neutral-600 text-xs">Expected: Sep. 2024 - June 2028</span>
            </div>
            <div className="flex justify-between items-baseline italic text-neutral-800">
              <span>B.S. + M.S. in Cybersecurity, Minor in Computer Science</span>
              <span className="font-semibold text-neutral-900 not-italic text-xs">GPA: 4.0/4.0</span>
            </div>
            <p className="text-xs text-neutral-700 mt-1">
              <span className="font-medium text-neutral-800">Courses:</span> IR & Forensics, Security Testing & Assessment, Security Automation, Computer Systems, Database Systems
            </p>
            <p className="text-xs text-neutral-700">
              <span className="font-medium text-neutral-800">Awards:</span> Presidential Scholar, Double Demon Scholarship, Future Forward Scholarship, Blue Demon Impact Award
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="mt-5">
            <h2 className="text-xs font-bold tracking-wider text-neutral-900 uppercase border-b border-neutral-800 pb-0.5 mb-2">
              Experience
            </h2>

            {/* Relativity */}
            <div className="mb-3.5">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-neutral-900">Relativity — Security Engineer Intern <span className="font-normal italic">(Detection & IR)</span></span>
                <span className="text-neutral-600 text-xs">June 2026 – Aug. 2026</span>
              </div>
              <ul className="list-disc ml-5 mt-1 text-neutral-700 space-y-1 text-xs">
                <li>Developed a full-stack threat intelligence pipeline that ingests <span className="font-semibold text-neutral-800">~2,000 IOCs/articles daily</span> from the WIZ Graph API and ThreatStream API, filters them against threat models + vulnerability data, and surfaces the <span className="font-semibold text-neutral-800">ranked findings to managers via Slack</span>.</li>
                <li>Authored and tuned <span className="font-semibold text-neutral-800">Sigma detection rules</span> across Microsoft Sentinel, Defender, and ThreatStream, reducing false positives.</li>
                <li>Triaged and resolved <span className="font-semibold text-neutral-800">30+ low-to-high security incidents</span>, and wrote SOC playbooks/SOPs to standardize workflows.</li>
              </ul>
            </div>

            {/* ComEd */}
            <div className="mb-3.5">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-neutral-900">ComEd — Data Engineer Intern <span className="font-normal italic">(Operational Analytics)</span></span>
                <span className="text-neutral-600 text-xs">June 2025 – Aug. 2025</span>
              </div>
              <ul className="list-disc ml-5 mt-1 text-neutral-700 space-y-1 text-xs">
                <li>Built a SharePoint app, Power BI dashboard, and automated data flows for arranger reallocation, projecting <span className="font-semibold text-neutral-800">$40K in savings</span>.</li>
                <li>Wrote SQL scripts to modify <span className="font-semibold text-neutral-800">1.5M+ records</span>, manage data warehouse access control, and create the underlying data schema.</li>
                <li>Implemented pipelines in Microsoft Fabric and Power Apps for scheduled data refreshes, ensuring data accuracy in dashboards.</li>
              </ul>
            </div>

            {/* Seva App */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-neutral-900">Seva App — Technical Project Manager Intern <span className="font-normal italic">(Software Dev)</span></span>
                <span className="text-neutral-600 text-xs">Sept. 2024 – May 2025</span>
              </div>
              <ul className="list-disc ml-5 mt-1 text-neutral-700 space-y-1 text-xs">
                <li>Implemented <span className="font-semibold text-neutral-800">Role-Based Access Control (RBAC)</span> to enforce least-privilege access and led a zero-downtime CMS migration.</li>
                <li>Oversaw a team of 6 developers and product owners, ran 2 weekly sprint meetings to ensure project alignment, created a centralized task process for better organization and collaboration, and presented updates to non-technical stakeholders.</li>
              </ul>
            </div>
          </div>

          {/* ASSOCIATIONS */}
          <div className="mt-5">
            <h2 className="text-xs font-bold tracking-wider text-neutral-900 uppercase border-b border-neutral-800 pb-0.5 mb-2">
              Associations
            </h2>

            <div className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-neutral-900">Security Daemons Club @ DePaul</span>
                <span className="text-neutral-600 text-xs">Sept. 2024 – Present</span>
              </div>
              <ul className="list-disc ml-5 mt-1 text-neutral-700 text-xs">
                <li>Developing skills through CCDC practices, workshops, and competitions, including Hivestorm, identifying and remediating vulnerabilities; engaged in CTFs, gaining skills in web exploitation, cryptography, open-source intelligence, and forensics.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-neutral-900">Lead Keyboardist @ SMK</span>
                <span className="text-neutral-600 text-xs">May 2021 – Present</span>
              </div>
              <ul className="list-disc ml-5 mt-1 text-neutral-700 space-y-1 text-xs">
                <li>Performing Indian classical music internationally across the US and India, including a concert for a live audience of 12,000+.</li>
                <li>Coordinating with a core team of 5 musicians to perform at 100+ live religious gatherings and events, while managing sound setup and configuring mixers, speakers, cables, and audio equipment to ensure high-quality acoustics and sound.</li>
              </ul>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="mt-5">
            <h2 className="text-xs font-bold tracking-wider text-neutral-900 uppercase border-b border-neutral-800 pb-0.5 mb-2">
              Projects
            </h2>

            <div className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-neutral-900">Blue Team Operations & Detection Homelab</span>
                <div className="space-x-2 text-xs">
                  <span className="text-blue-600 font-medium">Notion</span>
                  <span>•</span>
                  <a href="https://github.com/Premilpatel" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">GitHub</a>
                </div>
              </div>
              <ul className="list-disc ml-5 mt-1 text-neutral-700 space-y-1 text-xs">
                <li>Provisioned and configured virtual machines (Windows, Linux, Domain Controller, security server) using VirtualBox to support a simulated enterprise lab environment to analyze attacker techniques and defensive controls and tools.</li>
                <li>Simulated credential brute-forcing and reverse-shell payloads against Active Directory to write detection alerts (Wazuh).</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-neutral-900">Network Security Architecture & Design</span>
                <span className="text-neutral-600 text-xs">Writeup</span>
              </div>
              <ul className="list-disc ml-5 mt-1 text-neutral-700 text-xs">
                <li>Designed and implemented a Dual-Path Dual-Layer firewall architecture with segmented DMZ and Intranet networks, configuring NAT/PAT, static routing, and firewall rules to secure public-facing services while isolating internal systems.</li>
              </ul>
            </div>
          </div>

          {/* SKILLS */}
          <div className="mt-5">
            <h2 className="text-xs font-bold tracking-wider text-neutral-900 uppercase border-b border-neutral-800 pb-0.5 mb-2">
              Skills
            </h2>
            <div className="space-y-1 text-xs text-neutral-800">
              <p><span className="font-semibold">Languages:</span> C, Java, Python, SQL, KQL</p>
              <p><span className="font-semibold">Tools:</span> Windows, Linux, Git, Podman, Claude SDK, Graph/REST APIs, Grafana/Power BI</p>
              <p><span className="font-semibold">Security:</span> Azure (Functions), WIZ Cloud Security, Microsoft Sentinel & Defender, Sigma Rules, ThreatStream, Abnormal AI, CI/CD</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
