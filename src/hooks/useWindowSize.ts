// src/hooks/useWindowSize.ts
import { useState, useEffect } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

export default function useWindowSize(): WindowSize {
  // Initialize state with undefined to handle server-side rendering
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isDesktop: true, // Default to desktop for SSR
    isTablet: false,
    isMobile: false,
  });

  useEffect(() => {
    // Only execute this on the client side
    // Handler to call on window resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({
        width,
        height,
        isDesktop: width >= 1024,
        isTablet: width >= 768 && width < 1024,
        isMobile: width < 768,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
