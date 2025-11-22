'use client';

import { QueryClientProvider, HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { getQueryClient } from '@/lib/react-query';

export default function Providers({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}) {
  // This ensures the data isn't shared between different users and requests
  // while still creating a new QueryClient per request on the server
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {dehydratedState ? (
        <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      ) : (
        children
      )}
    </QueryClientProvider>
  );
}

