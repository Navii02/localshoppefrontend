import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { url } from "../service/ServiceUrl";
import { removeFromCartApi } from "../service/allApi";
import { useNavigate } from "react-router-dom";

const CartCard = ({ product,setDeleteStatus}) => {
    const navigate= useNavigate()
    const handleRemoveFromCart = async (productId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
          const reqHeader = {
            "Content-Type": "application/json",
           ' Authorization': `Bearer ${token}`,
          };
          const result = await removeFromCartApi(productId, reqHeader);
          if (result.status === 200) {
            alert("Item removed from cart!");
            setDeleteStatus(result)
            //setCartItems(cartItems.filter((item) => item._id !== productId));
          }else{
            alert("Something went wrong")
          }
        }
      };
      const handleBuyNow =(productId)=>{
        navigate(`/payment/${productId}`)
      }
  return (
    <Card className="mb-4 shadow-sm" style={{ borderRadius: "15px" }}>
      <Row className="g-0">
        {/* Product Image */}
        <Col md={4} className="d-flex align-items-center">
          <Card.Img
            src={product.images && product.images.length > 0
                  ? `${url}/${product.images[0]}`
                  : "https://via.placeholder.com/150"} // Fallback image
            alt={product.productName}
            className="img-fluid rounded-start"
            style={{ height: "150px", objectFit: "cover", borderRadius: "15px 0 0 15px" }}
          />
        </Col>

        {/* Product Details */}
        <Col md={8}>
          <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text>
              <strong>Price:</strong> ₹{product.price} <br />
              <strong>Quantity:</strong> {product.productQuantity} <br />
              <strong>Description:</strong> {product.description}
            </Card.Text>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
            <Button variant="success" onClick={() => handleBuyNow(product._id)}>
                Buy Now
              </Button>
              <Button variant="danger" onClick={() => handleRemoveFromCart(product._id)}>
                Remove from Cart
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CartCard;
