'use client';
import { QueryClient } from '@tanstack/react-query';
import { makeQueryClient } from './query-config';

let browserQueryClient: QueryClient | undefined = undefined;

// For Client Components: singleton pattern to avoid recreating
// the QueryClient during React suspense/re-renders
export const getQueryClient = () => {
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
};

