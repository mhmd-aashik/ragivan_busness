import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "@/lib/mockapi";
import { queryKeys } from "@/lib/query-client";

// Hook to get all categories
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: () => categoriesApi.getAll(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook to get a single category by ID
export function useCategory(id: string | number) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
  });
}

// Hook to create a new category (admin)
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: { name: string; description?: string; image?: string }) => categoriesApi.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

// Hook to update a category (admin)
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: { id: string | number; category: { name: string; description?: string; image?: string } }) =>
      categoriesApi.update(id, category),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.categories.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

// Hook to delete a category (admin)
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => categoriesApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.categories.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}
