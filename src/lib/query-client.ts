import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that data remains fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Time in milliseconds that unused/inactive cache data remains in memory
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      // Retry failed requests
      retry: (failureCount, error: unknown) => {
        // Don't retry for 4xx errors (client errors)
        if (error && typeof error === 'object' && 'status' in error && 
            typeof (error as { status: unknown }).status === 'number' && 
            (error as { status: number }).status >= 400 && (error as { status: number }).status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      // Retry delay
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Products
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.products.details(), id] as const,
    categories: () => [...queryKeys.products.all, 'categories'] as const,
    brands: () => [...queryKeys.products.all, 'brands'] as const,
    features: () => [...queryKeys.products.all, 'features'] as const,
  },
  // Categories
  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
    detail: (id: string | number) => [...queryKeys.categories.all, 'detail', id] as const,
  },
  // Reviews
  reviews: {
    all: ['reviews'] as const,
    lists: () => [...queryKeys.reviews.all, 'list'] as const,
    list: (productId: string | number) => [...queryKeys.reviews.lists(), productId] as const,
    detail: (id: string | number) => [...queryKeys.reviews.all, 'detail', id] as const,
  },
} as const;
