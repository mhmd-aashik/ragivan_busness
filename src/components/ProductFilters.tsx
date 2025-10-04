"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useProductCategories,
  useProductBrands,
  useProductFeatures,
} from "@/hooks/useProductsQuery";
import { ProductFilters } from "@/hooks/useProductsQuery";

interface ProductFiltersProps {
  onFiltersChange?: (filters: ProductFilters) => void;
}

export default function ProductFilters({
  onFiltersChange,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch filter options
  const { data: categories = [], isLoading: categoriesLoading } =
    useProductCategories();
  const { data: brands = [], isLoading: brandsLoading } = useProductBrands();
  const { data: features = [], isLoading: featuresLoading } =
    useProductFeatures();

  // Local filter state
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    search: searchParams.get("search") || "",
    minPrice: searchParams.get("minPrice")
      ? parseInt(searchParams.get("minPrice")!)
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice")!)
      : undefined,
    minRating: searchParams.get("minRating")
      ? parseFloat(searchParams.get("minRating")!)
      : undefined,
    availability: (searchParams.get("availability") as any) || "all",
    shipping: (searchParams.get("shipping") as any) || "all",
    features: searchParams.get("features")?.split(",") || [],
    tags: searchParams.get("tags")?.split(",") || [],
    isNew: searchParams.get("isNew") === "true",
    isBestSeller: searchParams.get("isBestSeller") === "true",
    featured: searchParams.get("featured") === "true",
    sortBy: (searchParams.get("sortBy") as any) || "popularity",
  });

  // Update URL when filters change
  const updateURL = (newFilters: ProductFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== false
      ) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(","));
          }
        } else {
          params.set(key, value.toString());
        }
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle filter changes
  const handleFilterChange = (
    key: keyof ProductFilters,
    value: string | number | boolean | string[] | undefined
  ) => {
    const newFilters = { ...filters, [key]: value, page: 1 }; // Reset to page 1
    setFilters(newFilters);
    updateURL(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: ProductFilters = {
      sortBy: "popularity",
      availability: "all",
      shipping: "all",
    };
    setFilters(clearedFilters);
    updateURL(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  // Price range slider
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || 0,
    max: filters.maxPrice || 100000,
  });

  const handlePriceRangeChange = (type: "min" | "max", value: number) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);

    const newFilters = {
      ...filters,
      minPrice: newPriceRange.min,
      maxPrice: newPriceRange.max,
    };
    setFilters(newFilters);
    updateURL(newFilters);
    onFiltersChange?.(newFilters);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Search
          </label>
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-colors duration-200"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Category
          </label>
          <select
            value={filters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
            disabled={categoriesLoading}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Brand
          </label>
          <select
            value={filters.brand || ""}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
            disabled={brandsLoading}
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Price: Rs. {priceRange.min.toLocaleString()} - Rs.{" "}
            {priceRange.max.toLocaleString()}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange.min}
              onChange={(e) =>
                handlePriceRangeChange("min", parseInt(e.target.value))
              }
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange.max}
              onChange={(e) =>
                handlePriceRangeChange("max", parseInt(e.target.value))
              }
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Rating
          </label>
          <select
            value={filters.minRating || ""}
            onChange={(e) =>
              handleFilterChange(
                "minRating",
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
          >
            <option value="">Any Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3.0">3.0+ Stars</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy || "popularity"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="newest">Newest First</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
