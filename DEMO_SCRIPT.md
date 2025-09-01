# 3-Min Investor Demo (Script)

## Flow
1. Landing: "We plan workouts automatically from your real availability—no calendar data stored." Click Connect Google.
2. OAuth Redirect + Return -> Planner auto-populates.
3. Highlight micro 10-min slot: "We even capture micro-opportunities so consistency stays high."
4. Show lighter day after previous intense session (toggle sleep-aware): toggle off/on.
5. Accept Plan.
6. Mark two sessions complete (simulate via API or UI button) -> open Dashboard.
7. Dashboard KPIs: adherence, minutes, balanced focus.

## Wow Moments
- Micro-slot workout suggestion.
- Automatic lighter day rule after high intensity / low sleep toggle.

## Script Snippets
"Traditional apps ask you to schedule workouts manually. We invert that: we read your calendar (read-only) and plan around your life instantly." 
"Privacy-first: zero event text ever leaves memory—only counts and hashes in logs." 
"With one click I accept this adaptive plan and my adherence tracking begins immediately." 

## Checklist
- [ ] Google OAuth credentials configured.
- [ ] At least one day with dense meetings + small gaps.
- [ ] Sleep-aware toggle visible.
- [ ] Dashboard shows non-zero adherence after completions.
- [ ] No console errors.
