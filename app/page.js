"use client";

import { useState, useEffect } from "react";
import { getProducts } from "./lib/supabase";
import ProductCard from "./components/ProductCard";
import Head from "next/head";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  useEffect(() => {
    // Load products from Supabase database
    async function loadProducts() {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback to mock if database is empty
          const { products: mockProducts } = await import("./data/products");
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error(
          "Error loading products from database, using mock:",
          error,
        );
        // Fallback to mock data if database fails
        try {
          const { products: mockProducts } = await import("./data/products");
          setProducts(mockProducts);
        } catch (fallbackError) {
          console.error("Error loading mock products:", fallbackError);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (products.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [products]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(products.length / 3)) %
        Math.ceil(products.length / 3),
    );
  };

  const getCurrentProducts = () => {
    const startIndex = currentSlide * 3;
    return products.slice(startIndex, startIndex + 3);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent"></div>
      </div>
    );

  return (
    <>
      <Head>
        <title>Steezy</title>
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section id="home" className="bg-black text-white py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="STEEZY Logo"
                className="h-32 md:h-40 w-auto mx-auto hover:opacity-90 transition-opacity"
              />
            </div>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
              Minimal. Modern. Streetwear.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#products"
                className="bg-white text-black px-12 py-4 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                SHOP NOW
              </a>
              <a
                href="#about"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 text-lg font-semibold transition-all duration-300"
              >
                OUR STORY
              </a>
            </div>
          </div>
        </section>

        {/* Product Slideshow */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-black mb-4">FEATURED</h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Discover our latest collection of premium streetwear
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent"></div>
              </div>
            ) : (
              <div className="relative">
                {/* Slideshow Container */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from(
                      { length: Math.ceil(products.length / 3) },
                      (_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                            {products
                              .slice(slideIndex * 3, (slideIndex + 1) * 3)
                              .map((product) => (
                                <ProductCard
                                  key={product.id}
                                  product={product}
                                />
                              ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                {products.length > 3 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors z-10"
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors z-10"
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Slide Indicators */}
                    <div className="flex justify-center mt-8 space-x-2">
                      {Array.from(
                        { length: Math.ceil(products.length / 3) },
                        (_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentSlide
                                ? "bg-black"
                                : "bg-gray-300"
                            }`}
                          />
                        ),
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="text-center mt-12">
              <a
                href="#products"
                className="bg-black text-white px-12 py-4 text-lg font-semibold hover:bg-gray-800 transition-colors inline-block"
              >
                VIEW ALL PRODUCTS
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="group">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Premium Quality
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Carefully selected materials and expert craftsmanship in every
                  piece
                </p>
              </div>
              <div className="group">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Express shipping worldwide with real-time tracking
                </p>
              </div>
              <div className="group">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Authentic
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  100% authentic products with verified quality assurance
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-black mb-4">
                ALL PRODUCTS
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Explore our complete collection of premium streetwear designed
                for style and comfort.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-50 py-20">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                <span>About</span>
                <img
                  src="/logo.png"
                  alt="STEEZY"
                  className="h-14 object-contain"
                />
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Where fashion meets attitude. Discover our story and what makes
                us different.
              </p>
            </div>
          </div>
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-gray-600">
                    <p className="text-lg leading-relaxed">
                      Steezy Clothing was born from a passion for streetwear
                      culture and urban fashion. Founded in 2024, we've been at
                      the forefront of bringing you the latest trends that
                      define the streets.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Our journey started with a simple belief: everyone
                      deserves to express their unique style without compromise.
                      We curate pieces that blend comfort, quality, and
                      cutting-edge design.
                    </p>
                    <p className="text-lg leading-relaxed">
                      From humble beginnings to becoming a trusted name in
                      fashion, we've stayed true to our roots while constantly
                      evolving to meet the demands of our discerning customers.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">
                      Why Choose STEEZY?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Premium Quality Materials
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Trendy & Unique Designs
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Affordable Pricing
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Fast & Reliable Shipping
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        24/7 Customer Support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      10K+
                    </div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      500+
                    </div>
                    <div className="text-gray-600">Products</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      50+
                    </div>
                    <div className="text-gray-600">Countries</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-pink-600 mb-2">
                      4.9
                    </div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                </div>
              </div>
              <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                  <span>Join the</span>
                  <img
                    src="/logo.png"
                    alt="STEEZY"
                    className="h-10 object-contain"
                  />
                  <span>Family</span>
                </h2>
                <p className="text-xl mb-8 text-purple-100">
                  Follow us on social media and stay updated with the latest
                  trends and exclusive releases.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#products"
                    className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shop Our Collection
                  </a>
                  <a
                    href="#contact"
                    className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-full font-semibold transition-all"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="bg-black text-white py-24">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-6xl font-bold mb-6">GET IN TOUCH</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Have questions? We're here to help you find your perfect style.
              </p>
            </div>
          </div>
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Contact Information
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                      We'd love to hear from you. Send us a message and we'll
                      respond as soon as possible.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Address
                        </h3>
                        <p className="text-gray-600">
                          123 Fashion Street Style City, SC 12345
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Phone
                        </h3>
                        <p className="text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Email
                        </h3>
                        <p className="text-gray-600">hello@steezy.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Tell us more about your inquiry..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
