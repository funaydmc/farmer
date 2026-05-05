import { google } from 'googleapis';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const oauth2Client = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_CALLBACK_URL
);

export const POST: RequestHandler = async () => {
  try {
    const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
    return new Response(JSON.stringify({ url: authUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Google OAuth init error:', error);
    return new Response(JSON.stringify({ error: 'Failed to initiate Google login' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
