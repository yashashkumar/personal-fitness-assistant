import { findFreeSlots } from '@/modules/free-slot-engine';

describe('findFreeSlots', () => {
  it('returns simple free window slices', () => {
    const events = [
      { start: '2025-08-31T04:30:00.000Z', end: '2025-08-31T05:00:00.000Z' },
      { start: '2025-08-31T05:30:00.000Z', end: '2025-08-31T06:00:00.000Z' }
    ];
    const slots = findFreeSlots(events, '2025-08-31T04:00:00.000Z', '2025-08-31T07:00:00.000Z', 30);
    expect(slots.length).toBeGreaterThan(0);
  });
});
