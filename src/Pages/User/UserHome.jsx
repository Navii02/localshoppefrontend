import React, { useEffect, useState } from "react";
import UserCards from "../../components/UserCards";
import UserFooter from "../../components/UserFooter";
import UserHeader from "../../components/UserHeader";
import Carousel from "react-bootstrap/Carousel";
import "./UserHome.css"; // Custom CSS file for styling
import LocationModal from "../../components/LocationModal";
import { project } from "../../service/allApi";

function UserHome() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        const userLocation = sessionStorage.getItem("savedLocation");

        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: userLocation ? { location: userLocation } : {},
        };
        console.log(requestOptions);

        const result = await project(requestOptions);
        setProducts(result.data.products || []);
        setFilteredProducts(result.data.products || []); // Initially set filtered products to all products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products whenever the search term changes
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <>
      <div className="position-relative">
        {/* Header */}
        <UserHeader setSearchTerm={setSearchTerm} />
        {/* Carousel */}
        <Carousel className="custom-carousel" style={{ marginTop: "88px" }}>
          <Carousel.Item interval={2000}>
            <div className="carousel-overlay">
              <img
                className="d-block w-100 custom-carousel-image"
                src="https://blog.hubspot.com/hubfs/ecommerce-10.jpg"
                alt="First slide"
              />
              <div className="carousel-caption-custom">
                <h2>Discover the Latest Trends</h2>
                <p>Shop the best products for your lifestyle.</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <div className="carousel-overlay">
              <img
                className="d-block w-100 custom-carousel-image"
                src="https://th.bing.com/th/id/OIP.eRgaZTkTMAQaaiqkJwUy5wAAAA?w=450&h=300&rs=1&pid=ImgDetMain"
                alt="Second slide"
              />
              <div className="carousel-caption-custom">
                <h2>Unbeatable Deals</h2>
                <p>Find exclusive discounts and offers here.</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <div className="carousel-overlay">
              <img
                className="d-block w-100 custom-carousel-image"
                src="https://wallpaperaccess.com/full/2593068.jpg"
                alt="Third slide"
              />
              <div className="carousel-caption-custom">
                <h2>Elevate Your Shopping Experience</h2>
                <p>Explore a variety of products for every need.</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>

        {/* Cards Section */}
        <div className="container my-5">
          <h2 className="text-center mb-4">Featured Products</h2>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : filteredProducts?.length > 0 ? (
            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                  <UserCards products={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No products available</p>
          )}
        </div>

        {/* Footer */}
        <UserFooter />
      </div>

      {/* Location Modal */}
      <div className="position-absolute location-modal">
        <LocationModal />
      </div>
    </>
  );
}

export default UserHome;
