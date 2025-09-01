import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { recordCompletion } from '@/modules/metrics-aggregator';

const schema = z.object({ workoutId: z.string(), exertion: z.number().min(1).max(10) });

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  recordCompletion({ planId: params.id, workoutId: parsed.data.workoutId, ts: Date.now(), exertion: parsed.data.exertion });
  return NextResponse.json({ ok: true });
}
