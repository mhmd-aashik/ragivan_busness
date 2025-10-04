import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsApi } from "@/lib/mockapi";
import { queryKeys } from "@/lib/query-client";

// Hook to get reviews for a product
export function useProductReviews(productId: string | number) {
  return useQuery({
    queryKey: queryKeys.reviews.list(productId),
    queryFn: () => reviewsApi.getByProduct(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to get a single review by ID
export function useReview(id: string | number) {
  return useQuery({
    queryKey: queryKeys.reviews.detail(id),
    queryFn: () => reviewsApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to create a new review
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: any) => reviewsApi.create(review),
    onSuccess: (data) => {
      // Invalidate reviews for the specific product
      if (data.productId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.reviews.list(data.productId) 
        });
      }
      // Invalidate all reviews
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
}

// Hook to update a review
export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, review }: { id: string | number; review: any }) =>
      reviewsApi.update(id, review),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.reviews.detail(variables.id), data);
      // Invalidate reviews for the product
      if (data.productId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.reviews.list(data.productId) 
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
}

// Hook to delete a review
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => reviewsApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.reviews.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
}
