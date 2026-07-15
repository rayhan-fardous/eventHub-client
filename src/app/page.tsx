import React from 'react';
import Link from 'next/link';
import { Calendar, Compass, ArrowRight, Shield, Zap, BarChart3, Users, Clock, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-brand-bg text-brand-text-primary">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-brand-indigo-glow filter blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-brand-cyan-glow filter blur-[150px] opacity-75" />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8 text-center relative">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan-glow/10 text-xs font-semibold text-brand-cyan mb-6 tracking-wide uppercase text-glow-cyan">
            <Sparkles className="size-3.5" />
            Empowering Event Creators Globally
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-4xl mx-auto leading-tight sm:leading-none">
            Discover, Host & Manage <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-indigo via-brand-indigo to-brand-cyan bg-clip-text text-transparent pr-1">
              Extraordinary Events
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-brand-text-secondary max-w-2xl mx-auto leading-relaxed">
            Seamlessly organize meetups, tech conferences, hackathons, and concerts with real-time RSVPs, detailed analytics, and full event life-cycle controls.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-brand-bg font-bold shadow-lg shadow-brand-indigo-glow/30"
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/events"
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-brand-border bg-white/5 hover:bg-white/10 hover:border-brand-cyan/40 active:scale-[0.98] transition-all duration-200 font-semibold"
            >
              Explore Events
            </Link>
          </div>

          {/* Mockup Dashboard Preview */}
          <div className="mt-16 sm:mt-24 max-w-5xl mx-auto p-2 sm:p-3 rounded-[2.5rem] border border-white/10 bg-brand-panel/40 backdrop-blur shadow-2xl relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-brand-indigo/10 to-brand-cyan/10 pointer-events-none" />
            <div className="glass-panel rounded-[2rem] overflow-hidden p-6 sm:p-10 border border-white/5 bg-brand-panel/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-6">
                <div>
                  <h3 className="text-xl font-bold text-left">NextGen Tech Summit 2026</h3>
                  <p className="text-sm text-brand-text-secondary text-left flex items-center gap-1.5 mt-1">
                    <Calendar className="size-3.5 text-brand-cyan" />
                    October 24-26, 2026 • San Francisco, CA
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <span className="px-3 py-1 text-xs rounded-full bg-brand-cyan-glow/20 border border-brand-cyan/20 text-brand-cyan font-semibold">
                    Live Dashboard
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-semibold ml-auto sm:ml-0">
                    RSVP Active
                  </span>
                </div>
              </div>

              {/* Mock Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
                {[
                  { label: 'Total RSVPs', value: '1,482', change: '+18% this week', icon: Users, color: 'text-brand-indigo' },
                  { label: 'Capacity Limit', value: '2,000', change: '74.1% Filled', icon: Shield, color: 'text-brand-cyan' },
                  { label: 'Check-in Rate', value: '92.4%', change: 'Highly Active', icon: Zap, color: 'text-yellow-400' },
                  { label: 'Views Count', value: '12.8K', change: '+3.2K today', icon: BarChart3, color: 'text-pink-500' }
                ].map((stat, i) => (
                  <div key={i} className="bg-brand-bg/50 border border-brand-border/60 p-4 sm:p-5 rounded-2xl text-left relative overflow-hidden group hover:border-brand-cyan/30 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-brand-text-secondary">{stat.label}</span>
                      <stat.icon className={`size-4 ${stat.color}`} />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold mt-2 tracking-tight">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-brand-text-muted mt-1">{stat.change}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="border-t border-brand-border/60 bg-brand-panel/20 py-20 sm:py-28 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Engineered for High-Performance Hosting
              </h2>
              <p className="mt-4 text-brand-text-secondary text-base sm:text-lg">
                Whether hosting a virtual meetup or an in-person stadium concert, EventHub provides the exact toolsets to ensure flawless operations.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Lightning-Fast Setup',
                  description: 'Generate beautiful event pages in minutes. Custom templates, scheduling details, maps, and tickets are automatically prepared.',
                  icon: Zap,
                  glow: 'group-hover:text-glow-indigo'
                },
                {
                  title: 'Robust Security',
                  description: 'Enterprise-grade user auth, ticket fraud prevention, and session privacy options keeping your attendee lists fully safe and compliant.',
                  icon: Shield,
                  glow: 'group-hover:text-glow-cyan'
                },
                {
                  title: 'Advanced RSVP Analytics',
                  description: 'Watch signups roll in live. Follow custom questionnaires, trace referral codes, and export attendance records seamlessly.',
                  icon: BarChart3,
                  glow: 'group-hover:text-glow-indigo'
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="glass-panel glass-panel-hover group p-8 rounded-3xl flex flex-col items-start gap-4 transition-all duration-300"
                >
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-indigo/10 to-brand-cyan/10 border border-brand-border text-brand-cyan group-hover:text-brand-indigo group-hover:border-brand-cyan/30 transition-all duration-300">
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight mt-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic call to action banner */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-brand-border bg-gradient-to-r from-brand-indigo/10 to-brand-cyan/10 p-8 sm:p-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-brand-cyan-glow/20 filter blur-3xl" />
            
            <div className="text-center md:text-left max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to organize your next big event?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-brand-text-secondary">
                Join thousands of organizers creating professional events on EventHub. Sign up and configure your first event dashboard in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
              <Link
                href="/signup"
                className="text-center px-6 py-3 rounded-xl bg-brand-text-primary text-brand-bg font-bold hover:bg-brand-text-secondary transition-colors"
              >
                Create Account
              </Link>
              <Link
                href="/events"
                className="text-center px-6 py-3 rounded-xl border border-brand-border hover:bg-white/5 transition-colors"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-border/60 bg-brand-bg py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-brand-text-muted">
          <div>
            © 2026 EventHub Inc. Designed with premium responsive layout.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-text-secondary transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}