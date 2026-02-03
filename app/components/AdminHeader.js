"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const [orderCount, setOrderCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadOrderCount();
  }, []);

  const loadOrderCount = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("id", { count: "exact" });
      if (!error && data) {
        setOrderCount(data.length);
      }
    } catch (error) {
      console.error("Error loading order count:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  return (
    <header className="bg-black text-white shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link href="/admin" className="flex items-center mr-auto">
            <img
              src="/logo.png"
              alt="STEEZY Admin"
              className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Right side - Orders and Logout */}
          <div className="flex items-center gap-4">
            {/* Orders Icon */}
            <Link href="/admin/orders" className="relative">
              <svg
                className="w-6 h-6 hover:text-gray-300 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {orderCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {orderCount}
                </span>
              )}
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
