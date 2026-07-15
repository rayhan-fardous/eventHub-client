import React from 'react';

export default function EventSkeleton() {
  return (
    <div className="flex flex-col justify-between h-full bg-brand-panel/30 border border-brand-border/60 rounded-[2rem] overflow-hidden shadow-sm animate-pulse">
      {/* Skeleton Header Image */}
      <div className="relative aspect-video w-full bg-brand-border/40 shrink-0" />

      {/* Skeleton Body */}
      <div className="flex flex-col flex-grow p-6">
        {/* Rating and Date line */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-24 bg-brand-border/40 rounded-lg" />
          <div className="h-6 w-12 bg-brand-border/40 rounded-lg" />
        </div>

        {/* Title */}
        <div className="h-5 bg-brand-border/40 rounded-lg w-3/4 mb-3" />

        {/* Short Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-brand-border/30 rounded-lg w-full" />
          <div className="h-4 bg-brand-border/30 rounded-lg w-5/6" />
        </div>

        {/* Divider */}
        <div className="h-px bg-brand-border/40 my-4 shrink-0" />

        {/* Metadata section */}
        <div className="grid grid-cols-2 gap-3 mb-5 shrink-0">
          <div className="h-4 bg-brand-border/30 rounded-lg w-2/3" />
          <div className="h-4 bg-brand-border/30 rounded-lg w-1/2 ml-auto" />
        </div>

        {/* Action Button */}
        <div className="h-11 bg-brand-border/40 rounded-xl w-full" />
      </div>
    </div>
  );
}
