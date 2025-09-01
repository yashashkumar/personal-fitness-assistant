'use client';
import React, { useState, useMemo } from 'react';

const QUOTES = [
  'Small consistent effort beats occasional intensity.',
  'Your schedule is your superpower—use the gaps.',
  'Motion fuels focus. Move first, perform better later.',
  'Recovery is a workout too. Respect lighter days.',
  'Five minutes is not nothing—micro sessions stack up.'
];

export default function QuoteRotator() {
  // Deterministic daily default
  const dayIndex = useMemo(()=> (new Date().getFullYear()*100 + new Date().getMonth()*3 + new Date().getDate()) % QUOTES.length, []);
  const [index, setIndex] = useState(dayIndex);
  const next = () => setIndex(i => (i + 1) % QUOTES.length);
  return (
    <figure className="relative mx-auto max-w-xl">
      <blockquote className="rounded-lg bg-white/70 p-5 text-sm font-medium leading-relaxed shadow backdrop-blur supports-[backdrop-filter]:bg-white/50">
        “{QUOTES[index]}”
      </blockquote>
      <figcaption className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-wide text-gray-500">
        <span>Fitness Insight</span>
        <button onClick={next} className="rounded px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Next</button>
      </figcaption>
    </figure>
  );
}
