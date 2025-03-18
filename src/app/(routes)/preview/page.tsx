"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import WebsiteBuilder from "@/components/preview/WebsiteBuilder";
import Button from "@/components/ui/Button";

export default function PreviewPage() {
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
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-6">
            Interactive Website Preview
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Experience a taste of what your website could be. Try this limited
            interactive builder to get a feel for the premium websites I create
            for clients.
          </p>
        </motion.div>
      </div>

      {/* Builder Section */}
      <div className="container mx-auto px-4 mb-20">
        <WebsiteBuilder />
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-950/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-10 border border-purple-500/30 shadow-xl max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready for the Full Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              This is just a preview of what's possible. Let's create a custom
              website tailored to your specific needs, with advanced animations
              and interactive elements that will captivate your audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                title="Get a Custom Quote"
                href="/quote"
                rightIcon={<span>→</span>}
              />
              <Button
                title="View My Portfolio"
                href="/portfolio"
                className="bg-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
