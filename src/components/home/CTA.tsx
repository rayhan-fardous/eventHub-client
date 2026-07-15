import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-brand-border bg-gradient-to-r from-brand-indigo/15 to-brand-cyan/15 p-6 sm:p-10 lg:p-16 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 shadow-2xl">
        {/* Glow ambient layer */}
        <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/20 filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 h-80 w-80 rounded-full bg-brand-indigo-glow/20 filter blur-3xl pointer-events-none" />

        <div className="text-center md:text-left max-w-xl w-full md:w-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-3 sm:mb-4">
            <Sparkles className="size-3.5" />
            Host & Expand
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-brand-text-primary leading-tight">
            Ready to organize your next big event?
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            Join thousands of creators hosting professional events on EventHub. Set up customized registration portals, check-in widgets, and seat metrics in under 3 minutes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto shrink-0 z-10">
          <Link
            href="/register"
            className="text-center px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-brand-text-primary text-brand-bg font-bold hover:bg-brand-text-secondary active:scale-[0.98] transition-all duration-200 text-sm sm:text-base"
          >
            Create Account
          </Link>
          <Link
            href="/events"
            className="text-center px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-brand-border bg-white/5 hover:bg-white/10 hover:border-brand-cyan/30 active:scale-[0.98] transition-all duration-200 font-semibold flex items-center justify-center gap-1.5 text-sm sm:text-base"
          >
            Browse Events
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
