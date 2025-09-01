import { NextRequest, NextResponse } from 'next/server';
import { getSession, saveSession } from '@/modules/auth/session';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'No code' }, { status: 400 });
  const redirectUri = url.origin + '/api/auth/google/callback';
  const session = getSession();
  const verifier = (session as any).googleVerifier;
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code_verifier: verifier
      })
    });
    if (!tokenRes.ok) {
      return NextResponse.json({ error: 'Token exchange failed' }, { status: 400 });
    }
    const tokens = await tokenRes.json();
    session.providerTokens.google = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + tokens.expires_in * 1000
    };
    saveSession(session);
    return NextResponse.redirect(url.origin + '/planner');
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
