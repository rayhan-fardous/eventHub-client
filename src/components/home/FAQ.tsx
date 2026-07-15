'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do I register for an event?",
    answer: "Browse our events listing, click on 'View Details' for any event you're interested in, and click the 'Register' button on the sidebar. If it's a paid event, you can complete the payment in the system."
  },
  {
    question: "Can I host my own event on EventHub?",
    answer: "Absolutely! After creating an account and logging in, click 'Add Event' in the navbar. Fill out the event details, location, pricing, capacity, and upload cover images to launch your event dashboard."
  },
  {
    question: "Is there a seat capacity limit for events?",
    answer: "Yes, every event has a predefined seating capacity defined by the host. Once the registration seat counter hits 100% capacity, registration automatically locks to prevent overbooking."
  },
  {
    question: "How can I view or manage my registered events?",
    answer: "Go to your personal Dashboard from the navbar. There, you can see all events you are hosting as well as the ones you have registered for, including schedules and ticket details."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-14 sm:py-20 bg-brand-bg relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20 uppercase tracking-wider mb-3">
            <HelpCircle className="size-3.5" />
            Support Hub
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-text-primary md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 sm:mt-4 text-brand-text-secondary text-sm sm:text-base lg:text-lg">
            Got questions? We have prepared quick answers regarding registrations, hosting, and account dashboard setups.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-brand-panel/40 border border-brand-border/80 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-cyan/30"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 text-brand-text-primary font-bold text-sm sm:text-base lg:text-lg cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="size-4 sm:size-5 text-brand-cyan shrink-0" />
                  ) : (
                    <ChevronDown className="size-4 sm:size-5 text-brand-text-muted shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-brand-text-secondary border-t border-brand-border/40 animate-in fade-in slide-in-from-top-2 duration-300 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
