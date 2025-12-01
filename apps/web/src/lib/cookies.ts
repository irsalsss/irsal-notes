import { cookies } from 'next/headers';

/**
 * Get the cookie header string for server-side API calls.
 * This is useful for passing authentication cookies to API requests
 * made from Server Components.
 */
export const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

