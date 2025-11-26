'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthControllerGetProfile } from '@/features/api/auth/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, isError } = useAuthControllerGetProfile({
    query: {
      retry: false, // Don't retry on 401, just redirect
    },
  });

  useEffect(() => {
    const isAuthPage = pathname?.startsWith('/auth');
    const isAuthenticated = !isError && !!data;

    if (!isLoading && !isAuthenticated && !isAuthPage) {
      router.push('/auth/sign-in');
    }
  }, [data, isError, isLoading, pathname, router]);

  if (isLoading || (isError && !pathname?.startsWith('/auth'))) {
    return null;
  }

  return <>{children}</>;
}
