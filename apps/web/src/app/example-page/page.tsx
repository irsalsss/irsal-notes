import { HydrateClient } from '@/lib/hydrate-client';
import { prefetchQuery, getDehydratedState } from '@/lib/prefetch-query';
import { ExampleHydratedQuery } from '@/components/example-hydrated-query';

/**
 * Example server component showing how to prefetch queries
 * The prefetched data will be hydrated on the client
 */
export default async function ExamplePage() {
  // Prefetch a query on the server
  const queryClient = await prefetchQuery(['example'], async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { message: 'Hello from React Query! (Prefetched on server)' };
  });

  // Get the dehydrated state to pass to the client
  const dehydratedState = getDehydratedState(queryClient);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
        React Query Hydration Example
      </h1>
      <HydrateClient state={dehydratedState}>
        <ExampleHydratedQuery />
      </HydrateClient>
    </div>
  );
}
