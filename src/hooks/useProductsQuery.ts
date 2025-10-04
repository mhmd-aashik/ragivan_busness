import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "@/lib/mockapi";
import { queryKeys } from "@/lib/query-client";
import { Product } from "@/types";

// Interface for product filters
export interface ProductFilters {
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  availability?: "in-stock" | "out-of-stock" | "all";
  shipping?: "free" | "paid" | "all";
  features?: string[];
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  featured?: boolean;
  sortBy?:
    | "price-asc"
    | "price-desc"
    | "rating-desc"
    | "newest"
    | "popularity"
    | "name-asc"
    | "name-desc";
  page?: number;
  limit?: number;
}

// Hook to get all products with optional filters
export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: async () => {
      // In a real app, you'd send filters to the API
      // For now, we'll fetch all and filter client-side
      const allProducts = await productsApi.getAll();
      return applyFilters(allProducts, filters);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to get a single product by ID
export function useProduct(id: string | number) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to get products by category
export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.products.list({ category }),
    queryFn: () => productsApi.getByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to get featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: queryKeys.products.list({ featured: true }),
    queryFn: () => productsApi.getFeatured(),
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to get best selling products
export function useBestSellingProducts() {
  return useQuery({
    queryKey: queryKeys.products.list({ isBestSeller: true }),
    queryFn: () => productsApi.getBestSelling(),
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to get new arrival products
export function useNewArrivalProducts() {
  return useQuery({
    queryKey: queryKeys.products.list({ isNew: true }),
    queryFn: () => productsApi.getNewArrivals(),
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to get top rated products
export function useTopRatedProducts() {
  return useQuery({
    queryKey: queryKeys.products.list({ minRating: 4.8 }),
    queryFn: () => productsApi.getTopRated(),
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to search products
export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: queryKeys.products.list({ search: query }),
    queryFn: () => productsApi.search(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
}

// Hook to get product categories
export function useProductCategories() {
  return useQuery({
    queryKey: queryKeys.products.categories(),
    queryFn: async () => {
      const products = await productsApi.getAll();
      return [...new Set(products.map((p) => p.category))];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook to get product brands
export function useProductBrands() {
  return useQuery({
    queryKey: queryKeys.products.brands(),
    queryFn: async () => {
      const products = await productsApi.getAll();
      return [...new Set(products.map((p) => p.brand).filter(Boolean))];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook to get product features
export function useProductFeatures() {
  return useQuery({
    queryKey: queryKeys.products.features(),
    queryFn: async () => {
      const products = await productsApi.getAll();
      const allFeatures = products.flatMap((p) => p.features || []);
      return [...new Set(allFeatures)];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook to create a new product (admin)
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, "id">) => productsApi.create(product),
    onSuccess: () => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

// Hook to update a product (admin)
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: string | number;
      product: Partial<Product>;
    }) => productsApi.update(id, product),
    onSuccess: (data, variables) => {
      // Update the specific product in cache
      queryClient.setQueryData(queryKeys.products.detail(variables.id), data);
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

// Hook to delete a product (admin)
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => productsApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.products.detail(id) });
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

// Client-side filtering function
function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let filtered = [...products];

  // Category filter
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(
      (product) =>
        product.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  // Brand filter
  if (filters.brand && filters.brand !== "all") {
    filtered = filtered.filter(
      (product) => product.brand?.toLowerCase() === filters.brand!.toLowerCase()
    );
  }

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Price filters
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((product) => product.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((product) => product.price <= filters.maxPrice!);
  }

  // Rating filter
  if (filters.minRating !== undefined) {
    filtered = filtered.filter(
      (product) => product.rating >= filters.minRating!
    );
  }

  // Availability filter
  if (filters.availability && filters.availability !== "all") {
    filtered = filtered.filter(
      (product) => product.availability === filters.availability
    );
  }

  // Shipping filter
  if (filters.shipping && filters.shipping !== "all") {
    filtered = filtered.filter(
      (product) => product.shipping === filters.shipping
    );
  }

  // Feature filters
  if (filters.features && filters.features.length > 0) {
    filtered = filtered.filter((product) =>
      filters.features!.some((feature) =>
        product.features?.some((pf) =>
          pf.toLowerCase().includes(feature.toLowerCase())
        )
      )
    );
  }

  // Tag filters
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((product) =>
      filters.tags!.some((tag) =>
        product.tags?.some((pt) => pt.toLowerCase().includes(tag.toLowerCase()))
      )
    );
  }

  // Status filters
  if (filters.isNew !== undefined) {
    filtered = filtered.filter((product) => product.isNew === filters.isNew);
  }
  if (filters.isBestSeller !== undefined) {
    filtered = filtered.filter(
      (product) => product.isBestSeller === filters.isBestSeller
    );
  }
  if (filters.featured !== undefined) {
    filtered = filtered.filter(
      (product) => product.featured === filters.featured
    );
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popularity":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }

  // Note: Pagination is handled client-side in the component
  // We don't apply pagination here to maintain the full filtered dataset

  return filtered;
}
