"use client";

import { useEffect, useState } from "react";
import {
  supabase,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../../lib/supabase";

export default function AdminProducts() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
    category: "",
    sizes: [],
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await loadProducts();
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "sizes") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((s) => s.trim()),
      });
    } else if (name === "stock") {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        const uploadData = await uploadProductImage(imageFile);
        imageUrl = supabase.storage
          .from("products")
          .getPublicUrl(uploadData.path).data.publicUrl;
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        image_url: imageUrl,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }

      await loadProducts();
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        price: "",
        image_url: "",
        description: "",
        category: "",
        sizes: [],
        stock: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image_url: product.image_url,
      description: product.description,
      category: product.category || "",
      sizes: product.sizes,
      stock: product.stock.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product. Please try again.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Login Required</h1>
        <p>Please log in to access the admin dashboard.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin - Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleFormChange}
              required
              step="0.01"
              className="border p-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma separated)"
              value={formData.sizes.join(", ")}
              onChange={handleFormChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleFormChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={handleFormChange}
              required
              min="0"
              className="border p-2 rounded"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleFormChange}
            required
            className="w-full border p-2 rounded mt-4"
            rows="3"
          />
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">
                  ₱{product.price.toLocaleString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
