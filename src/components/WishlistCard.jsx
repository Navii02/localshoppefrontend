import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { url } from '../service/ServiceUrl';

function WishlistCard({product}) {
    const navigate = useNavigate(); // Initialize navigate

    // Handle card click to navigate to product details page
    const handleCardClick = () => {
        navigate(`/productsdetail`,{ productId: product._id } ); // Pass product ID as state
    };
  return (
    <div>
       <div className="product-card">
            <div className="product-image-container">
                <img
                     src={`${url}/${product.images[0]}`}
                    alt="product"
                    className="product-image"
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className="trash-icon" // Styling for the trash icon
                     // Remove item on click
                />
            </div>
            <div className="product-card-body" >
                <div className="product-title">{product.productName}</div>
                <div className="product-price">
                    <span className="current-price">Rs {product.price}</span>
                    <span className="old-price">Rs {product.actualPrice}</span>
                </div>
                <div className="product-rating" onClick={handleCardClick}>
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                    <span className="rating-score">4.5</span>
                    <span className="rating-reviews">(100 reviews)</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WishlistCard
