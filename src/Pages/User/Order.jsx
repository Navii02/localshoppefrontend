import React, { useState, useEffect } from "react";
import UserHeader from '../../components/UserHeader'
import { Table, Container, Spinner } from "react-bootstrap";
import { getUserOrdersApi } from "../../service/allApi";

function Order() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await getUserOrdersApi(reqHeader);
        if (result.status === 200) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <Spinner animation="border" variant="primary" />
        <p>Loading your orders...</p>
      </div>
    );
  }

  // Function to format the delivery date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
 
   
    return `${formattedDate} `;
  };

  return (
    <>
      <UserHeader />
      <Container className="orders-container">
        <h2 className="text-center mt-4 mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <Table striped bordered hover responsive className="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Delivery Date</th>
                <th>Expected Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <span
                      className={`status-badge status-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.deliveryDate
                      ? formatDate(order.deliveryDate)
                      : "Not Assigned"}
                  </td>
                  <td>{order.DeliveryTime}</td>
                </tr>
              
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default Order;
