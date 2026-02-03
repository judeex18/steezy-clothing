"use client";

import { useParams } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useState, useEffect } from "react";
import { getProduct } from "../../lib/supabase";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct(parseInt(id));
        setProduct(data);
        setSelectedSize(data.sizes[0] || "");
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback to mock
        const { products: mockProducts } = await import("../../data/products");
        const mockProduct = mockProducts.find((p) => p.id === parseInt(id));
        setProduct(mockProduct);
        if (mockProduct) {
          setSelectedSize(mockProduct.sizes[0] || "");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <img
              src={product.image || product.image_url}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[600px]"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-5xl font-bold mb-4 text-black">
                {product.name}
              </h1>
              <p className="text-4xl font-bold text-black mb-6">
                ₱{product.price.toLocaleString()}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4 text-black">
                SELECT SIZE
              </label>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-center border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-black hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.stock > 0 ? (
                <div className="flex items-center text-green-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">
                    In Stock ({product.stock} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <span className="font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full bg-black hover:bg-gray-800 text-white py-5 text-xl font-bold transition-all duration-300 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
            </button>

            {/* Product Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  <span>Premium quality materials</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Free shipping on orders over ₱2,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
