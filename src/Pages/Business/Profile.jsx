import { useEffect, useState } from "react";
import "./BusinessProfilePage.css";

import { url } from "../../service/ServiceUrl"; // Update with your backend URL
import { Businessuser } from "../../service/allApi";
import BusinessHeader from "../../components/BusinessHeader";

function Profile() {
  const [businessUser, setBusinessUser] = useState(null);

  useEffect(() => {
    const fetchBusinessUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log(headers);
        
        const response = await Businessuser(headers);
        console.log(response);
        
        setBusinessUser(response.data);
      } catch (error) {
        console.error("Error fetching business user details", error);
      }
    };

    fetchBusinessUser();
  }, []);

  if (!businessUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
    <BusinessHeader/>
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={`${url}/upload/${businessUser.photo}`} alt="Profile" className="profile-photo" />
          <h2>{businessUser.username}</h2>
          <p className="status">Status: {businessUser.status}</p>
        </div>
        
        <div className="profile-section">
          <h3>Business Information</h3>
          <p><strong>Business Name:</strong> {businessUser.businessname || "Not Provided"}</p>
          <p><strong>Business Type:</strong> {businessUser.BusinessType || "Not Provided"}</p>
          <p><strong>License No:</strong> {businessUser.LicenseNo || "Not Provided"}</p>
          {businessUser.LicenseImg && <img src={`${url}/upload/${businessUser.LicenseImg}`} alt="License" className="document-img" />}
          {businessUser.PancardImg && <img src={`${url}/upload/${businessUser.PancardImg}`} alt="Pancard" className="document-img" />}
        </div>

        <div className="profile-section">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {businessUser.email}</p>
          <p><strong>Location:</strong> {businessUser.Location || "Not Provided"}</p>
          <p><strong>Address:</strong> {businessUser.address || "Not Provided"}</p>
        </div>

        <div className="profile-section">
          <h3>Bank Details</h3>
          <p><strong>Bank Name:</strong> {businessUser.BankDetails?.Name || "Not Provided"}</p>
          <p><strong>Account No:</strong> {businessUser.BankDetails?.AccountNo || "Not Provided"}</p>
          <p><strong>IFSC Code:</strong> {businessUser.BankDetails?.IFSCode || "Not Provided"}</p>
        </div>

        <div className="profile-section">
          <h3>PAN Details</h3>
          <p><strong>PAN Name:</strong> {businessUser.PanName || "Not Provided"}</p>
          <p><strong>PAN No:</strong> {businessUser.PanCardNo || "Not Provided"}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
