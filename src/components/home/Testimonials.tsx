import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "EventHub has completely transformed how we coordinate our tech hackathons. The integrated RSVP tracking and automated schedule notifications worked flawlessly.",
    author: "Nabil Ahmed",
    role: "Lead organizer, Devs BD Initiative",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80"
  },
  {
    quote: "The live analytics dashboard saved us dozens of hours. Monitoring seed pitches and managing panel questions in real-time has never been this streamlined.",
    author: "Sadia Rahman",
    role: "Senior HR Specialist, Neural Labs",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
  },
  {
    quote: "Booking seats and syncing agendas to my calendar is a breeze. I booked the UI/UX design masterclass in less than a minute and received instant entry passes.",
    author: "Fahim Shahriar",
    role: "Freelance Product Designer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&q=80"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-brand-panel/10 border-y border-brand-border/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 px-3 py-1 rounded-full uppercase">
            Social Proof
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl mt-3">
            What Our Community Says
          </h2>
          <p className="mt-4 text-brand-text-secondary text-base sm:text-lg">
            Hear from leading developers, startup founders, and design professionals hosting events on EventHub.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="glass-panel glass-panel-hover p-8 rounded-[2.5rem] flex flex-col justify-between text-left transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-8 size-10 text-brand-cyan/10 pointer-events-none" />
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-brand-text-primary leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Metadata */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-brand-border/50 shrink-0">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="size-11 rounded-full border border-brand-border object-cover bg-zinc-800"
                />
                <div>
                  <h4 className="text-sm font-bold text-brand-text-primary">{t.author}</h4>
                  <span className="text-xs text-brand-text-secondary block mt-0.5">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
