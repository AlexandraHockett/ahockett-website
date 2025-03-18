import HeroSection from "@/components/home/HeroSection";
import WhatSetsMeApartSection from "@/components/home/WhatSetsMeApartSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import TechStackSection from "@/components/home/TechStackSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <WhatSetsMeApartSection />
      <FeaturedProjectsSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
}
