import React from 'react';
import Hero from '@/components/home/Hero';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import Categories from '@/components/home/Categories';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Statistics from '@/components/home/Statistics';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import Newsletter from '@/components/home/Newsletter';
import CTA from '@/components/home/CTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-brand-bg text-brand-text-primary">
      {/* Background ambient glow layers */}
      <div className="absolute top-[-5%] left-[-5%] -z-10 h-[500px] w-[500px] rounded-full bg-brand-indigo-glow filter blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[10%] right-[-5%] -z-10 h-[600px] w-[600px] rounded-full bg-brand-cyan-glow filter blur-[140px] opacity-60" />

      {/* Pages Container */}
      <main className="flex-grow">
        <Hero />
        <UpcomingEvents />
        <Categories />
        <WhyChooseUs />
        <Statistics />
        <FeaturedEvents />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}