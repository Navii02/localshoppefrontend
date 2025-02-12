/* eslint-disable react/prop-types */
import { Card, Button } from "react-bootstrap";
import { url } from "../service/ServiceUrl";
import { removeFromCartApi, updateCartQuantityApi } from "../service/allApi";
import { useNavigate } from "react-router-dom";
import "./CartCard.css";

const CartCard = ({ product, setDeleteStatus }) => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("userdetails"));
  const userId = user._id;
  const userCartItem = product.Cart.find((item) => item.cartuserId === userId);

  // Handle Increment Quantity
// Handle Increment Quantity
const handleIncrementQuantity = async (productId, event) => {
  event.stopPropagation();

  const currentQuantity = Number(userCartItem?.quantity) || 0; // Convert to number
  const maxQuantity = Number(product.productQuantity); // Convert to number
  
  if (currentQuantity >= maxQuantity) {
    alert("Product is not available");
    return;
  }

  const updatedQuantity = currentQuantity + 1;

  const token = sessionStorage.getItem("token");
  if (token) {
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const reqBody = { 
      productId, 
      userId, 
      updatedQuantity 
    };

    try {
      const result = await updateCartQuantityApi(reqBody, reqHeader);

      if (result.status === 200) {
        alert("Quantity updated!");
        setDeleteStatus(result); // To trigger a re-render with the new quantity
      } else {
        alert("Something went wrong while updating quantity.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  }
};

// Handle Decrement Quantity
const handleDecrementQuantity = async (productId, event) => {
  event.stopPropagation();

  const currentQuantity = Number(userCartItem?.quantity) || 0; // Convert to number
  
  if (currentQuantity <= 1) {
    alert("Minimum quantity is 1");
    return;
  }

  const updatedQuantity = currentQuantity - 1;

  const token = sessionStorage.getItem("token");
  if (token) {
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const reqBody = { 
      productId, 
      userId, 
      updatedQuantity 
    };

    try {
      const result = await updateCartQuantityApi(reqBody, reqHeader);

      if (result.status === 200) {
        alert("Quantity updated!");
        setDeleteStatus(result); // To trigger a re-render with the new quantity
      } else {
        alert("Something went wrong while updating quantity.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  }
};


  const handleRemoveFromCart = async (productId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await removeFromCartApi(productId, reqHeader);
      if (result.status === 200) {
        alert("Item removed from cart!");
        setDeleteStatus(result);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleBuyNow = (productId, event) => {
    event.stopPropagation();
    if (userCartItem?.quantity > product.productQuantity) {
      alert("Product is not available");
    } else {
      navigate(`/payment/${productId}`);
    }
  };

  const handleRemove = (productId, event) => {
    event.stopPropagation();
    handleRemoveFromCart(productId);
  };

  const handleCardClick = () => {
    if (sessionStorage.getItem("token")) {
      navigate(`/productsdetail/${product._id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Card className="cart-card" onClick={handleCardClick}>
      <div className="cart-image-container">
        <Card.Img
          src={
            product.images && product.images.length > 0
              ? `${url}/${product.images[0]}`
              : "https://via.placeholder.com/150"
          }
          alt={product.productName}
          className="cart-image"
        />
      </div>
      <div className="cart-details">
        <Card.Body>
          <Card.Title className="cart-title">{product.productName}</Card.Title>
          <Card.Text className="cart-text">
            <strong>Price:</strong> ₹{product.price} <br />
            <strong>Quantity:</strong>{" "}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={(event) => handleDecrementQuantity(product._id, event)}
            >
              -
            </Button>{" "}
            {userCartItem?.quantity || 0}{" "}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={(event) => handleIncrementQuantity(product._id, event)}
            >
              +
            </Button>{" "}
            <br />
            <strong>Description:</strong> {product.description} <br />
            <strong>Expected Delivery Time:</strong>{" "}
            {product?.expectedDeliveryTime} mins
          </Card.Text>

          <div className="cart-buttons">
            <Button
              variant="outline-success"
              className="cart-button"
              onClick={(event) => handleBuyNow(product._id, event)}
            >
              Buy Now
            </Button>
            <Button
              variant="outline-danger"
              className="cart-button"
              onClick={(event) => handleRemove(product._id, event)}
            >
              Remove
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CartCard;
