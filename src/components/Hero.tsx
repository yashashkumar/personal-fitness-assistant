import React from 'react';
import AuthButton from './AuthButton';
import QuoteRotator from './QuoteRotator';

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden rounded-2xl border bg-gradient-to-br from-brand-50 via-white to-white p-8 shadow-sm ring-1 ring-gray-200">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-100 blur-3xl opacity-60" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-brand-50 blur-2xl opacity-70" aria-hidden="true" />
      <div className="relative z-10 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h2 id="hero-heading" className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Adaptive workouts that honor your real calendar.
          </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              We read your schedule (secure, read‑only) and transform free space—micro gaps & deep focus blocks—into a balanced, personalized plan. No event text stored. Ever.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <AuthButton />
              <a href="#learn-more" className="text-sm font-medium text-brand-700 underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                How it works
              </a>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border bg-white shadow-sm">
            <img src="/fitness-hero.svg" alt="Abstract fitness visualization with dynamic calendar blocks" className="h-full w-full object-cover" />
          </div>
          <QuoteRotator />
        </div>
      </div>
    </section>
  );
}
