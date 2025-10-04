import { Suspense } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import VideoSection from "@/components/VideoSection";
import BannerSection from "@/components/BannerSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CustomerFeedback from "@/components/CustomerFeedback";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 ">
      <Header />
      <Navigation />
      <HeroCarousel />
      <ProductGrid />
      <VideoSection />
      <BannerSection />
      <Suspense fallback={
        <div className="py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white">Loading featured products...</p>
        </div>
      }>
        <FeaturedProducts />
      </Suspense>
      <CustomerFeedback />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
