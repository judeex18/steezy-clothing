import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            console.error("Image failed to load:", product.image);
            e.target.style.display = "none";
          }}
          onLoad={(e) => {
            console.log("Image loaded successfully:", product.image);
          }}
        />
        {product.stock <= 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            SOLD OUT
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
            {product.category || "Fashion"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-black mb-2 line-clamp-2 hover:text-gray-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-black">
            ₱{product.price.toLocaleString()}
          </span>

          <div className="flex items-center space-x-1">
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 font-medium">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-sm text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-all duration-300 hover:shadow-lg"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}
