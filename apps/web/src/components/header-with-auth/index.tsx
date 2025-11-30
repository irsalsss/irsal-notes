'use client';

import { Header } from '@repo/ui';
import { signOut } from '@/lib/auth';
import { UserInfoState, useUserInfoStore } from '@/store/user-info-store';
import { useShallow } from 'zustand/react/shallow';

const HeaderWithAuth = () => {
  const { userInfo } = useUserInfoStore(
    useShallow((state: UserInfoState) => ({
      userInfo: state.userInfo,
    }))
  );

  const handleSignOut = async () => {
    await signOut();
  };

  return <Header user={userInfo} onSignOut={handleSignOut} />;
};

export default HeaderWithAuth;
