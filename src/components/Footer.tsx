"use client";

import { Facebook, Instagram, Twitter, Music } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Contact us */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact us</h3>
            <div className="space-y-3">
              <p className="text-gray-300">2357 Gordon Street, CA</p>
              <p className="text-gray-300">+ (909) - 478-2742</p>
              <p className="text-gray-300">GearnixStore@Vinova.com</p>
              <p className="text-gray-300">@VinovaGear</p>
            </div>
          </div>

          {/* Let's us help */}
          <div>
            <h3 className="text-xl font-bold mb-6">Let's us help</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Track My Order
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Cancel My Order
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Return My Order
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Search
              </a>
            </div>
          </div>

          {/* Our Policies */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Policies</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Shipping & Delivery
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Returns & Cancellations
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-xl font-bold mb-6">My Account</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Store Location
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Order History
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Wish List
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Gift Cards
              </a>
            </div>
          </div>

          {/* Newsletters & Payments */}
          <div>
            {/* Newsletters */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">Newsletters</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                />
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Submit
                </button>
              </div>
            </div>

            {/* Payments */}
            <div>
              <h3 className="text-xl font-bold mb-6">Payments</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">VISA</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xs">MC</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">AE</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">PP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-blue-500"></div>

      {/* Bottom Section - Copyright & Social Media */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          {/* Brand/Logo */}
          <div>
            <h2 className="text-4xl font-bold text-white">B2U.LK</h2>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-gray-400 text-sm">
              Copyright © 2024 Vinovathemes. All Rights Reserved.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <Music className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
