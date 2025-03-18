"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "@/components/contact/contactForm";
import Button from "@/components/ui/Button";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"form" | "calendar">("form");

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
            Let's Connect
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Ready to create a website that wows? I'd love to hear about your
            project. Get in touch and let's bring your vision to life.
          </p>
        </motion.div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 space-y-8"
          >
            {/* Contact Card */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-xl">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg text-purple-300">
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
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Phone</h3>
                    <p className="text-gray-300 mt-1">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Available Monday-Friday, 9am-5pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-500/20 p-3 rounded-lg text-indigo-300">
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
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="text-gray-300 mt-1">hello@ahockett.com</p>
                    <p className="text-gray-400 text-sm mt-1">
                      I'll respond within 24-48 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-pink-500/20 p-3 rounded-lg text-pink-300">
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
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Location</h3>
                    <p className="text-gray-300 mt-1">Remote</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Working with clients worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-xl">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
                Connect With Me
              </h2>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="https://linkedin.com/in/alexandrahockett"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-700/20 hover:bg-blue-700/40 text-white py-3 px-4 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    className="text-blue-400"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  href="https://github.com/ahockett"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-700/20 hover:bg-gray-700/40 text-white py-3 px-4 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    className="text-gray-400"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </motion.a>

                <motion.a
                  href="https://twitter.com/alexandrahockett"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/40 text-white py-3 px-4 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    className="text-blue-400"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span>Twitter</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Form and Scheduling Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                <button
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 ${
                    activeTab === "form"
                      ? "bg-purple-900/30 text-white border-b-2 border-purple-500"
                      : "bg-transparent text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("form")}
                >
                  Contact Form
                </button>
                <button
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 ${
                    activeTab === "calendar"
                      ? "bg-purple-900/30 text-white border-b-2 border-purple-500"
                      : "bg-transparent text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("calendar")}
                >
                  Schedule a Call
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "form" ? (
                  <ContactForm />
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Schedule a 30-Minute Consultation
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      Pick a time that works for you, and we'll have a
                      no-obligation chat about your project needs and how I can
                      help bring your vision to life.
                    </p>

                    <div className="rounded-xl overflow-hidden border border-purple-500/30 bg-gray-800/50 h-[450px] mb-6">
                      {/* In a real application, this would be replaced with an actual calendar integration */}
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-400 mb-4"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <p className="text-white text-xl font-medium mb-2">
                          Calendar Integration
                        </p>
                        <p className="text-gray-400 max-w-md text-center">
                          Here you would see a Calendly or similar booking
                          widget to schedule your call.
                        </p>
                      </div>
                    </div>

                    <Button
                      title="Open Calendly Scheduler"
                      href="https://calendly.com/ahockett"
                      target="_blank"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-950/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              Working Globally
            </h2>
            <p className="text-xl text-gray-300">
              While I work remotely, I collaborate with clients from around the
              world to create stunning websites that make an impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden border border-purple-500/30 shadow-xl"
            style={{ height: "400px" }}
          >
            {/* In a real application, this would be a Google Maps or similar map integration */}
            <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
              <div className="text-center max-w-md px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400 mb-4 mx-auto"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8.5 3.5l7 7"></path>
                  <path d="M8.5 20.5l7-7"></path>
                  <path d="M3.5 8.5l7 7"></path>
                  <path d="M20.5 8.5l-7 7"></path>
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Global Reach
                </h3>
                <p className="text-gray-300">
                  I work with clients across different time zones, offering
                  flexible meeting times to ensure seamless collaboration no
                  matter where you're located.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
