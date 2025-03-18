"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const techStack = [
  { name: "Next.js", icon: "/images/nextjs-black.webp" },
  { name: "React", icon: "/images/react.webp" },
  { name: "GSAP", icon: "/images/gsap.webp" },
  { name: "Framer Motion", icon: "/images/framer.webp" },
  { name: "Tailwind CSS", icon: "/images/tailwind.webp" },
  { name: "TypeScript", icon: "/images/typescript.webp" },
];

export default function TechStackSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-indigo-950/70 to-purple-900/50">
      {/* Animated Cosmic Background */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{
          background: [
            "radial-gradient(circle at 30% 20%, rgba(79, 70, 229, 0.4), transparent 70%)",
            "radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.4), transparent 70%)",
            "radial-gradient(circle at 30% 20%, rgba(79, 70, 229, 0.4), transparent 70%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30"
            style={{
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -30 + i * 10, 0],
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 drop-shadow-md">
            Technologies I Master
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(147, 51, 234, 0.5)",
                "0 0 20px rgba(147, 51, 234, 0.8)",
                "0 0 10px rgba(147, 51, 234, 0.5)",
              ],
            }}
            style={{ transition: "box-shadow 1.5s ease-in-out infinite" }}
          />
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14 max-w-5xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
              className="flex flex-col items-center group relative"
              whileHover={{
                scale: 1.15,
                rotate: 5,
                boxShadow: "0 0 25px rgba(147, 51, 234, 0.7)",
              }}
            >
              {/* Ripple Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500/20 -z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-black/80 p-3 rounded-xl backdrop-blur-md border border-white/20 group-hover:border-purple-500/50 transition-all duration-300 shadow-lg">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={80}
                  height={80}
                  className="object-contain filter drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(147,51,234,0.8)] transition-all duration-300"
                />
              </div>
              <span className="text-base text-gray-300 group-hover:text-purple-300 font-medium transition-colors duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
