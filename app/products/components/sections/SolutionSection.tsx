"use client";

import React, { useEffect, useRef, useState } from "react";
import { productsCopy } from "../../content";
import InfoDotMockup from "../InfoDotMockup";

export default function SolutionSection() {
  const { title, subtitle, body } = productsCopy.solution;
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section section-gradient section-solution" id="solution">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        <InfoDotMockup />
        <div
          ref={cardRef}
          className={`card card-pad ${isVisible ? "slide-in-animate" : "slide-in-initial"}`}
        >
          <p className="long-card-text" style={{ maxWidth: 900, margin: "0 auto" }}>{body}</p>
        </div>
      </div>
    </section>
  );
}
