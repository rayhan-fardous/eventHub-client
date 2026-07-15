import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, CalendarDays } from "lucide-react";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-bg text-brand-text-primary flex flex-col justify-between relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-brand-indigo-glow filter blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-brand-cyan-glow/20 filter blur-[120px] pointer-events-none" />

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
        
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-brand-cyan/20 rounded-full filter blur-xl animate-pulse-glow" />
          <div className="relative bg-brand-panel/80 border border-brand-border p-6 rounded-full shadow-lg">
            <AlertTriangle className="size-16 text-brand-cyan drop-shadow-md" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text-primary mb-4 tracking-tight">
          Page Not Found
        </h2>
        
        <p className="text-brand-text-secondary mb-10 max-w-md">
          The event, profile, or page you&apos;re looking for has been moved, deleted, or doesn&apos;t exist.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-brand-indigo to-brand-cyan text-brand-bg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brand-indigo-glow/20 w-full sm:w-auto"
          >
            <Home className="size-4" />
            Back to Home
          </Link>
          
          <Link
            href="/events"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-brand-panel border border-brand-border text-brand-text-primary hover:border-brand-text-muted transition-all active:scale-[0.98] w-full sm:w-auto"
          >
            <CalendarDays className="size-4" />
            Browse Events
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
