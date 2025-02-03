import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import { url } from "../../service/ServiceUrl";
import { getUserDetailsApi, ProductDetail,orderPlacement } from "../../service/allApi";

const PaymentPage = () => {
  const { productId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await getUserDetailsApi(reqHeader);
        if (result.status === 200) {
          setUserDetails(result.data);
          setAddress(result.data.location?.address || "");
        }
      }
    };

    const fetchProductDetails = async () => {
      const result = await ProductDetail(productId);
      if (result.status === 200) {
        setSelectedProduct(result.data);
        setIsLoading(false);
      } else {
        alert("Failed to fetch product details.");
      }
    };

    fetchUserDetails();
    fetchProductDetails();
  }, [productId]);

  const loadRazorpay = (callback) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  };
  const saveOrderDetails = async (paymentId) => {
    const orderData = {
      userId: userDetails?._id,
      productId: selectedProduct?._id,
      productName:selectedProduct?.productName,
      address,
      paymentMethod,
      paymentId,
      amount: selectedProduct?.price,
    };
    const result = await orderPlacement(orderData);
 if(result.status ==200){
  alert('Order Placement Successfull ')
  
 }
    
  };
  const handlePayment = async () => {
    if (!address || !paymentMethod) {
      alert("Please fill in all details.");
      return;
    }

    if (paymentMethod === "Cash On Delivery") {
      await saveOrderDetails("COD");
      return;
    }

    loadRazorpay(() => {
      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: selectedProduct.price * 100,
        currency: "INR",
        name: "Your Store Name",
        description: `Payment for ${selectedProduct.productName}`,
        image: "your_logo_url",
        handler: function (response) {
          saveOrderDetails(response.razorpay_payment_id);
        },
        prefill: {
          name: userDetails?.name || "",
          email: userDetails?.email || "",
          contact: userDetails?.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }

  return (
    <Container>
      <h2 className="text-center mt-5">Payment Details</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Img
              src={
                selectedProduct.images?.length
                  ? `${url}/${selectedProduct.images[0]}`
                  : "https://via.placeholder.com/150"
              }
              alt={selectedProduct.productName}
              style={{ height: "150px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{selectedProduct.productName}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ₹{selectedProduct.price} <br />
                <strong>Quantity:</strong> {selectedProduct.productQuantity}{" "}
                <br />
                <strong>Description:</strong> {selectedProduct.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Shipping Address</h5>
              <Form.Group controlId="formAddress">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your shipping address"
                />
              </Form.Group>

              <h5 className="mt-3">Payment Method</h5>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Credit Card / Debit Card / UPI"
                  name="paymentMethod"
                  value="Online Payment"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  checked={paymentMethod === "Online Payment"}
                />
                <Form.Check
                  type="radio"
                  label="Cash On Delivery"
                  name="paymentMethod"
                  value="Cash On Delivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  checked={paymentMethod === "Cash On Delivery"}
                />
              </Form.Group>

              <Button
                variant="primary"
                className="mt-4"
                onClick={handlePayment}
              >
                Confirm Payment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
