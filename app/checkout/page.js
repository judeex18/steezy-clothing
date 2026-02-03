"use client";

import { useCartStore } from "../store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveOrder } from "../lib/supabase";

export default function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "cod",
    gcashNumber: "",
  });
  const router = useRouter();

  useEffect(() => {
    document.title = "Checkout - Steezy";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer_name: formData.name,
      address: `${formData.address}, ${formData.city}, ${formData.zip}`,
      total_amount: getTotal(),
      payment_method: formData.paymentMethod,
      status: "pending",
    };

    const orderItems = cart.map((item) => ({
      product_id: item.id,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const savedOrder = await saveOrder(orderData, orderItems);
      clearCart();
      alert("Order placed successfully!");
      router.push(`/success?orderId=${savedOrder.id}`);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
            Cart is Empty
          </h1>
          <a
            href="/#products"
            className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors inline-block rounded-lg"
          >
            SHOP NOW
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 sm:mb-12 text-black">
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Shipping Information */}
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
                  SHIPPING INFORMATION
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 p-3 sm:p-4 rounded-lg focus:border-black focus:outline-none transition-colors text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 p-3 sm:p-4 rounded-lg focus:border-black focus:outline-none transition-colors text-sm sm:text-base"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 p-3 sm:p-4 rounded-lg focus:border-black focus:outline-none transition-colors text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 p-3 sm:p-4 rounded-lg focus:border-black focus:outline-none transition-colors text-sm sm:text-base"
                  />
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-300 p-3 sm:p-4 rounded-lg focus:border-black focus:outline-none transition-colors text-sm sm:text-base"
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-300 p-3 sm:p-4 rounded-lg focus:border-black focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
                  PAYMENT METHOD
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="mr-3 sm:mr-4 w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <div className="flex-grow">
                      <span className="font-semibold text-base sm:text-lg">
                        Cash on Delivery
                      </span>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Pay when you receive your order
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="gcash"
                      checked={formData.paymentMethod === "gcash"}
                      onChange={handleChange}
                      className="mr-3 sm:mr-4 w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <div className="flex-grow">
                      <span className="font-semibold text-base sm:text-lg">
                        GCash
                      </span>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Digital wallet payment
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cop"
                      checked={formData.paymentMethod === "cop"}
                      onChange={handleChange}
                      className="mr-3 sm:mr-4 w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <div className="flex-grow">
                      <span className="font-semibold text-base sm:text-lg">
                        Cash on Pickup
                      </span>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Pay when you pick up at our store
                      </p>
                    </div>
                  </label>

                  {formData.paymentMethod === "gcash" && (
                    <input
                      type="text"
                      name="gcashNumber"
                      placeholder="GCash Mobile Number"
                      value={formData.gcashNumber}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-300 p-3 sm:p-4 rounded-lg focus:border-black focus:outline-none transition-colors mt-4 text-sm sm:text-base"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 sm:py-5 text-lg sm:text-xl font-bold hover:bg-gray-800 transition-colors rounded-lg shadow-lg hover:shadow-xl"
              >
                PLACE ORDER
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white p-6 sm:p-8 rounded-xl lg:sticky lg:top-24 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6 max-h-64 sm:max-h-96 overflow-y-auto">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 pb-4 border-b border-gray-200"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.image || item.image_url}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-black text-sm sm:text-base truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="font-bold text-black text-sm sm:text-base">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-6 border-t-2 border-gray-300">
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
                <div className="border-t-2 border-gray-300 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg sm:text-xl font-bold text-black">
                      Total
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-black">
                      ₱{getTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
