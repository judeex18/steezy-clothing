"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, getOrders, updateOrderStatus } from "../../lib/supabase";

export default function AdminOrders() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  useEffect(() => {
    document.title = "Admin Orders - Steezy";
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await loadOrders();
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await loadOrders();
      setUpdatingOrder(null);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status. Please try again.");
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
}

return (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.push("/admin")}
        className="mb-6 flex items-center text-gray-600 hover:text-black transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-6 text-black">Order Management</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Payment Method</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.customer_name}</td>
                  <td className="border p-2">
                    ₱{order.total_amount.toLocaleString()}
                  </td>
                  <td className="border p-2">{order.payment_method}</td>
                  <td className="border p-2">
                    {updatingOrder === order.id ? (
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order.id, e.target.value)
                        }
                        className="border p-1 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "shipped"
                                ? "bg-purple-100 text-purple-800"
                                : order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() =>
                        setUpdatingOrder(
                          updatingOrder === order.id ? null : order.id,
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      {updatingOrder === order.id ? "Cancel" : "Update Status"}
                    </button>
                    <button
                      onClick={() =>
                        setViewingOrder(
                          viewingOrder === order.id ? null : order.id,
                        )
                      }
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      {viewingOrder === order.id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                  </td>
                </tr>
                {viewingOrder === order.id && (
                  <tr>
                    <td colSpan="6" className="border p-4 bg-gray-50">
                      <div>
                        <h4 className="font-semibold mb-2">Order Items:</h4>
                        <div className="space-y-2">
                          {order.order_items?.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4 p-2 bg-white rounded"
                            >
                              <img
                                src={
                                  item.products?.image_url || "/placeholder.jpg"
                                }
                                alt={item.products?.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium">
                                  {item.products?.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Size: {item.size} | Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-semibold">
                                ₱{item.price.toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-2 border-t">
                          <p>
                            <strong>Address:</strong> {order.address}
                          </p>
                          <p>
                            <strong>Order Date:</strong>{" "}
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
