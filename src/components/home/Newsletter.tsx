'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-brand-panel/10 border-t border-brand-border/60 relative overflow-hidden">
      {/* Ambient glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-brand-cyan-glow/5 filter blur-[80px]" />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-4">
          <Sparkles className="size-3.5" />
          Stay Loop
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl">
          Subscribe to Our Newsletter
        </h2>
        <p className="mt-4 text-brand-text-secondary text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Get weekly updates on popular conferences, seminars, and hackathons hosted around Bangladesh. No spam, unsubscribe anytime.
        </p>

        <div className="mt-8 max-w-md mx-auto">
          {subscribed ? (
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/10 text-sm font-semibold text-green-400">
              ✨ Subscription successful! Check your inbox for confirmation.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brand-text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-brand-bg border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-brand-bg shadow-lg shadow-brand-indigo-glow/20 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                Subscribe
                <Send className="size-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
