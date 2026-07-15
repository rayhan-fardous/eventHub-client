'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, Trash2, Calendar, MapPin, Tag, Clock, Users, Mail, Image as ImageIcon, Sparkles, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchEventById, updateEvent } from '@/lib/api';
import Footer from '@/components/Footer';

export default function EditEventPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [location, setLocation] = useState('Dhaka');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00 AM - 05:00 PM');
  const [price, setPrice] = useState('0');
  const [totalSeats, setTotalSeats] = useState('100');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  
  // Schedule list
  const [schedule, setSchedule] = useState<{ time: string; activity: string }[]>([]);

  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch event details
  useEffect(() => {
    if (!id || !user) return;

    setFetching(true);
    fetchEventById(id as string)
      .then((event) => {
        // Authorization check: Make sure user owns this event
        if (event.creatorEmail && event.creatorEmail !== user.email) {
          router.push('/events/manage');
          return;
        }

        // Fill form fields
        setTitle(event.title);
        setShortDescription(event.shortDescription);
        setDescription(event.description);
        setCategory(event.category);
        setLocation(event.location);
        setDate(event.date);
        setTime(event.time);
        setPrice(String(event.price));
        setTotalSeats(String(event.seats.total));
        setImage1(event.images && event.images.length > 0 ? event.images[0] : '');
        setImage2(event.images && event.images.length > 1 ? event.images[1] : '');
        setImage3(event.images && event.images.length > 2 ? event.images[2] : '');
        setOrganizer(event.organizer);
        setContactEmail(event.contactEmail);
        setCreatorEmail(event.creatorEmail || '');
        setSchedule(event.schedule || []);
      })
      .catch((err) => {
        console.error("Failed to load event details:", err);
        setError("Event could not be loaded or doesn't exist.");
      })
      .finally(() => {
        setFetching(false);
      });
  }, [id, user, router]);

  const handleAddScheduleItem = () => {
    setSchedule(prev => [...prev, { time: '', activity: '' }]);
  };

  const handleRemoveScheduleItem = (index: number) => {
    setSchedule(prev => prev.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (index: number, field: 'time' | 'activity', value: string) => {
    setSchedule(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Filter images
    const images: string[] = [];
    if (image1.trim()) images.push(image1.trim());
    if (image2.trim()) images.push(image2.trim());
    if (image3.trim()) images.push(image3.trim());

    // Fallback image if none provided
    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80');
    }

    // Filter valid schedule items
    const validSchedule = schedule.filter(item => item.time.trim() && item.activity.trim());

    const eventData = {
      creatorEmail: user?.email,
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      category,
      location,
      date,
      time: time.trim(),
      price: Number(price),
      seats: {
        total: Number(totalSeats),
      },
      images,
      organizer: organizer.trim(),
      contactEmail: contactEmail.trim(),
      schedule: validSchedule,
    };

    try {
      await updateEvent(id as string, eventData);
      router.push('/events/manage');
    } catch (err: any) {
      setError(err.message || 'Failed to update event. Please try again.');
      setSubmitting(false);
    }
  };

  const categories = ['Technology', 'Business', 'Workshop', 'Conference', 'Seminar', 'Hackathon'];
  const locations = ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi'];

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between">
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <div className="size-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-xl font-bold">Loading Event Settings...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-brand-indigo-glow filter blur-[120px] opacity-35 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/10 filter blur-[100px]" />

      <main className="flex-grow mx-auto max-w-4xl w-full px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        
        {/* Back navigation link */}
        <Link
          href="/events/manage"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-text-secondary hover:text-brand-cyan transition-colors mb-8 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Organizer Console
        </Link>

        {/* Page Header */}
        <section className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-3">
            <Sparkles className="size-3.5" />
            Modify Event
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-text-primary">
            Edit Event Details
          </h1>
          <p className="mt-2 text-sm sm:text-base text-brand-text-secondary">
            Update your event timings, location, agenda, pricing, or total available seats instantly.
          </p>
        </section>

        {/* Form Card */}
        <section className="bg-brand-panel/60 border border-brand-border rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 select-none pointer-events-none text-brand-cyan font-black text-9xl">
            EDIT
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {error && (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-medium text-red-400">
                {error}
              </div>
            )}

            {/* Basic Info Group */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold border-b border-brand-border pb-2 flex items-center gap-2 text-brand-cyan">
                <Sparkles className="size-4.5" />
                1. Basic Information
              </h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. NextGen Web Dev Hackathon"
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Short Description</label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="e.g. Assemble your team and build solutions for eco-friendly systems."
                  maxLength={150}
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                />
                <span className="text-[10px] text-brand-text-muted text-right">{shortDescription.length}/150 characters</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Full Details Description</label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide comprehensive details about schedule, expectations, eligibility, speakers etc."
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider flex items-center gap-1"><Tag className="size-3.5 text-brand-cyan" /> Category</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm appearance-none cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-brand-panel text-brand-text-primary">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-muted text-[10px]">▼</div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider flex items-center gap-1"><MapPin className="size-3.5 text-brand-cyan" /> Location City</label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm appearance-none cursor-pointer"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc} className="bg-brand-panel text-brand-text-primary">
                          {loc}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-muted text-[10px]">▼</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics Group */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold border-b border-brand-border pb-2 flex items-center gap-2 text-brand-cyan">
                <Calendar className="size-4.5" />
                2. Logistics & Capacity
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Event Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm cursor-text"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider flex items-center gap-1"><Clock className="size-3.5 text-brand-cyan" /> Event Time Window</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 09:00 AM - 05:00 PM"
                    className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Ticket Fee (BDT) - Set '0' for Free</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 1000"
                    className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider flex items-center gap-1"><Users className="size-3.5 text-brand-cyan" /> Maximum Seat Capacity</label>
                  <input
                    type="number"
                    min="5"
                    required
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Images Group */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold border-b border-brand-border pb-2 flex items-center gap-2 text-brand-cyan">
                <ImageIcon className="size-4.5" />
                3. Gallery Images (URLs)
              </h2>
              <p className="text-xs text-brand-text-secondary">
                Paste up to 3 web image URLs to create a gallery slider. Leave empty to use system default graphics.
              </p>

              <div className="space-y-4">
                <input
                  type="url"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                  placeholder="Primary Image URL (e.g. https://images.unsplash.com/...)"
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                />
                <input
                  type="url"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  placeholder="Secondary Image URL (optional)"
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                />
                <input
                  type="url"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                  placeholder="Tertiary Image URL (optional)"
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* Contacts & Org Group */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold border-b border-brand-border pb-2 flex items-center gap-2 text-brand-cyan">
                <Mail className="size-4.5" />
                4. Organizer Contact
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Organizer Name</label>
                  <input
                    type="text"
                    required
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="e.g. Neural Labs"
                    className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. contact@neurallabs.com"
                    className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Schedule Timeline Manager */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-brand-border pb-2">
                <h2 className="text-lg font-bold flex items-center gap-2 text-brand-cyan">
                  <Clock className="size-4.5" />
                  5. Event Agenda Timeline
                </h2>
                <button
                  type="button"
                  onClick={handleAddScheduleItem}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-cyan-hover transition-colors px-2.5 py-1.5 rounded-lg hover:bg-brand-cyan-glow/10 border border-transparent hover:border-brand-cyan/20 cursor-pointer"
                >
                  <Plus className="size-4" /> Add Item
                </button>
              </div>

              <div className="space-y-3">
                {schedule.length === 0 ? (
                  <p className="text-xs text-brand-text-muted italic text-center py-4 border border-brand-border border-dashed rounded-xl">
                    No agenda items added yet. Click &ldquo;Add Item&rdquo; above.
                  </p>
                ) : (
                  schedule.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
                      <input
                        type="text"
                        required
                        value={item.time}
                        onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                        placeholder="Time (e.g. 09:00 AM)"
                        className="w-full sm:w-1/3 px-3 py-2 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none text-xs"
                      />
                      <input
                        type="text"
                        required
                        value={item.activity}
                        onChange={(e) => handleScheduleChange(index, 'activity', e.target.value)}
                        placeholder="Activity Description (e.g. Keynote Speech)"
                        className="w-full sm:flex-grow px-3 py-2 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveScheduleItem(index)}
                        className="p-2.5 rounded-xl border border-transparent hover:border-red-500/20 text-brand-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
                        title="Remove agenda item"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-brand-border">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-brand-bg shadow-lg shadow-brand-indigo-glow/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  "Saving Changes..."
                ) : (
                  <>
                    Save Event Changes
                    <Save className="size-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
