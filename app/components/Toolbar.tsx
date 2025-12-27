"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Toolbar: React.FC = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const heroSection = document.querySelector<HTMLElement>(".hero");
    if (!heroSection) {
      // On pages without a hero section, the toolbar should default to the "scrolled" state
      // so the logo remains visible.
      setShowLogo(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowLogo(!entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`toolbar ${showLogo ? "show-logo" : ""} ${isMenuOpen ? "menu-open" : ""}`}> 
      {isHome ? (
        <a
          href="#"
          className="logo"
          style={{ opacity: showLogo ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <img src="/logo.png" alt="FullStackForce Logo" className="logo-image" />
          FullStackForce
        </a>
      ) : (
        <Link
          href="/"
          className="logo"
          style={{ opacity: showLogo ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <img src="/logo.png" alt="FullStackForce Logo" className="logo-image" />
          FullStackForce
        </Link>
      )}
      <ul
        className={`toolbar-links ${showLogo ? "toolbar-links-right" : "toolbar-links-center"}`}
      >
        <li>
          <Link href={isHome ? "#services" : "/#services"}>Services</Link>
        </li>
        <li>
          <Link href={isHome ? "#projects" : "/#projects"}>Projects</Link>
        </li>
        <li>
          <Link href={isHome ? "#team" : "/#team"}>Team</Link>
        </li>
        <li>
          <Link href={isHome ? "#page-bottom" : "/#page-bottom"}>Contact</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
      </ul>

      <button
        className="mobile-menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><Link href={isHome ? "#services" : "/#services"} onClick={handleLinkClick}>Services</Link></li>
            <li><Link href={isHome ? "#projects" : "/#projects"} onClick={handleLinkClick}>Projects</Link></li>
            <li><Link href={isHome ? "#team" : "/#team"} onClick={handleLinkClick}>Team</Link></li>
            <li><Link href={isHome ? "#page-bottom" : "/#page-bottom"} onClick={handleLinkClick}>Contact</Link></li>
            <li><Link href="/products" onClick={handleLinkClick}>Products</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Toolbar; 