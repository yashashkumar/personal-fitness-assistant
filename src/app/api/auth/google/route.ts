import { NextRequest, NextResponse } from 'next/server';
import { generateCodeVerifier, generateCodeChallenge } from '@/modules/auth/pkce';
import { getSession, saveSession } from '@/modules/auth/session';

const GOOGLE_AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const redirectUri = url.origin + '/api/auth/google/callback';
  const verifier = generateCodeVerifier();
  const challenge = generateCodeChallenge(verifier);
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/calendar.readonly openid email profile',
    access_type: 'offline',
    prompt: 'consent',
    code_challenge: challenge,
    code_challenge_method: 'S256'
  });
  const session = getSession();
  (session as any).googleVerifier = verifier;
  saveSession(session);
  return NextResponse.redirect(`${GOOGLE_AUTH}?${params.toString()}`);
}
