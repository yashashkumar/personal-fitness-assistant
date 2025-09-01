# Privacy & Data Handling

## Principles
- No storage of calendar event payloads (titles, attendees, descriptions).
- In-memory processing only for free-slot detection & planning.
- Minimal telemetry: workout completions (timestamp, workoutId, exertion 1-10) & skips (reason code).
- Session cookie holds tokens & preferences; encrypted (HttpOnly, Secure, SameSite=Lax).

## Logging Policy
- Log only counts of events fetched, not details.
- Hash (SHA-256) of concatenated event IDs optional for debugging uniqueness; no raw IDs stored.
- Redact tokens automatically (middleware placeholder).

## Checklist
- [ ] Event fetch functions: return arrays but never call persistence.
- [ ] Middleware strips sensitive fields from outbound logs.
- [ ] Tests confirm no function writes event objects to disk.
- [ ] Snapshot saving excludes calendar event metadata.

## Data Lifecycle
1. OAuth tokens retrieved & stored in session cookie.
2. Events fetched -> processed -> discarded after response.
3. Plan created: only workoutId + slot times retained if user saves.
4. Metrics computed from saved plan & completion telemetry only.

## User Rights
- Revoke token: session cleared.
- Delete data: clears preferences & telemetry (no calendar data ever stored).
