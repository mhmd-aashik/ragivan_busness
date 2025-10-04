"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const productCategories = [
  {
    title: "Monitor",
    image: "/assets/images/carocel2.jpg",
    alt: "Gaming mouse for monitors",
    href: "/monitors",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Keyboards",
    image: "/assets/images/carocel3.jpg",
    alt: "Mechanical keyboard",
    href: "/keyboards",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Graphic Cards",
    image: "/assets/images/carocel1.jpg",
    alt: "Gaming headset for graphics cards",
    href: "/graphics-cards",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Laptops",
    image: "/assets/images/carocel3.jpg",
    alt: "Premium laptop collection",
    href: "/laptops",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Accessories",
    image: "/assets/images/carocel1.jpg",
    alt: "Tech accessories collection",
    href: "/accessories",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function ProductGrid() {
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-[1500px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold text-sm tracking-wider uppercase">
              Featured Categories
            </span>
          </div>
          <h2 className="text-6xl font-black text-white mb-6 tracking-tight">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover cutting-edge technology products that redefine innovation
          </p>
        </div>

        {/* Product Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              } ${index === 1 ? "lg:col-span-2" : ""} ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""} ${
                index === 3 ? "md:col-span-2 lg:col-span-1" : ""
              } ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Glassmorphism Card */}
              <div className="relative h-96 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                {/* Product Image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className={`object-cover object-center group-hover:scale-110 transition-transform duration-700 ${
                      index === 3 ? "object-top" : "object-center"
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-gradient-to-t group-hover:from-black/60 group-hover:via-${category.gradient.split(" ")[1].split("-")[1]}-500/20 group-hover:to-transparent transition-all duration-500`}
                  ></div>
                  {/* Special effect for Laptops card */}
                  {index === 3 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  )}
                  {/* Special effect for Accessories card */}
                  {index === 4 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  )}
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div>
                    <div
                      className={`inline-block px-4 py-2 bg-gradient-to-r ${category.gradient} rounded-full mb-4 shadow-lg`}
                    >
                      <span className="text-white text-sm font-bold">
                        Category
                      </span>
                    </div>
                    <h3 className="text-4xl font-black text-white mb-4 group-hover:scale-105 transition-transform duration-300">
                      {category.title}
                    </h3>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">
                    <button
                      className={`bg-gradient-to-r ${category.gradient} text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}
                    >
                      Shop Now
                    </button>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 border border-white/30">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-block p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl">
            <button className="bg-white/10 backdrop-blur-md text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Explore All Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
