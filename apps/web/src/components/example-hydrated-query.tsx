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
        padding: 'var(--spacing-4)',
        border: `1px solid var(--color-border)`,
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <h2 style={{ fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>
        Hydrated Query Example
      </h2>
      <p>{data?.message}</p>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-body-muted)',
          marginTop: 'var(--spacing-2)',
        }}
      >
        This data was prefetched on the server and hydrated on the client!
      </p>
    </div>
  );
}
