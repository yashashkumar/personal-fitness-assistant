import type { NextFetchEvent, NextRequest } from 'next/server';

// Placeholder: demonstrate log redaction (no real logging infra here)
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // If any debug param attempts to include events, strip.
  const url = new URL(req.url);
  if (url.searchParams.has('debugEvents')) {
    url.searchParams.delete('debugEvents');
  }
}
