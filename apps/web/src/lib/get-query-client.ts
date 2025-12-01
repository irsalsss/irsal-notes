import { cache } from 'react';
import { makeQueryClient } from './query-config';

// For Server Components: use React's cache() to ensure the same
// QueryClient is used for the entire request/render cycle
export const getQueryClient = cache(() => makeQueryClient());

