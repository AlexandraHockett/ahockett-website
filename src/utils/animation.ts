// src/utils/animation.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Common animation functions
export const fadeInUp = (element: string, delay: number = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
    }
  );
};

export const fadeIn = (element: string, delay: number = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      delay,
      ease: "power3.out",
    }
  );
};

export const staggerAnimation = (elements: string, stagger: number = 0.1) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      stagger,
      duration: 0.6,
      ease: "power3.out",
    }
  );
};

export const createScrollTrigger = (
  trigger: string,
  animation: gsap.core.Tween
) => {
  return ScrollTrigger.create({
    trigger,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    animation,
  });
};

export const animateTextChars = (textElement: string) => {
  const element = document.querySelector(textElement);
  if (!element || !element.textContent) return;

  const text = element.textContent;
  element.textContent = "";

  // Split text into spans
  const chars = text.split("");
  chars.forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = "0";
    span.style.transform = "translateY(20px)";
    span.style.display = "inline-block";
    element.appendChild(span);
  });

  // Animate each character
  gsap.to(`${textElement} span`, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.03,
    ease: "power3.out",
  });
};

// Parallax effect
export const createParallax = (element: string, speed: number = 0.5) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed * -1,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Path drawing animation for SVGs
export const drawSvgPath = (path: string, duration: number = 2) => {
  return gsap.fromTo(
    path,
    { drawSVG: "0%" },
    { drawSVG: "100%", duration, ease: "power2.inOut" }
  );
};
