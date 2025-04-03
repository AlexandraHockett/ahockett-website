// src/app/(routes)/process/page.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TracingBeam } from "@/components/ui/TracingBeam";
import TestimonialSection from "@/components/process/TestimonialSection";
import Button from "@/components/ui/Button";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Process steps data
const processSteps = [
  {
    id: 1,
    title: "Discovery",
    icon: "M9 13h6m-3-3v6m-2-9H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9z",
    iconBg: "bg-blue-500",
    description:
      "We start with a deep dive into your business goals, audience, and vision. I'll ask questions to understand your unique needs and what will make your website truly successful.",
    highlightText:
      "This phase builds the foundation for every decision we make moving forward.",
  },
  {
    id: 2,
    title: "Design",
    icon: "M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17",
    iconBg: "bg-purple-500",
    description:
      "Based on our discovery, I'll create wireframes and design mockups that showcase the visual direction, animations, and interactive elements of your site.",
    highlightText:
      "You'll see your vision come to life and have opportunities for revisions before we start building.",
  },
  {
    id: 3,
    title: "Development",
    icon: "M8 9l3 3-3 3M13 15h3M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
    iconBg: "bg-indigo-500",
    description:
      "This is where the magic happens. I'll build your website using Next.js, React, GSAP, and Framer Motion to create those stunning animations and interactions we designed.",
    highlightText:
      "Your site will be fully responsive, SEO-friendly, and optimized for performance.",
  },
  {
    id: 4,
    title: "Testing",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-9.618 5.04c-.263.6-.5 1.187-.5 1.786 0 3.37 3.88 6.894 10.118 8.64 6.237-1.746 10.118-5.27 10.118-8.64 0-.599-.187-1.186-.5-1.786",
    iconBg: "bg-green-500",
    description:
      "Every feature, animation, and interaction is thoroughly tested across devices to ensure a flawless user experience. I'll make sure everything works perfectly before launch.",
    highlightText:
      "Quality assurance is critical for making the right impression on your visitors.",
  },
  {
    id: 5,
    title: "Launch",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    iconBg: "bg-pink-500",
    description:
      "The exciting moment when your website goes live! I'll handle the deployment and ensure a smooth transition. We'll monitor the site closely in the first days after launch.",
    highlightText:
      "Your stunning new website is ready to wow your audience and achieve your goals!",
  },
  {
    id: 6,
    title: "Support",
    icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z",
    iconBg: "bg-yellow-500",
    description:
      "Our relationship doesn't end at launch. I provide ongoing support to ensure your website continues to perform optimally and can evolve with your business needs.",
    highlightText:
      "I'm here to help with updates, enhancements, and keeping your site at peak performance.",
  },
];

export default function ProcessPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const title = headerRef.current.querySelector("h1");
    const subtitle = headerRef.current.querySelector("p");

    const tl = gsap.timeline();

    if (title && subtitle) {
      tl.fromTo(
        title,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950/50 to-black">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-6">
            My Development Process
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            A streamlined approach focused on creating stunning, effective
            websites that achieve your goals and provide the 'wow factor' your
            users will remember.
          </p>
        </motion.div>
      </div>

      {/* New TracingBeam Process Timeline */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <TracingBeam className="bg-gradient-to-b from-purple-500 to-blue-500">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="mb-24 last:mb-0 ml-4 pl-12 relative"
              >
                <div
                  className="absolute w-10 h-10 -left-5 flex items-center justify-center rounded-full z-10"
                  style={{ background: `var(--theme-primary)` }}
                >
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
                    className="text-white"
                  >
                    <path d={step.icon} />
                  </svg>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-xl"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 15px 30px rgba(147, 51, 234, 0.3)",
                    borderColor: "rgba(147, 51, 234, 0.5)",
                  }}
                >
                  <span className="text-purple-400 font-medium">{`Step ${step.id}`}</span>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{step.description}</p>
                  <p className="text-purple-300 italic text-sm">
                    {step.highlightText}
                  </p>
                </motion.div>
              </div>
            ))}
          </TracingBeam>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-indigo-950/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's work together to create a website that wows your audience
              and achieves your business goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button title="Get a Quote" href="/quote" />
              <Button
                title="Contact Me"
                href="/contact"
                className="bg-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
