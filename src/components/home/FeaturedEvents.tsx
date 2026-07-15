'use client';

import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { Event } from '@/lib/mockEvents';
import { fetchEvents } from '@/lib/api';
import EventCard from '@/components/cards/EventCard';
import EventSkeleton from '@/components/cards/EventSkeleton';

export default function FeaturedEvents() {
  const [featured, setFeatured] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchEvents()
      .then((data) => {
        const filtered = data.filter((event) => event.rating >= 4.8).slice(0, 3);
        setFeatured(filtered);
      })
      .catch((err) => {
        console.error("Failed to load featured events:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <EventSkeleton key={i} />)
            : featured.map((event) => <EventCard key={event.id} event={event} />)}
        </div>

      </div>
    </section>
  );
}
