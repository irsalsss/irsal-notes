'use client';

import { useQuery } from '@tanstack/react-query';

/**
 * Example client component that uses a query
 * This will use prefetched data if available, or fetch on the client
 */
export function ExampleHydratedQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { message: 'Hello from React Query!' };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
      }}
    >
      <h2 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
        Hydrated Query Example
      </h2>
      <p>{data?.message}</p>
      <p
        style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem' }}
      >
        This data was prefetched on the server and hydrated on the client!
      </p>
    </div>
  );
}
