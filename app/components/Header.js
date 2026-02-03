"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

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

  return (
    <header className="bg-black text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="STEEZY Logo"
              className="h-16 w-40 object-contain hover:opacity-80 transition-opacity"
            />
          </Link>
          <nav className="hidden md:flex space-x-8 mr-15">
            <a
              href="#home"
              className="nav-link hover:text-gray-300 transition-colors font-medium"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              Home
            </a>
            <a
              href="#products"
              className="nav-link hover:text-gray-300 transition-colors font-medium"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              Products
            </a>
            <a
              href="#about"
              className="nav-link hover:text-gray-300 transition-colors font-medium"
              style={{ fontFamily: "Righteous, cursive" }}
            >
              About Us
            </a>
            <a
              href="#contact"
              className="nav-link hover:text-gray-300 transition-colors font-medium"
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
                xmlns="http://www.w3.org/2000/svg"
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
          {/* Mobile menu button - for future implementation */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
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
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
