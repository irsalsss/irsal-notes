/**
 * Check if user is authenticated by calling the profile endpoint
 * This is more reliable than checking a cookie flag since it verifies
 * the actual authentication status with the backend
 */
export const isAuthenticated = async (): Promise<boolean> => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/profile`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Sign out by clearing cookies
 * Since the cookie is httpOnly, I need to call a backend endpoint to clear it
 */
export const signOut = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/sign_out`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (response.ok) {
      window.location.href = '/auth/sign-in';
    } else {
      window.location.href = '/auth/sign-in';
    }
  } catch (error) {
    console.error('Sign out error:', error);
    window.location.href = '/auth/sign-in';
  }
};

