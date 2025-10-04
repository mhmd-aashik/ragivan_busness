"use client";

import { Truck, RotateCcw, DollarSign, Headphones } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    description: "Free Shipping to Make Your Shopping Experience Seamless.",
  },
  {
    id: 2,
    icon: RotateCcw,
    title: "Return Policy",
    description: "Flexible Returns to Ensure a Positive Shopping Experience.",
  },
  {
    id: 3,
    icon: DollarSign,
    title: "Save Money",
    description: "Shop Smarter and Save Big with Our Money-Saving Solutions.",
  },
  {
    id: 4,
    icon: Headphones,
    title: "Support 24/7",
    description: "Unparalleled Support, Tailored to Your Needs 24 Hours a Day.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Icon with Gradient Background */}
                <div className="relative mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
