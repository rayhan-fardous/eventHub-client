'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

const sliderImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1000&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&q=80"
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  return (
    <section className="relative w-full bg-brand-bg overflow-hidden border-b border-brand-border">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-[450px] w-[450px] rounded-full bg-brand-indigo-glow filter blur-[100px]" />

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 py-12 md:py-16 lg:py-20 min-h-[480px] md:min-h-[560px]">
        
        {/* Left Column Content */}
        <div className="flex-1 text-left flex flex-col justify-center items-start order-2 md:order-1 w-full">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full uppercase mb-4 text-glow-cyan">
            Welcome To EventHub
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] text-brand-text-primary">
            Discover Amazing <br />
            <span className="bg-gradient-to-r from-brand-indigo to-brand-cyan bg-clip-text text-transparent">
              Events Near You
            </span>
          </h1>
          <p className="mt-4 text-brand-text-secondary text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed">
            Host, manage, and explore extraordinary workshops, conferences, seminars, and hackathons around Bangladesh.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
            <Link
              href="/events"
              className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-brand-bg font-bold shadow-lg shadow-brand-indigo-glow/20 text-sm sm:text-base"
            >
              <Compass className="size-4 sm:size-4.5" />
              Explore Events
            </Link>
            <Link
              href="/events/create"
              className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-brand-border bg-white/5 hover:bg-white/10 hover:border-brand-cyan/40 active:scale-[0.98] transition-all duration-200 text-brand-text-primary font-semibold text-sm sm:text-base"
            >
              <CalendarDays className="size-4 sm:size-4.5" />
              Create Event
            </Link>
          </div>
        </div>

        {/* Right Column Image Slider */}
        <div className="w-full order-1 md:order-2 aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-video rounded-[2rem] overflow-hidden border border-brand-border relative group shadow-2xl bg-brand-panel/40 shrink-0 md:max-w-[45%] lg:max-w-[50%]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={sliderImages[currentIndex]}
              alt="Event Banner"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Slider Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 size-9 sm:size-10 rounded-full border border-white/10 bg-brand-bg/60 text-brand-text-primary hover:bg-brand-cyan hover:text-brand-bg backdrop-blur opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 size-9 sm:size-10 rounded-full border border-white/10 bg-brand-bg/60 text-brand-text-primary hover:bg-brand-cyan hover:text-brand-bg backdrop-blur opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>

          {/* Bullet Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex ? 'w-6 bg-brand-cyan' : 'w-2 bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
