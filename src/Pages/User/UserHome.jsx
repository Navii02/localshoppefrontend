import { useEffect, useState } from "react";
import UserCards from "../../components/UserCards";
import UserFooter from "../../components/UserFooter";
import UserHeader from "../../components/UserHeader";
import Carousel from "react-bootstrap/Carousel";
import LocationModal from "../../components/LocationModal";
import { project } from "../../service/allApi";
import "./UserHome.css";

function UserHome() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [locationstatus, setLocationStatus] = useState("");

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

        const result = await project(requestOptions);
        setProducts(result.data.products || []);
        setFilteredProducts(result.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [locationstatus]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const productNameMatch = product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch = product.Category
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const categoryFilter =
        selectedCategory === "All" || product.Category === selectedCategory;

      return (productNameMatch || categoryMatch) && categoryFilter;
    });

    setFilteredProducts(filtered);
  };

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.Category)),
  ];

  return (
    <>
      <div className="user-home">
        <UserHeader setSearchTerm={setSearchTerm} />

        <Carousel className="custom-carousel">
          <Carousel.Item interval={2500}>
            <img
              className="d-block w-100"
              src="https://blog.hubspot.com/hubfs/ecommerce-10.jpg"
              alt="Trendy Products"
            />
          </Carousel.Item>
          <Carousel.Item interval={2500}>
            <img
              className="d-block w-100"
              src="https://th.bing.com/th/id/OIP.eRgaZTkTMAQaaiqkJwUy5wAAAA?w=450&h=300&rs=1&pid=ImgDetMain"
              alt="Exclusive Deals"
            />
          </Carousel.Item>
        </Carousel>

        <div className="content-container">
          {/* Category Sidebar */}
          <div className="category-sidebar">
            <h4>Categories</h4>
            <ul>
              {allCategories.map((category) => (
                <li
                  key={category}
                  className={
                    selectedCategory === category ? "active" : ""
                  }
                  onClick={() => handleCategorySelection(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Product Section */}
          <div className="product-section">
            <h2 className="section-title">Products</h2>
            {loading ? (
              <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : filteredProducts.length > 0 ? (
              <div className="row g-4">
                {filteredProducts.map((product) => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3"
                    key={product._id}
                  >
                    <UserCards products={product} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No products available</p>
            )}
          </div>
        </div>

        <UserFooter />
        <LocationModal setLocationStatus={setLocationStatus} />
      </div>
    </>
  );
}

export default UserHome;
