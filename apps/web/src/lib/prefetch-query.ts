import { QueryClient, QueryFunction, QueryKey, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from './react-query';

/**
 * Prefetch a query on the server
 * @param queryKey - The query key
 * @param queryFn - The query function
 * @returns The query client with prefetched data
 */
export async function prefetchQuery<
  TQueryFnData = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: {
    staleTime?: number;
  },
) {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: options?.staleTime ?? 60 * 1000, // Default 1 minute
  });

  return queryClient;
}

/**
 * Get dehydrated state from a query client
 * Use this in server components to pass data to client components
 */
export function getDehydratedState(queryClient: QueryClient) {
  return dehydrate(queryClient);
}

