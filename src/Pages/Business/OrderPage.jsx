import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessHeader from "../../components/BusinessHeader";
import { Orderdetails } from "../../service/allApi";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch orders from API
  const OrderDetails = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await Orderdetails(reqHeader);
      if (response.status === 200) {
        setOrders(response.data.orders); // Accessing the "orders" array
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    OrderDetails();
  }, []);

  // Filter orders based on search query (by address or product ID as placeholder)
  const filteredOrders = orders.filter(
    (order) =>
      order.address.toLowerCase().includes(search.toLowerCase()) ||
      order.productId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <BusinessHeader />
      <div className="container mx-auto p-4" style={{ marginTop: "50px" }}>
        <h2 className="text-2xl font-semibold mb-4">Ordered Products</h2>
        <input
          type="text"
          placeholder="Search by address or product ID..."
          className="p-2 border rounded w-full mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Product ID</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Payment Merthod</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Customer Address</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">{order.productId}</td>
                  <td className="border p-2">{order.productName}</td>
                  <td className="border p-2">{order.paymentMethod}</td>
                  <td className="border p-2">${order.amount}</td>
                  <td className="border p-2">{order.address}</td>
                  <td
                    className={`border p-2 ${
                      order.status === "Delivered" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-2 text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderPage;
