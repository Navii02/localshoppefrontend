import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import { url } from "../../service/ServiceUrl";
import { getUserDetailsApi, ProductDetail, orderPlacement } from "../../service/allApi";
import UserHeader from "../../components/UserHeader";
import "./PaymentPage.css"; // Import the CSS file

const PaymentPage = () => {
  const { productId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [isLoading, setIsLoading] = useState(true);
  const [expectedDeliveryTime, setExpectedDeliveryTime] = useState(""); 

  

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

  const user = JSON.parse(sessionStorage.getItem("userdetails"));
  const userId = user._id;
  const cartusers = selectedProduct?.Cart?.find((item) => item.cartuserId === userId);
  const deliveryMinutes = parseInt(selectedProduct?.expectedDeliveryTime, 10);
  const loadRazorpay = (callback) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  };

  const saveOrderDetails = async (paymentId) => {
    const currentTime = new Date();
    const deliveryTime = new Date(currentTime);
    
    deliveryTime.setMinutes(currentTime.getMinutes() + deliveryMinutes);
    const hours = deliveryTime.getHours();
    const minutes = deliveryTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    
    const orderData = {
      userId: userDetails?._id,
      productId: selectedProduct?._id,
      productName: selectedProduct?.productName,
      quantity: cartusers.quantity,
      address,
      paymentMethod,
      paymentId,
      amount: selectedProduct?.price*cartusers.quantity,
      DeliveryTime:formattedTime
    };
    const result = await orderPlacement(orderData);
    console.log(result);
    
    if (result.status == 200) {
      alert("Order Placement Successful");
      setTimeout(() => {
        window.location.href = `/productsdetail/${selectedProduct?._id}`;
      }, 2000); // 3000 milliseconds = 3 seconds
      
  
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
        key: "rzp_test_u6jpbBOb4nAtXs",
        amount: selectedProduct.price *cartusers.quantity* 100,
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
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!selectedProduct) {
    return <div className="text-center mt-5">Product not found.</div>;
  }

  return (
    <>
      <UserHeader />
      <Container className="payment-container">
        <h2 className="payment-title">Payment Details</h2>
        <Row>
          <Col md={6}>
            <Card className="payment-card">
              <Card.Img
                src={
                  selectedProduct.images?.length
                    ? `${url}/${selectedProduct.images[0]}`
                    : "https://via.placeholder.com/150"
                }
                alt={selectedProduct.productName}
              />
              <Card.Body>
                <Card.Title className="payment-card-title">{selectedProduct.productName}</Card.Title>
                <Card.Text className="payment-card-text">
                  <strong>Price:</strong> ₹{selectedProduct.price} <br />
                  <strong>Quantity:</strong> {cartusers?.quantity} <br />
                  <strong>Description:</strong> {selectedProduct.description}
                  <h4>Total :{selectedProduct.price*cartusers?.quantity}</h4>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="payment-card">
              <Card.Body className="payment-form">
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
                <Form.Group className="payment-method-group">
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

                <Button className="payment-button" onClick={handlePayment}>
                  Confirm Payment
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentPage;
