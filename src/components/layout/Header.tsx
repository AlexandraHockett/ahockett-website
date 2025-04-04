// src/components/layout/Header.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define NavItem type
interface NavItem {
  label: string;
  href: string;
}

// Memoized nav items with shorter words
const navItems: NavItem[] = [
  { label: "Home", href: "/" }, // Already short
  { label: "Work", href: "/services" }, // "Services" → "Work"
  // { label: "Preview", href: "/preview" },
  { label: "Port", href: "/portfolio" }, // "Portfolio" → "Port"
  { label: "Flow", href: "/process" }, // "Process" → "Flow"
  { label: "Rate", href: "/quote" }, // "Quote" → "Rate"
  { label: "Chat", href: "/contact" }, // "Contact" → "Chat"
];

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = memo(({ className }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("/");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const pathname = usePathname();

  // Set active page and reset animation on route change
  useEffect(() => {
    setActivePage(pathname);
    setHasAnimated(false); // Reset animation for new page
  }, [pathname]);

  // Scroll handler with debounce
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      window.cancelAnimationFrame(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;

      const newProgress = height > 0 ? (currentScrollY / height) * 100 : 0;
      if (Math.abs(newProgress - scrollProgress) > 0.5) {
        setScrollProgress(newProgress);
      }

      if (currentScrollY > lastScrollY + 15) {
        if (isNavVisible) setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY - 15 || currentScrollY <= 10) {
        if (!isNavVisible) setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    });
  }, [lastScrollY, isNavVisible, scrollProgress]);

  // Scroll listener setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (scrollTimeoutRef.current) {
        window.cancelAnimationFrame(scrollTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Initial animation - cinematic intro
  useEffect(() => {
    if (navContainerRef.current && !hasAnimated) {
      const tl = gsap.timeline({
        onComplete: () => setHasAnimated(true),
      });

      tl.fromTo(
        ".header-logo",
        { y: -50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      ).fromTo(
        ".nav-link",
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }
  }, [hasAnimated]);

  // Header visibility animation
  useEffect(() => {
    if (navContainerRef.current && hasAnimated) {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isNavVisible, hasAnimated]);

  // Progress bar glow effect
  useEffect(() => {
    if (scrollProgress > 0) {
      gsap.to(".progress-bar", {
        boxShadow: `0 0 10px rgba(236, 72, 153, ${scrollProgress / 100})`,
        duration: 0.3,
      });
    }
  }, [scrollProgress]);

  // Mobile menu animation
  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    if (!mobileNav) return;

    let animation: gsap.core.Tween;
    if (isMenuOpen) {
      animation = gsap.fromTo(
        mobileNav,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      animation = gsap.to(mobileNav, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    return () => {
      animation.kill();
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Memoized NavLinks with Framer Motion hover effects
  const NavLinks = memo(() => (
    <div className="hidden md:flex items-center space-x-1 md:space-x-2 lg:space-x-3 xl:space-x-4">
      {navItems.map((item) => (
        <motion.div
          key={item.label}
          whileHover={{ scale: 1.05, rotateX: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-xs md:text-sm lg:text-base xl:text-lg"
        >
          <Link
            href={item.href}
            className={`nav-hover-btn nav-link ${
              activePage === item.href ? "text-purple-300" : "text-blue-50"
            }`}
          >
            {item.label}
          </Link>
        </motion.div>
      ))}

      <div className="ml-1 md:ml-2 lg:ml-3 xl:ml-4">
        <LocaleSwitcher />
      </div>

      <div className="ml-1 md:ml-2 lg:ml-3 xl:ml-4">
        <Link
          href="/quote"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 xl:px-5 xl:py-2 rounded-full text-xs md:text-sm lg:text-base xl:text-lg hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
        >
          Rate
        </Link>
      </div>
    </div>
  ));
  NavLinks.displayName = "NavLinks";

  return (
    <>
      <div
        ref={navContainerRef}
        className={`fixed inset-x-0 mx-auto top-2 sm:top-3 md:top-4 z-50 h-12 sm:h-14 md:h-16 max-w-[80%] sm:max-w-[85%] md:max-w-[90%] lg:max-w-[92%] xl:max-w-[95%] bg-gradient-to-r from-indigo-950/90 to-purple-900/90 backdrop-blur-md border border-indigo-800/30 rounded-xl sm:rounded-2xl shadow-lg transition-colors duration-300 ${className || ""} ${
          scrollProgress > 10 ? "floating-nav" : ""
        }`}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav
            className="container mx-auto flex items-center justify-between px-1 sm:px-2 md:px-4 lg:px-6 py-1 sm:py-2 md:py-2"
            role="navigation"
          >
            <Link href="/" className="z-10 header-logo">
              <div className="transition-transform duration-200 hover:scale-105">
                <Image
                  src="/images/logoblack-no-background.svg"
                  alt="AHockett"
                  width={60} // Even smaller
                  height={24} // Even smaller
                  className="h-6 sm:h-7 md:h-8 lg:h-10 invert"
                  priority
                  onError={(e) => {
                    e.currentTarget.src = "/images/fallback-logo.png";
                  }}
                />
              </div>
            </Link>

            <NavLinks />

            <div className="relative block md:hidden z-50">
              <button
                onClick={toggleMenu}
                className="text-lg sm:text-xl md:text-2xl p-1 sm:p-2 transition-transform duration-200 hover:scale-110 active:scale-95"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </header>
        <div
          className="progress-bar absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500/80 via-fuchsia-500/80 to-pink-500/80 rounded-bl sm:rounded-bl-2xl transition-all duration-100 ease-out"
          style={{
            width: `${scrollProgress}%`,
            borderBottomRightRadius: scrollProgress < 98 ? "0" : "0.25rem",
          }}
        />
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-30 md:hidden"
            />
            <div
              ref={mobileNavRef}
              className="fixed top-12 sm:top-14 md:top-16 inset-y-0 right-1 sm:right-2 md:right-4 w-48 sm:w-56 md:w-64 lg:w-72 z-40 bg-gradient-to-b from-indigo-950/95 to-purple-900/95 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-2xl overflow-y-auto"
            >
              <nav className="p-3 sm:p-4 md:p-6 flex flex-col items-start w-full space-y-3 sm:space-y-4 md:space-y-6">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`nav-hover-btn ml-0 text-xs sm:text-sm md:text-base ${
                      activePage === item.href
                        ? "text-purple-300"
                        : "text-blue-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen
                        ? "translateX(0)"
                        : "translateX(-20px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-2 sm:pt-3 md:pt-4 w-full">
                  <LocaleSwitcher />
                </div>

                <div className="pt-2 sm:pt-3 md:pt-4 w-full">
                  <Link
                    href="/quote"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1 md:py-2 rounded-full block text-center text-xs sm:text-sm md:text-base hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Rate
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = "Header";

export default Header;
