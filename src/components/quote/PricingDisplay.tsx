// src/components/quote/PricingDisplay.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useLocale } from "@/contexts/LocaleContext";
import { getPricingInLocale, formatPrice } from "@/utils/pricing";

export default function PricingDisplay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();

  // Get pricing in the current locale
  const { tiers, addons } = getPricingInLocale(locale);

  // Transform tiers into metric-like objects for rendering
  const metrics = tiers.map((tier) => ({
    name: tier.name,
    score: tier.basePrice,
    description: tier.features.join(", "),
    color: tier.recommended ? "#8b5cf6" : "#10b981",
    recommended: tier.recommended,
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const serviceCards = containerRef.current.querySelectorAll(".service-card");
    const additionalCards =
      containerRef.current.querySelectorAll(".additional-card");

    // Animate service cards
    gsap.fromTo(
      serviceCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: serviceCards[0],
          start: "top 80%",
        },
      }
    );

    // Animate additional services cards
    gsap.fromTo(
      additionalCards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: additionalCards[0],
          start: "top 80%",
        },
      }
    );
  }, [locale]); // Re-run animations when locale changes

  return (
    <div ref={containerRef} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">
          Website Packages
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          Below are starting price ranges for different types of websites. Your
          custom quote will be tailored to your specific requirements.
        </p>

        <div className="space-y-6">
          {metrics.map((service, index) => (
            <motion.div
              key={service.name}
              className={`service-card p-6 border rounded-lg transition-all duration-300 ${
                service.color === "#8b5cf6"
                  ? "bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-gray-800/50 border-gray-700/50"
              }`}
              whileHover={{
                y: -5,
                boxShadow:
                  service.color === "#8b5cf6"
                    ? "0 15px 30px rgba(147, 51, 234, 0.2)"
                    : "0 10px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="flex items-start">
                <div
                  className={`p-3 rounded-lg mr-4 ${
                    service.color === "#8b5cf6"
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-gray-700/70 text-gray-300"
                  }`}
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
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {service.name} {service.recommended && "(Recommended)"}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {service.description.substring(0, 120)}...
                  </p>

                  <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4">
                    <div>
                      <span className="text-gray-400 text-sm block">
                        Price Range:
                      </span>
                      <span
                        className={`font-semibold ${
                          service.color === "#8b5cf6"
                            ? "text-purple-300"
                            : "text-white"
                        }`}
                      >
                        {formatPrice(service.score, locale)}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm block">
                        Timeframe:
                      </span>
                      <span className="text-white font-semibold">
                        {service.name === "Basic"
                          ? "2-4 weeks"
                          : service.name === "Premium"
                            ? "4-8 weeks"
                            : "8-12 weeks"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {service.color === "#8b5cf6" && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Additional Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">
          Additional Services
        </h2>
        <p className="text-gray-300 mb-6">
          Enhance your website with these optional services.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {addons.map((service, index) => (
            <motion.div
              key={service.id}
              className="additional-card bg-gray-800/50 border border-gray-700/50 rounded-lg p-5 hover:border-purple-500/30 transition-all duration-300"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(79, 70, 229, 0.1)",
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.name}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {service.description}
              </p>
              <div className="text-purple-300 font-medium">
                {formatPrice(service.basePrice, locale)}
                {service.id === "maintenance" && "/month"}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-xl"
      >
        <div className="flex items-center space-x-4 text-gray-300">
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
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <div>
            <h3 className="text-lg font-medium text-white">
              Need Something Custom?
            </h3>
            <p className="text-gray-400 text-sm">
              Fill out the quote form for a tailored estimate based on your
              specific requirements.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
