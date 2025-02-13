/* eslint-disable react/prop-types */
import "./UserCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../service/ServiceUrl";
import { Whishlistapi, RemoveFromWishlistApi } from "../service/allApi";

function UserCards({ products }) {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const userDetails = JSON.parse(sessionStorage.getItem("userdetails"));
    const currentUserId = userDetails?._id;

    useEffect(() => {
        setIsLiked(products.WishlistUserId?.includes(currentUserId));
    }, [products, currentUserId]);

    const getAverageRating = () => {
        if (!products.reviews || products.reviews.length === 0) return 0;
        const totalRating = products.reviews.reduce((sum, review) => sum + parseFloat(review.rating || 0), 0);
        return (totalRating / products.reviews.length).toFixed(1);
    };

    const averageRating = getAverageRating();
    const isOutOfStock = products.productQuantity == 0;

    const handleHeartClick = async (e) => {
        e.stopPropagation();
        if (!currentUserId) {
            alert("Please login first");
            return;
        }

        setIsLiked((prev) => !prev);

        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            if (!isLiked) {
                const result = await Whishlistapi(products, reqHeader);
                if (result.status !== 200) setIsLiked(false);
            } else {
                const reqBody = { productId: products._id };
                const result = await RemoveFromWishlistApi(reqBody, reqHeader);
                if (result.status !== 200) setIsLiked(true);
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
            setIsLiked(!isLiked);
        }
    };

    const handleCardClick = () => {
        if (isOutOfStock) return; // Prevent navigation if out of stock
        if (sessionStorage.getItem("token")) {
            if(sessionStorage.getItem("savedLocation")){
            navigate(`/productsdetail/${products._id}`);
            }
            else{
                alert("Please Select the location")
            }
        } else {
            navigate("/login");
        }
    };

    return (
        <div className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`} onClick={handleCardClick}>
            <div className="product-image-container">
                <img src={`${url}/${products.images[0]}`} alt={products.productName} className="product-image" />
                {isOutOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
                <FontAwesomeIcon
                    icon={faHeart}
                    className={`heart-icon ${isLiked ? "liked" : ""}`}
                    onClick={handleHeartClick}
                />
            </div>
            <div className="product-card-body">
                <h3 className="product-title">{products.productName}</h3>
                <div className="product-price">
                    <span className="current-price">₹{products.price}</span>
                    <span className="old-price">₹{products.actualPrice}</span>
                </div>
                <div className="product-rating">
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                    <span className="rating-score">{averageRating}</span>
                    <span className="rating-reviews">({products.reviews?.length || 0} reviews)</span>
                </div>
            </div>
        </div>
    );
}

export default UserCards;
