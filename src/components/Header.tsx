"use client";

import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  Heart,
  Bell,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/20"
            : "bg-white/80 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    B2U.LK
                  </div>
                  <div className="text-xs text-gray-500 font-medium hidden sm:block">
                    Smart Tech Future
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <Input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  className={`w-full pl-12 pr-4 py-3 bg-gray-50/80 border-0 rounded-2xl transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:ring-2 focus:ring-blue-500/20 ${
                    searchFocused
                      ? "shadow-lg shadow-blue-500/10"
                      : "hover:bg-gray-100/80"
                  }`}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Button
                    size="sm"
                    className="h-8 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-300 group"
              >
                <User className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-300 group"
              >
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
                  3
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-300 group"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
                  2
                </span>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 rounded-xl"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4 border-t border-gray-200/50">
            <div className="relative mt-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-72 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100/80 transition-colors cursor-pointer">
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">My Account</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100/80 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Wishlist</span>
                </div>
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100/80 transition-colors cursor-pointer">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Notifications</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="text-sm text-gray-500 font-medium px-3 py-2">
                  Quick Links
                </div>
                <div className="space-y-1">
                  <div className="px-3 py-2 rounded-lg hover:bg-gray-100/80 transition-colors cursor-pointer text-sm">
                    New Arrivals
                  </div>
                  <div className="px-3 py-2 rounded-lg hover:bg-gray-100/80 transition-colors cursor-pointer text-sm">
                    Best Sellers
                  </div>
                  <div className="px-3 py-2 rounded-lg hover:bg-gray-100/80 transition-colors cursor-pointer text-sm">
                    Deals & Offers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
