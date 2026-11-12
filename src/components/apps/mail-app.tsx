'use client';

import React, { useState } from 'react';
import { Send, Check, Copy, Mail } from 'lucide-react';

export const MailApp: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:premilpatel.dev@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Premil,\n\nFrom: ${senderName} (${senderEmail})\n\n${body}`)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('premilpatel.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full w-full bg-neutral-900 text-neutral-100 flex flex-col p-5 select-none overflow-y-auto">
      <div className="max-w-xl mx-auto w-full space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">New Message to Premil Patel</h2>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs text-neutral-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Email!' : 'Copy Email'}</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-white/5 rounded-2xl border border-white/10 my-8">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Thank you!</h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Your default email client was opened. You can also directly contact Premil at <span className="text-blue-400 font-semibold">premilpatel.dev@gmail.com</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="flex items-center border-b border-white/10 py-1.5">
              <span className="w-16 text-neutral-400">To:</span>
              <span className="font-medium text-blue-400">premilpatel.dev@gmail.com</span>
            </div>

            <div className="flex items-center border-b border-white/10 py-1.5">
              <span className="w-16 text-neutral-400">From Name:</span>
              <input
                type="text"
                required
                placeholder="Your Name / Company"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-500"
              />
            </div>

            <div className="flex items-center border-b border-white/10 py-1.5">
              <span className="w-16 text-neutral-400">Reply Email:</span>
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
                placeholder="Software Engineering Role / Project Inquiry"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-500"
              />
            </div>

            <div className="pt-2">
              <textarea
                required
                rows={7}
                placeholder="Write your message here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium text-white flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-blue-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MailApp;
