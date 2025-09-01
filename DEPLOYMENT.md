# Deployment & Environment

## Hosting
- Vercel (recommended) for Next.js edge benefits.

## Env Vars
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_SECRET (session encryption / future state)

## Security
- Force HTTPS (Vercel auto). Set `secure` cookies.
- CORS: same-origin.
- Rate limit (add middleware / edge config TBD).

## Observability
- Add minimal error tracking (e.g., Sentry) excluding event details.
- Uptime monitoring (HEAD /api/health endpoint future addition).

## Runbook
- Failure: OAuth exchange failing -> check client secret rotation.
- Spikes: Increase concurrency—stateless except session cookie.
- Incident: Clear cached deployment; rotate secrets; verify logs have no PII.
