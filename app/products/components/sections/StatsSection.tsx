"use client";

import React, { useEffect, useRef, useState } from "react";
import { productsCopy } from "../../content";

export default function StatsSection() {
  const { title, subtitle, items } = productsCopy.stats;
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
        threshold: 0.2,
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
    <section className="section section-gradient section-stats" id="stats">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        <div
          ref={cardRef}
          className={`card card-pad ${isVisible ? "slide-in-left-animate" : "slide-in-left-initial"}`}
        >
          <div className="stats-row">
            {items.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
