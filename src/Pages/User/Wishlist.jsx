import { useEffect, useState } from "react";
import UserHeader from "../../components/UserHeader";

import { getwishlistapi } from "../../service/allApi";
import "./Wishlist.css"; // Import CSS for better styling
import UserCards from "../../components/UserCards";

function Wishlist() {
  const [products, setProducts] = useState([]); // Use array as the initial state

  // Fetch wishlist items
  const getWishlist = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getwishlistapi(reqHeader);
        if (result.status === 200) {
          setProducts(result.data);
        } else {
          console.error("Failed to fetch wishlist data.");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <UserHeader />
      <div className="wishlist-container">
        <h2 className="wishlist-title">Your Wishlist ❤️</h2>
        {products.length > 0 ? (
          <div className="wishlist-grid">
            {products.map((product) => (
              <UserCards key={product._id} products={product} />
            ))}
          </div>
        ) : (
          <p className="empty-wishlist-text">Your wishlist is empty 😢</p>
        )}
      </div>
    </>
  );
}

export default Wishlist;
