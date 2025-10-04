"use client";

interface ProductCardSkeletonProps {
  isListView?: boolean;
}

export default function ProductCardSkeleton({
  isListView = false,
}: ProductCardSkeletonProps) {
  return (
    <div
      className={`group bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse ${
        isListView ? "flex flex-row h-48" : "flex flex-col h-full"
      }`}
    >
      {/* Product Image Skeleton */}
      <div className={`relative ${isListView ? "w-48 h-full" : "h-48"}`}>
        <div className="w-full h-full bg-gray-200 rounded-t-lg" />

        {/* Badge Skeletons */}
        <div className="absolute top-2 left-2">
          <div className="w-12 h-5 bg-gray-300 rounded" />
        </div>
        <div className="absolute top-2 right-2">
          <div className="w-16 h-5 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div
        className={`p-4 flex flex-col flex-grow ${isListView ? "w-full" : ""}`}
      >
        {/* Title Skeleton */}
        <div className="mb-2">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Brand Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />

        {/* Rating Skeleton */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-8 ml-1" />
        </div>

        {/* Price Skeleton */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-5 bg-gray-300 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>

        {/* Feature Tags Skeleton */}
        <div className="flex flex-wrap gap-1 mb-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-12" />
          <div className="h-6 bg-gray-200 rounded w-14" />
        </div>

        {/* Shipping Info Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-20 mb-3" />

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
