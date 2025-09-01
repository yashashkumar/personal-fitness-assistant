import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { recordSkip } from '@/modules/metrics-aggregator';

const schema = z.object({ workoutId: z.string().optional(), reason: z.enum(['no-time','travel','fatigue']) });

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  recordSkip({ planId: params.id, workoutId: parsed.data.workoutId, ts: Date.now(), reason: parsed.data.reason });
  return NextResponse.json({ ok: true });
}
