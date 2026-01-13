"use client";

import React from "react";

type ProductsHeroOverlayProps = {
  title: string;
  subtitle: string | React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ProductsHeroOverlay({ 
  title, 
  subtitle, 
  ctaLabel = "See how it works",
  ctaHref = "#demo"
}: ProductsHeroOverlayProps) {
  return (
    <div className="products-overlay">
      <div className="products-overlay-inner">
        <div className="hero-kicker">
          <span className="status-dot" aria-hidden="true"></span>
          <span>AI-powered interoperability</span>
        </div>
        <h1 className="products-overlay-title">{title}</h1>
        <p className="products-overlay-subtitle">{subtitle}</p>
        <a 
          className="btn btn-primary" 
          href={ctaHref}
          style={{ pointerEvents: "auto" }}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}


