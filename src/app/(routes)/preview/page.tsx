"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import WebsiteBuilder from "@/components/preview/WebsiteBuilder";
import Button from "@/components/ui/Button";

export default function PreviewPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  // Animation setup
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const title = header.querySelector("h1");
    const subtitle = header.querySelector("p");

    gsap
      .timeline()
      .fromTo(
        title,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
  }, []);

  // Animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const cardHover = {
    whileHover: {
      y: -12,
      boxShadow: "0 15px 30px rgba(147, 51, 234, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/95 to-gray-950 text-white">
      {/* Header */}
      <header className="container mx-auto px-6 pt-32 pb-16">
        <motion.div ref={headerRef} className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-6">
            Interactive Website Builder
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
            Create stunning websites with advanced animations, responsive
            design, and endless customization possibilities.
          </p>
        </motion.div>
      </header>

      {/* Builder */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Website Builder</h1>
        <WebsiteBuilder />
      </div>
      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-indigo-950/30 to-transparent">
        <motion.div
          {...fadeUp}
          className="container mx-auto px-6 max-w-4xl text-center"
        >
          <div className="bg-gradient-to-br from-gray-900/90 to-indigo-950/90 backdrop-blur-lg rounded-2xl p-10 border border-indigo-500/20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Elevate Your Online Presence?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              This is just a preview. Let’s craft a bespoke website with
              cutting-edge features tailored to your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                title="Request a Quote"
                href="/quote"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                rightIcon={<span className="ml-2">→</span>}
              />
              <Button
                title="Explore Portfolio"
                href="/portfolio"
                className="bg-transparent border border-indigo-400 hover:bg-indigo-400/10"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              Why Choose Custom Development?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience websites that stand out with premium features and
              unmatched performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "path/to/animation-icon",
                title: "Dynamic Animations",
                desc: "Engage visitors with smooth, cinematic animations that enhance your brand story.",
                color: "purple",
              },
              {
                icon: "path/to/integration-icon",
                title: "Seamless Integrations",
                desc: "Connect effortlessly with your favorite tools—CRMs, analytics, and more.",
                color: "indigo",
              },
              {
                icon: "path/to/excellence-icon",
                title: "Superior Performance",
                desc: "Fast-loading, SEO-optimized sites built with modern tech for longevity.",
                color: "blue",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                {...cardHover}
                className="bg-gradient-to-br from-gray-900/80 to-indigo-950/80 backdrop-blur-md p-6 rounded-xl border border-indigo-500/20 group hover:border-indigo-500/40"
              >
                <div
                  className={`mb-5 text-${feature.color}-400 flex justify-center`}
                >
                  <div
                    className={`p-4 rounded-full bg-${feature.color}-900/20 group-hover:bg-${feature.color}-800/30 transition-colors`}
                  >
                    {/* Replace with actual SVG */}
                    <div className="w-8 h-8 bg-gray-500 rounded-full" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
