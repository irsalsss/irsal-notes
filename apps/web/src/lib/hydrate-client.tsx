'use client';

import { HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import { ReactNode } from 'react';

/**
 * Client component wrapper for React Query hydration
 * Use this in server components that need to pass prefetched data to client components
 * 
 * Note: This component must be used within the Providers component (in layout.tsx)
 * which already provides the QueryClientProvider
 */
export function HydrateClient({
  children,
  state,
}: {
  children: ReactNode;
  state?: DehydratedState;
}) {
  if (state) {
    return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
  }

  return <>{children}</>;
}

