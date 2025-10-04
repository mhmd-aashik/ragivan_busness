"use client";

import {
  ArrowRight,
  Star,
  Sparkles,
  TrendingUp,
  MousePointer,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const heroData = {
  title: "Innovation Solutions for a Smart Tech Future",
  subtitle:
    "Discover cutting-edge technology that transforms how you work, play, and live",
  description:
    "From gaming laptops to smart accessories, we bring you the latest in tech innovation with premium quality and unbeatable performance.",
  cta: "Explore Collection",
  stats: [
    { label: "Happy Customers", value: "50K+" },
    { label: "Products Sold", value: "100K+" },
    { label: "Years Experience", value: "10+" },
  ],
};

const featuredProducts = [
  {
    id: 1,
    title: "Gaming Laptops",
    subtitle: "RTX 4090 Series",
    price: "From $1,299",
    image: "/assets/images/carocel1.jpg",
    badge: "New Arrival",
    rating: 4.9,
    features: ["RTX 4090", "32GB RAM", "4K Display"],
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    title: "Smart Accessories",
    subtitle: "AI-Powered Tech",
    price: "From $99",
    image: "/assets/images/carocel2.jpg",
    badge: "Trending",
    rating: 4.8,
    features: ["AI Powered", "5G Ready", "Eco Friendly"],
    gradient: "from-green-500 to-teal-600",
  },
  // {
  //   id: 3,
  //   title: "Premium Mobiles",
  //   subtitle: "Latest Flagships",
  //   price: "From $699",
  //   image: "/assets/images/carocel3.jpg",
  //   badge: "Best Seller",
  //   rating: 4.9,
  //   features: ["Premium Build", "Long Battery", "Fast Charging"],
  //   gradient: "from-orange-500 to-red-600",
  // },
];

export default function HeroCarousel() {
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [gameScore, setGameScore] = useState(0);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-start game after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGame(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const fullTitle = heroData.title;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (centerX - e.clientX) / 10;

    setCardTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  // Game interaction functions
  const collectItem = (item: string) => {
    if (!collectedItems.includes(item)) {
      setCollectedItems([...collectedItems, item]);
      setGameScore(gameScore + 10);
    }
  };

  // Consistent theme colors
  const themeColors = {
    primary: "from-blue-600 to-purple-600",
    secondary: "from-purple-600 to-pink-600",
    accent: "blue-400",
  };

  return (
    <section
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.1,
            top: mousePosition.y * 0.1,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            right: mousePosition.x * 0.05,
            bottom: mousePosition.y * 0.05,
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-20 left-10 w-4 h-4 border border-blue-400/50 rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute top-40 right-20 w-6 h-6 border border-purple-400/50 rounded-full animate-ping"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-400/40 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-5 h-5 border-2 border-yellow-400/50 rotate-12 animate-pulse"
          style={{ animationDuration: "6s" }}
        />

        {/* Interactive Collectible Items */}
        {showGame && (
          <>
            {["💻", "📱", "🎮", "⌚", "🎧"].map((item, index) => (
              <div
                key={index}
                className={`absolute text-2xl cursor-pointer transition-all duration-300 hover:scale-125 ${
                  collectedItems.includes(item)
                    ? "opacity-0 scale-0"
                    : "opacity-100 scale-100"
                }`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 2) * 20}%`,
                  animationDelay: `${index * 0.5}s`,
                }}
                onClick={() => collectItem(item)}
              >
                <div className="animate-bounce hover:animate-spin">{item}</div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left Side - Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-3">
              <div
                className={`flex items-center space-x-2 bg-gradient-to-r ${themeColors.primary} text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Innovation Leader</span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-white text-sm ml-2">4.9/5 Rating</span>
              </div>
              {/* Game Score Display */}
              {showGame && (
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/30">
                  <span>🎮 Score: {gameScore}</span>
                  <span className="text-xs">
                    ({collectedItems.length}/5 items)
                  </span>
                </div>
              )}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              {displayedTitle.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-500 hover:scale-110 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 cursor-pointer ${
                    index === 0
                      ? "text-blue-400"
                      : index === 1
                        ? "text-purple-400"
                        : "text-white"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {word}{" "}
                </span>
              ))}
              {isTyping && (
                <span className="inline-block w-1 h-16 bg-blue-400 animate-pulse ml-1" />
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium leading-relaxed">
              {heroData.subtitle}
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg">
              {heroData.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8">
              {heroData.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`bg-gradient-to-r ${themeColors.primary} hover:opacity-90 text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden`}
              >
                <span className="relative z-10 flex items-center">
                  {heroData.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm group relative overflow-hidden"
              >
                <span className="relative z-10">Watch Demo</span>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${themeColors.primary}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </Button>
            </div>
          </div>

          {/* Right Side - Interactive Product Cards */}
          <div className="relative lg:pl-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    activeCard === index ? "scale-105 z-10" : "scale-95"
                  }`}
                  onClick={() => setActiveCard(index)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 hover:bg-white/20 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20">
                    {/* Product Image */}
                    <div className="relative h-40 sm:h-48 mb-4 rounded-2xl overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-20`}
                      />

                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`bg-gradient-to-r ${product.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}
                        >
                          <TrendingUp className="w-3 h-3" />
                          <span>{product.badge}</span>
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white text-xs font-semibold">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          {product.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          {product.price}
                        </span>
                        <div className="hidden sm:flex items-center space-x-1 text-blue-400">
                          <MousePointer className="w-4 h-4" />
                          <span className="text-sm">Hover to explore</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {product.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-white/20 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-white/30"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
