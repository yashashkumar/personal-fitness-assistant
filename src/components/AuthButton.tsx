'use client';
import React from 'react';

export default function AuthButton({ provider = 'google' }: { provider?: 'google' }) {
  const label = provider === 'google' ? 'Continue with Google' : 'Continue';
  return (
    <a
      href={`/api/auth/${provider}`}
      className="group relative inline-flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium shadow-sm transition hover:border-brand-500 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      aria-label={label}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-white">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 0 1-2.2 3.33v2.77h3.56c2.08-1.92 3.28-4.76 3.28-8.11Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.64l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.12A6.62 6.62 0 0 1 5.5 12c0-.74.13-1.46.34-2.12V7.04H2.18A11 11 0 0 0 1 12c0 1.8.43 3.5 1.18 4.96l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.59 14.97.5 12 .5 7.82.5 4.18 2.98 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/><path fill="none" d="M1 1h22v22H1Z"/></svg>
      </span>
      <span>{label}</span>
      <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-brand-500/40" />
    </a>
  );
}
