import { useEffect, useState } from "react";
import { getreviews } from "../../service/allApi";
import "./ProductReviews.css"; 
import { url } from "../../service/ServiceUrl";
import BusinessHeader from "../../components/BusinessHeader";

function ProductReviews() {
  const [products, setProducts] = useState([]);

  const fetchReviews = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { 'Authorization': `Bearer ${token}` };

    try {
      const result = await getreviews(reqHeader);
      if (result.status === 200) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
    <BusinessHeader/>
    <div className="reviews-container">
      <h2 className="reviews-title">Product Reviews</h2>
      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {product.images.length > 0 && (
                <img src={`${url}/${product.images[0]}`} alt={product.productName} className="product-image" />
              )}
              <div className="product-details">
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-description">{product.description}</p>
                <h4 className="reviews-heading">Reviews:</h4>
                {product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <p className="review-name">UserName:<strong>{review.name}</strong></p>
                      <p className="review-comment">User Comment:{review.comment}</p>
                      <p className="review-rating">⭐ {review.rating}/5</p>
                    </div>
                  ))
                ) : (
                  <p className="no-reviews">No reviews yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default ProductReviews;
