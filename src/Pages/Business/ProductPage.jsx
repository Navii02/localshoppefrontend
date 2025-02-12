import { useContext, useEffect, useState } from 'react';
import AddProject from "../../components/AddProject";
import BusinessFooter from "../../components/BusinessFooter";
import BusinessHeader from "../../components/BusinessHeader";
import Product from "../../components/Product";
import { userproducts } from '../../service/allApi';
import { deletedResponseContext, editResponseContext } from '../../context/ContextShare';
import "./ProductPage.css"; // Import the new CSS file

function ProductPage() {
  const [products, setProducts] = useState([]);
  const { editResponse } = useContext(editResponseContext);
  const { deletestatus } = useContext(deletedResponseContext);

  // Fetch user products
  const userProducts = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      };
      const result = await userproducts(reqHeader);
      setProducts(result.data);
    }
  };

  useEffect(() => {
    userProducts();
  }, [editResponse, deletestatus]);

  return (
    <>
      <BusinessHeader />
      <AddProject />
      
      <div className="product-container">
        <h2 className="product-title">🛍️ Our Products</h2>
        
        {/* Displaying products in groups of three */}
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((item, index) => 
              index % 3 === 0 ? (
                <div className="product-row" key={index}>
                  {products.slice(index, index + 3).map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p className="no-products">❌ No products available.</p>
        )}
      </div>

      <BusinessFooter />
    </>
  );
}

export default ProductPage;
