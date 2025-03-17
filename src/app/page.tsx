"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // GSAP animations on component mount
  useEffect(() => {
    if (!containerRef.current) return;

    // Staggered text animation for hero headline
    const heroHeadline = heroTextRef.current?.querySelector("h1");
    const heroSubheadline = heroTextRef.current?.querySelector("p");
    const heroCTA = heroTextRef.current?.querySelector(".cta-container");

    if (heroHeadline && heroSubheadline && heroCTA) {
      // Split text into letters for animation
      const letters = heroHeadline.textContent?.split("") || [];
      heroHeadline.innerHTML = "";

      letters.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        heroHeadline.appendChild(span);
      });

      // Animate letters dropping in
      gsap.to(heroHeadline.children, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        from: { opacity: 0, y: -50 },
      });

      // Animate subheadline and CTA
      gsap.fromTo(
        heroSubheadline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7 }
      );

      gsap.fromTo(
        heroCTA,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1 }
      );
    }

    // Create scroll animations for features section
    const featureItems = document.querySelectorAll(".feature-item");

    featureItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Tech stack items
  const techStack = [
    { name: "Next.js", icon: "/images/nextjs-black.webp" },
    { name: "React", icon: "/images/react.webp" },
    { name: "GSAP", icon: "/images/gsap.webp" },
    { name: "Framer Motion", icon: "/images/framer.webp" },
    { name: "Tailwind CSS", icon: "/images/tailwind.webp" },
    { name: "TypeScript", icon: "/images/typescript.webp" },
  ];

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Text */}
          <motion.div
            ref={heroTextRef}
            className="w-full lg:w-1/2 z-10 text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Websites That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Wow
              </span>
            </h1>

            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Creating stunning, interactive websites with animations that
              captivate your audience and elevate your brand.
            </p>

            <div className="cta-container flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                title="Try the Interactive Preview"
                href="/preview"
                rightIcon={<span>→</span>}
              />

              <Button
                title="View My Work"
                href="/portfolio"
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              />
            </div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            ref={heroImageRef}
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-[400px] md:h-[500px] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl rotate-3 scale-95 transform-gpu"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                {/* Placeholder for website preview animation */}
                <div className="absolute top-0 w-full h-8 bg-gray-100 dark:bg-gray-700 flex items-center px-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>

                <div className="mt-8 p-4 h-full w-full">
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-40 w-full rounded-lg mb-4"></div>
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-3/4 rounded-lg mb-4"></div>
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-full rounded-lg mb-2"></div>
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded-lg mb-2"></div>
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-4/6 rounded-lg"></div>

                  <div className="mt-6 flex space-x-3">
                    <div className="animate-pulse bg-blue-200 dark:bg-blue-700 h-10 w-1/3 rounded-lg"></div>
                    <div className="animate-pulse bg-purple-200 dark:bg-purple-700 h-10 w-1/3 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Scroll Down
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 dark:text-gray-400"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Makes My Websites Stand Out
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              I create websites that not only look beautiful but also provide
              seamless user experiences with stunning animations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-item bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-blue-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Stunning Animations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                GSAP and Framer Motion animations that breathe life into your
                website, creating a memorable user experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-item bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-purple-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Performance Optimized
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fast-loading, responsive websites that perform flawlessly on all
                devices without sacrificing visual appeal.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-item bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-green-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                SEO Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with best practices to ensure your site ranks well in
                search engines and attracts more visitors.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-item bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Customized Design
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tailored to reflect your brand identity with unique layouts and
                interactions that set you apart.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="feature-item bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-red-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Modern Stack
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with Next.js, React, and other cutting-edge technologies
                to ensure your site is future-proof.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="feature-item bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12z" />
                  <path d="M12 18v.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Fully Responsive
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Looks and works perfectly on all devices - from smartphones to
                large desktop screens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Portfolio Preview */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Check out this preview of my latest project and discover what I
              can create for you.
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 md:p-8 rounded-xl overflow-hidden">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <Image
                src="/images/portfolio-preview.jpg"
                alt="Featured Project Preview"
                width={1200}
                height={675}
                className="w-full h-auto"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  BadCompany Website
                </h3>
                <p className="text-white/80 mb-4">
                  A dynamic website for an event company featuring animated
                  interactions and a responsive design.
                </p>
                <Link href="/portfolio">
                  <motion.span
                    className="inline-block text-white font-medium underline hover:text-blue-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    View Full Project →
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tech Stack
            </h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={50}
                    height={50}
                    className="max-w-full max-h-full"
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Create a Website That Wows?
          </h2>
          <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to build a stunning website that captivates your
            audience and drives results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              title="Get a Quote"
              href="/quote"
              className="bg-gradient-to-r from-green-500 to-teal-500"
            />

            <Button
              title="Contact Me"
              href="/contact"
              className="bg-white text-blue-600"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
