// src/components/contact/EnhancedContactForm.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Button from "@/components/ui/Button";

type FormStep = "info" | "project" | "budget" | "message";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
}

export default function EnhancedContactForm() {
  const [formStep, setFormStep] = useState<FormStep>("info");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    timeline: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(25);

  const formRef = useRef<HTMLFormElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Update progress bar when step changes
  useEffect(() => {
    const progress =
      formStep === "info"
        ? 25
        : formStep === "project"
          ? 50
          : formStep === "budget"
            ? 75
            : 100;

    setProgressWidth(progress);

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [formStep]);

  // Add animation when component mounts
  useEffect(() => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll(
        "input, select, textarea"
      );

      gsap.fromTo(
        inputs,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [formStep]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is being edited
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === "info") {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    } else if (step === "project") {
      if (!formData.projectType) {
        newErrors.projectType = "Please select a project type";
        isValid = false;
      }
    } else if (step === "budget") {
      if (!formData.budget) {
        newErrors.budget = "Please select a budget range";
        isValid = false;
      }

      if (!formData.timeline) {
        newErrors.timeline = "Please select a timeline";
        isValid = false;
      }
    } else if (step === "message") {
      if (!formData.message.trim()) {
        newErrors.message = "Please provide some details about your project";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const goToNextStep = () => {
    if (formStep === "info" && validateStep("info")) {
      setFormStep("project");
    } else if (formStep === "project" && validateStep("project")) {
      setFormStep("budget");
    } else if (formStep === "budget" && validateStep("budget")) {
      setFormStep("message");
    }
  };

  const goToPrevStep = () => {
    if (formStep === "project") {
      setFormStep("info");
    } else if (formStep === "budget") {
      setFormStep("project");
    } else if (formStep === "message") {
      setFormStep("budget");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep("message")) return;

    setIsSubmitting(true);

    try {
      // Enviar para a nossa API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true); // Corrigido de setSubmitted para setIsSubmitted
      } else {
        throw new Error(data.error || "Falha no envio do formulário");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        form: "Ocorreu um erro ao enviar a mensagem. Por favor tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-8 border border-green-500/30 shadow-xl"
      >
        <div className="text-center py-10">
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
            Thank you for reaching out! I'll review your project details and get
            back to you within 24-48 hours with a personalized response.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              title="Send Another Message"
              onClick={() => {
                setIsSubmitted(false);
                setFormStep("info");
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  projectType: "",
                  timeline: "",
                  budget: "",
                  message: "",
                });
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-purple-300">
            Step{" "}
            {formStep === "info"
              ? "1"
              : formStep === "project"
                ? "2"
                : formStep === "budget"
                  ? "3"
                  : "4"}{" "}
            of 4
          </span>
          <span className="text-sm text-purple-300">{progressWidth}%</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-between mb-8">
        {(["info", "project", "budget", "message"] as const).map(
          (step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  formStep === step
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : (formStep === "project" && step === "info") ||
                        (formStep === "budget" &&
                          ["info", "project"].includes(step)) ||
                        (formStep === "message" &&
                          ["info", "project", "budget"].includes(step))
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-400"
                }`}
              >
                {(formStep === "project" && step === "info") ||
                (formStep === "budget" && ["info", "project"].includes(step)) ||
                (formStep === "message" &&
                  ["info", "project", "budget"].includes(step)) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-xs ${
                  formStep === step ? "text-white" : "text-gray-400"
                }`}
              >
                {step === "info"
                  ? "Info"
                  : step === "project"
                    ? "Project"
                    : step === "budget"
                      ? "Budget"
                      : "Message"}
              </span>
            </div>
          )
        )}
      </div>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {formStep === "info" && (
            <motion.div
              key="info-step"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
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

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Company (Optional)
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  title="Next Step"
                  rightIcon={<span>→</span>}
                  onClick={goToNextStep}
                />
              </div>
            </motion.div>
          )}

          {formStep === "project" && (
            <motion.div
              key="project-step"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Project Details
              </h3>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Project Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${
                    errors.projectType
                      ? "border-red-500"
                      : "border-gray-700 focus:border-purple-500"
                  }`}
                >
                  <option value="">Select project type</option>
                  <option value="new-website">New Website</option>
                  <option value="website-redesign">Website Redesign</option>
                  <option value="ecommerce">E-commerce Website</option>
                  <option value="web-application">Web Application</option>
                  <option value="maintenance">Website Maintenance</option>
                  <option value="other">Other</option>
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.projectType}
                  </p>
                )}
              </div>

              <div className="pt-4 flex justify-between">
                <Button
                  title="Previous"
                  leftIcon={<span>←</span>}
                  onClick={goToPrevStep}
                  className="bg-transparent border border-purple-500"
                />
                <Button
                  title="Next Step"
                  rightIcon={<span>→</span>}
                  onClick={goToNextStep}
                />
              </div>
            </motion.div>
          )}

          {formStep === "budget" && (
            <motion.div
              key="budget-step"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Budget & Timeline
              </h3>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Budget Range <span className="text-red-500">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${
                    errors.budget
                      ? "border-red-500"
                      : "border-gray-700 focus:border-purple-500"
                  }`}
                >
                  <option value="">Select your budget range</option>
                  <option value="1000-3000">$1,000 - $3,000</option>
                  <option value="3000-5000">$3,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000+">$10,000+</option>
                  <option value="not-sure">I'm not sure</option>
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="timeline"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Project Timeline <span className="text-red-500">*</span>
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${
                    errors.timeline
                      ? "border-red-500"
                      : "border-gray-700 focus:border-purple-500"
                  }`}
                >
                  <option value="">Select your timeline</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="flexible">Flexible</option>
                </select>
                {errors.timeline && (
                  <p className="mt-1 text-sm text-red-500">{errors.timeline}</p>
                )}
              </div>

              <div className="pt-4 flex justify-between">
                <Button
                  title="Previous"
                  leftIcon={<span>←</span>}
                  onClick={goToPrevStep}
                  className="bg-transparent border border-purple-500"
                />
                <Button
                  title="Next Step"
                  rightIcon={<span>→</span>}
                  onClick={goToNextStep}
                />
              </div>
            </motion.div>
          )}

          {formStep === "message" && (
            <motion.div
              key="message-step"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Project Description
              </h3>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-700 focus:border-purple-500"
                  }`}
                  placeholder="Describe your project, requirements, and any specific features you need..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {errors.form && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md">
                  {errors.form}
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <Button
                  title="Previous"
                  leftIcon={<span>←</span>}
                  onClick={goToPrevStep}
                  className="bg-transparent border border-purple-500"
                />
                <Button
                  title={isSubmitting ? "Sending..." : "Submit Request"}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  rightIcon={!isSubmitting ? <span>✓</span> : undefined}
                  className={`${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
