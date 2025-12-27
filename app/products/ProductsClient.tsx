"use client";

import React from "react";
import Antigravity from "./components/Antigravity";
import ProductsHeroOverlay from "./components/ProductsHeroOverlay";
import { productsCopy } from "./content";

export default function ProductsClient() {
  return (
    <section className="products-section">
      <div className="products-fullbleed">
        <ProductsHeroOverlay
          title={productsCopy.hero.title}
          subtitle={
            <>
              The AI-Powered Solution That Transforms{" "}
              <span className="highlight-word">Healthcare</span> Data Access
            </>
          }
          ctaLabel={productsCopy.hero.cta.label}
          ctaHref={productsCopy.hero.cta.href}
        />
        <Antigravity
          particleShape="box"
          count={800}
          magnetRadius={8}
          ringRadius={8}
          waveSpeed={0.7}
          waveAmplitude={1}
          particleSize={0.55}
          lerpSpeed={0.06}
          color={"#2a88df"}
          autoAnimate={true}
          particleVariance={0.5}
          fieldStrength={10}
          depthFactor={2.3}
        />
      </div>
    </section>
  );
}


