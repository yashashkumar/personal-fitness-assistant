import { KPISet } from './types';

export function generateMockKpis(): KPISet {
  return {
    totalSessions: 8,
    minutesActive: 210,
    adherence: 0.75,
    mostCommonDuration: 20,
    focusBalance: { cardio: 3, strength: 3, mobility: 2 }
  };
}

export function mockWeeklyMinutes(): { weekDay: string; minutes: number }[] {
  return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>({ weekDay: d, minutes: [20,45,0,30,25,60,30][i] }));
}

export function mockFocusStack(): { focus: string; cardio: number; strength: number; mobility: number }[] {
  return [
    { focus: 'Week', cardio: 95, strength: 70, mobility: 45 }
  ];
}
