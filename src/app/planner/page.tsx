import { planWorkouts } from '@/modules/workout-planner/planWorkouts';
import { findFreeSlots } from '@/modules/free-slot-engine';

// Mock data for rendering without back-end
const mockEvents = [
  { start: new Date().toISOString(), end: new Date(Date.now()+30*60000).toISOString() }
];

export default function PlannerPage() {
  const dayStart = new Date();
  const dayEnd = new Date(Date.now()+4*60*60000);
  const free = findFreeSlots(mockEvents as any, dayStart.toISOString(), dayEnd.toISOString(), 15);
  const schedule = planWorkouts({ freeSlots: free, preferences: { goals:['general'], equipment:[], daysPerWeek:5, preferredTimes:['morning','lunch','evening'], sessionLengths:[15,30], recovery:{ maxHighIntensityPerDay:1, sleepAware:true } }, weeklyGoals:{ focusBalance:{ cardio:2,strength:2,mobility:1 } } });
  return (
    <main className="space-y-4">
      <h2 className="font-semibold">Planner (Mock)</h2>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {schedule.map(s => (
          <div key={s.slotStart+s.workoutId} className="rounded border p-2 bg-white shadow-sm">
            <div className="text-xs text-gray-500">{new Date(s.slotStart).toLocaleTimeString()} - {new Date(s.slotEnd).toLocaleTimeString()}</div>
            <div className="font-medium text-sm">{s.title}</div>
            <div className="text-[11px] text-gray-600">{s.rationale}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
