"use client";

import {
  Star,
  Heart,
  X,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, ProductReview } from "@/types";
import { useProducts } from "@/hooks/useProductsQuery";

// Hardcoded data removed - now using MockAPI

export default function FeaturedProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("Best Selling");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Use React Query to fetch products
  const { data: allProducts = [], isLoading: loading, error } = useProducts();

  // Initialize filter from URL params
  useEffect(() => {
    const filter = searchParams.get("filter");
    if (
      filter &&
      ["All", "Best Selling", "Top Rated", "New Arrivals"].includes(filter)
    ) {
      setActiveFilter(filter);
    }
  }, [searchParams]);

  // Update URL when filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Filter products based on active filter
  const getFilteredProducts = () => {
    if (!allProducts) return [];

    switch (activeFilter) {
      case "All":
        return allProducts;
      case "Best Selling":
        return allProducts.filter((product) => product.isBestSeller);
      case "Top Rated":
        return allProducts.filter((product) => product.rating >= 4.8);
      case "New Arrivals":
        return allProducts.filter((product) => product.isNew);
      default:
        return allProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setActiveTab("overview");
  };

  const getSimilarProducts = (currentProduct: Product): Product[] => {
    if (!allProducts) return [];

    return allProducts
      .filter(
        (product) =>
          product.id !== currentProduct.id &&
          product.category === currentProduct.category
      )
      .slice(0, 4);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Beautiful Header with Filter Buttons */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span className="text-white font-semibold text-sm tracking-wider uppercase">
                Featured Products
              </span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            </div>
            <h2 className="text-6xl font-black text-white mb-6 tracking-tight">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover our handpicked selection of premium gaming peripherals
              and accessories
            </p>
          </div>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            <button
              onClick={() => handleFilterChange("All")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === "All"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 hover:border-white/40 shadow-sm hover:shadow-md"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => handleFilterChange("Best Selling")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === "Best Selling"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 hover:border-white/40 shadow-sm hover:shadow-md"
              }`}
            >
              🔥 Best Selling
            </button>
            <button
              onClick={() => handleFilterChange("Top Rated")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === "Top Rated"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 hover:border-white/40 shadow-sm hover:shadow-md"
              }`}
            >
              ⭐ Top Rated
            </button>
            <button
              onClick={() => handleFilterChange("New Arrivals")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === "New Arrivals"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 hover:border-white/40 shadow-sm hover:shadow-md"
              }`}
            >
              ✨ New Arrivals
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <p className="text-white mt-4">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">
              Error loading products: {error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Retry
            </button>
          </div>
        )}

        {/* Products Grid - Filtered Items */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => openProductModal(product)}
                className="group bg-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 relative rounded-xl overflow-hidden flex flex-col h-full hover:bg-white/20 cursor-pointer"
              >
                {/* AliExpress Style Product Image */}
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  />

                  {/* Product Badges */}
                  <div className="absolute top-2 left-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                        NEW
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-purple-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                        HOT
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                      -{product.discount}%
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-2 flex flex-col flex-grow">
                  <h3 className="text-xs text-white font-semibold mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200 leading-tight">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-0.5">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-100 font-medium">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-purple-300">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-200 line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-green-300 font-medium">
                      Save Rs.{" "}
                      {(product.originalPrice - product.price).toLocaleString()}
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/30 text-white px-2 py-1 rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Shipping Info */}
                  <div className="text-xs text-green-300 font-medium mb-2">
                    Free Shipping
                  </div>

                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>

                  {/* Add to Cart Button - Always at bottom */}
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-medium py-2 rounded-full transition-all duration-200 mt-auto shadow-lg hover:shadow-xl">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <div className="text-center mt-8">
          <button className="group relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-400/30 text-white hover:from-purple-500 hover:to-pink-500 hover:border-purple-300/50 font-semibold py-4 px-10 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:shadow-purple-500/25">
            <span className="relative z-10 flex items-center gap-2">
              <span>View More Products</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-full transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {/* AliExpress Style Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeProductModal}
          ></div>

          {/* Modal Content */}
          <div className="relative rounded-2xl border border-white/20 shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeProductModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/20">
              {[
                { id: "overview", label: "Overview" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: "Reviews" },
                { id: "similar", label: "Similar Items" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-purple-300 border-b-2 border-purple-300"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row h-[calc(95vh-80px)]">
              {/* Product Images Section */}
              <div className="lg:w-1/2 p-6 flex flex-col">
                <div className="relative h-80 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover object-center"
                  />

                  {/* Product Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {selectedProduct.isNew && (
                      <span className="bg-green-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                        NEW
                      </span>
                    )}
                    {selectedProduct.isBestSeller && (
                      <span className="bg-purple-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                        HOT
                      </span>
                    )}
                    <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                      -{selectedProduct.discount}%
                    </span>
                  </div>
                </div>

                {/* Additional Images Placeholder */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={selectedProduct.image}
                        alt={`${selectedProduct.name} ${i}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="lg:w-1/2 p-6 flex flex-col h-full overflow-y-auto">
                {activeTab === "overview" && (
                  <>
                    {/* Product Title */}
                    <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
                      {selectedProduct.name}
                    </h1>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={index}
                            className={`w-5 h-5 ${
                              index < Math.floor(selectedProduct.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-medium">
                        {selectedProduct.rating} ({selectedProduct.reviewCount}{" "}
                        reviews)
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-purple-300">
                          Rs. {selectedProduct.price.toLocaleString()}
                        </span>
                        <span className="text-lg text-gray-300 line-through">
                          Rs. {selectedProduct.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-green-300 font-medium">
                        Save Rs.{" "}
                        {(
                          selectedProduct.originalPrice - selectedProduct.price
                        ).toLocaleString()}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Description
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedProduct.description ||
                          "No description available."}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.features.map(
                          (feature: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {feature}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Shipping & Warranty Info */}
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center gap-3 text-green-300">
                        <Truck className="w-5 h-5" />
                        <span className="font-medium">
                          Free Shipping Worldwide
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-blue-300">
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">2 Year Warranty</span>
                      </div>
                      <div className="flex items-center gap-3 text-purple-300">
                        <RotateCcw className="w-5 h-5" />
                        <span className="font-medium">
                          30 Day Return Policy
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-3">
                      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                        <Heart className="w-5 h-5" />
                        Add to Wishlist
                      </button>
                    </div>
                  </>
                )}

                {activeTab === "specifications" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Specifications
                    </h2>
                    <div className="space-y-4">
                      {selectedProduct.specifications ? (
                        Object.entries(selectedProduct.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-3 border-b border-white/10"
                            >
                              <span className="text-gray-300 font-medium">
                                {key}
                              </span>
                              <span className="text-white font-semibold">
                                {value as string}
                              </span>
                            </div>
                          )
                        )
                      ) : (
                        <div className="text-gray-400 text-center py-8">
                          No specifications available
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Customer Reviews
                    </h2>
                    <div className="space-y-4">
                      {selectedProduct.reviews &&
                      selectedProduct.reviews.length > 0 ? (
                        selectedProduct.reviews.map((review: ProductReview) => (
                          <div
                            key={review.id}
                            className="bg-white/5 rounded-lg p-4 border border-white/10"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">
                                  {review.user}
                                </span>
                                {review.verified && (
                                  <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                                    Verified
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <Star
                                    key={index}
                                    className={`w-4 h-4 ${
                                      index < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 mb-2">
                              {review.comment}
                            </p>
                            <span className="text-gray-400 text-sm">
                              {review.date}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400 text-center py-8">
                          No reviews available
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "similar" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Similar Items
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {getSimilarProducts(selectedProduct).map((product) => (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="bg-white/5 rounded-lg p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                        >
                          <div className="relative h-32 mb-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="text-white font-medium text-sm mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }, (_, index) => (
                              <Star
                                key={index}
                                className={`w-3 h-3 ${
                                  index < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-gray-300 text-xs ml-1">
                              {product.rating}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-purple-300 font-bold text-sm">
                              Rs. {product.price.toLocaleString()}
                            </span>
                            <span className="text-gray-400 text-xs line-through">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
