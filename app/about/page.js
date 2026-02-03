export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
            <span>About</span>
            <img src="/logo.png" alt="STEEZY" className="h-14 object-contain" />
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Where fashion meets attitude. Discover our story and what makes us
            different.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Steezy Clothing was born from a passion for streetwear culture
                  and urban fashion. Founded in 2024, we've been at the
                  forefront of bringing you the latest trends that define the
                  streets.
                </p>
                <p className="text-lg leading-relaxed">
                  Our journey started with a simple belief: everyone deserves to
                  express their unique style without compromise. We curate
                  pieces that blend comfort, quality, and cutting-edge design.
                </p>
                <p className="text-lg leading-relaxed">
                  From humble beginnings to becoming a trusted name in fashion,
                  we've stayed true to our roots while constantly evolving to
                  meet the demands of our discerning customers.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose STEEZY?</h3>
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

          {/* Stats Section */}
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
                <div className="text-4xl font-bold text-pink-600 mb-2">4.9</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
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
              Follow us on social media and stay updated with the latest trends
              and exclusive releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Our Collection
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-full font-semibold transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
