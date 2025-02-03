import './UserCard.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { url } from '../service/ServiceUrl';
import { Whishlistapi } from '../service/allApi';


function UserCards({ products }) {
    const [isLiked, setIsLiked] = useState(false); // State to track the like status
    const navigate = useNavigate(); // Initialize navigate

    // Handle the heart click to toggle the like status
    const handleHeartClick = async(e) => {
        //e.stopPropagation(); // Prevent triggering card click
        if(isLiked){
            setIsLiked(false); 

        }else{
            setIsLiked(true); 
            if(sessionStorage.getItem('token')){
                const token = sessionStorage.getItem('token');
                const reqHeader = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  }
                  const result = await Whishlistapi(products,reqHeader)
                  console.log(result);
                  
            }

        }
        // Toggle the state value
    };

    // Handle card click to navigate to product details page
    const handleCardClick = (e) => {
        if(sessionStorage.getItem('token')){
            //console.log(products._id );
            const productId=products._id;
            navigate(`/productsdetail/${productId}`);; 
        }else
        {
            navigate('/login')
        }
       
        
      // Navigate to the product details page
    };

    return (
        <div className="product-card" > {/* Add onClick event */}
            <div className="product-image-container">
                <img
                    src={`${url}/${products.images[0]}`}
                    alt="product"
                    className="product-image"
                />
                <FontAwesomeIcon
                    icon={faHeart}
                    className={`heart-icon ${isLiked ? 'liked' : ''}`} // Add class based on like status
                    onClick={(e)=>{handleHeartClick(products)}} // Add onClick handler to toggle the state
                />
            </div>
            <div className="product-card-body"onClick={()=>handleCardClick(products)}>
                <div className="product-title">{products.productName}</div>
                <div className="product-price">
                    <span className="current-price">Rs {products.price}</span>
                    <span className="old-price">Rs {products.actualPrice}</span>
                </div>
                <div className="product-rating">
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                    <span className="rating-score">4.5</span>
                    <span className="rating-reviews">(100 reviews)</span>
                </div>
            </div>
        </div>
    );
}

export default UserCards;
