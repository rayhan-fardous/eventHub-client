'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Users, Plus, RefreshCw, Layers, ArrowRight, ShieldCheck, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchEvents, deleteEvent } from '@/lib/api';
import { Event } from '@/lib/mockEvents';
import Footer from '@/components/Footer';

export default function ManageEventsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteTitle, setConfirmDeleteTitle] = useState<string>('');

  const handleDeleteClick = (id: string, title: string) => {
    setConfirmDeleteId(id);
    setConfirmDeleteTitle(title);
  };

  const handleConfirmDelete = async (id: string) => {
    if (!user) return;
    setConfirmDeleteId(null);
    setDeletingId(id);
    try {
      await deleteEvent(id, user.email);
      setCreatedEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete event");
    } finally {
      setDeletingId(null);
      setConfirmDeleteTitle('');
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load user's hosted events
  useEffect(() => {
    if (user) {
      setDataLoading(true);
      fetchEvents({ creatorEmail: user.email })
        .then((data) => {
          setCreatedEvents(data);
        })
        .catch((err) => {
          console.error("Failed to load hosted events:", err);
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
          <h2 className="text-xl font-bold">Verifying Permissions...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between relative overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-brand-indigo-glow filter blur-[120px] opacity-35 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/10 filter blur-[100px]" />

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        
        {/* Manage Header */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 sm:gap-6 mb-10 sm:mb-12 border-b border-brand-border/60 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-3">
              <ShieldCheck className="size-3.5" />
              Organizer Console
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-text-primary">
              Manage Your Hosted Events
            </h1>
            <p className="mt-2 text-sm sm:text-base text-brand-text-secondary">
              Review and monitor your published events, check attendee reservations, and add agenda updates.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/events/create"
              className="px-4 sm:px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-brand-bg text-xs shadow-lg shadow-brand-indigo-glow/20 flex items-center gap-1.5"
            >
              <Plus className="size-4" />
              Create Event
            </Link>
          </div>
        </section>

        {/* Hosted Events List */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2 border-b border-brand-border pb-3">
            <Layers className="size-5 text-brand-cyan" />
            <h2 className="text-xl font-bold">Published Events ({createdEvents.length})</h2>
          </div>

          {dataLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <RefreshCw className="size-8 text-brand-cyan animate-spin mb-3" />
              <p className="text-xs text-brand-text-secondary font-semibold">Retrieving hosted events records...</p>
            </div>
          ) : createdEvents.length === 0 ? (
            <div className="p-16 rounded-[2.5rem] border border-brand-border bg-brand-panel/20 text-center max-w-md mx-auto">
              <Layers className="size-10 text-brand-cyan/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-text-primary">No Hosted Events</h3>
              <p className="text-sm text-brand-text-secondary mt-2">
                You haven&apos;t hosted any events yet. Publish a new hackathon, summit or workshop to get started!
              </p>
              <Link
                href="/events/create"
                className="mt-6 inline-flex px-5 py-2.5 rounded-xl bg-brand-cyan hover:brightness-110 text-brand-bg font-bold text-xs cursor-pointer shadow-lg shadow-brand-cyan-glow/10 active:scale-[0.97] transition-all"
              >
                Host Event Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {createdEvents.map((event) => {
                const totalSeats = event.seats.total;
                const bookedSeats = event.seats.booked;
                const fillPercent = Math.min(100, Math.round((bookedSeats / totalSeats) * 100));
                
                return (
                  <div
                    key={event.id}
                    className="group bg-brand-panel/40 border border-brand-border hover:border-brand-cyan/40 hover:-translate-y-1 transition-all duration-300 rounded-[2rem] overflow-hidden flex flex-col justify-between shadow-lg"
                  >
                    {/* Header Image banner */}
                    <div className="aspect-video w-full relative overflow-hidden bg-brand-bg border-b border-brand-border">
                      <img
                        src={event.images && event.images.length > 0 ? event.images[0] : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold bg-brand-bg/80 backdrop-blur text-brand-cyan border border-brand-cyan/20 uppercase tracking-wider">
                        {event.category}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-brand-text-primary line-clamp-1 group-hover:text-brand-cyan transition-colors">
                          {event.title}
                        </h3>
                        
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
                            <Calendar className="size-3.5 text-brand-cyan shrink-0" />
                            <span>{event.date}</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
                            <Clock className="size-3.5 text-brand-cyan shrink-0" />
                            <span>{event.time}</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
                            <MapPin className="size-3.5 text-brand-cyan shrink-0" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Attendee Booking Progress */}
                      <div className="space-y-2 border-t border-brand-border/60 pt-4 mt-4">
                        <div className="flex justify-between text-[11px] text-brand-text-secondary font-semibold">
                          <span className="flex items-center gap-1"><Users className="size-3 text-brand-cyan" /> Reserved Seats</span>
                          <span>{fillPercent}% Booked</span>
                        </div>
                        <div className="h-1.5 w-full bg-brand-bg rounded-full overflow-hidden border border-brand-border">
                          <div
                            className="h-full bg-gradient-to-r from-brand-indigo to-brand-cyan transition-all duration-500 rounded-full"
                            style={{ width: `${fillPercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-brand-text-muted font-semibold">
                          <span>{bookedSeats} / {totalSeats} Booked</span>
                          <span>{totalSeats - bookedSeats} Remaining</span>
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between mt-4">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-text-secondary hover:text-brand-cyan transition-colors"
                        >
                          View Listing
                          <ArrowRight className="size-3" />
                        </Link>
                        
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/events/edit/${event.id}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-cyan hover:text-brand-cyan-hover hover:scale-105 active:scale-[0.95] transition-all bg-brand-cyan-glow/5 border border-brand-cyan/20 px-2.5 py-1 rounded-lg"
                          >
                            <Edit className="size-3" />
                            Edit
                          </Link>
                          
                          <button
                            onClick={() => handleDeleteClick(event.id, event.title)}
                            disabled={deletingId === event.id}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 hover:text-red-300 hover:scale-105 active:scale-[0.95] transition-all bg-red-500/5 border border-red-500/20 px-2.5 py-1 rounded-lg cursor-pointer disabled:opacity-50"
                          >
                            <Trash2 className="size-3" />
                            {deletingId === event.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* Confirm Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-panel border border-brand-border rounded-[2rem] p-6 shadow-2xl space-y-6 text-left relative z-50">
            <h3 className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
              <Trash2 className="size-5 text-red-400" />
              Confirm Deletion
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              Are you sure you want to permanently delete <span className="font-bold text-brand-text-primary">&ldquo;{confirmDeleteTitle}&rdquo;</span>? This will also remove all attendee tickets and bookings. This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => {
                  setConfirmDeleteId(null);
                  setConfirmDeleteTitle('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary border border-brand-border bg-white/5 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(confirmDeleteId)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-brand-bg bg-red-500 hover:bg-red-400 active:scale-[0.97] transition-all cursor-pointer shadow-lg shadow-red-500/10"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
