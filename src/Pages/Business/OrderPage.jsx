import  { useEffect, useState } from "react";
import BusinessHeader from "../../components/BusinessHeader";
import { Orderdetails } from "../../service/allApi";
import "./OrderPage.css"; // Import CSS file

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

  // Filter orders based on search query (by address or product ID)
  const filteredOrders = orders.filter(
    (order) =>
      order.address.toLowerCase().includes(search.toLowerCase()) ||
      order.productId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <BusinessHeader />
      <div className="order-container">
        <div className="order-box">
          <h2 className="order-title">📦 Ordered Products</h2>

          {/* Search Input */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search by address or product ID..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Payment Method</th>
                  <th>Price</th>
                  <th>Customer Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.productId}</td>
                      <td>{order.productName}</td>
                      <td>{order.paymentMethod}</td>
                      <td className="price">${order.amount}</td>
                      <td>{order.address}</td>
                      <td className={order.status === "Delivered" ? "delivered" : "pending"}>
                        {order.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-orders">❌ No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
