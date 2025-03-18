"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import Button from "@/components/ui/Button";

// Custom animation hook for section
const useSectionAnimation = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return {
    ref,
    controls,
    variants: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    },
  };
};

// Single featured project data
const featuredProject = {
  title: "BadCompany Website",
  image: "/images/portfolio/badcompany.jpg",
  href: "https://www.badcompany.pt",
  description:
    "A dynamic website for an event company featuring animated interactions, responsive design, and a bold aesthetic that captures attention.",
};

export default function FeaturedProjectsSection() {
  const portfolioAnimation = useSectionAnimation();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-900/50 via-indigo-950/50 to-black z-10">
      {/* Animated Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 -z-20"
      >
        <div className="absolute w-[700px] h-[700px] top-[-350px] left-[-350px] bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute w-[700px] h-[700px] bottom-[-350px] right-[-350px] bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.25),transparent_70%)]" />
      </motion.div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={portfolioAnimation.controls}
          variants={portfolioAnimation.variants}
          className="text-center mb-16"
          ref={portfolioAnimation.ref}
        >
          <motion.h2
            variants={portfolioAnimation.variants}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-4 drop-shadow-md"
          >
            Spotlight Project
          </motion.h2>
          <motion.p
            variants={portfolioAnimation.variants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover my latest masterpiece:{" "}
            <span className="text-purple-300 font-semibold">BadCompany.pt</span>{" "}
            — a testament to creativity and technical excellence.
          </motion.p>
        </motion.div>

        {/* Single Project Card */}
        <motion.div
          initial="hidden"
          animate={portfolioAnimation.controls}
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.95 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.8, delay: 0.2 },
            },
          }}
          className="group max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-purple-500/40 transition-all duration-500"
          whileHover={{
            y: -15,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(147, 51, 234, 0.6)",
          }}
        >
          <Link
            href={featuredProject.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            {/* Image Section */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute top-6 left-6 bg-purple-600/90 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Featured Work
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <h3 className="text-3xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-purple-300 drop-shadow-md">
                {featuredProject.title}
              </h3>
              <p className="text-gray-300 text-lg mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                {featuredProject.description}
              </p>
              <motion.div
                className="flex justify-end items-center"
                initial={{ x: 0 }}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-purple-400 text-lg font-medium flex items-center">
                  Visit Live Site
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </motion.div>
            </div>
          </Link>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={portfolioAnimation.controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.6 } },
          }}
          className="mt-12 text-center"
        >
          <Button title="Want a Site Like This?" href="/contact" />
        </motion.div>
      </div>
    </section>
  );
}
