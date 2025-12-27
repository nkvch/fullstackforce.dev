"use client";

import React, { useEffect, useMemo, useState } from "react";
import Carousel, { CarouselItem } from "../Carousel";
import { productsCopy } from "../../content";

function useResponsiveCarouselWidth() {
  const [baseWidth, setBaseWidth] = useState<number>(360);

  useEffect(() => {
    const update = () => {
      // keep within viewport and within the products container padding
      const vw = typeof window !== "undefined" ? window.innerWidth : 360;
      const next = Math.max(280, Math.min(380, vw - 40));
      setBaseWidth(next);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return baseWidth;
}

export default function ProblemCarouselSection() {
  const { title, subtitle, items } = productsCopy.problem;
  const baseWidth = useResponsiveCarouselWidth();

  const carouselItems: CarouselItem[] = useMemo(
    () =>
      items.map((it, idx) => ({
        id: idx + 1,
        title: it.title,
        description: it.body,
        icon: (
          <span className="carousel-emoji" aria-hidden="true">
            {it.icon}
          </span>
        ),
      })),
    [items]
  );

  return (
    <section className="section section-muted section-muted-problem" id="problem">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        <div className="problem-carousel-wrap">
          <Carousel
            items={carouselItems}
            baseWidth={baseWidth}
            autoplay={false}
            autoplayDelay={2200}
            pauseOnHover={true}
            loop={true}
            round={true}
          />
        </div>
      </div>
    </section>
  );
}


