import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import { getUsersCollection } from '$lib/server/db';
import { signToken } from '$lib/server/jwt';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    if (!username || !password) {
      return fail(400, { error: 'Username and password required' });
    }

    try {
      const users = await getUsersCollection();
      const user = await users.findOne({ username });

      if (!user) {
        return fail(401, { error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return fail(401, { error: 'Invalid credentials' });
      }

      const userId = (user._id as any).toString();
      const token = signToken({ sub: userId, username: user.username });

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
