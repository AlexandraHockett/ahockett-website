// src/utils/animation-utils.ts
import gsap from "gsap";
import { ElementData, AnimationPreset } from "@/types/website-builder";

// Apply animation to a specific element using GSAP
export const applyElementAnimation = (
  elementNode: HTMLElement,
  animation: AnimationPreset,
  delay: number = 0,
  timeline: gsap.core.Timeline,
  content?: string
) => {
  if (!elementNode || !animation) return;

  switch (animation) {
    case "fadeIn":
      gsap.set(elementNode, { opacity: 0 });
      timeline.to(
        elementNode,
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        delay
      );
      break;

    case "slideIn":
      gsap.set(elementNode, { x: -50, opacity: 0 });
      timeline.to(
        elementNode,
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        delay
      );
      break;

    case "bounce":
      gsap.set(elementNode, { y: -20, opacity: 0 });
      timeline.to(
        elementNode,
        { y: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" },
        delay
      );
      break;

    case "pulse":
      gsap.set(elementNode, { scale: 0.8, opacity: 0 });
      timeline.to(
        elementNode,
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        delay
      );
      break;

    case "flip":
      gsap.set(elementNode, { rotationY: 90, opacity: 0 });
      timeline.to(
        elementNode,
        { rotationY: 0, opacity: 1, duration: 1, ease: "power3.out" },
        delay
      );
      break;

    case "zoom":
      gsap.set(elementNode, { scale: 0, opacity: 0 });
      timeline.to(
        elementNode,
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        delay
      );
      break;

    case "reveal":
      gsap.set(elementNode, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      });
      timeline.to(
        elementNode,
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" },
        delay
      );
      break;

    case "typing":
      const wrapper = elementNode.querySelector("[data-content]");
      if (wrapper && content) {
        wrapper.textContent = "";
        gsap.set(wrapper, { width: "0%" });

        const typeAnimation = gsap.to(wrapper, {
          width: "100%",
          duration: content.length * 0.04,
          ease: "none",
        });

        timeline.add(typeAnimation, delay);
      }
      break;
  }
};

// Initialize animations for all elements
export const initializeAnimations = (
  elements: ElementData[],
  timeline: gsap.core.Timeline
) => {
  elements.forEach((element) => {
    const elementId = `element-${element.id}`;
    const elementNode = document.getElementById(elementId);

    if (elementNode && element.animation) {
      applyElementAnimation(
        elementNode,
        element.animation,
        element.animationDelay || 0,
        timeline,
        element.content
      );
    }
  });
};

// Reset all animations to initial state
export const resetAnimations = (
  elements: ElementData[],
  timeline: gsap.core.Timeline
) => {
  // Kill existing timeline
  timeline.kill();

  // Reset elements to initial state
  elements.forEach((element) => {
    const elementId = `element-${element.id}`;
    const elementNode = document.getElementById(elementId);

    if (elementNode) {
      gsap.set(elementNode, { clearProps: "all" });
    }
  });

  // Return a new timeline
  return gsap.timeline();
};
