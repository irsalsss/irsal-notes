'use client';

import { Header } from '@repo/ui';
import { useAuthControllerGetProfile } from '@/features/api/auth/auth';
import { signOut } from '@/lib/auth';

type UserProfile = {
  sub: string;
  email: string;
};

const HeaderWithAuth = () => {
  const { data: userResponse } = useAuthControllerGetProfile();

  const handleSignOut = async () => {
    await signOut();
  };

  // The customInstance extracts data from axios response, so userResponse is the actual user object
  const user = userResponse as unknown as UserProfile | undefined;

  return (
    <Header
      user={
        user ? { id: parseInt(user.sub, 10), email: user.email } : undefined
      }
      onSignOut={handleSignOut}
    />
  );
};

export default HeaderWithAuth;
