import { google } from 'googleapis';
import { signToken } from '$lib/server/jwt';
import { getDb } from '$lib/server/db';
import bcrypt from 'bcrypt';
import type { RequestHandler } from '@sveltejs/kit';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

export const GET: RequestHandler = async ({ url, cookies }) => {
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response('Authorization code missing', { status: 400 });
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    const email = data.email;
    const name = data.name || 'User';
    const picture = data.picture || '';

    if (!email) {
      return new Response('Email not found from Google', { status: 400 });
    }

    const db = await getDb();
    const users = db.collection('users');

    // Check if user exists
    let user = await users.findOne({ email });

    if (!user) {
      // Create new user
      const randomPassword = Math.random().toString(36).slice(-16);
      const passwordHash = await bcrypt.hash(randomPassword, 10);

      const now = new Date();
      const result = await users.insertOne({
        username: email,
        email,
        password_hash: passwordHash,
        display_name: name,
        avatar_url: picture,
        max_concurrent_profiles: 3,
        created_at: now,
        updated_at: now
      });

      user = await users.findOne({ _id: result.insertedId });
    }

    if (!user) {
      return new Response('Failed to create or retrieve user', { status: 500 });
    }

    // Sign JWT
    const token = signToken({
      sub: user._id.toString(),
      username: user.username || user.email
    });

    // Set cookie
    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });

    // Redirect to home/dashboard
    return new Response(null, {
      status: 302,
      headers: { Location: '/' }
    });
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return new Response(null, {
      status: 302,
      headers: { Location: '/login?error=google_failed' }
    });
  }
};
