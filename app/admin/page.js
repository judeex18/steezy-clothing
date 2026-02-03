"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-black text-white px-6 py-3 rounded-full mb-4">
                <h1 className="text-2xl font-bold">STEEZY ADMIN</h1>
              </div>
              <p className="text-gray-600">Sign in to manage your store</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-black"
                  placeholder="admin@steezy.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-black">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-black"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold mb-2">
                First time? Create admin account:
              </p>
              <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                <li>Go to Supabase dashboard</li>
                <li>Authentication → Users → Add User</li>
                <li>Enter email and password</li>
                <li>Login here with those credentials</li>
              </ol>
            </div>

            <div className="mt-4 text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-black">
                ← Back to Store
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">STEEZY ADMIN</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-black">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/products"
            className="block p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2 text-black">Products</h2>
            <p className="text-gray-600">Manage your product catalog</p>
          </Link>
          <Link
            href="/admin/orders"
            className="block p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold mb-2 text-black">Orders</h2>
            <p className="text-gray-600">View and process customer orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
