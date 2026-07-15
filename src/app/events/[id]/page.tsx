'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Tag,
  Star,
  Users,
  Mail,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Shield,
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Event, Review } from '@/lib/mockEvents';
import EventCard from '@/components/cards/EventCard';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { fetchEventById, bookEvent, addEventReview, fetchUserBookings, fetchEvents } from '@/lib/api';

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  // Component states
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(0);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  
  // Review form states
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchEventById(id as string)
      .then((event) => {
        setCurrentEvent(event);
        setSeatsLeft(event.seats.total - event.seats.booked);
        setReviewsList(event.reviews || []);
        setActiveImage(0);
        
        // Load related events
        fetchEvents()
          .then((allEvents) => {
            const related = allEvents
              .filter((e) => e.category === event.category && e.id !== event.id)
              .slice(0, 3);
            setRelatedEvents(related);
          })
          .catch((err) => console.error("Error loading related events:", err));

        // Check if registered
        if (user) {
          fetchUserBookings(user.email)
            .then((bookings) => {
              const registered = bookings.some(b => b.eventId === event.id);
              setIsRegistered(registered);
            })
            .catch((err) => console.error("Error checking bookings:", err));
        }
      })
      .catch((err) => {
        console.error("Error fetching event details:", err);
        setCurrentEvent(null);
      })
      .finally(() => {
        setLoading(false);
      });

    setReviewSubmitted(false);
    setNewComment('');
    setNewName(user?.name || '');
    setNewRating(5);
  }, [id, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between">
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <div className="size-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-xl font-bold">Loading Event Details...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between">
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold">Event Not Found</h2>
          <p className="text-brand-text-secondary mt-2">The event you are looking for does not exist or has been removed.</p>
          <Link
            href="/events"
            className="mt-6 px-6 py-3 rounded-xl bg-brand-cyan text-brand-bg font-bold text-sm shadow-lg hover:brightness-110 transition-all"
          >
            Back to Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Registration handler
  const handleRegister = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (seatsLeft > 0 && !isRegistered && currentEvent) {
      setBookingLoading(true);
      try {
        const response = await bookEvent(currentEvent.id, {
          userId: user.id,
          userEmail: user.email,
          userName: user.name,
        });
        setIsRegistered(true);
        setSeatsLeft(response.event.seats.total - response.event.seats.booked);
      } catch (err: any) {
        alert(err.message || "Failed to book event");
      } finally {
        setBookingLoading(false);
      }
    }
  };

  // Submit review handler
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newComment.trim() && currentEvent) {
      try {
        const response = await addEventReview(currentEvent.id, {
          userName: newName,
          rating: newRating,
          comment: newComment,
        });
        setReviewsList(response.reviews);
        setReviewSubmitted(true);
        setNewComment('');
        setNewName(user?.name || '');
        setNewRating(5);
        
        // Update current event rating as well
        setCurrentEvent({
          ...currentEvent,
          rating: response.rating,
          reviews: response.reviews
        });
      } catch (err: any) {
        alert(err.message || "Failed to submit review");
      }
    }
  };

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev - 1 + currentEvent.images.length) % currentEvent.images.length);
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % currentEvent.images.length);
  };

  const isFree = currentEvent.price === 0;
  const capacityPercent = Math.min(100, Math.round(((currentEvent.seats.total - seatsLeft) / currentEvent.seats.total) * 100));

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between relative overflow-hidden">
      
      {/* Background glow layers */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-brand-indigo-glow filter blur-[120px] opacity-40 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/10 filter blur-[100px]" />

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        
        {/* Back navigation link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-text-secondary hover:text-brand-cyan transition-colors mb-8 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to all events
        </Link>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Image Slider, Overview, Specs, Reviews */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Title Block Header (mobile optimized) */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan-glow/10 text-brand-cyan border border-brand-cyan/20">
                <Tag className="size-3.5" />
                {currentEvent.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-text-primary leading-tight">
                {currentEvent.title}
              </h1>
            </div>

            {/* Slider with Framer Motion */}
            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-brand-border bg-brand-panel/40 relative group shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={currentEvent.images[activeImage]}
                  alt={`${currentEvent.title} Gallery`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Slider Controls */}
              {currentEvent.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full border border-white/10 bg-brand-bg/60 text-brand-text-primary hover:bg-brand-cyan hover:text-brand-bg backdrop-blur opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full border border-white/10 bg-brand-bg/60 text-brand-text-primary hover:bg-brand-cyan hover:text-brand-bg backdrop-blur opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Row */}
            {currentEvent.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {currentEvent.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-video w-20 rounded-xl overflow-hidden border transition-all cursor-pointer relative ${
                      index === activeImage ? 'border-brand-cyan ring-2 ring-brand-cyan/20 scale-[1.02]' : 'border-brand-border opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Event Description/Overview */}
            <div className="space-y-4 text-left">
              <h2 className="text-xl sm:text-2xl font-bold border-b border-brand-border pb-3">
                Event Overview
              </h2>
              <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed whitespace-pre-line">
                {currentEvent.description}
              </p>
            </div>

            {/* Specifications Table & Agenda */}
            <div className="space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold border-b border-brand-border pb-3">
                Specifications & Agenda
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-panel/40 border border-brand-border p-6 rounded-[2rem]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-cyan">
                      <Calendar className="size-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-muted font-bold block uppercase tracking-wider">Date</span>
                      <span className="text-sm font-semibold text-brand-text-primary">{currentEvent.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-cyan">
                      <Clock className="size-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-muted font-bold block uppercase tracking-wider">Time</span>
                      <span className="text-sm font-semibold text-brand-text-primary">{currentEvent.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-cyan">
                      <MapPin className="size-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-muted font-bold block uppercase tracking-wider">Location</span>
                      <span className="text-sm font-semibold text-brand-text-primary">{currentEvent.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-cyan">
                      <Shield className="size-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-muted font-bold block uppercase tracking-wider">Organizer</span>
                      <span className="text-sm font-semibold text-brand-text-primary">{currentEvent.organizer}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-cyan">
                      <Mail className="size-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-muted font-bold block uppercase tracking-wider">Contact Email</span>
                      <span className="text-sm font-semibold text-brand-text-primary">{currentEvent.contactEmail}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-cyan">
                      <Users className="size-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-muted font-bold block uppercase tracking-wider">Registration Seats</span>
                      <span className="text-sm font-semibold text-brand-text-primary">{currentEvent.seats.total} Seats Max</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Timeline */}
              <div className="mt-6 border border-brand-border p-6 rounded-[2rem] bg-brand-panel/10">
                <h3 className="text-base sm:text-lg font-bold mb-4">Agenda Timeline</h3>
                <div className="space-y-4 border-l border-brand-border pl-4">
                  {currentEvent.schedule.map((item, index) => (
                    <div key={index} className="relative py-1">
                      <div className="absolute -left-[22px] top-2.5 size-2.5 rounded-full bg-brand-cyan border border-brand-bg" />
                      <div className="text-xs text-brand-cyan font-bold">{item.time}</div>
                      <div className="text-sm font-semibold text-brand-text-primary mt-0.5">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold border-b border-brand-border pb-3 flex items-center gap-2">
                <MessageSquare className="size-5 text-brand-cyan" />
                Attendees Reviews ({reviewsList.length})
              </h2>

              {/* Write Review Form */}
              <div className="p-6 rounded-[2rem] border border-brand-border bg-brand-panel/40">
                <h3 className="text-base sm:text-lg font-bold mb-4">Share Your Experience</h3>
                {reviewSubmitted ? (
                  <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/10 text-sm font-semibold text-green-400">
                    🎉 Thank you! Your review has been added live.
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-brand-text-secondary uppercase mb-1 block">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/10 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-brand-text-secondary uppercase mb-1 block">Rating Score</label>
                        <select
                          value={newRating}
                          onChange={(e) => setNewRating(Number(e.target.value))}
                          className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/10 transition-all cursor-pointer"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                          <option value="4">⭐⭐⭐⭐ (4/5)</option>
                          <option value="3">⭐⭐⭐ (3/5)</option>
                          <option value="2">⭐⭐ (2/5)</option>
                          <option value="1">⭐ (1/5)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-brand-text-secondary uppercase mb-1 block">Comments</label>
                      <textarea
                        required
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="What did you think of the event speaker topics?"
                        className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/10 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl font-bold bg-brand-cyan hover:brightness-110 active:scale-[0.97] transition-all text-brand-bg text-xs shadow-lg shadow-brand-cyan-glow/15 cursor-pointer"
                    >
                      Post Review
                    </button>
                  </form>
                )}
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl border border-brand-border bg-brand-panel/10 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-brand-text-primary text-sm sm:text-base block">{rev.userName}</span>
                        <span className="text-brand-text-muted block mt-0.5">{rev.date}</span>
                      </div>
                      <div className="flex gap-0.5 bg-yellow-500/10 border border-yellow-500/10 px-2.5 py-1 rounded-lg">
                        {Array.from({ length: Math.round(rev.rating) }).map((_, i) => (
                          <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-brand-text-secondary leading-relaxed mt-1 italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Sidebar Reservation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-brand-panel/90 border border-brand-border p-6 rounded-[2.5rem] shadow-2xl space-y-6 text-left backdrop-blur-md">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-brand-text-secondary">Registration Fee</span>
                <span className="text-2xl font-black text-brand-cyan">
                  {isFree ? 'FREE' : `৳${currentEvent.price.toLocaleString()}`}
                </span>
              </div>

              {/* Seating metrics */}
              <div className="space-y-2 border-y border-brand-border/60 py-5">
                <div className="flex justify-between text-xs text-brand-text-secondary font-semibold">
                  <span className="flex items-center gap-1"><Users className="size-3.5 text-brand-cyan" /> Reserved Spots</span>
                  <span>{capacityPercent}% Filled</span>
                </div>
                
                {/* Custom Progress Bar */}
                <div className="h-2 w-full bg-brand-bg rounded-full overflow-hidden border border-brand-border">
                  <div
                    className="h-full bg-gradient-to-r from-brand-indigo to-brand-cyan transition-all duration-500 rounded-full"
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs font-semibold pt-1">
                  <span className="text-brand-text-muted">{currentEvent.seats.total - seatsLeft} Booked</span>
                  <span className={seatsLeft === 0 ? 'text-red-400 font-bold' : 'text-brand-cyan font-bold'}>
                    {seatsLeft === 0 ? 'SOLD OUT' : `${seatsLeft} Seats Available`}
                  </span>
                </div>
              </div>

              {/* CTA Booking Button */}
              {seatsLeft === 0 ? (
                <button
                  disabled
                  className="w-full py-4 rounded-xl font-bold bg-brand-border text-brand-text-muted border border-brand-border cursor-not-allowed text-center text-sm"
                >
                  Sold Out
                </button>
              ) : isRegistered ? (
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full py-4 rounded-xl font-bold bg-green-500/10 text-green-400 border border-green-500/20 text-center text-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="size-4.5" />
                    Booking Confirmed
                  </button>
                  <p className="text-[10px] text-center text-green-400/90 font-semibold bg-green-500/5 py-2 px-3 rounded-lg border border-green-500/10">
                    Registration Ticket is sent to your account email!
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={bookingLoading}
                  className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-brand-bg shadow-lg shadow-brand-indigo-glow/20 text-center text-sm cursor-pointer disabled:opacity-50"
                >
                  {bookingLoading ? 'Processing Booking...' : (isFree ? 'Register For Free' : 'Secure Ticket (Proceed)')}
                </button>
              )}

              {/* Verification Badges */}
              <div className="flex items-center gap-2.5 text-[10px] text-brand-text-secondary bg-white/5 border border-white/5 p-3 rounded-xl">
                <CheckCircle2 className="size-4.5 text-brand-cyan shrink-0 animate-pulse" />
                <span>Verified Hosted Event. Covered by EventHub Refund & RSVP policy agreement.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <section className="mt-20 pt-16 border-t border-brand-border text-left">
            <div className="flex items-center gap-2 mb-10">
              <div className="p-2 rounded-xl bg-brand-cyan-glow/10 border border-brand-cyan/20 text-brand-cyan">
                <Sparkles className="size-4" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Related Events
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
