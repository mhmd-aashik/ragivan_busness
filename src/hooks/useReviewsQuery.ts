import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsApi } from "@/lib/mockapi";
import { queryKeys } from "@/lib/query-client";
import { ProductReview } from "@/types/product";

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
    mutationFn: (review: {
      productId: string | number;
      rating: number;
      comment: string;
      userId?: string | number;
    }) => {
      const reviewData: Omit<ProductReview, "id"> = {
        user: `User ${review.userId || "Anonymous"}`,
        rating: review.rating,
        comment: review.comment,
        date: new Date().toISOString(),
        verified: false,
      };
      return reviewsApi.create(reviewData);
    },
    onSuccess: (data, variables) => {
      // Invalidate reviews for the specific product
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.list(variables.productId),
      });
      // Invalidate all reviews
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
}

// Hook to update a review
export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      review,
    }: {
      id: string | number;
      review: { rating: number; comment: string; userId?: string | number };
    }) => {
      const reviewData: Partial<ProductReview> = {
        rating: review.rating,
        comment: review.comment,
        user: review.userId ? `User ${review.userId}` : undefined,
      };
      return reviewsApi.update(id, reviewData);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.reviews.detail(variables.id), data);
      // Invalidate all reviews since we don't have productId in the response
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
