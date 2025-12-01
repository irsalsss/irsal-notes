import { DefaultOptions, QueryClient } from '@tanstack/react-query';

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 1000, // 1 minute
  },
};

export const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
};

