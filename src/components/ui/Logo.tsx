// src/components/ui/Logo.tsx
import React from "react";

interface LogoProps {
  variant?: "color" | "black";
  className?: string;
}

export default function Logo({ variant = "color", className = "" }: LogoProps) {
  const colors = {
    primary: variant === "color" ? "#7C3AED" : "#000000", // Roxo ou preto
    secondary: variant === "color" ? "#4F46E5" : "#000000", // Índigo ou preto
  };

  return (
    <svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 10L5 20L15 30"
        stroke={colors.primary}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 10L25 20L35 30"
        stroke={colors.secondary}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="45"
        y="25"
        fontFamily="Arial"
        fontSize="18"
        fontWeight="bold"
        fill={colors.primary}
      >
        AHockett
      </text>
    </svg>
  );
}
