"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Register GSAP Draggable
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current || !beforeImageRef.current)
      return;

    const container = containerRef.current;
    const slider = sliderRef.current;
    const beforeImage = beforeImageRef.current;

    // Set initial position
    gsap.set(beforeImage, { width: `${sliderPosition}%` });
    gsap.set(slider, { left: `${sliderPosition}%` });

    // Create draggable slider
    const draggable = Draggable.create(slider, {
      type: "left",
      bounds: container,
      onDrag: function () {
        const newPosition = (this.x / container.offsetWidth) * 100;
        gsap.set(beforeImage, { width: `${newPosition}%` });
        setSliderPosition(newPosition);
      },
      onPress: function () {
        gsap.to(slider, { scale: 1.1, duration: 0.2 });
      },
      onRelease: function () {
        gsap.to(slider, { scale: 1, duration: 0.2 });
      },
    })[0];

    return () => {
      // Cleanup
      draggable.kill();
    };
  }, [sliderPosition]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <div
        ref={containerRef}
        className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl cursor-grab active:cursor-grabbing"
      >
        {/* After Image (Full width, positioned in back) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/portfolio/badcompany-after.jpg"
            alt="After redesign"
            fill
            className="object-cover"
          />
        </div>

        {/* Before Image (Variable width, positioned in front) */}
        <div
          ref={beforeImageRef}
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src="/images/portfolio/badcompany-before.jpg"
            alt="Before redesign"
            fill
            className="object-cover"
          />
        </div>

        {/* Slider Control */}
        <div
          ref={sliderRef}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center border-2 border-white shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M17 1l4 4-4 4"></path>
              <path d="M7 23l-4-4 4-4"></path>
              <path d="M21 5h-6.5a4 4 0 0 0-4 4v6a4 4 0 0 1-4 4H3"></path>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-md backdrop-blur-sm">
          Before
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-purple-600/70 text-white text-sm rounded-md backdrop-blur-sm">
          After
        </div>
      </div>

      <div className="text-center mt-6 text-gray-300">
        <p>Drag the slider to compare before and after views</p>
      </div>
    </motion.div>
  );
}
