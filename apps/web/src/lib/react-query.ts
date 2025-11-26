import { QueryClient, DefaultOptions } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 1000, // 1 minute
  },
};

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if I don't already have one
    // This is very important, so I don't re-make a new client if React
    // suspends during the initial render
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

