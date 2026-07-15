'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Briefcase, Wrench, Mic, GraduationCap, Code, ArrowRight } from 'lucide-react';

const categoriesList = [
  { name: 'Technology', icon: Cpu, count: '3 Events', color: 'from-blue-500/10 to-brand-cyan/10 border-blue-500/20 text-blue-400' },
  { name: 'Business', icon: Briefcase, count: '2 Events', color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400' },
  { name: 'Workshop', icon: Wrench, count: '1 Event', color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400' },
  { name: 'Conference', icon: Mic, count: '1 Event', color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400' },
  { name: 'Seminar', icon: GraduationCap, count: '1 Event', color: 'from-rose-500/10 to-red-500/10 border-rose-500/20 text-rose-400' },
  { name: 'Hackathon', icon: Code, count: '1 Event', color: 'from-brand-indigo-glow to-violet-500/10 border-brand-indigo/20 text-brand-indigo' }
];

export default function Categories() {
  return (
    <section className="py-20 bg-brand-panel/10 border-y border-brand-border/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl">
            Browse By Category
          </h2>
          <p className="mt-4 text-brand-text-secondary text-base sm:text-lg">
            Find workshops, hackathons, and seminars tailored specifically to your interests and skills.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoriesList.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/events?category=${category.name}`}
                className={`group relative p-6 rounded-[2rem] border bg-gradient-to-b ${category.color} hover:brightness-110 active:scale-[0.97] transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[170px] shadow-sm hover:shadow-lg`}
              >
                <div className="p-4 rounded-2xl bg-brand-bg/60 border border-white/5 text-brand-text-primary group-hover:scale-105 transition-transform duration-300">
                  <Icon className="size-6 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-brand-text-primary mt-4 tracking-tight">
                    {category.name}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-brand-text-secondary block mt-1">
                    {category.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
