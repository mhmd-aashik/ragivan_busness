"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useProducts,
  ProductFilters as ProductFiltersType,
} from "@/hooks/useProductsQuery";
import ProductFilters from "@/components/ProductFilters";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Product } from "@/types";
import { Grid, List, SlidersHorizontal } from "lucide-react";

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFiltersType>({});

  // Parse URL parameters
  useEffect(() => {
    const urlFilters: ProductFiltersType = {};

    if (searchParams.get("category"))
      urlFilters.category = searchParams.get("category")!;
    if (searchParams.get("brand"))
      urlFilters.brand = searchParams.get("brand")!;
    if (searchParams.get("search"))
      urlFilters.search = searchParams.get("search")!;
    if (searchParams.get("minPrice"))
      urlFilters.minPrice = parseInt(searchParams.get("minPrice")!);
    if (searchParams.get("maxPrice"))
      urlFilters.maxPrice = parseInt(searchParams.get("maxPrice")!);
    if (searchParams.get("minRating"))
      urlFilters.minRating = parseFloat(searchParams.get("minRating")!);
    if (searchParams.get("availability"))
      urlFilters.availability = searchParams.get("availability") as
        | "all"
        | "in-stock"
        | "out-of-stock";
    if (searchParams.get("shipping"))
      urlFilters.shipping = searchParams.get("shipping") as
        | "all"
        | "free"
        | "paid";
    if (searchParams.get("features"))
      urlFilters.features = searchParams.get("features")!.split(",");
    if (searchParams.get("tags"))
      urlFilters.tags = searchParams.get("tags")!.split(",");
    if (searchParams.get("isNew"))
      urlFilters.isNew = searchParams.get("isNew") === "true";
    if (searchParams.get("isBestSeller"))
      urlFilters.isBestSeller = searchParams.get("isBestSeller") === "true";
    if (searchParams.get("featured"))
      urlFilters.featured = searchParams.get("featured") === "true";
    if (searchParams.get("sortBy"))
      urlFilters.sortBy = searchParams.get("sortBy") as
        | "popularity"
        | "price-asc"
        | "price-desc"
        | "rating-desc"
        | "newest"
        | "name-asc"
        | "name-desc";
    if (searchParams.get("page"))
      urlFilters.page = parseInt(searchParams.get("page")!);

    // Don't set limit here - we want all filtered results for client-side pagination
    setFilters(urlFilters);
  }, [searchParams]);

  // Fetch products with filters
  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useProducts(filters);

  // Handle filter changes
  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    // Remove page from filters to get all results
    const { page, ...filtersWithoutPage } = newFilters;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = page; // Explicitly mark as unused
    setFilters(filtersWithoutPage);
    setCurrentPage(1);
  };

  // Pagination - use the full filtered products array
  const totalPages = Math.ceil(products.length / 20);
  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // Debug logging
  console.log("Pagination Debug:", {
    totalProducts: products.length,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedProductsCount: paginatedProducts.length,
  });

  const goToPage = (page: number) => {
    setCurrentPage(page);

    // Update URL without changing the API filters
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleProductClick = (product: Product) => {
    // Navigate to product detail page or open modal
    console.log("Product clicked:", product);
  };

  return (
    <ErrorBoundary>
      <div
        className="min-h-screen  bg-gradient-to-br from-gray-900 
      via-purple-900 to-violet-900 "
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white mb-2">
              All Products
            </h1>
            <p className="text-gray-300 text-sm">
              Discover our complete collection of premium tech products
            </p>
          </div>

          {/* Top Filters Bar */}
          <div className="mb-6">
            <ProductFilters onFiltersChange={handleFiltersChange} />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>

                  <div className="text-gray-300 text-sm">
                    {isLoading ? (
                      <span>Loading products...</span>
                    ) : (
                      <span>
                        Showing {startIndex + 1}-
                        {Math.min(endIndex, products.length)} of{" "}
                        {products.length} products
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-purple-500 text-white"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-purple-500 text-white"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div
                  className={`grid gap-4 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton
                      key={index}
                      isListView={viewMode === "list"}
                    />
                  ))}
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-400 mb-4">
                    Error loading products: {error.message}
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-200"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Products Grid/List */}
              {!isLoading && !error && (
                <>
                  <div
                    className={`grid gap-4 ${
                      viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    }`}
                  >
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isListView={viewMode === "list"}
                        onClick={handleProductClick}
                      />
                    ))}
                  </div>

                  {/* No Products Found */}
                  {products.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-white text-lg mb-4">
                        No products found
                      </p>
                      <p className="text-gray-300">
                        Try adjusting your filters or search terms
                      </p>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Previous
                      </button>

                      <div className="flex gap-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                              currentPage === page
                                ? "bg-purple-500 text-white"
                                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
