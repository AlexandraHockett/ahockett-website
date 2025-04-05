// src/components/contact/CalendlyIntegration.tsx
"use client";

import React, { useEffect } from "react";
import Button from "@/components/ui/Button";

interface CalendlyIntegrationProps {
  url?: string;
}

export default function CalendlyIntegration({
  url = "https://calendly.com/teu-username/30min",
}: CalendlyIntegrationProps) {
  useEffect(() => {
    // Carrega o script do Calendly
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    // @ts-ignore - O Calendly é adicionado ao objeto window pelo script
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return false;
    }
  };

  return (
    <div className="text-center">
      <Button
        title="Agendar uma Consulta"
        onClick={openCalendly}
        rightIcon={<span>📅</span>}
      />
    </div>
  );
}
