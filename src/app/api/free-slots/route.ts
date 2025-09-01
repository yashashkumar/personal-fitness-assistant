import { NextRequest, NextResponse } from 'next/server';
import { getCalendarEvents } from '@/modules/calendar-reader/getCalendarEvents';
import { findFreeSlots } from '@/modules/free-slot-engine';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { provider, from, to, granularity } = body;
  const events = await getCalendarEvents({ provider, from, to });
  const free = findFreeSlots(events as any, from, to, granularity || 15);
  return NextResponse.json({ free });
}
