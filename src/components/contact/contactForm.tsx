"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your backend or a service like Formspree
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animate fields when component mounts
  useEffect(() => {
    if (formRef.current) {
      const formGroups = formRef.current.querySelectorAll(".form-group");

      gsap.fromTo(
        formGroups,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
  }, []);

  // If form is submitted, show success message
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-md rounded-xl p-8 border border-green-500/30 shadow-xl"
      >
        <div className="text-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-4">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-300 mb-6">
            Thank you for reaching out! I'll get back to you as soon as
            possible, usually within 24-48 hours.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
              });
            }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-300"
          >
            Send Another Message
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="block text-white font-medium mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${
              errors.name
                ? "border-red-500"
                : "border-gray-700 focus:border-purple-500"
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${
              errors.email
                ? "border-red-500"
                : "border-gray-700 focus:border-purple-500"
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className="form-group">
          <label
            htmlFor="subject"
            className="block text-white font-medium mb-2"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${
              errors.subject
                ? "border-red-500"
                : "border-gray-700 focus:border-purple-500"
            }`}
            placeholder="What's your message about?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label
            htmlFor="message"
            className="block text-white font-medium mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${
              errors.message
                ? "border-red-500"
                : "border-gray-700 focus:border-purple-500"
            }`}
            placeholder="Tell me about your project or inquiry..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        <div className="form-group pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Message...
              </span>
            ) : (
              "Send Message"
            )}
          </motion.button>

          <p className="text-gray-400 text-sm text-center mt-4">
            I'll respond to your message within 24-48 hours.
          </p>
        </div>
      </div>
    </form>
  );
}
