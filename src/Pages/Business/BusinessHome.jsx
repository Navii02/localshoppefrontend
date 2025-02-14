import BusinessFooter from "../../components/BusinessFooter";
import BusinessHeader from "../../components/BusinessHeader";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";
import { productchartapi } from "../../service/allApi";
import "./BusinessHome.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

function BusinessHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      const result = await productchartapi({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      if (result.status === 200) {
        setProducts(Array.isArray(result.data) ? result.data : []);
      }
    };
    fetchData();
  }, []);

  // Data Processing
  const categoryCounts = {};
  const productNames = [];
  const actualPrices = [];
  const sellingPrices = [];
  const reviewsCount = {};
  const wishlistCounts = [];
  const cartCounts = [];

  products?.forEach((product) => {
    categoryCounts[product?.Catageory] = (categoryCounts[product?.Catageory] || 0) + 1;
    productNames.push(product?.productName);
    actualPrices.push(parseFloat(product?.actualPrice));
    sellingPrices.push(parseFloat(product?.price));
    reviewsCount[product.productName] = product.reviews?.length || 0;
    wishlistCounts.push(product.WishlistUserId?.length);
    cartCounts.push(product.CartUserId?.length);
  });

  // Chart Options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Chart Data
  const categoryChartData = { labels: Object.keys(categoryCounts), datasets: [{ label: "Products per Category", data: Object.values(categoryCounts), backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#FF5722"] }] };
  const priceComparisonData = { labels: productNames, datasets: [{ label: "Actual Price", data: actualPrices, borderColor: "#FF6384", backgroundColor: "#FF63841A", fill: true }, { label: "Selling Price", data: sellingPrices, borderColor: "#36A2EB", backgroundColor: "#36A2EB1A", fill: true }] };
  const reviewsChartData = { labels: Object.keys(reviewsCount), datasets: [{ label: "Reviews", data: Object.values(reviewsCount), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }] };
  const wishlistCartData = { labels: productNames, datasets: [{ label: "Wishlist", data: wishlistCounts, backgroundColor: "#FF9F40" }, { label: "Cart", data: cartCounts, backgroundColor: "#4BC0C0" }] };

  return (
    <>
      <BusinessHeader />
      <div className="dashboard-container">
        <h2 className="dashboard-title">📊 Business Dashboard</h2>
        <div className="chart-row">
          <div className="chart-large">
            <h3 className="chart-title">📦 Products per Category</h3>
            <div className="chart-wrapper">
              <Bar data={categoryChartData} options={commonOptions} />
            </div>
          </div>
          <div className="chart-large">
            <h3 className="chart-title">💰 Price Comparison</h3>
            <div className="chart-wrapper">
              <Line data={priceComparisonData} options={commonOptions} />
            </div>
          </div>
        </div>
        <div className="chart-row">
          <div className="chart-small">
            <h3 className="chart-title">⭐ Reviews</h3>
            <div className="chart-wrapper">
              <Pie data={reviewsChartData} options={commonOptions} />
            </div>
          </div>
          <div className="chart-small">
            <h3 className="chart-title">🛒 Wishlist & Cart</h3>
            <div className="chart-wrapper">
              <Doughnut data={wishlistCartData} options={commonOptions} />
            </div>
          </div>
        </div>
      </div>
      <BusinessFooter />
    </>
  );
}

export default BusinessHome;
