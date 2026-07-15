'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarRange, ArrowRight } from 'lucide-react';
import { Event } from '@/lib/mockEvents';
import { fetchEvents } from '@/lib/api';
import EventCard from '@/components/cards/EventCard';
import EventSkeleton from '@/components/cards/EventSkeleton';
import { useState, useEffect } from 'react';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchEvents()
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(sorted.slice(0, 3));
      })
      .catch((err) => {
        console.error("Failed to load upcoming events:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-brand-bg relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-3">
              <CalendarRange className="size-3.5" />
              Chronological
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-text-primary md:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-brand-text-secondary max-w-xl text-sm sm:text-base">
              Secure your spots for the most anticipated events scheduled in the next few weeks.
            </p>
          </div>
          <Link
            href="/events"
            className="flex items-center gap-1.5 text-sm font-bold text-brand-cyan hover:text-brand-cyan-hover transition-colors shrink-0 group self-start sm:self-auto"
          >
            Explore All Events
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Events Grid — 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <EventSkeleton key={i} />)
            : events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>

      </div>
    </section>
  );
}
