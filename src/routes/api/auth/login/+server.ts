import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import bcrypt from 'bcrypt';
import { getUsersCollection } from '$lib/server/db';
import { signToken } from '$lib/server/jwt';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      throw error(400, 'Username and password required');
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ username });

    if (!user) {
      throw error(401, 'Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw error(401, 'Invalid credentials');
    }

    const userId = (user._id as any).toString();
    const token = signToken({ sub: userId, username: user.username });

    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax'
    });

    return json({ token, user: { username: user.username, max_concurrent_profiles: user.max_concurrent_profiles } });
  } catch (err: any) {
    if (err.status) throw err;
    throw error(500, 'Internal server error');
  }
};
