import { useEffect, useState } from "react";
import UserHeader from "../../components/UserHeader";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import "./ProfilePage.css"; // Import the updated CSS

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = sessionStorage.getItem("userdetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  return (
    <>
      <UserHeader />
      <div className="profile-page-container">
        {userDetails ? (
          <div className="profile-card">
            {/* Profile Avatar */}
            <div className="profile-avatar">
              <FaUserCircle className="user-icon" />
            </div>

            {/* Profile Info */}
            <div className="profile-content">
              <h2 className="profile-title">User Profile</h2>
              <div className="profile-info">
                <p>
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p>
                  <strong>Username:</strong> {userDetails.username || "Nil"}
                </p>
                <p>
                  <strong>Phone:</strong> {userDetails.phone || "Nil"}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {userDetails.location?.address || "Nil"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="no-user-text">
            No user details found. Please log in again.
          </p>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
