"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "../store/cartStore";

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active"));
            const activeLink = document.querySelector(
              `nav a[href="#${entry.target.id}"]`,
            );
            if (activeLink) activeLink.classList.add("active");
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMobileMenu();

    // Add loading state animation
    e.currentTarget.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.currentTarget.style.transform = "scale(1)";
    }, 150);

    // If not on home page, navigate to home with hash
    if (pathname !== "/") {
      router.push(`/#${targetId}`);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="bg-black text-white shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="STEEZY Logo"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="nav-link hover:text-gray-300 transition-colors font-medium text-sm xl:text-base cursor-pointer"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              Home
            </a>
            <a
              href="#products"
              onClick={(e) => handleNavClick(e, "products")}
              className="nav-link hover:text-gray-300 transition-colors font-medium text-sm xl:text-base cursor-pointer"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              Products
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="nav-link hover:text-gray-300 transition-colors font-medium text-sm xl:text-base cursor-pointer"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              About Us
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="nav-link hover:text-gray-300 transition-colors font-medium text-sm xl:text-base cursor-pointer"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              Contact Us
            </a>
            <Link
              href="/cart"
              className="hover:text-gray-300 transition-colors font-medium relative"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <Link href="/cart" className="relative">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "home")}
                className="nav-link hover:text-gray-300 transition-colors font-medium cursor-pointer"
                style={{ fontFamily: "Righteous, cursive" }}
              >
                Home
              </a>
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "products")}
                className="nav-link hover:text-gray-300 transition-colors font-medium cursor-pointer"
                style={{ fontFamily: "Righteous, cursive" }}
              >
                Products
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "about")}
                className="nav-link hover:text-gray-300 transition-colors font-medium cursor-pointer"
                style={{ fontFamily: "Righteous, cursive" }}
              >
                About Us
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="nav-link hover:text-gray-300 transition-colors font-medium cursor-pointer"
                style={{ fontFamily: "Righteous, cursive" }}
              >
                Contact Us
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
