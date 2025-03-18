"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Services with price ranges
const services = [
  {
    id: "basic",
    title: "Basic Website",
    description:
      "Perfect for small businesses or personal sites that need a professional online presence.",
    features: [
      "5-page responsive website",
      "Mobile-friendly design",
      "Contact form",
      "Social media integration",
      "Basic SEO setup",
    ],
    priceRange: "$2,500 - $4,000",
    timeframe: "2-4 weeks",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    id: "premium",
    title: "Premium Interactive Website",
    description:
      "Enhanced website with custom animations and interactive elements that engage visitors.",
    features: [
      "8-10 page responsive website",
      "Custom animations (GSAP/Framer Motion)",
      "Interactive UI elements",
      "Advanced contact forms",
      "SEO optimization",
      "Basic content management",
    ],
    priceRange: "$5,000 - $8,000",
    timeframe: "4-8 weeks",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    highlight: true,
  },
  {
    id: "enterprise",
    title: "Enterprise Solution",
    description:
      "Comprehensive website with advanced features, custom animations, and full content management.",
    features: [
      "Custom website architecture",
      "Advanced animations & interactions",
      "Full-featured CMS",
      "E-commerce capabilities",
      "API integrations",
      "Performance optimization",
      "Comprehensive SEO strategy",
    ],
    priceRange: "$8,000+",
    timeframe: "8-12 weeks",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

// Additional services
const additionalServices = [
  {
    id: "maintenance",
    title: "Website Maintenance",
    description: "Keep your website secure, updated, and performing optimally.",
    price: "From $150/month",
  },
  {
    id: "seo",
    title: "Advanced SEO Package",
    description:
      "Improve your site's visibility with comprehensive SEO optimization.",
    price: "From $1,200",
  },
  {
    id: "content",
    title: "Content Creation",
    description:
      "Professional copywriting and media creation for your website.",
    price: "Custom quote",
  },
];

export default function PricingDisplay() {
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, []);

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
        <p className="text-gray-300 mb-6">
          Below are starting price ranges for different types of websites. Your
          custom quote will be tailored to your specific requirements.
        </p>

        <div className="space-y-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={`service-card p-6 border rounded-lg transition-all duration-300 ${
                service.highlight
                  ? "bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-gray-800/50 border-gray-700/50"
              }`}
              whileHover={{
                y: -5,
                boxShadow: service.highlight
                  ? "0 15px 30px rgba(147, 51, 234, 0.2)"
                  : "0 10px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="flex items-start">
                <div
                  className={`p-3 rounded-lg mr-4 ${
                    service.highlight
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
                    <path d={service.icon} />
                  </svg>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4">
                    <div>
                      <span className="text-gray-400 text-sm block">
                        Price Range:
                      </span>
                      <span
                        className={`font-semibold ${
                          service.highlight ? "text-purple-300" : "text-white"
                        }`}
                      >
                        {service.priceRange}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm block">
                        Timeframe:
                      </span>
                      <span className="text-white font-semibold">
                        {service.timeframe}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-300 font-medium mb-2">
                      Features:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`mr-2 mt-1 ${
                              service.highlight
                                ? "text-purple-400"
                                : "text-indigo-400"
                            }`}
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {service.highlight && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                  Popular Choice
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

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
          {additionalServices.map((service, index) => (
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
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {service.description}
              </p>
              <div className="text-purple-300 font-medium">{service.price}</div>
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
