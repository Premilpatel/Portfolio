'use client';

import React, { useState } from 'react';
import { Send, Check, Copy, ExternalLink } from 'lucide-react';

export const MailApp: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:patelpremil70@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(`Hi Premil,\n\nFrom: ${senderName} (${senderEmail})\n\n${body}`)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('patelpremil70@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full w-full bg-neutral-900 text-neutral-100 flex flex-col p-5 select-none overflow-y-auto">
      <div className="max-w-xl mx-auto w-full space-y-4">
        {/* Header with Gmail icon */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/gmail.png" alt="Gmail" className="w-5 h-5 object-contain" />
            <h2 className="text-sm font-semibold text-white">Gmail — Message Premil Patel</h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyEmail}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs text-neutral-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Email!' : 'Copy Email'}</span>
            </button>

            <a
              href="mailto:patelpremil70@gmail.com"
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-red-600 hover:bg-red-500 text-xs text-white transition-colors"
            >
              <span>Open in Gmail</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 px-6 text-center space-y-3 bg-white/5 rounded-2xl border border-white/10 my-8">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Message sent!</h3>
            <p className="text-xs text-neutral-300">Thank you for reaching out.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="flex items-center border-b border-white/10 py-1.5">
              <span className="w-16 text-neutral-400">To:</span>
              <span className="font-medium text-red-400">patelpremil70@gmail.com</span>
            </div>

            <div className="flex items-center border-b border-white/10 py-1.5">
              <span className="w-16 text-neutral-400">From Name:</span>
              <input
                type="text"
                required
                placeholder="Your Name / Organization"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-500"
              />
            </div>

            <div className="flex items-center border-b border-white/10 py-1.5">
              <span className="w-16 text-neutral-400">Your Email:</span>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-500"
              />
            </div>

            <div className="flex items-center border-b border-white/10 py-1.5">
              <span className="w-16 text-neutral-400">Subject:</span>
              <input
                type="text"
                required
                placeholder="Cybersecurity / Software Engineering Opportunity"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-500"
              />
            </div>

            <div className="pt-2">
              <textarea
                required
                rows={7}
                placeholder="Hi Premil, I saw your portfolio and would love to connect..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 outline-none focus:ring-1 focus:ring-red-500 leading-relaxed font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-500 rounded-xl font-medium text-white flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-red-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Send Email</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MailApp;
