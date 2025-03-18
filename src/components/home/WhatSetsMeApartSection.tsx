"use client";

import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Custom animation hook for section
const useSectionAnimation = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return {
    ref,
    controls,
    variants: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, staggerChildren: 0.15, ease: "easeOut" },
      },
    },
  };
};

// Features data
const features = [
  {
    icon: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
    color: "text-blue-500",
    title: "Stunning Animations",
    desc: "GSAP and Framer Motion animations that breathe life into your website, creating a memorable user experience.",
  },
  {
    icon: "M22 12h-4l-3 9L9 3l-3 9H2",
    color: "text-purple-500",
    title: "Performance Optimized",
    desc: "Fast-loading, responsive websites that perform flawlessly on all devices without sacrificing visual appeal.",
  },
  {
    icon: "M12 16v-4M12 8h.01",
    circle: true,
    color: "text-green-500",
    title: "SEO Friendly",
    desc: "Built with best practices to ensure your site ranks well in search engines and attracts more visitors.",
  },
  {
    icon: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9",
    color: "text-yellow-500",
    title: "Customized Design",
    desc: "Tailored to reflect your brand identity with unique layouts and interactions that set you apart.",
  },
  {
    icon: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2M14 8h6M16 13H8M16 17H8M10 9H8",
    color: "text-red-500",
    title: "Modern Stack",
    desc: "Built with Next.js, React, and other cutting-edge technologies to ensure your site is future-proof.",
  },
  {
    icon: "M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12zM12 18v.01",
    color: "text-indigo-500",
    title: "Fully Responsive",
    desc: "Looks and works perfectly on all devices - from smartphones to large desktop screens.",
  },
];

export default function FeaturesSection() {
  const featuresAnimation = useSectionAnimation();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-indigo-950 to-purple-900/50">
      {/* Animated Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 -z-20"
      >
        <div className="absolute w-[600px] h-[600px] top-[-300px] left-[-300px] bg-purple-600/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute w-[600px] h-[600px] bottom-[-300px] right-[-300px] bg-indigo-600/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.2),transparent_70%)]" />
      </motion.div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={featuresAnimation.controls}
          variants={featuresAnimation.variants}
          className="mb-16 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center shadow-2xl max-w-3xl mx-auto"
          ref={featuresAnimation.ref}
        >
          <motion.h2
            variants={featuresAnimation.variants}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-3 drop-shadow-md"
          >
            What Makes My Websites Stand Out
          </motion.h2>
          <motion.p
            variants={featuresAnimation.variants}
            className="text-xl text-gray-300"
          >
            I create websites that captivate with beauty, seamless UX, and
            jaw-dropping animations.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={featuresAnimation.controls}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: 0.1 * index,
                    ease: "easeOut",
                  },
                },
              }}
              className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col items-center text-center group hover:from-purple-600/50 hover:to-indigo-600/50 transition-all duration-300 shadow-lg"
              whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow: "0 15px 30px rgba(147, 51, 234, 0.5)",
              }}
            >
              <motion.div
                className={`mb-5 ${feature.color}`}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="p-4 rounded-full bg-white/10 shadow-inner backdrop-blur-md group-hover:bg-white/20 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {feature.circle && <circle cx="12" cy="12" r="10" />}
                    <path d={feature.icon} />
                  </svg>
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm group-hover:from-purple-200 group-hover:to-indigo-200 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                {feature.desc}
              </p>
              <motion.div
                className="w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mt-4 opacity-70"
                initial={{ width: "3rem" }}
                whileHover={{ width: "5rem" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
