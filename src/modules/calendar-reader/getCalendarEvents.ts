import { getSession } from '@/modules/auth/session';

interface Args { provider: 'google' | 'microsoft'; from: string; to: string; }

export async function getCalendarEvents({ provider, from, to }: Args) {
  const session = getSession();
  const token = session.providerTokens[provider]?.accessToken;
  if (!token) return [];
  // Placeholder: actual fetch omitted; ensure no persistence.
  return [];
}
