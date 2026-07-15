import React from 'react';
import { Users2, ShieldAlert, BadgeCheck, Star } from 'lucide-react';

const stats = [
  { label: 'Active Attendees', value: '15,000+', icon: Users2, color: 'text-brand-indigo' },
  { label: 'Events Hosted', value: '350+', icon: BadgeCheck, color: 'text-brand-cyan' },
  { label: 'Partner Brands', value: '80+', icon: ShieldAlert, color: 'text-purple-400' },
  { label: 'Average Rating', value: '4.85/5', icon: Star, color: 'text-yellow-400' }
];

export default function Statistics() {
  return (
    <section className="py-16 bg-brand-panel/20 border-y border-brand-border/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-brand-bg/40 border border-brand-border/60 p-6 sm:p-8 rounded-[2rem] text-center hover:border-brand-cyan/20 transition-colors duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/5 to-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex justify-center mb-3">
                  <Icon className={`size-6 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-brand-text-secondary mt-2 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
