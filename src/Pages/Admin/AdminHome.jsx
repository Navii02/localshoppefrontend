import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import './AdminHome.css'

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import AdminHeader from "../../components/AdminHeader";
import { userstastics } from "../../service/allApi";

function AdminHome() {
  const [userData, setUserData] = useState({ businessUsers: 0, normalUsers: 0 });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    const result = await userstastics();
    if (result.status === 200) {
      setUserData(result.data);
    }
  };

  // Data for the bar chart
  const data = {
    labels: ["Business Users", "Normal Users"],
    datasets: [
      {
        label: "User Count",
        data: [userData.businessUsers, userData.normalUsers],
        backgroundColor: ["#4CAF50", "#FF5733"],
        borderColor: ["#388E3C", "#C70039"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-home-container">
        <div className="stats-card">
          <h2 className="stats-title">📊 User Statistics</h2>
          <div className="chart-container">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
