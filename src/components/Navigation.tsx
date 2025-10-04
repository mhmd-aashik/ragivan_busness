"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  Laptop,
  Smartphone,
  Headphones,
  Cpu,
  Wrench,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";

const navigationItems = [
  {
    name: "Products",
    href: "/products",
    icon: <Cpu className="w-4 h-4" />,
    badge: "New",
    submenu: [
      {
        name: "All Products",
        href: "/products",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        name: "New Arrivals",
        href: "/products/new",
        icon: <Zap className="w-4 h-4" />,
      },
      {
        name: "Best Sellers",
        href: "/products/bestsellers",
        icon: <Star className="w-4 h-4" />,
      },
      {
        name: "On Sale",
        href: "/products/sale",
        icon: <Zap className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Accessories",
    href: "/accessories",
    icon: <Headphones className="w-4 h-4" />,
    submenu: [
      {
        name: "Audio",
        href: "/accessories/audio",
        icon: <Headphones className="w-4 h-4" />,
      },
      {
        name: "Chargers",
        href: "/accessories/chargers",
        icon: <Zap className="w-4 h-4" />,
      },
      {
        name: "Cases",
        href: "/accessories/cases",
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        name: "Cables",
        href: "/accessories/cables",
        icon: <Zap className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Laptops",
    href: "/laptops",
    icon: <Laptop className="w-4 h-4" />,
    submenu: [
      {
        name: "Gaming Laptops",
        href: "/laptops/gaming",
        icon: <Zap className="w-4 h-4" />,
      },
      {
        name: "Business Laptops",
        href: "/laptops/business",
        icon: <Laptop className="w-4 h-4" />,
      },
      {
        name: "Ultrabooks",
        href: "/laptops/ultrabooks",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        name: "Workstations",
        href: "/laptops/workstations",
        icon: <Cpu className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Mobiles",
    href: "/mobiles",
    icon: <Smartphone className="w-4 h-4" />,
    submenu: [
      {
        name: "Smartphones",
        href: "/mobiles/smartphones",
        icon: <Smartphone className="w-4 h-4" />,
      },
      {
        name: "Tablets",
        href: "/mobiles/tablets",
        icon: <Laptop className="w-4 h-4" />,
      },
      {
        name: "Wearables",
        href: "/mobiles/wearables",
        icon: <Zap className="w-4 h-4" />,
      },
      {
        name: "Accessories",
        href: "/mobiles/accessories",
        icon: <Headphones className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Pre Owned",
    href: "/pre-owned",
    icon: <Wrench className="w-4 h-4" />,
    badge: "Hot",
  },
  {
    name: "Build My PC",
    href: "/build-pc",
    icon: <Cpu className="w-4 h-4" />,
    badge: "Popular",
  },
];

export default function Navigation() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (itemName: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveItem(itemName);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveItem(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/30 absolute top-16 left-0 right-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 py-4">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-3 text-gray-700 transition-all duration-300 font-medium rounded-xl group relative ${
                    activeItem === item.name
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md border border-blue-200/50"
                      : "hover:bg-gray-100/80 hover:text-gray-900"
                  }`}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        item.badge === "New"
                          ? "bg-green-100 text-green-700"
                          : item.badge === "Hot"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeItem === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && activeItem === item.name && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-72 bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-4 z-50 animate-in slide-in-from-top-2 duration-300"
                    style={{ marginTop: "8px" }}
                  >
                    <div className="px-3">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-200 rounded-xl group"
                        >
                          <span className="text-gray-400 group-hover:text-white transition-colors">
                            {subItem.icon}
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium">
                            {subItem.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for absolutely positioned navigation */}
      <div className="h-20" />
    </>
  );
}
