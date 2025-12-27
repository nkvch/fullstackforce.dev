import type { Metadata } from "next";
import React from "react";
import ProductsClient from "./ProductsClient";
import BenefitsSection from "./components/sections/BenefitsSection";
import CtaSection from "./components/sections/CtaSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import ProblemCarouselSection from "./components/sections/ProblemCarouselSection";
import SolutionSection from "./components/sections/SolutionSection";
import StatsSection from "./components/sections/StatsSection";
import ProblemSection from "./components/sections/ProblemSection";

export const metadata: Metadata = {
  title: "Products | FullStackForce",
  description: "Products built by FullStackForce.",
};

export default function ProductsPage() {
  return (
    <div className="products">
      <ProductsClient />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <BenefitsSection />
      <StatsSection />
      <CtaSection />
    </div>
  );
}


