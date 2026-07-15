'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, MapPin, Tag, ArrowUpDown, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '@/lib/mockEvents';
import { fetchEvents } from '@/lib/api';
import EventCard from '@/components/cards/EventCard';
import EventSkeleton from '@/components/cards/EventSkeleton';
import Footer from '@/components/Footer';

function EventsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Categories & Locations lists
  const categories = ['All', 'Technology', 'Business', 'Workshop', 'Conference', 'Seminar', 'Hackathon'];
  const locations = ['All', 'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi'];

  // Sync state from query parameters on load
  const initialCategory = searchParams.get('category') || 'All';
  const initialLocation = searchParams.get('location') || 'All';

  // Component states
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [sortBy, setSortBy] = useState<'newest' | 'price' | 'rating'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 4;

  // Load events from backend
  useEffect(() => {
    setLoading(true);
    fetchEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error("Failed to load events from backend:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, category, location, sortBy]);

  // Sync category state if query param changes (e.g. navigation from landing page)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  // Filter and sort events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === 'All' || event.category === category;
    const matchesLocation = location === 'All' || event.location === location;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Pagination bounds
  const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('All');
    setLocation('All');
    setSortBy('newest');
    setCurrentPage(1);
    router.push('/events');
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col justify-between relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-brand-indigo-glow filter blur-[120px] opacity-40 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/10 filter blur-[100px]" />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8 text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-brand-text-primary">
            Explore Events
          </h1>
          <p className="mt-2 text-sm sm:text-base text-brand-text-secondary">
            Search, filter, and discover hackathons, conferences, and design workshops.
          </p>
        </section>

        {/* Filter Controls Bar */}
        <section className="mx-auto max-w-7xl px-4 mb-8 sm:px-6 lg:px-8">
          <div className="p-5 rounded-[2rem] bg-brand-panel/60 border border-brand-border backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Search Field */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brand-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brand-text-muted pointer-events-none" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-11 pr-8 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-brand-panel text-brand-text-primary">
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-muted text-[10px]">▼</div>
              </div>

              {/* Location Dropdown */}
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brand-text-muted pointer-events-none" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-11 pr-8 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm appearance-none cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-brand-panel text-brand-text-primary">
                      {loc === 'All' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-muted text-[10px]">▼</div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brand-text-muted pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-11 pr-8 py-3 bg-brand-bg/50 border border-brand-border hover:border-brand-text-muted focus:border-brand-cyan/60 rounded-xl text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-cyan-glow/20 transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="newest" className="bg-brand-panel text-brand-text-primary">Sort: Newest</option>
                  <option value="price" className="bg-brand-panel text-brand-text-primary">Sort: Price (Low to High)</option>
                  <option value="rating" className="bg-brand-panel text-brand-text-primary">Sort: Rating (High to Low)</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-muted text-[10px]">▼</div>
              </div>

            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          {sortedEvents.length === 0 ? (
            <div className="p-16 rounded-[2.5rem] border border-brand-border bg-brand-panel/20 text-center max-w-md mx-auto">
              <RefreshCw className="size-10 text-brand-cyan/50 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
              <h3 className="text-xl font-bold text-brand-text-primary">No Events Found</h3>
              <p className="text-sm text-brand-text-secondary mt-2">
                We couldn&apos;t find any events matching your selected criteria. Try resetting your search terms.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-5 py-2.5 rounded-xl bg-brand-cyan hover:brightness-110 text-brand-bg font-bold text-xs cursor-pointer shadow-lg shadow-brand-cyan-glow/10 active:scale-[0.97] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => <EventSkeleton key={i} />)
                  : paginatedEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
              </div>

              {/* Pagination Section */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12 shrink-0">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="size-10 rounded-xl border border-brand-border bg-brand-panel/60 hover:bg-brand-cyan hover:text-brand-bg disabled:opacity-40 disabled:hover:bg-brand-panel/60 disabled:hover:text-brand-text-secondary text-brand-text-primary flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="size-5" />
                  </button>

                  <div className="flex gap-2 font-semibold text-sm">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`size-10 rounded-xl border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-brand-cyan border-brand-cyan text-brand-bg font-bold shadow-md shadow-brand-cyan-glow/20'
                              : 'bg-brand-panel/40 border-brand-border text-brand-text-secondary hover:text-brand-text-primary hover:border-brand-cyan/30'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="size-10 rounded-xl border border-brand-border bg-brand-panel/60 hover:bg-brand-cyan hover:text-brand-bg disabled:opacity-40 disabled:hover:bg-brand-panel/60 disabled:hover:text-brand-text-secondary text-brand-text-primary flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next page"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-bg flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center text-brand-text-secondary">
          <RefreshCw className="size-8 text-brand-cyan animate-spin" />
        </div>
        <Footer />
      </div>
    }>
      <EventsContent />
    </Suspense>
  );
}
