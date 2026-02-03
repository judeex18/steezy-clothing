"use client";

import { useCartStore } from "../store/cartStore";
import Link from "next/link";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center py-20">
          <svg
            className="w-32 h-32 mx-auto mb-8 text-gray-300"
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
          <h1 className="text-5xl font-bold mb-4 text-black">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Add some items to get started
          </p>
          <Link
            href="/products"
            className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-semibold transition-all duration-300 inline-block"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-black mb-2">SHOPPING CART</h1>
          <p className="text-gray-600 text-lg">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image || item.image_url}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-black mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Size:{" "}
                      <span className="font-semibold text-black">
                        {item.size}
                      </span>
                    </p>
                    <p className="text-2xl font-bold text-black">
                      ₱{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
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
                        className="w-16 text-center border-x border-gray-300 py-2 font-semibold"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700 font-semibold transition-colors"
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
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₱{getTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-black">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold">
                      ₱{getTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold text-center block transition-all duration-300 hover:shadow-lg mb-4"
              >
                PROCEED TO CHECKOUT
              </Link>

              <Link
                href="/products"
                className="w-full border-2 border-black text-black hover:bg-black hover:text-white py-4 text-lg font-semibold text-center block transition-all duration-300"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
