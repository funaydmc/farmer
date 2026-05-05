import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUsersCollection } from '$lib/server/db';
import { verifyToken } from '$lib/server/jwt';

export const GET: RequestHandler = async ({ request }) => {
  try {
    const auth = request.headers.get('Authorization');
    if (!auth?.startsWith('Bearer ')) {
      throw error(401, 'Missing token');
    }

    const token = auth.slice(7);
    const payload = verifyToken(token);
    if (!payload) {
      throw error(401, 'Invalid or expired token');
    }

    const users = await getUsersCollection();
    const user = await users.findOne(
      { _id: payload.sub as any },
      { projection: { password_hash: 0 } }
    );

    if (!user) {
      throw error(404, 'User not found');
    }

    return json({
      username: user.username,
      max_concurrent_profiles: user.max_concurrent_profiles,
      created_at: user.created_at
    });
  } catch (err: any) {
    if (err.status) throw err;
    throw error(500, 'Internal server error');
  }
};
