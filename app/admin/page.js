"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Login Required</h1>
        <p>Please log in to access the admin dashboard.</p>
        {/* Add login form here or redirect */}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/products"
          className="block p-6 border rounded-lg hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">Manage Products</h2>
          <p>View and edit product listings</p>
        </Link>
        <Link
          href="/admin/orders"
          className="block p-6 border rounded-lg hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">Manage Orders</h2>
          <p>View and process customer orders</p>
        </Link>
      </div>
    </div>
  );
}
