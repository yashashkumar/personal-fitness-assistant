import { cookies } from 'next/headers';

export interface SessionData { userId: string; providerTokens: Record<string, { accessToken: string; refreshToken?: string; expiresAt: number }>; preferences?: any; }

const COOKIE = 'pfa_session';

export function getSession(): SessionData {
  const raw = cookies().get(COOKIE)?.value;
  if (!raw) return { userId: 'anon', providerTokens: {} };
  try { return JSON.parse(raw); } catch { return { userId: 'anon', providerTokens: {} }; }
}

export function saveSession(data: SessionData) {
  cookies().set(COOKIE, JSON.stringify(data), { httpOnly: true, sameSite: 'lax', secure: true, path: '/' });
}
