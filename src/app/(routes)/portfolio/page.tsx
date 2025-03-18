"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlide";
import ProjectShowcase from "@/components/portfolio/ProjectShowcase";
import Button from "@/components/ui/Button";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const controls = useAnimation();
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // GSAP animations
  useEffect(() => {
    if (headerRef.current && textRef.current && imageRef.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .fromTo(
          headerRef.current.querySelector("h1"),
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          headerRef.current.querySelector("p"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } },
          }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-6">
            Portfolio Spotlight
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Dive into my flagship project: BadCompany - a testament to what's
            possible with modern web development. Explore the details,
            animations, and impact of this recent work.
          </p>
        </motion.div>
      </div>

      {/* Main Project Showcase */}
      <ProjectShowcase />

      {/* Before/After Section */}
      <section className="py-24 bg-gradient-to-b from-indigo-950/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">
              The Transformation
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See the before and after comparison of the BadCompany project
            </p>
          </motion.div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* Project Impact */}
      <section className="py-24 bg-gradient-to-b from-black to-indigo-950/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
                Project Impact
              </h2>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">✓</span>
                  <span>20% increase in user engagement after launch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">✓</span>
                  <span>15% boost in conversion rate for event bookings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">✓</span>
                  <span>
                    Improved mobile experience with 40% longer session times
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">✓</span>
                  <span>
                    Client reported extremely positive feedback from users
                  </span>
                </li>
              </ul>

              <div className="mt-10 p-6 bg-indigo-900/30 border border-indigo-800/50 rounded-xl">
                <blockquote className="text-gray-300 italic">
                  "Alexandra transformed our online presence completely. The
                  animations and interactions she implemented have given our
                  brand a premium feel that matches our high-end events."
                  <footer className="mt-4 text-purple-300 font-medium not-italic">
                    — BadCompany Events, CEO
                  </footer>
                </blockquote>
              </div>
            </motion.div>

            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <div className="relative h-[450px] w-full rounded-xl overflow-hidden shadow-2xl border border-purple-500/30">
                <Image
                  src="/images/portfolio/badcompany-stats.jpg"
                  alt="BadCompany Analytics Dashboard"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Projects Coming Soon */}
      <section className="py-24 bg-gradient-to-b from-indigo-950/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              More Projects Coming Soon
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              I'm constantly working on new and exciting projects. Check back
              soon to see more examples of my work, or contact me now to discuss
              your project needs.
            </p>
            <Button title="Let's Create Your Project" href="/contact" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
