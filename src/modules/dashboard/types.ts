export interface KPISet { totalSessions: number; minutesActive: number; adherence: number; mostCommonDuration?: number; focusBalance: { cardio: number; strength: number; mobility: number }; }
export interface CompletionInput { planId: string; workoutId: string; exertion: number; }
export interface SkipInput { planId: string; workoutId?: string; reason: 'no-time'|'travel'|'fatigue'; }
