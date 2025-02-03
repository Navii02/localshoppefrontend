import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For routing and product ID handling
import { Button, Card, Row, Col,Form } from "react-bootstrap"; // For Bootstrap UI components
import UserHeader from "../../components/UserHeader";
import { ProductDetail,AddtoCart } from "../../service/allApi";
import { url } from "../../service/ServiceUrl";

//import "./ProductDetailsPage.css"; // Custom styling for the page

function ProductDetails() {
    const { id } = useParams(); // Get product ID from URL (if using React Router)
    console.log(id)
    // State for product details and reviews
    const [product, setProduct] = useState({});
    console.log(product);
    
    const [reviews, setReviews] = useState(product.reviews || []); // Existing reviews

    const [newReview, setNewReview] = useState({
      user: "",
      rating: "",
      comment: "",
    }); // State for new review
  
  const fetchProduct = async()=>{
    if(id){
      const result=await ProductDetail(id)
      console.log(result.data);
      if(result.status==200){
        setProduct(result.data)

      }else{
      alert("Something went wrong Please try again later")
      }
      
    }
  }
    useEffect(() => {
      // Simulate fetching product details from an API
     
  
      fetchProduct();
    }, [id]);
  
    const handleAddReview = () => {
      if (!newReview.user || !newReview.rating || !newReview.comment) {
        alert("Please fill out all fields before submitting your review.");
        return;
      }
  
      setReviews([...reviews, newReview]);
      setNewReview({ user: "", rating: "", comment: "" }); // Reset the form

    };
    // Handle Add to Cart action
    const handleAddToCart = async(reqBody) => {
      console.log(reqBody);
      
   
      if(sessionStorage.getItem("token")){
        const token = sessionStorage.getItem("token");
        
        const reqHeader = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // No need for Content-Type with FormData
        };
        console.log(reqHeader);
        
        const result= await AddtoCart(reqBody,reqHeader)
        console.log(result);
        
        //alert("Added to Cart!");
    
      }
     
      
      // You can add more logic here, like adding the product to the cart array in the global state
    };
  
    // Handle Buy Now action
    const handleBuyNow = () => {
      alert("Proceeding to Checkout!");
      // Implement checkout flow here
    };
  
    return (
        <>
        <UserHeader />
        <div className="product-details-page" style={{ marginTop: "100px" }}>
      <Row className="justify-content-center">
        {/* Product Image and Details */}
        <Col md={6} className="product-details-card">
          <Card className="product-card">
          <Card.Img
  variant="top"
  src={product.images && product.images.length > 0 
        ? `${url}/${product.images[0]}` 
        : "https://via.placeholder.com/300"} // Fallback image
  alt={product.productName}
/>
            <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
              <Card.Text><strong>Quantity:</strong> {product.productQuantity}</Card.Text>
              <Card.Text><strong>Expiry Date:</strong> {product.expiryDate}</Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{product.price}{" "}
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  ₹{product.actualPrice}
                </span>
              </Card.Text>
              <Button variant="primary" onClick={(e) =>handleAddToCart(product)}>
                Add to Cart
              </Button>
              <Button
                variant="success"
                onClick={(e) => handleBuyNow(product._id)}
                className="ml-3"
              >
                Buy Now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Product Reviews */}
        <Col md={6}>
          <h3>Customer Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review mb-3">
                <p>
                  <strong>{review.user}</strong> ({review.rating} stars):
                </p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}

          {/* Add Review Form */}
          <h4>Add Your Review</h4>
          <Form>
           
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
              >
                <option value="">Select rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your review here"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
            </Form.Group>
            <Button
              variant="primary"
              className="mt-3"
              onClick={handleAddReview}
            >
              Submit Review
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
        </>
  )
}

export default ProductDetails
