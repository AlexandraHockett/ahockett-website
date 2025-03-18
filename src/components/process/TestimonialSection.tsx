"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";

const testimonials = [
  {
    quote:
      "Alexandra transformed our online presence with an incredibly responsive and captivating website. The animations and interactivity she implemented have given our brand the premium feel we were looking for.",
    author: "Maria Santos",
    role: "CEO, BadCompany Events",
    avatar: "/images/testimonials/testimonial-1.jpg",
  },
];

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quoteRef.current) return;

    const quotationMarks = quoteRef.current.querySelectorAll(".quotation-mark");
    const quoteText = quoteRef.current.querySelector(".quote-text");
    const authorInfo = quoteRef.current.querySelector(".author-info");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: quoteRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    if (quotationMarks.length && quoteText && authorInfo) {
      tl.fromTo(
        quotationMarks,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
        }
      )
        .fromTo(
          quoteText,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          authorInfo,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black to-indigo-950/30 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.2), transparent 70%)",
            "radial-gradient(circle at 80% 70%, rgba(79, 70, 229, 0.2), transparent 70%)",
            "radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.2), transparent 70%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
            Client Testimonial
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <div ref={quoteRef} className="max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-10 border border-purple-500/30 shadow-xl relative"
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
              }}
            >
              {/* Top quotation mark */}
              <div className="quotation-mark absolute top-6 left-6 text-purple-500/30 text-7xl font-serif">
                "
              </div>

              {/* Bottom quotation mark */}
              <div className="quotation-mark absolute bottom-6 right-6 text-purple-500/30 text-7xl font-serif">
                "
              </div>

              <div className="quote-text text-xl md:text-2xl text-gray-300 italic text-center mb-8 relative z-10">
                {testimonial.quote}
              </div>

              <div className="author-info flex items-center justify-center">
                <div className="mr-4 relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">
                    {testimonial.author}
                  </div>
                  <div className="text-purple-300 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
