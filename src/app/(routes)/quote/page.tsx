"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import QuoteForm from "@/components/quote/QuoteForm";
import PricingDisplay from "@/components/quote/PricingDisplay";

export default function QuotePage() {
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
            Get a Custom Quote
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Tell me about your project to receive a detailed quote and
            consultation. I'll work with you to create a website that perfectly
            fits your needs and budget.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 mb-20">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form Section - 3 columns */}
          <div className="lg:col-span-3">
            <QuoteForm />
          </div>

          {/* Pricing Display Section - 2 columns */}
          <div className="lg:col-span-2">
            <PricingDisplay />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-950/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-6">
            <FaqItem
              question="How does the quote process work?"
              answer="After you submit this form, I'll review your project details and provide a comprehensive quote within 48 hours. The quote will include a breakdown of costs, timeline, and recommended features based on your goals."
            />
            <FaqItem
              question="What information do you need to provide an accurate quote?"
              answer="The more details you can provide about your project, the more accurate the quote will be. Important information includes your business type, website goals, desired features, timeline, and budget range."
            />
            <FaqItem
              question="Do you require a deposit to begin work?"
              answer="Yes, I typically require a 50% deposit to begin work, with the remaining balance due upon project completion. For larger projects, we can arrange a payment schedule tied to project milestones."
            />
            <FaqItem
              question="What's included in the website maintenance package?"
              answer="The maintenance package includes regular updates, security patches, performance optimization, content updates (within limits), and technical support. It ensures your site stays secure, fast, and up-to-date."
            />
            <FaqItem
              question="How long does it take to complete a website?"
              answer="Project timelines vary based on complexity. A basic site might take 2-4 weeks, while more complex projects with custom animations and features can take 6-12 weeks. We'll establish a clear timeline during the quote process."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// FAQ Item Component
const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl overflow-hidden border border-purple-500/30"
      whileHover={{ borderColor: "rgba(147, 51, 234, 0.5)" }}
      animate={{
        boxShadow: isOpen
          ? "0 10px 30px rgba(147, 51, 234, 0.3)"
          : "0 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center"
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
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
          className={`text-purple-400 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 text-gray-300">{answer}</div>
      </motion.div>
    </motion.div>
  );
};
