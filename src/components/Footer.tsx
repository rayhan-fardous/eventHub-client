import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-panel/30 py-10 sm:py-12 relative overflow-hidden shrink-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-left">
          
          {/* Logo Brand Info — spans full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo.png"
                alt="EventHub Logo"
                width={32}
                height={32}
                className="h-8 w-auto object-contain shrink-0"
              />
              <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-brand-indigo via-brand-indigo to-brand-cyan bg-clip-text text-transparent">
                EVENT<span className="text-brand-cyan">HUB</span>
              </span>
            </Link>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-brand-text-secondary leading-relaxed max-w-xs">
              Bangladesh&apos;s ultimate event hosting and management portal. Explore hackathons, UI workshops, conferences, and board sessions.
            </p>
          </div>

          {/* Column 1: Explorer */}
          <div>
            <h4 className="text-xs font-semibold text-brand-text-primary uppercase tracking-wider mb-3 sm:mb-4">
              Explore
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
              <li>
                <Link href="/events?category=Technology" className="hover:text-brand-cyan transition-colors">Technology Expo</Link>
              </li>
              <li>
                <Link href="/events?category=Hackathon" className="hover:text-brand-cyan transition-colors">Developer Hackathons</Link>
              </li>
              <li>
                <Link href="/events?category=Workshop" className="hover:text-brand-cyan transition-colors">Hands-on Workshops</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-brand-cyan transition-colors">Explore All Events</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Hosting */}
          <div>
            <h4 className="text-xs font-semibold text-brand-text-primary uppercase tracking-wider mb-3 sm:mb-4">
              Hosts
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
              <li>
                <Link href="/events/create" className="hover:text-brand-cyan transition-colors">Create Event Dashboard</Link>
              </li>
              <li>
                <Link href="/events/manage" className="hover:text-brand-cyan transition-colors">Manage Subscriptions</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-brand-cyan transition-colors">RSVP Analytics Portal</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-xs font-semibold text-brand-text-primary uppercase tracking-wider mb-3 sm:mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
              <li>
                <a href="#" className="hover:text-brand-cyan transition-colors">Privacy Statement</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-cyan transition-colors">Help Center</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-brand-border/60 w-full mb-6 sm:mb-8" />

        {/* Footer Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-text-muted">
          <div className="text-center sm:text-left">
            © 2026 EventHub Inc. Designed with responsive dark aesthetics.
          </div>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-brand-text-secondary transition-colors">Facebook</a>
            <a href="#" className="hover:text-brand-text-secondary transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-text-secondary transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
