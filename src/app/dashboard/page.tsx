'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Clock, CreditCard, Sparkles, RefreshCw, Bookmark, ArrowRight, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchUserBookings, Booking } from '@/lib/api';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load user bookings
  useEffect(() => {
    if (user) {
      setDataLoading(true);
      fetchUserBookings(user.email)
        .then((data) => {
          setBookings(data);
        })
        .catch((err) => {
          console.error("Failed to load user bookings:", err);
        })
        .finally(() => {
          setDataLoading(false);
        });
    }
  }, [user]);

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

  // Stats computation
  const totalBooked = bookings.length;
  const totalCost = bookings.reduce((sum, b) => sum + b.eventPrice, 0);
  const freeEventsCount = bookings.filter(b => b.eventPrice === 0).length;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between relative overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-brand-indigo-glow filter blur-[120px] opacity-35 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/10 filter blur-[100px]" />

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
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
              Track your registered event RSVPs, tickets, and bookings history in one unified panel.
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

        {/* Stats Grid Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {/* Card 1 */}
          <div className="bg-brand-panel/40 border border-brand-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
            <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider block">Booked RSVPs</span>
            <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-brand-text-primary">{totalBooked}</span>
              <span className="text-xs text-brand-text-secondary">Registered Events</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-brand-panel/40 border border-brand-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
            <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider block">Total Expenditure</span>
            <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-brand-cyan">৳{totalCost.toLocaleString()}</span>
              <span className="text-xs text-brand-text-secondary">BDT Paid</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-brand-panel/40 border border-brand-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
            <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider block">Free Access RSVPs</span>
            <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-brand-text-primary">{freeEventsCount}</span>
              <span className="text-xs text-brand-text-secondary">Complimentary Passes</span>
            </div>
          </div>
        </section>

        {/* Booked Events Section */}
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
