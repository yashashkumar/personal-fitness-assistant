import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { addMinutes, compareAsc } from 'date-fns';

export interface CalendarEvent { start: string; end: string; allDay?: boolean; }
export interface FreeSlot { start: string; end: string; durationMins: number; }

const TZ = 'Asia/Kolkata';

export function findFreeSlots(events: CalendarEvent[], dayStart: string, dayEnd: string, granularityMins: number): FreeSlot[] {
  if (![5,10,15,20,30,45,60].includes(granularityMins)) throw new Error('Unsupported granularity');
  const start = new Date(dayStart);
  const end = new Date(dayEnd);
  if (end <= start) return [];

  const norm = events.map(e => normalizeEvent(e, start, end)).filter(Boolean) as { s: Date; e: Date }[];
  norm.sort((a,b)=>compareAsc(a.s,b.s));

  // Merge overlaps
  const merged: { s: Date; e: Date }[] = [];
  for (const ev of norm) {
    if (!merged.length || ev.s > merged[merged.length-1].e) {
      merged.push({...ev});
    } else if (ev.e > merged[merged.length-1].e) {
      merged[merged.length-1].e = ev.e;
    }
  }

  const slots: FreeSlot[] = [];
  let cursor = start;
  for (const busy of merged) {
    if (busy.s > cursor) collectSlots(slots, cursor, busy.s, granularityMins);
    if (busy.e > cursor) cursor = busy.e;
  }
  if (cursor < end) collectSlots(slots, cursor, end, granularityMins);
  return slots;
}

function normalizeEvent(event: CalendarEvent, windowStart: Date, windowEnd: Date): { s: Date; e: Date } | null {
  let s = new Date(event.start);
  let e = new Date(event.end);
  if (event.allDay) {
    // cover entire day window
    s = windowStart; e = windowEnd;
  }
  if (e <= windowStart || s >= windowEnd) return null;
  if (s < windowStart) s = windowStart;
  if (e > windowEnd) e = windowEnd;
  return { s, e };
}

function collectSlots(out: FreeSlot[], freeStart: Date, freeEnd: Date, step: number) {
  const total = (freeEnd.getTime() - freeStart.getTime())/60000;
  if (total < step) return;
  let cursor = freeStart;
  while (cursor < freeEnd) {
    const next = addMinutes(cursor, step);
    if (next > freeEnd) break;
    out.push({ start: cursor.toISOString(), end: next.toISOString(), durationMins: step });
    cursor = next;
  }
}

export const complexity = 'O(n log n) for n events due to sort; merging is O(n).';
