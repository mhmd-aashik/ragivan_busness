"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(
        startValue + (end - startValue) * easeOutQuart
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl font-black text-white mb-2">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function BannerSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white space-y-8">
            {/* OUR STORY Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">
                OUR STORY
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              A place for creatives and students to freely explore and shop all
              types of equipment.
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Meticulously crafted to inspire, our technology empowers gamers to
              fully immerse themselves in captivating virtual worlds and take
              their skills to the next level.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Explore More
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
              <button className="inline-flex items-center gap-3 border-2 border-white/30 hover:border-white/50 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Gaming People Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src="/assets/images/banner.png"
                alt="Gaming community"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <AnimatedCounter end={10000} duration={2500} suffix="+" />
            <div className="text-gray-400 font-semibold group-hover:text-white transition-colors duration-300">
              Happy Customers
            </div>
          </div>
          <div className="text-center group">
            <AnimatedCounter end={500} duration={2000} suffix="+" />
            <div className="text-gray-400 font-semibold group-hover:text-white transition-colors duration-300">
              Products
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-black text-white mb-2">24/7</div>
            <div className="text-gray-400 font-semibold group-hover:text-white transition-colors duration-300">
              Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
