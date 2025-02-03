import { useEffect, useState } from "react";
import UserHeader from "../../components/UserHeader";
import WishlistCard from "../../components/WishlistCard";
import { getwishlistapi } from "../../service/allApi";

function Wishlist() {
  const [products, setProducts] = useState([]); // Use array as the initial state
  console.log(products);
  
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
          setProducts(result.data); // Update state with fetched wishlist products
        } else {
          console.error("Failed to fetch wishlist data.");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
  };

  useEffect(() => {
    getWishlist(); // Fetch wishlist on component mount
  }, []);

  return (
    <>
      <UserHeader />
      <div className="container mt-5">
        <div className="row g-4">
          {products.length > 0 ? (
            products?.map((product) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <WishlistCard product={product} /> {/* Pass individual product */}
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
