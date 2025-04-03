// src/components/ui/TracingBeam.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "framer-motion";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const TracingBeam: React.FC<TracingBeamProps> = ({
  children,
  className = "",
  containerClassName = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Track velocity of scroll to add a natural delay effect
  const scrollYVelocity = useVelocity(scrollYProgress);
  const [velY, setVelY] = useState(0);

  const smoothVelocity = useSpring(velY, {
    damping: 50,
    stiffness: 400,
  });

  useEffect(() => {
    return scrollYVelocity.on("change", (latestVelocity) => {
      setVelY(latestVelocity);
    });
  }, [scrollYVelocity]);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scaleY = useTransform(smoothVelocity, [-2000, 0, 2000], [0.8, 1, 1.2]);

  return (
    <div ref={ref} className={`relative ${containerClassName}`}>
      <motion.div
        className={`absolute left-10 top-3 bottom-0 w-[2px] ${className}`}
        style={{
          scaleY,
          y,
          opacity: scrollYProgress,
          backgroundImage:
            "linear-gradient(to bottom, var(--tw-gradient-stops))",
        }}
      />
      {children}
    </div>
  );
};
