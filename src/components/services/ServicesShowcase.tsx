// src/components/services/ServicesShowcase.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { useLocale } from "@/contexts/LocaleContext";
import { formatPrice } from "@/utils/pricing";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  price: string;
  accent: string;
  popular?: boolean;
}

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = React.useState<string>("website");
  const { locale } = useLocale();

  const services: ServiceProps[] = [
    {
      id: "website",
      title: "Custom Website",
      description:
        "Stunning, responsive websites built with the latest technologies.",
      features: [
        "Responsive design for all devices",
        "Custom animations with GSAP/Framer Motion",
        "Performance optimization",
        "SEO-friendly structure",
        "Content management system",
        "3 months of support",
      ],
      icon: (
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
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      price: formatPrice(2000, locale),
      accent: "#8b5cf6", // purple
    },
    {
      id: "ecommerce",
      title: "E-commerce Website",
      description:
        "Feature-rich online stores with seamless payment processing.",
      features: [
        "Product catalog management",
        "Secure payment processing",
        "Customer account management",
        "Order tracking & management",
        "Mobile-optimized shopping experience",
        "Inventory management",
        "6 months of support",
      ],
      icon: (
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
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
      price: formatPrice(3500, locale),
      accent: "#3b82f6", // blue
      popular: true,
    },
    {
      id: "webapp",
      title: "Web Application",
      description:
        "Custom web applications to streamline your business processes.",
      features: [
        "User authentication & authorization",
        "Database integration",
        "Custom business logic",
        "API development",
        "Responsive UI/UX design",
        "Data visualization",
        "Ongoing maintenance available",
      ],
      icon: (
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
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      price: formatPrice(5000, locale),
      accent: "#ec4899", // pink
    },
    {
      id: "maintenance",
      title: "Website Maintenance",
      description:
        "Keep your website secure, up-to-date, and performing optimally.",
      features: [
        "Regular updates & security patches",
        "Performance monitoring",
        "Content updates",
        "Technical support",
        "SEO optimization",
        "Monthly performance reports",
      ],
      icon: (
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
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      ),
      price: formatPrice(120, locale) + "/month",
      accent: "#10b981", // green
    },
  ];

  // Animation for section title
  useEffect(() => {
    if (!sectionRef.current) return;

    const title = sectionRef.current.querySelector(".section-title");
    const subtitle = sectionRef.current.querySelector(".section-subtitle");

    if (title && subtitle) {
      gsap.fromTo(
        title,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitle,
            start: "top 80%",
          },
        }
      );
    }
  }, [locale]); // Add locale as a dependency to re-run animations

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black via-indigo-950/30 to-black"
    >
      {/* Rest of the component remains the same */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-4">
            Services & Packages
          </h2>
          <p className="section-subtitle text-xl text-gray-300 max-w-3xl mx-auto">
            I offer a range of web development services tailored to meet the
            unique needs of your business. Whether you need a simple website or
            a complex web application, I've got you covered.
          </p>
        </div>

        {/* Service Details Section */}
        <div className="max-w-6xl mx-auto">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={`bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-8 border shadow-xl transition-all duration-500 ${
                activeService === service.id
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 hidden"
              }`}
              style={{
                borderColor: `${service.accent}40`,
                display: activeService === service.id ? "block" : "none",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center mb-6">
                    <div
                      className="p-3 rounded-full mr-4"
                      style={{ backgroundColor: `${service.accent}20` }}
                    >
                      <div style={{ color: service.accent }}>
                        {service.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {service.title}
                      </h3>
                      {service.popular && (
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1"
                          style={{
                            backgroundColor: service.accent,
                            color: "white",
                          }}
                        >
                          Most Popular
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start"
                          custom={idx}
                          initial="hidden"
                          animate="visible"
                          variants={featureVariants}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            style={{ color: service.accent }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-8">
                      <div className="flex justify-between items-end mb-2">
                        <h4 className="text-white font-semibold">
                          Starting Price:
                        </h4>
                        <span
                          className="text-3xl font-bold"
                          style={{ color: service.accent }}
                        >
                          {service.price}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Custom quotes provided after consultation based on
                        specific requirements.
                      </p>
                    </div>

                    {/* Rest of the component remains the same */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Remaining sections (FAQ, CTA) stay the same */}
      </div>
    </section>
  );
}
