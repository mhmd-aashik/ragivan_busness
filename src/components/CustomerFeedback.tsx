"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface CustomerFeedback {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
  verified: boolean;
}

const customerFeedbacks: CustomerFeedback[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/assets/images/carocel1.jpg",
    rating: 5,
    comment:
      "Absolutely love my new gaming keyboard! The RGB lighting is incredible and the mechanical switches feel perfect for both gaming and work. Fast shipping and excellent customer service.",
    location: "New York, USA",
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/assets/images/carocel2.jpg",
    rating: 5,
    comment:
      "Best gaming mouse I've ever used. The precision and responsiveness are outstanding. The wireless connection is rock solid and battery life is amazing. Highly recommended!",
    location: "California, USA",
    verified: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/assets/images/carocel3.jpg",
    rating: 5,
    comment:
      "The headset quality is phenomenal! Crystal clear audio and the noise cancellation works perfectly. Very comfortable for long gaming sessions. Great value for money.",
    location: "Texas, USA",
    verified: true,
  },
];

export default function CustomerFeedback() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white rounded-full px-6 py-3 mb-8 border border-white/20">
            <Quote className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-wider uppercase">
              Customer Testimonials
            </span>
          </div>
          <h2 className="text-5xl font-black text-white mb-6 tracking-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Customers
            </span>{" "}
            Say About Us
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Some inspirational feedback from our customers
          </p>
        </div>

        {/* Marquee Feedback Cards */}
        <div className="relative overflow-hidden">
          {/* First Row - Moving Right */}
          <div className="flex animate-marquee-right">
            {[...customerFeedbacks, ...customerFeedbacks].map(
              (feedback, index) => (
                <div
                  key={`first-${feedback.id}-${index}`}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 overflow-hidden flex-shrink-0 w-80 mx-4"
                >
                  {/* Card Content */}
                  <div className="p-6 relative">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <Quote className="w-8 h-8 text-purple-500" />
                    </div>

                    {/* Customer Avatar */}
                    <div className="relative mb-4 mt-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-lg relative -mt-6">
                        <Image
                          src={feedback.avatar}
                          alt={feedback.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {feedback.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(feedback.rating)}
                    </div>

                    {/* Comment */}
                    <blockquote className="text-white leading-relaxed mb-4 text-sm line-clamp-4">
                      `&quot;{feedback.comment}&quot;`
                    </blockquote>

                    {/* Customer Info */}
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">
                            {feedback.name}
                          </h4>
                          <p className="text-gray-300 text-xs">
                            {feedback.location}
                          </p>
                        </div>
                        {feedback.verified && (
                          <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Verified
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 rounded-2xl"></div>
                </div>
              )
            )}
          </div>

          {/* Second Row - Moving Left */}
          <div className="flex animate-marquee-left mt-8">
            {[...customerFeedbacks, ...customerFeedbacks].map(
              (feedback, index) => (
                <div
                  key={`second-${feedback.id}-${index}`}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 overflow-hidden flex-shrink-0 w-80 mx-4"
                >
                  {/* Card Content */}
                  <div className="p-6 relative">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <Quote className="w-8 h-8 text-purple-500" />
                    </div>

                    {/* Customer Avatar */}
                    <div className="relative mb-4 mt-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-lg relative -mt-6">
                        <Image
                          src={feedback.avatar}
                          alt={feedback.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {feedback.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(feedback.rating)}
                    </div>

                    {/* Comment */}
                    <blockquote className="text-white leading-relaxed mb-4 text-sm line-clamp-4">
                      `&quot;{feedback.comment}&quot;`
                    </blockquote>

                    {/* Customer Info */}
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">
                            {feedback.name}
                          </h4>
                          <p className="text-gray-300 text-xs">
                            {feedback.location}
                          </p>
                        </div>
                        {feedback.verified && (
                          <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Verified
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 rounded-2xl"></div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Join Thousands of Happy Customers
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Experience the same quality and service that our customers love.
                Shop with confidence knowing you&apos;re getting the best gaming
                peripherals.
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
