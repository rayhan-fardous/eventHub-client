import React from 'react';
import { ShieldCheck, Award, BellRing, Sparkles } from 'lucide-react';

const reasons = [
  {
    title: "Vetted Organizers",
    description: "Every event is fully reviewed and verified by our team to guarantee authentic speakers, secure locations, and valid agendas.",
    icon: ShieldCheck
  },
  {
    title: "Premium Experience",
    description: "Enjoy state-of-the-art interactive check-ins, automated calendar syncs, and comprehensive slides delivery after sessions.",
    icon: Award
  },
  {
    title: "Real-Time Notifications",
    description: "Get instant emails and SMS alerts regarding schedule changes, queue shifts, seat vacancy, or speaker updates.",
    icon: BellRing
  },
  {
    title: "Curated Variety",
    description: "From tech hackathons and cybersecurity certifications to corporate finance summits, choose exactly what fuels your growth.",
    icon: Sparkles
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-brand-bg relative">
      {/* Glow background */}
      <div className="absolute bottom-10 left-10 -z-10 h-72 w-72 rounded-full bg-brand-cyan-glow/5 filter blur-[80px]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 px-3 py-1 rounded-full uppercase">
            Value Proposition
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl mt-3">
            Why Choose EventHub?
          </h2>
          <p className="mt-4 text-brand-text-secondary text-base sm:text-lg">
            We bridge the gap between world-class organizers and active knowledge-seekers through a highly optimized dashboard.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="glass-panel glass-panel-hover p-8 rounded-[2rem] flex flex-col gap-4 text-left transition-all duration-300"
              >
                <div className="size-12 rounded-2xl bg-gradient-to-br from-brand-indigo/10 to-brand-cyan/10 border border-brand-border flex items-center justify-center text-brand-cyan">
                  <Icon className="size-6 text-brand-cyan" />
                </div>
                <h3 className="text-lg font-bold text-brand-text-primary mt-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
