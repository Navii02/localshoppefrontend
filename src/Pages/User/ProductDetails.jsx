import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Row, Col, Form, Container, Carousel } from "react-bootstrap";
import UserHeader from "../../components/UserHeader";
import { ProductDetail, AddtoCart, addreview } from "../../service/allApi";
import { url } from "../../service/ServiceUrl";
import "./ProductDetails.css";  

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const user = JSON.parse(sessionStorage.getItem('userdetails'));
  const [quantity, setQuantity] = useState(1); 
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user: user.username,
    rating: "",
    comment: "",
  });
  const [expectedDeliveryTime, setExpectedDeliveryTime] = useState(""); 

  const navigate = useNavigate();
  const userId = user._id;
  
  const fetchProduct = async () => {
    if (id) {
      const result = await ProductDetail(id);
      if (result.status === 200) {
        setProduct(result.data);
        setReviews(result.data.reviews || []);

        // Calculate Expected Delivery Time
        const currentTime = new Date();
        const deliveryTime = new Date(currentTime);
        const deliveryMinutes = parseInt(result.data.expectedDeliveryTime, 10);

        deliveryTime.setMinutes(
          currentTime.getMinutes() + deliveryMinutes
        );
        const hours = deliveryTime.getHours();
        const minutes = deliveryTime.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedTime = `${hours % 12 || 12}:${minutes
          .toString()
          .padStart(2, "0")} ${ampm}`;
        setExpectedDeliveryTime(formattedTime);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddReview = async () => {
    if (!newReview.rating && !newReview.comment) {
      alert("Please fill out all fields before submitting your review.");
      return;
    }
    const result = await addreview(id, newReview);
    if (result.status === 200) {
      setReviews([...reviews, newReview]);
      setNewReview({ user: user.username, rating: "", comment: "" });
      alert("Rating added successfully");
    }
  };

  const handleBuyNow = (productId) => {
    if (product.productQuantity < quantity) {
      alert("Sorry, the product is not available");
    } else {
      handleAddToCart()
      navigate(`/payment/${productId}`);
    }
  };

  const handleAddToCart = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const cartItem = { ...product, quantity }; 
      const result = await AddtoCart(cartItem, reqHeader);
      if (result.status === 200) {
        alert("Item added to cart successfully");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <UserHeader />
      <Container className="product-details-page mt-5">
        <Row className="justify-content-center">
          <Col md={6} xs={12} className="mb-4">
            <Card className="shadow-lg product-card">
              {/* Image Slideshow */}
              <Carousel>
                {product.images && product.images.length > 1 ? (
                  product.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 product-image"
                        src={`${url}/${image}`}
                        alt={`Slide ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Card.Img
                    variant="top"
                    src={product.images?.length > 0 
                      ? `${url}/${product.images[0]}` 
                      : "https://via.placeholder.com/300"}
                    alt={product.productName}
                    className="product-image"
                  />
                )}
              </Carousel>
              <Card.Body className="product-details">
                <Card.Title className="product-title">{product.productName}</Card.Title>
                <Card.Text className="text-muted">{product.description}</Card.Text>
                <Card.Text><strong>Expiry Date:</strong> {product.expiryDate}</Card.Text>
                <Card.Text>
                  <span className="product-price">₹{product.price}</span>{" "}
                  <span className="product-actual-price">₹{product.actualPrice}</span>
                </Card.Text>
                <Card.Text>
                  <strong>Expected Delivery Time:</strong> {expectedDeliveryTime}
                </Card.Text>

                <div className="quantity-selector mb-3">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    −
                  </Button>
                  <span className="quantity-value">{quantity}</span>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </Button>
                </div>

                <div className="button-group">
                  <Button variant="primary" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button variant="success" onClick={() => handleBuyNow(product._id)}>
                    Buy Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetails;
