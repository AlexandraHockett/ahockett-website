// src/components/layout/Footer.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/ahockett",
    icon: <FaGithub size={24} />,
    label: "GitHub",
    hoverColor: "hover:text-gray-700",
  },
  {
    href: "https://linkedin.com/in/alexandrahockett",
    icon: <FaLinkedin size={24} />,
    label: "LinkedIn",
    hoverColor: "hover:text-blue-600",
  },
  {
    href: "https://twitter.com/alexandrahockett",
    icon: <FaTwitter size={24} />,
    label: "Twitter",
    hoverColor: "hover:text-blue-400",
  },
];

interface LegalLink {
  href: string;
  label: string;
}

const legalLinks: LegalLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const currentYear = new Date().getFullYear();

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const footerRef = useRef<HTMLElement>(null);

  // GSAP Animation with staggered transitions
  useEffect(() => {
    if (footerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".footer-brand",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".footer-social",
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.3"
        )
        .fromTo(
          ".footer-cta",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".footer-legal",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".footer-credit",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.1"
        );

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  // Framer Motion variants for micro-interactions
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer
      ref={footerRef}
      className={`bg-gradient-to-t from-black via-indigo-950 to-purple-900 backdrop-blur-md py-12 text-gray-200 w-full z-10 border-t border-white/10 ${className}`}
    >
      <div className="container mx-auto px-6">
        {/* Top Section: Branding + Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="footer-brand flex items-center gap-2">
            {/* Modified text with border effect */}
            <span className="text-2xl font-bold relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 relative z-10">
                Alexandra Hockett
              </span>
              {/* Text stroke effect using text-shadow */}
              <span
                className="absolute inset-0 text-2xl font-bold bg-clip-text text-transparent z-0"
                style={{
                  textShadow: `
                    -1px -1px 0 rgba(255,255,255,0.4),  
                    1px -1px 0 rgba(255,255,255,0.4),
                    -1px 1px 0 rgba(255,255,255,0.4),
                    1px 1px 0 rgba(255,255,255,0.4)
                  `,
                }}
              >
                Alexandra Hockett
              </span>
            </span>
            <span className="text-sm text-gray-400">Web Developer</span>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`footer-social text-gray-400 transition-all duration-300 ${link.hoverColor}`}
                whileHover={{
                  scale: 1.2,
                  rotate: 5,
                  boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
                style={{ transform: "scale(1) rotate(0deg)" }}
                onHoverStart={() => {
                  gsap.to(`#social-${index}`, {
                    scale: 1.2,
                    rotate: 5,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
                onHoverEnd={() => {
                  gsap.to(`#social-${index}`, {
                    scale: 1,
                    rotate: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
              >
                <span id={`social-${index}`}>{link.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Currency Section - Add this new section */}
        <div className="footer-currency flex justify-center mb-8">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <p className="text-sm text-gray-300 mb-2 text-center">
              Select your preferred currency
            </p>
            <LocaleSwitcher />
          </div>
        </div>

        {/* Middle Section: CTA */}
        <div className="footer-cta flex flex-col items-center justify-center gap-6 mb-10 text-center">
          <h3 className="text-xl font-semibold text-white">
            Ready to create a website that wows?
          </h3>
          <Button
            title="Let's Work Together"
            href="/contact"
            leftIcon={<span>✨</span>}
          />
        </div>

        {/* Bottom Section: Legal + Credits */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="footer-legal">
            © {currentYear} Alexandra Hockett. All rights reserved.
          </p>

          <div className="footer-legal flex gap-6 items-center">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-purple-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-credit flex flex-col items-center md:items-end pt-4 md:pt-0">
            <span className="mb-1 text-sm">Crafted with ♥ by</span>
            <a
              href="https://www.ahockett.com/"
              className="relative group inline-block overflow-hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-indigo-900 to-purple-800 text-lg tracking-wide">
                Alexandra Hockett
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-950 via-indigo-900 to-purple-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-950/10 via-indigo-900/10 to-purple-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
