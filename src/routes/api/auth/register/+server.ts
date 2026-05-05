import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import bcrypt from 'bcrypt';
import { getUsersCollection } from '$lib/server/db';
import { signToken } from '$lib/server/jwt';
import type { User } from '$lib/server/types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      throw error(400, 'Username and password required');
    }
    if (username.length < 3) {
      throw error(400, 'Username must be at least 3 characters');
    }
    if (password.length < 6) {
      throw error(400, 'Password must be at least 6 characters');
    }

    const users = await getUsersCollection();
    const existing = await users.findOne({ username });
    if (existing) {
      throw error(409, 'User already exists');
    }

    const password_hash = await bcrypt.hash(password, 10);
    const now = new Date();
    const user: User = {
      username,
      password_hash,
      max_concurrent_profiles: 3,
      created_at: now,
      updated_at: now
    };

    const result = await users.insertOne(user as any);
    const userId = (result.insertedId as any).toString();

    const token = signToken({ sub: userId, username });

    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax'
    });

    return json({ token, user: { username, max_concurrent_profiles: user.max_concurrent_profiles } });
  } catch (err: any) {
    if (err.status) throw err;
    throw error(500, 'Internal server error');
  }
};
