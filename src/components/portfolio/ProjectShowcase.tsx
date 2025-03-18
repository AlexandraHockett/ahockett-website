"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Project data for BadCompany
const projectData = {
  title: "BadCompany Event Website",
  siteUrl: "https://www.badcompany.pt",
  tags: ["Next.js", "GSAP", "Framer Motion", "Responsive Design"],
  description:
    "A premium website for an upscale event company that needed to showcase their high-end services with a dynamic, interactive experience that would capture the attention of potential clients.",
  challenge:
    "The client needed a website that matched their premium positioning in the market. The old site was static and failed to convey the excitement and exclusivity of their events.",
  solution:
    "I created an animated, interactive website with seamless transitions and engaging visual elements that bring their event offerings to life and encourage potential clients to book.",
  features: [
    "Custom animations using GSAP for cinematic effects",
    "Interactive event galleries with Framer Motion",
    "Responsive design that works flawlessly across all devices",
    "Performance-optimized for fast loading despite rich animations",
    "Integrated booking system with real-time availability",
  ],
};

const ProjectShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null); // Updated type
  const imageRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // GSAP animations for features
  useEffect(() => {
    if (!featuresRef.current) return;

    const featureItems = featuresRef.current.querySelectorAll("li");

    gsap.fromTo(
      featureItems,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-indigo-950/30"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Image */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.3)] border border-purple-500/30 group">
              <Image
                src="/images/portfolio/badcompany.jpg"
                alt="BadCompany Website"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {projectData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/80 text-white text-xs rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={projectData.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button title="Visit Live Site" rightIcon={<span>→</span>} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
              },
            }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">
              {projectData.title}
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              {projectData.description}
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                The Challenge
              </h3>
              <p className="text-gray-300">{projectData.challenge}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                The Solution
              </h3>
              <p className="text-gray-300">{projectData.solution}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                Key Features
              </h3>
              <ul ref={featuresRef} className="space-y-3 text-gray-300">
                {projectData.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
