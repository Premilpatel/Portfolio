'use client';

import React, { useState } from 'react';
import { Download, Mail, ExternalLink, Printer, Check, Copy, Eye } from 'lucide-react';
import { GithubIcon } from '@/components/ui/brand-icons';

export const ResumeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('patelpremil70@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#525659] text-neutral-800 select-none overflow-hidden">
      {/* Authentic macOS Preview / PDF Viewer Toolbar */}
      <div className="h-11 bg-[#323639] text-white px-4 flex items-center justify-between text-xs border-b border-black/40 shrink-0">
        <div className="flex items-center space-x-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/icons/mac-pdf.png" 
            alt="PDF Icon" 
            className="w-4 h-5 object-contain"
          />
          <span className="font-semibold text-neutral-100 text-xs tracking-tight">Premil_Patel_Resume.pdf</span>
          <span className="text-[11px] text-neutral-400 font-normal">| 1 Page</span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button 
            onClick={copyEmail}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-neutral-200 text-xs transition-colors"
            title="Copy email to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied Email' : 'Copy Email'}</span>
          </button>

          <a 
            href="/Premil_Patel_Resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            title="Open in new browser tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <a 
            href="/Premil_Patel_Resume.pdf" 
            download="Premil_Patel_Resume.pdf"
            className="flex items-center space-x-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded font-medium transition-colors"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>

          <a 
            href="mailto:patelpremil70@gmail.com"
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </div>

      {/* PDF Viewport rendering the exact original resume */}
      <div className="flex-1 w-full h-full bg-[#525659] relative overflow-hidden">
        <object
          data="/Premil_Patel_Resume.pdf#toolbar=1&navpanes=0&view=FitH"
          type="application/pdf"
          className="w-full h-full border-none"
        >
          <iframe
            src="/Premil_Patel_Resume.pdf#toolbar=1&navpanes=0&view=FitH"
            className="w-full h-full border-none"
            title="Premil Patel Official Resume"
          >
            <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center">
              <p className="mb-4">Unable to display PDF directly in your browser.</p>
              <a
                href="/Premil_Patel_Resume.pdf"
                download="Premil_Patel_Resume.pdf"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
              >
                Download Premil Patel Resume (PDF)
              </a>
            </div>
          </iframe>
        </object>
      </div>
    </div>
  );
};

export default ResumeViewer;
