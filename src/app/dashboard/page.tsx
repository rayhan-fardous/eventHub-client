'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  Sparkles,
  RefreshCw,
  Bookmark,
  ArrowRight,
  User,
  CalendarDays,
  CalendarCheck,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { fetchUserBookings, fetchEvents, Booking } from '@/lib/api';
import { Event } from '@/lib/mockEvents';
import Footer from '@/components/Footer';

// ── Recharts custom tooltip ──────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-brand-panel/95 border border-brand-border rounded-xl px-4 py-3 shadow-xl backdrop-blur-md text-xs">
      <p className="text-brand-text-primary font-bold mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

// ── Pie label renderer ───────────────────────────────────────────────────────

function renderPieLabel({ name, percent }: any) {
  if (percent < 0.05) return null;
  return `${name} ${(percent * 100).toFixed(0)}%`;
}

// ── Pie chart colors ─────────────────────────────────────────────────────────

const PIE_COLORS = ['#6366f1', '#06b6d4', '#a855f7', '#f59e0b', '#10b981', '#f43f5e'];
const BAR_GRADIENT_ID = 'barGradient';

// ── Month helpers ────────────────────────────────────────────────────────────

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load data in parallel
  useEffect(() => {
    if (user) {
      setDataLoading(true);
      Promise.all([
        fetchUserBookings(user.email).catch(() => [] as Booking[]),
        fetchEvents().catch(() => [] as Event[]),
      ])
        .then(([bookingsData, eventsData]) => {
          setBookings(bookingsData);
          setAllEvents(eventsData);
        })
        .finally(() => setDataLoading(false));
    }
  }, [user]);

  // ── Derived stats ────────────────────────────────────────────────────────

  const totalEvents = allEvents.length;
  const upcomingEvents = allEvents.filter(
    (e) => new Date(e.date) >= new Date()
  ).length;
  const registeredEvents = bookings.length;
  const totalCost = bookings.reduce((sum, b) => sum + b.eventPrice, 0);

  // ── Chart data ───────────────────────────────────────────────────────────

  const monthlyData = useMemo(() => {
    const counts: Record<string, number> = {};
    MONTH_NAMES.forEach((m) => (counts[m] = 0));
    allEvents.forEach((e) => {
      const d = new Date(e.date);
      if (!isNaN(d.getTime())) {
        counts[MONTH_NAMES[d.getMonth()]] += 1;
      }
    });
    return MONTH_NAMES.map((month) => ({ month, events: counts[month] }));
  }, [allEvents]);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    allEvents.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [allEvents]);

  const locationData = useMemo(() => {
    const counts: Record<string, number> = {};
    allEvents.forEach((e) => {
      counts[e.location] = (counts[e.location] || 0) + 1;
    });
    return Object.entries(counts).map(([name, events]) => ({ name, events }));
  }, [allEvents]);

  // ── Loading / unauthenticated guards ─────────────────────────────────────

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between">
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <div className="size-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-xl font-bold">Verifying User...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Stat card helper ─────────────────────────────────────────────────────

  const statCards = [
    {
      label: 'Total Events',
      value: totalEvents,
      sub: 'Platform‑wide',
      icon: CalendarDays,
      accent: 'text-brand-indigo',
      glow: 'from-brand-indigo/10 to-brand-indigo/5',
    },
    {
      label: 'Upcoming Events',
      value: upcomingEvents,
      sub: 'Scheduled ahead',
      icon: TrendingUp,
      accent: 'text-emerald-400',
      glow: 'from-emerald-500/10 to-emerald-500/5',
    },
    {
      label: 'Registered Events',
      value: registeredEvents,
      sub: 'Your RSVPs',
      icon: CalendarCheck,
      accent: 'text-brand-cyan',
      glow: 'from-brand-cyan/10 to-brand-cyan/5',
    },
    {
      label: 'Total Expenditure',
      value: `৳${totalCost.toLocaleString()}`,
      sub: 'BDT Spent',
      icon: CreditCard,
      accent: 'text-amber-400',
      glow: 'from-amber-500/10 to-amber-500/5',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between relative overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-brand-indigo-glow filter blur-[120px] opacity-35 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/10 filter blur-[100px]" />

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        {/* ── Dashboard Header ─────────────────────────────────────────────── */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 sm:gap-6 mb-10 sm:mb-12 border-b border-brand-border/60 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-3">
              <User className="size-3.5" />
              Member Space
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-text-primary">
              Welcome, {user.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-brand-text-secondary">
              Track your registered event RSVPs, analytics, and statistics in one unified panel.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              href="/events"
              className="px-4 sm:px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-brand-bg text-xs shadow-lg shadow-brand-indigo-glow/20 flex items-center gap-1.5"
            >
              Browse Events
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* ── Stats Grid Cards ─────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-brand-panel/40 border border-brand-border p-4 sm:p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-brand-cyan/30 transition-colors duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="text-[10px] sm:text-xs font-bold text-brand-text-muted uppercase tracking-wider">
                    {card.label}
                  </span>
                  <Icon className={`size-4 sm:size-5 ${card.accent}`} />
                </div>
                <div className="relative z-10">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-text-primary">
                    {card.value}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-brand-text-secondary mt-1">
                    {card.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Statistics Charts Section ────────────────────────────────────── */}
        <section className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <BarChart3 className="size-5 text-brand-cyan" />
            <h2 className="text-xl font-bold">Statistics &amp; Analytics</h2>
          </div>

          {dataLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <RefreshCw className="size-8 text-brand-cyan animate-spin mb-3" />
              <p className="text-xs text-brand-text-secondary font-semibold">Loading chart data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* ── Monthly Events Area Chart ────────────────────────────── */}
              <div className="bg-brand-panel/40 border border-brand-border rounded-[2rem] p-5 sm:p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-brand-text-primary">Monthly Events Distribution</h3>
                    <p className="text-[10px] sm:text-xs text-brand-text-muted mt-0.5">
                      Events spread across the year
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider">
                    <TrendingUp className="size-3" />
                    Trend
                  </div>
                </div>
                <div className="h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis
                        dataKey="month"
                        stroke="#64748b"
                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                        axisLine={{ stroke: '#1e293b' }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#64748b"
                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                        axisLine={{ stroke: '#1e293b' }}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="events"
                        name="Events"
                        stroke="#06b6d4"
                        strokeWidth={2.5}
                        fill="url(#areaGradient)"
                        dot={{ fill: '#06b6d4', r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: '#06b6d4', stroke: '#030712', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ── Category Pie Chart ───────────────────────────────────── */}
              <div className="bg-brand-panel/40 border border-brand-border rounded-[2rem] p-5 sm:p-6">
                <div className="mb-4">
                  <h3 className="text-sm sm:text-base font-bold text-brand-text-primary">Events by Category</h3>
                  <p className="text-[10px] sm:text-xs text-brand-text-muted mt-0.5">
                    Category‑wise distribution
                  </p>
                </div>
                <div className="h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="45%"
                        innerRadius="40%"
                        outerRadius="70%"
                        paddingAngle={3}
                        dataKey="value"
                        label={renderPieLabel}
                        stroke="none"
                      >
                        {categoryData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={8}
                        formatter={(value: string) => (
                          <span className="text-[10px] sm:text-xs text-brand-text-secondary font-medium">
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ── Events by Location Bar Chart ─────────────────────────── */}
              <div className="bg-brand-panel/40 border border-brand-border rounded-[2rem] p-5 sm:p-6">
                <div className="mb-4">
                  <h3 className="text-sm sm:text-base font-bold text-brand-text-primary">Events by Location</h3>
                  <p className="text-[10px] sm:text-xs text-brand-text-muted mt-0.5">
                    City‑wise breakdown
                  </p>
                </div>
                <div className="h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id={BAR_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                        axisLine={{ stroke: '#1e293b' }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#64748b"
                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                        axisLine={{ stroke: '#1e293b' }}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="events"
                        name="Events"
                        fill={`url(#${BAR_GRADIENT_ID})`}
                        radius={[8, 8, 0, 0]}
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── Booked Events Section ────────────────────────────────────────── */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2 border-b border-brand-border pb-3">
            <Bookmark className="size-5 text-brand-cyan" />
            <h2 className="text-xl font-bold">Your Bookings Timeline</h2>
          </div>

          {dataLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <RefreshCw className="size-8 text-brand-cyan animate-spin mb-3" />
              <p className="text-xs text-brand-text-secondary font-semibold">Syncing bookings database...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-16 rounded-[2.5rem] border border-brand-border bg-brand-panel/20 text-center max-w-md mx-auto">
              <Bookmark className="size-10 text-brand-cyan/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-text-primary">No Event Bookings</h3>
              <p className="text-sm text-brand-text-secondary mt-2">
                You haven&apos;t reserved a seat for any event yet. Let&apos;s find some interesting masterclasses or summits!
              </p>
              <Link
                href="/events"
                className="mt-6 inline-flex px-5 py-2.5 rounded-xl bg-brand-cyan hover:brightness-110 text-brand-bg font-bold text-xs cursor-pointer shadow-lg shadow-brand-cyan-glow/10 active:scale-[0.97] transition-all"
              >
                Find Events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {bookings.map((booking) => {
                const isFree = booking.eventPrice === 0;
                return (
                  <div
                    key={booking.id}
                    className="group bg-brand-panel/40 border border-brand-border hover:border-brand-cyan/40 hover:-translate-y-1 transition-all duration-300 rounded-[2rem] overflow-hidden flex flex-col justify-between shadow-lg"
                  >
                    {/* Header Image banner */}
                    <div className="aspect-video w-full relative overflow-hidden bg-brand-bg border-b border-brand-border">
                      <img
                        src={booking.eventImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'}
                        alt={booking.eventTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold bg-brand-bg/80 backdrop-blur text-brand-cyan border border-brand-cyan/20 uppercase tracking-wider">
                        Confirmed RSVP
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-brand-text-primary line-clamp-1 group-hover:text-brand-cyan transition-colors">
                          {booking.eventTitle}
                        </h3>

                        <div className="space-y-2 pt-2">
                          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
                            <Calendar className="size-3.5 text-brand-cyan shrink-0" />
                            <span>{booking.eventDate}</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
                            <Clock className="size-3.5 text-brand-cyan shrink-0" />
                            <span>{booking.eventTime}</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
                            <MapPin className="size-3.5 text-brand-cyan shrink-0" />
                            <span className="line-clamp-1">{booking.eventLocation}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Cost & Ticket Action */}
                      <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="size-3.5 text-brand-text-muted" />
                          <span className="text-xs font-bold text-brand-text-secondary">
                            {isFree ? 'FREE RSVP' : `৳${booking.eventPrice.toLocaleString()}`}
                          </span>
                        </div>

                        <Link
                          href={`/events/${booking.eventId}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-cyan hover:text-brand-cyan-hover transition-colors"
                        >
                          View Details
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
