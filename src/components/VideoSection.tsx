"use client";

import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Container */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/assets/video/videofile1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              ROG NUC
            </h2>
            <div className="text-4xl md:text-6xl font-bold mb-8">2025</div>
            <div className="space-y-4 mb-12">
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
                GAMING REDEFINED
              </h3>
              <h4 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-gray-300">
                POWER MEETS PRECISION
              </h4>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Section Indicator */}
        <div className="absolute bottom-8 left-8 z-10">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-white font-bold text-sm tracking-wider uppercase">
              OUR STORY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
