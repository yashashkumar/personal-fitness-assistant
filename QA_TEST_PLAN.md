# QA & Edge Case Test Plan

## Areas
- Time Zones & DST
- All-day events blocking
- Micro gaps (<5m) exclusion
- Token expiration & revocation (Google only in this build)
- Accessibility (A11y)
- Performance (large calendar)

## Scenarios
1. DST Transition: Provide events spanning DST change -> ensure free slot computation correct lengths.
2. All-Day Event: Single all-day blocks entire range -> zero free slots.
3. Back-to-back Meetings: 09:00-09:30, 09:30-10:00 -> no 5m slot between.
4. Token Expired: Simulate 401 from provider -> trigger refresh (TODO) or sign-out.
5. Consent Revoked: Provider returns 403 -> clear session.
6. Accessibility Keyboard: Tab order cycles through interactive elements; Enter activates buttons.
7. Screen Reader: Semantic headings present (h1/h2); charts have aria-label summaries.
8. Large Calendar: 500 events day -> algorithm under 100ms (benchmark).

## Acceptance Criteria
- All test cases pass; no calendar payload persisted to disk (verified by grep for persistence calls).
- Lighthouse accessibility score >= 90 for planner & dashboard.
- Free-slot detection returns deterministic output for ordered input.

## Cypress E2E (Future)
- Connect mock auth -> planner shows schedule.
- Mark session complete -> dashboard increments sessions.

