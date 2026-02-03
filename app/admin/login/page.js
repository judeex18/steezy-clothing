"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/admin/products");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Admin Login</h1>
            <p className="text-gray-600">
              Sign in to manage your Steezy store
            </p>
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
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-semibold mb-2">
              First time setup?
            </p>
            <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
              <li>Go to your Supabase dashboard</li>
              <li>Click on "Authentication" → "Users"</li>
              <li>Click "Add User" → "Create new user"</li>
              <li>Enter email and password</li>
              <li>Use those credentials to login here</li>
            </ol>
          </div>

          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
