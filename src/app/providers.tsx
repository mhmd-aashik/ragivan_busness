"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each user session
  // This ensures that data is not shared between different users
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Time in milliseconds that data remains fresh
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Time in milliseconds that unused/inactive cache data remains in memory
            gcTime: 10 * 60 * 1000, // 10 minutes
            // Retry failed requests
            retry: (failureCount, error: any) => {
              // Don't retry for 4xx errors (client errors)
              if (error?.status >= 400 && error?.status < 500) {
                return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            // Retry delay
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
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
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
