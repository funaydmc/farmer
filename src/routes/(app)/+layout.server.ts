import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { verifyToken } from '$lib/server/jwt';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const sessionToken = cookies.get('session');
  
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.some(route => url.pathname.startsWith(route));

  if (!sessionToken && !isPublicRoute) {
    throw redirect(303, '/login');
  }

  let user = null;
  if (sessionToken) {
    const payload = verifyToken(sessionToken);
    if (!payload && !isPublicRoute) {
      cookies.delete('session', { path: '/' });
      throw redirect(303, '/login');
    }
    if (payload) {
      user = { username: payload.username };
    }
  }

  // If logged in and trying to access login/register, redirect to home
  if (user && isPublicRoute) {
    throw redirect(303, '/');
  }

  return { user };
};
