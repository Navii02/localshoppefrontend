import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader';
import './ProfilePage.css'; // Import the custom CSS

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from session storage
    const storedUserDetails = sessionStorage.getItem('userdetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails)); // Parse and set the user details
    } else {
      // Fallback if no user details are found in session storage
      setUserDetails(null);
    }
  }, []);

  return (
    <>
      <UserHeader />
      <div className="container profile-page mt-5">
        {userDetails ? (
          <div className="profile-container">
            <h2 className="profile-heading">User Profile</h2>
            <div className="profile-details">
              <div className="profile-info">
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Username:</strong> {userDetails.username || "Nil"}</p>
                <p><strong>Phone:</strong> {userDetails.phone || "Nil"}</p>
                <p><strong>Address:</strong> {userDetails.location?.address || "Nil"}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">No user details found. Please log in again.</p>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
