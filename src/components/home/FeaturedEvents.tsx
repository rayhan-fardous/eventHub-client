'use client';

import React from 'react';
import { Award } from 'lucide-react';
import { mockEvents } from '@/lib/mockEvents';
import EventCard from '@/components/cards/EventCard';

export default function FeaturedEvents() {
  // Filter events with rating >= 4.8
  const featured = mockEvents.filter((event) => event.rating >= 4.8).slice(0, 3);

  return (
    <section className="py-20 bg-brand-bg relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-3">
            <Award className="size-3.5" />
            Curated Highlights
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl">
            Featured Events
          </h2>
          <p className="mt-4 text-brand-text-secondary text-base sm:text-lg">
            Hand-picked, highly-rated gatherings with exceptional speaker ratings and workshop materials.
          </p>
        </div>

        {/* Featured Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

      </div>
    </section>
  );
}
