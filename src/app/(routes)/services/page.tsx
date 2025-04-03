// src/app/(routes)/services/page.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesShowcase from "@/components/services/ServicesShowcase";
import Button from "@/components/ui/Button";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesPage() {
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
            Web Development Services
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Professional web development services tailored to your business
            needs. From stunning websites to powerful web applications, I'll
            help you establish a strong online presence.
          </p>
        </motion.div>
      </div>

      {/* Services Showcase Section */}
      <ServicesShowcase />

      {/* Process Preview Section */}
      <section className="py-24 bg-gradient-to-b from-indigo-950/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              How I Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A streamlined development process focused on delivering
              exceptional results on time and within budget.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description:
                  "Understanding your goals, audience, and requirements to create a strategic plan.",
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
              },
              {
                step: "02",
                title: "Design & Development",
                description:
                  "Creating the user interface and building the functionality with cutting-edge technologies.",
                icon: "M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M18.5 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M18.5 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M8.5 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M18.5 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M3 9.5h8M1 14h12M8 4.5v5M15 4.5v5M15 14.5v5",
              },
              {
                step: "03",
                title: "Launch & Support",
                description:
                  "Deploying your project and providing ongoing support to ensure long-term success.",
                icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5",
              },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 shadow-xl"
                whileHover={{
                  y: -10,
                  boxShadow: "0 15px 30px rgba(147, 51, 234, 0.2)",
                }}
              >
                <div className="bg-purple-600/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
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
                    className="text-purple-400"
                  >
                    <path d={phase.icon}></path>
                  </svg>
                </div>
                <div className="text-purple-400 font-semibold mb-2">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {phase.title}
                </h3>
                <p className="text-gray-300">{phase.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              title="View Full Process"
              href="/process"
              rightIcon={<span>→</span>}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-indigo-950/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-8 border border-purple-500/30 shadow-xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Ready to take your online presence to the next level? Get in touch
              today to discuss your project and see how I can help you achieve
              your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button title="Get a Quote" href="/quote" />
              <Button
                title="View Portfolio"
                href="/portfolio"
                className="bg-transparent border border-white/20 hover:border-white/40"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
