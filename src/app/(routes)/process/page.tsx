"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineProcess from "@/components/process/TimeLineProcess";
import TestimonialSection from "@/components/process/TestimonialSection";
import Button from "@/components/ui/Button";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

      {/* Timeline Section */}
      <TimelineProcess />

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
