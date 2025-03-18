"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax effect with adjusted values to minimize gap
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -200]); // Extended range for smoother transition
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.6]); // Slower fade-out

  useEffect(() => {
    // Only run GSAP animations on client-side to avoid hydration mismatch
    if (typeof window === "undefined") return;

    const heroHeadline = heroTextRef.current?.querySelector("h1");
    const heroSubheadline = heroTextRef.current?.querySelector("p");
    const heroCTA = heroTextRef.current?.querySelector(".cta-container");
    const heroImage = heroImageRef.current;
    const wowTextElement = document.getElementById("wow-text");

    if (heroHeadline && heroSubheadline && heroCTA && heroImage) {
      // Skip DOM manipulation for server-side rendering
      if (typeof window !== "undefined") {
        const letters = "Websites That Wow".split("");
        heroHeadline.innerHTML = letters
          .map(
            (letter, i) =>
              `<span style="display: inline-block; opacity: 0; transform: translateY(-50px);">${
                letter === " " ? " " : letter
              }</span>`
          )
          .join("");
      }

      const tl = gsap.timeline();

      tl.to(heroHeadline?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      });

      // Only animate wow-text if it exists
      if (wowTextElement) {
        tl.to(
          wowTextElement,
          {
            scale: 1.05,
            textShadow: "0 0 15px rgba(147, 51, 234, 0.8)",
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "sine.inOut",
          },
          "-=0.5"
        );
      }

      tl.fromTo(
        heroSubheadline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.7"
      )
        .fromTo(
          heroCTA,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          heroImage,
          { opacity: 0, rotate: -5, scale: 0.95 },
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.8"
        );
    }
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-purple-900/50 via-indigo-950/50 to-black"
      style={{ y: heroY, opacity: heroOpacity }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-20" // Lower z-index to stay behind content
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.3), transparent 70%)",
            "radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.3), transparent 70%)",
            "radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.3), transparent 70%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Subtle Particle Effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          // Use deterministic values based on index instead of Math.random()
          const sizes = [150, 130, 180, 120, 200, 100, 160, 140];
          const xPositions = [20, 80, 40, 60, 30, 70, 10, 90];
          const yPositions = [30, 70, 10, 90, 50, 20, 80, 40];
          const moveAmounts = [20, 30, 15, 25, 10, 35, 5, 40];
          const durations = [12, 15, 18, 10, 14, 16, 20, 13];

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
              style={{
                width: sizes[i] || 150,
                height: sizes[i] * 0.8 || 120,
                top: `${yPositions[i]}%`,
                left: `${xPositions[i]}%`,
              }}
              animate={{
                y: [0, moveAmounts[i] - 20],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: durations[i],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <div className="container px-6 mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 z-10">
        <motion.div
          ref={heroTextRef}
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            <span>Websites That </span>
            <motion.span
              id="wow-text"
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 inline-block"
            >
              Wow
            </motion.span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Crafting breathtaking, interactive websites with animations that
            mesmerize your audience and amplify your brand.
          </p>
          <div className="cta-container flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              title="Explore the Preview"
              href="/preview"
              rightIcon={<span>→</span>}
              onClick={(e) => console.log("Preview clicked")}
            />
            <Button
              title="See My Portfolio"
              href="/portfolio"
              className="bg-transparent"
              onClick={(e) => console.log("Portfolio clicked")}
            />
          </div>
        </motion.div>

        <motion.div
          ref={heroImageRef}
          className="w-full lg:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative h-[400px] md:h-[500px] w-full perspective-1000">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl rotate-2 scale-95 transform-gpu blur-md -z-10"
              whileHover={{ rotate: -2, scale: 0.97 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 transform-gpu"
              whileHover={{
                rotate: 1,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute top-0 w-full h-10 bg-gray-800/50 backdrop-blur-md flex items-center px-4 border-b border-white/10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
              </div>
              <div className="mt-10 p-6 h-full w-full">
                <motion.div
                  className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 h-40 w-full rounded-xl mb-6 backdrop-blur-sm border border-white/10"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 h-8 w-3/4 rounded-lg mb-4 backdrop-blur-sm border border-white/10"
                  animate={{ width: ["75%", "85%", "75%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 h-4 rounded-lg mb-2 backdrop-blur-sm border border-white/10"
                    style={{ width: `${100 - i * 15}%` }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <div className="mt-6 flex space-x-4">
                  <motion.div
                    className="bg-indigo-500/30 h-10 w-1/3 rounded-lg backdrop-blur-sm border border-indigo-500/20"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="bg-purple-500/30 h-10 w-1/3 rounded-lg backdrop-blur-sm border border-purple-500/20"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 15, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-3 font-medium">
            Scroll to Discover
          </span>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-indigo-400"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md -z-10"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
