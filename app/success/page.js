"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    document.title = "Order Success - Steezy";
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-2xl px-4">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-green-500"
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
        <h1 className="text-5xl font-bold mb-6 text-black">
          ORDER SUCCESSFUL!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been placed successfully
          and will be processed shortly.
        </p>
        {orderId && (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="text-2xl font-bold text-black">{orderId}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-semibold transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
          <Link
            href="/"
            className="border-2 border-black text-black hover:bg-black hover:text-white px-10 py-4 text-lg font-semibold transition-colors"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
