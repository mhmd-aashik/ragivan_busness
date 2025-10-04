"use client";

import { Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  isListView?: boolean;
  onClick?: (product: Product) => void;
}

export default function ProductCard({
  product,
  isListView = false,
  onClick,
}: ProductCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div
      className={`group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 relative rounded-lg overflow-hidden ${
        isListView ? "flex flex-row h-48" : "flex flex-col h-full"
      } cursor-pointer`}
      onClick={() => onClick?.(product)}
    >
      {/* Product Image */}
      <div className={`relative ${isListView ? "w-48 h-full" : "h-48"}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center"
          sizes={
            isListView
              ? "200px"
              : "(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          }
        />

        {/* Product Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
              HOT
            </span>
          )}
        </div>

        {/* Discount Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
            -{product.discount}%
          </span>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
            onClick={(e) => {
              e.stopPropagation();
              // Handle wishlist logic here
            }}
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div
        className={`p-4 flex flex-col flex-grow ${isListView ? "w-full" : ""}`}
      >
        <h3
          className={`text-gray-900 font-medium mb-1 group-hover:text-blue-600 transition-colors duration-200 ${
            isListView ? "text-base line-clamp-2" : "text-sm line-clamp-2"
          }`}
        >
          {product.name}
        </h3>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
        )}

        {/* Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {product.rating >= 4.5
              ? "Top Rated"
              : product.rating >= 4.0
                ? "Highly Rated"
                : ""}
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`font-bold text-red-600 ${isListView ? "text-lg" : "text-base"}`}
            >
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-green-600 font-medium">
            Save Rs. {(product.originalPrice - product.price).toLocaleString()}
          </div>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.features.slice(0, isListView ? 3 : 2).map((feature, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Shipping Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-green-600 font-medium">
            {product.shipping === "free" ? "Free Shipping" : "Paid Shipping"}
          </div>
          <div className="text-xs text-gray-500">
            Ships from {product.brand || "Global"}
          </div>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Add to Cart Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded transition-colors duration-200 mt-auto flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            // Handle add to cart logic here
          }}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
