import library from './library.sample.json';

export interface Preferences {
  goals: string[];
  equipment: string[];
  daysPerWeek: number;
  preferredTimes: string[]; // morning, lunch, evening
  sessionLengths: number[];
  recovery: { maxHighIntensityPerDay: number; sleepAware: boolean };
  avoidEquipment?: string[];
}

interface FreeSlot { start: string; end: string; durationMins: number; }
interface Planned { slotStart: string; slotEnd: string; workoutId: string; title: string; rationale: string; }

interface Weights { variety: number; preferenceFit: number; recovery: number; timeOfDay: number; }

const defaultWeights: Weights = { variety: 1, preferenceFit: 2, recovery: 1.5, timeOfDay: 1 };

export function planWorkouts({ freeSlots, preferences, weeklyGoals, weights = defaultWeights }:{ freeSlots: FreeSlot[]; preferences: Preferences; weeklyGoals: { focusBalance: { cardio:number; strength:number; mobility:number } }; weights?: Weights }): Planned[] {
  const historyFocus: string[] = [];
  const scheduled: Planned[] = [];
  for (const slot of freeSlots) {
    const bucket = pickBucket(slot.durationMins);
    if (!bucket) continue;
    const candidates = (library as any)[bucket] as any[];
    if (!candidates) continue;
    let best: any = null; let bestScore = -Infinity; let rationaleParts: string[] = [];
    for (const w of candidates) {
      if (w.minutes > slot.durationMins) continue;
      if (preferences.avoidEquipment && w.equipment.some((e:string)=>preferences.avoidEquipment!.includes(e))) continue;
      const varScore = historyFocus.includes(w.focus) ? 0.2 : 1;
      const prefScore = w.equipment.every((e:string)=>preferences.equipment.includes(e) || e==='') ? 1 : 0.4;
      const todScore = timeOfDayScore(slot.start, w.focus, preferences.preferredTimes);
      const recScore = recoveryScore(w, scheduled, preferences);
      const score = varScore*weights.variety + prefScore*weights.preferenceFit + todScore*weights.timeOfDay + recScore*weights.recovery;
      if (score > bestScore) { bestScore = score; best = w; rationaleParts = rationale(varScore,prefScore,todScore,recScore); }
    }
    if (best) {
      scheduled.push({ slotStart: slot.start, slotEnd: slot.end, workoutId: best.id, title: best.title, rationale: rationaleParts.join('; ') });
      historyFocus.push(best.focus);
    }
  }
  return scheduled;
}

function pickBucket(duration: number): string | null {
  const buckets = [5,10,15,20,30,45,60,90];
  let chosen: number | null = null;
  for (const b of buckets) { if (b <= duration) chosen = b; }
  return chosen ? String(chosen) : null;
}

function timeOfDayScore(iso: string, focus: string, prefs: string[]): number {
  const hour = new Date(iso).getHours();
  const period = hour < 11 ? 'morning' : hour < 15 ? 'lunch' : 'evening';
  return prefs.includes(period) ? 1 : 0.5;
}

function recoveryScore(workout: any, scheduled: Planned[], prefs: Preferences): number {
  const sameDay = scheduled.filter(s => sameDayCheck(s.slotStart, workout));
  const highIntensityToday = sameDay.length; // naive
  if (workout.intensity === 'high' && highIntensityToday >= prefs.recovery.maxHighIntensityPerDay) return 0.2;
  return 1;
}

function sameDayCheck(slotStart: string, workout: any): boolean {
  const d1 = new Date(slotStart); const d2 = new Date(slotStart); // placeholder
  return d1.toDateString() === d2.toDateString();
}

function rationale(v:number,p:number,t:number,r:number){
  const arr: string[] = [];
  if (v>0.5) arr.push('variety');
  if (p>0.7) arr.push('equipment match');
  if (t>0.7) arr.push('preferred time');
  if (r>0.7) arr.push('recovery ok');
  return arr;
}
