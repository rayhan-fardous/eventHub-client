'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Tag, Star, ArrowRight } from 'lucide-react';
import { Event } from '@/lib/mockEvents';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const isFree = event.price === 0;

  return (
    <div className="group relative flex flex-col justify-between h-full bg-brand-panel/60 border border-brand-border hover:border-brand-cyan/40 rounded-[2rem] overflow-hidden shadow-lg transition-all duration-300 hover:shadow-brand-indigo-glow/5 hover:scale-[1.01] backdrop-blur-sm">
      
      {/* Event Header Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 shrink-0">
        {/* We use standard <img> since it doesn't require Next.js domains whitelist for external unsplash URLs in remote config */}
        <img
          src={event.images[0]}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Overlay Tag */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-bg/85 text-brand-cyan border border-brand-cyan/20 backdrop-blur-md">
          <Tag className="size-3" />
          {event.category}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 right-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan text-brand-bg shadow-lg shadow-brand-cyan-glow/20">
          {isFree ? 'FREE' : `৳${event.price.toLocaleString()}`}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-grow p-6">
        {/* Rating and Date line */}
        <div className="flex items-center justify-between text-xs text-brand-text-secondary mb-3 font-medium">
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/5 py-1 px-2.5 rounded-lg">
            <Calendar className="size-3.5 text-brand-cyan" />
            {event.date}
          </span>
          <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 py-1 px-2.5 rounded-lg border border-yellow-500/15">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            {event.rating.toFixed(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-brand-text-primary tracking-tight line-clamp-1 group-hover:text-brand-cyan transition-colors duration-200">
          {event.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-brand-text-secondary mt-2 line-clamp-2 leading-relaxed flex-grow">
          {event.shortDescription}
        </p>

        {/* Divider */}
        <div className="h-px bg-brand-border/60 my-4 shrink-0" />

        {/* Metadata section */}
        <div className="grid grid-cols-2 gap-3 text-xs text-brand-text-secondary shrink-0 mb-4 font-medium">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="size-3.5 text-brand-cyan shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-brand-text-muted">Seats:</span>
            <span className="font-semibold text-brand-text-primary truncate">
              {event.seats.total - event.seats.booked} left
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/events/${event.id}`}
          className="w-full py-3 rounded-xl border border-brand-border bg-white/5 group-hover:bg-brand-indigo group-hover:text-brand-bg group-hover:border-brand-indigo font-bold transition-all duration-300 text-sm flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          View Details
          <ArrowRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
}
