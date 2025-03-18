"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

type RandomValue = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export default function CTASection() {
  const [randomValues, setRandomValues] = useState<RandomValue[]>([]);

  useEffect(() => {
    const values: RandomValue[] = Array.from({ length: 20 }, () => ({
      width: Math.random() * 12 + 6,
      height: Math.random() * 12 + 6,
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setRandomValues(values);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#310e51] via-indigo-950 to-black">
      {/* Pulsing Nebula Background */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(49, 14, 81, 0.5), rgba(30, 27, 75, 0.3), transparent 70%)",
            "radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.5), rgba(30, 27, 75, 0.3), transparent 70%)",
            "radial-gradient(circle at 20% 30%, rgba(49, 14, 81, 0.5), rgba(30, 27, 75, 0.3), transparent 70%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Enhanced Glowing Particles with Trails */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {randomValues.map((values, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-500/40 to-indigo-500/40 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
            style={{
              width: values.width,
              height: values.height,
              top: `${values.top}%`,
              left: `${values.left}%`,
            }}
            animate={{
              y: [0, Math.random() * 120 - 60],
              x: [0, Math.random() * 120 - 60],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container px-4 mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{
            y: -15,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(147, 51, 234, 0.6)",
            rotateX: 2,
            rotateY: 2,
          }}
          transition={{
            duration: 0.8, // For initial animation
            ease: "easeOut",
            type: "spring",
            stiffness: 80,
            // Hover transition handled separately within Framer Motion
          }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create a Website That{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
              animate={{
                textShadow: [
                  "0 0 10px rgba(236, 72, 153, 0.8)",
                  "0 0 20px rgba(236, 72, 153, 1)",
                  "0 0 10px rgba(236, 72, 153, 0.8)",
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Wows?
            </motion.span>
          </h2>
          <p className="text-gray-200 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Let’s collaborate to craft a breathtaking website that captivates
            your audience and skyrockets your impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.8)",
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <Button
                title="Get a Quote"
                href="/quote"
              />
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.8)",
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <Button
                title="Contact Me"
                href="/contact"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
