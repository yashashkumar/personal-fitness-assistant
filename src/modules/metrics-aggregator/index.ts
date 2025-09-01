export interface CompletionRecord { planId: string; workoutId: string; ts: number; exertion: number; }
export interface SkipRecord { planId: string; workoutId?: string; ts: number; reason: 'no-time'|'travel'|'fatigue'; }
export interface PlanSnapshotItem { workoutId: string; slotStart: string; slotEnd: string; }

// In-memory volatile stores (demo only; cleared on restart)
const completions: CompletionRecord[] = [];
const skips: SkipRecord[] = [];
const plans: Record<string, PlanSnapshotItem[]> = {};

export function savePlan(id: string, items: PlanSnapshotItem[]) { plans[id] = items; }
export function recordCompletion(r: CompletionRecord) { completions.push(r); }
export function recordSkip(r: SkipRecord) { skips.push(r); }

export function getMetrics(rangeDays: number) {
  const since = Date.now() - rangeDays*86400000;
  const recentCompletions = completions.filter(c=>c.ts>=since);
  const recentSkips = skips.filter(s=>s.ts>=since);
  const totalSessions = recentCompletions.length;
  const minutesActive = totalSessions * averageWorkoutMinutes(); // simplistic placeholder
  const planned = Object.values(plans).flat().filter(p=> new Date(p.slotStart).getTime()>=since);
  const adherence = planned.length ? (recentCompletions.length / planned.length) : 0;
  const focusCounts: Record<string, number> = { cardio:0, strength:0, mobility:0 };
  // Without storing focus here we would need to join with library at render time.
  return { totalSessions, minutesActive, adherence, plannedCount: planned.length, focusCounts, skips: recentSkips.length };
}

function averageWorkoutMinutes(){ return 20; }
