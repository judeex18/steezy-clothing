"use client";

import { useCartStore } from "../store/cartStore";
import Link from "next/link";
import Head from "next/head";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal);

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>Cart - Steezy</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center py-12 sm:py-20 max-w-md">
            <svg
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 text-black">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
              Add some items to get started
            </p>
            <Link
              href="/#products"
              className="bg-black hover:bg-gray-800 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 inline-block rounded-lg"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Cart - Steezy</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-2">
              SHOPPING CART
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.image || item.image_url}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-grow w-full sm:w-auto">
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mb-1 text-sm sm:text-base">
                        Size:{" "}
                        <span className="font-semibold text-black">
                          {item.size}
                        </span>
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-black">
                        ₱{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-3 py-2 hover:bg-gray-100 transition-colors text-lg font-semibold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              item.size,
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className="w-12 sm:w-16 text-center border-x border-gray-300 py-2 font-semibold"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="px-3 py-2 hover:bg-gray-100 transition-colors text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 lg:sticky lg:top-24 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₱{getTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-black">
                      <span className="text-lg sm:text-xl font-bold">
                        Total
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold">
                        ₱{getTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold text-center block transition-all duration-300 hover:shadow-lg mb-4 rounded-lg"
                >
                  PROCEED TO CHECKOUT
                </Link>

                <Link
                  href="/#products"
                  className="w-full border-2 border-black text-black hover:bg-black hover:text-white py-3 sm:py-4 text-base sm:text-lg font-semibold text-center block transition-all duration-300 rounded-lg"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
