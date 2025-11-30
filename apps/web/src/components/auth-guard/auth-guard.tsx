'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthControllerGetProfile } from '@/features/api/auth/auth';
import { UserInfoState, useUserInfoStore } from '@/store/user-info-store';
import { useShallow } from 'zustand/react/shallow';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { setUserInfo } = useUserInfoStore(
    useShallow((state: UserInfoState) => ({
      setUserInfo: state.setUserInfo,
    }))
  );

  const { data, isLoading, isError } = useAuthControllerGetProfile({
    query: {
      retry: false, // Don't retry on 401, just redirect
      select: (response) => response.data,
    },
  });

  useEffect(() => {
    if (!!data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);

  useEffect(() => {
    const isAuthPage = pathname?.startsWith('/auth');
    const isAuthenticated = !isError && !!data;

    if (!isLoading && !isAuthenticated && !isAuthPage) {
      router.push('/auth/sign-in');
    }

    if (!isLoading && isAuthenticated && isAuthPage) {
      router.push('/');
    }
  }, [data, isError, isLoading, pathname, router]);

  if (isLoading || (isError && !pathname?.startsWith('/auth'))) {
    return null;
  }

  return <>{children}</>;
}
