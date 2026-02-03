import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group h-full flex flex-col">
        <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64 bg-gray-100">
          <Image
            src={product.image || product.image_url || "/placeholder.jpg"}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
            unoptimized
          />
          {product.stock <= 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              SOLD OUT
            </div>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              LOW STOCK
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 lg:p-6 flex-grow flex flex-col">
          <div className="mb-2">
            <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide">
              {product.category || "Fashion"}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-black mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors min-h-[3rem]">
            {product.name}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl sm:text-2xl font-bold text-black">
              ₱{product.price.toLocaleString()}
            </span>

            <div className="flex items-center">
              {product.stock > 0 ? (
                <span className="text-xs sm:text-sm text-green-600 font-medium">
                  In Stock
                </span>
              ) : (
                <span className="text-xs sm:text-sm text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          <button className="mt-4 w-full bg-black text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base opacity-0 group-hover:opacity-100">
            VIEW DETAILS
          </button>
        </div>
      </div>
    </Link>
  );
}
