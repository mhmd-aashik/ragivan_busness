import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { productsApi } from "@/lib/mockapi";
import { Product } from "@/types";

export interface FilterOptions {
  // Basic filters
  category?: string;
  brand?: string;
  search?: string;

  // Price filters
  minPrice?: number;
  maxPrice?: number;

  // Rating filters
  minRating?: number;

  // Availability filters
  availability?: "in-stock" | "out-of-stock" | "all";

  // Shipping filters
  shipping?: "free" | "paid" | "all";

  // Feature filters
  features?: string[];
  tags?: string[];

  // Status filters
  isNew?: boolean;
  isBestSeller?: boolean;
  featured?: boolean;

  // Sorting
  sortBy?:
    | "price-asc"
    | "price-desc"
    | "rating-desc"
    | "newest"
    | "popularity"
    | "name-asc"
    | "name-desc";

  // Pagination
  page?: number;
  limit?: number;
}

export interface FilterState {
  filters: FilterOptions;
  products: Product[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
}

export function useAdvancedFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<FilterState>({
    filters: {},
    products: [],
    loading: true,
    error: null,
    totalCount: 0,
    hasMore: false,
    currentPage: 1,
  });

  // Parse URL parameters into filter options
  const parseUrlParams = useCallback((): FilterOptions => {
    const filters: FilterOptions = {};

    // Basic filters
    if (searchParams.get("category"))
      filters.category = searchParams.get("category")!;
    if (searchParams.get("brand")) filters.brand = searchParams.get("brand")!;
    if (searchParams.get("search"))
      filters.search = searchParams.get("search")!;

    // Price filters
    if (searchParams.get("minPrice"))
      filters.minPrice = parseInt(searchParams.get("minPrice")!);
    if (searchParams.get("maxPrice"))
      filters.maxPrice = parseInt(searchParams.get("maxPrice")!);

    // Rating filters
    if (searchParams.get("minRating"))
      filters.minRating = parseFloat(searchParams.get("minRating")!);

    // Availability filters
    if (searchParams.get("availability")) {
      filters.availability = searchParams.get("availability") as
        | "in-stock"
        | "out-of-stock"
        | "all";
    }

    // Shipping filters
    if (searchParams.get("shipping")) {
      filters.shipping = searchParams.get("shipping") as
        | "free"
        | "paid"
        | "all";
    }

    // Feature filters
    if (searchParams.get("features")) {
      filters.features = searchParams.get("features")!.split(",");
    }
    if (searchParams.get("tags")) {
      filters.tags = searchParams.get("tags")!.split(",");
    }

    // Status filters
    if (searchParams.get("isNew"))
      filters.isNew = searchParams.get("isNew") === "true";
    if (searchParams.get("isBestSeller"))
      filters.isBestSeller = searchParams.get("isBestSeller") === "true";
    if (searchParams.get("featured"))
      filters.featured = searchParams.get("featured") === "true";

    // Sorting
    if (searchParams.get("sortBy")) {
      filters.sortBy = searchParams.get("sortBy") as
        | "price-asc"
        | "price-desc"
        | "rating-desc"
        | "newest"
        | "popularity"
        | "name-asc"
        | "name-desc";
    }

    // Pagination
    if (searchParams.get("page"))
      filters.page = parseInt(searchParams.get("page")!);
    if (searchParams.get("limit"))
      filters.limit = parseInt(searchParams.get("limit")!);

    return filters;
  }, [searchParams]);

  // Apply filters to products
  const applyFilters = useCallback(
    (products: Product[], filters: FilterOptions): Product[] => {
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
          (product) =>
            product.brand?.toLowerCase() === filters.brand!.toLowerCase()
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
        filtered = filtered.filter(
          (product) => product.price >= filters.minPrice!
        );
      }
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(
          (product) => product.price <= filters.maxPrice!
        );
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
            product.tags?.some((pt) =>
              pt.toLowerCase().includes(tag.toLowerCase())
            )
          )
        );
      }

      // Status filters
      if (filters.isNew !== undefined) {
        filtered = filtered.filter(
          (product) => product.isNew === filters.isNew
        );
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
            filtered.sort((a, b) => {
              const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return dateB - dateA;
            });
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

      return filtered;
    },
    []
  );

  // Fetch and filter products
  const fetchProducts = useCallback(
    async (filters: FilterOptions) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Fetch all products (in a real app, you'd send filters to the API)
        const allProducts = await productsApi.getAll();

        // Apply client-side filtering
        const filteredProducts = applyFilters(allProducts, filters);

        // Pagination
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        setState((prev) => ({
          ...prev,
          products: paginatedProducts,
          totalCount: filteredProducts.length,
          hasMore: endIndex < filteredProducts.length,
          currentPage: page,
          loading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to fetch products",
          loading: false,
        }));
      }
    },
    [applyFilters]
  );

  // Update filters and URL
  const updateFilters = useCallback(
    (newFilters: Partial<FilterOptions>) => {
      const currentFilters = parseUrlParams();
      const updatedFilters = { ...currentFilters, ...newFilters, page: 1 }; // Reset to page 1

      // Update URL
      const params = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (Array.isArray(value)) {
            params.set(key, value.join(","));
          } else {
            params.set(key, value.toString());
          }
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [parseUrlParams, router]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    router.push("", { scroll: false });
  }, [router]);

  // Load more products (pagination)
  const loadMore = useCallback(async () => {
    const currentFilters = parseUrlParams();
    const nextPage = (currentFilters.page || 1) + 1;
    updateFilters({ page: nextPage });
  }, [parseUrlParams, updateFilters]);

  // Initialize filters from URL
  useEffect(() => {
    const filters = parseUrlParams();
    setState((prev) => ({ ...prev, filters }));
    fetchProducts(filters);
  }, [parseUrlParams, fetchProducts]);

  return {
    ...state,
    updateFilters,
    clearFilters,
    loadMore,
    refetch: () => fetchProducts(parseUrlParams()),
  };
}

// Helper hook for getting filter options
export function useFilterOptions() {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const products = await productsApi.getAll();

        // Extract unique categories
        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        setCategories(uniqueCategories);

        // Extract unique brands
        const uniqueBrands = [
          ...new Set(products.map((p) => p.brand).filter(Boolean)),
        ] as string[];
        setBrands(uniqueBrands);

        // Extract unique features
        const allFeatures = products.flatMap((p) => p.features || []);
        const uniqueFeatures = [...new Set(allFeatures)];
        setFeatures(uniqueFeatures);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching filter options:", error);
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return { categories, brands, features, loading };
}
