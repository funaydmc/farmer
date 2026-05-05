import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import { getUsersCollection } from '$lib/server/db';
import { signToken } from '$lib/server/jwt';
import type { User } from '$lib/server/types';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    if (!username || !password) {
      return fail(400, { error: 'Username and password required' });
    }
    if (username.length < 3) {
      return fail(400, { error: 'Username must be at least 3 characters' });
    }
    if (password.length < 6) {
      return fail(400, { error: 'Password must be at least 6 characters' });
    }

    try {
      const users = await getUsersCollection();
      const existing = await users.findOne({ username });
      if (existing) {
        return fail(409, { error: 'User already exists' });
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
    } catch (err) {
      return fail(500, { error: 'Internal server error' });
    }

    throw redirect(303, '/');
  }
};
