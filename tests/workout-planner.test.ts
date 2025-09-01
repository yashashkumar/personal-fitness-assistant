import { planWorkouts } from '@/modules/workout-planner/planWorkouts';

describe('planWorkouts', () => {
  it('creates a schedule from free slots', () => {
    const freeSlots = [
      { start: '2025-08-31T04:00:00.000Z', end: '2025-08-31T04:10:00.000Z', durationMins: 10 },
      { start: '2025-08-31T04:10:00.000Z', end: '2025-08-31T04:25:00.000Z', durationMins: 15 }
    ];
    const preferences = { goals:['general'], equipment:[], daysPerWeek:5, preferredTimes:['morning','lunch'], sessionLengths:[10,15], recovery:{ maxHighIntensityPerDay:1, sleepAware:true } };
    const weeklyGoals = { focusBalance: { cardio:2, strength:2, mobility:1 } };
    const result = planWorkouts({ freeSlots, preferences, weeklyGoals });
    expect(result.length).toBeGreaterThan(0);
  });
});
