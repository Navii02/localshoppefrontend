import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import AdminHeader from "../../components/AdminHeader";
import { BusinessUsers } from "../../service/allApi";
import { url } from "../../service/ServiceUrl";
import "./BusinessUser.css"; // Import the CSS file

function BusinessUsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchBusinessUsers();
  }, []);

  const fetchBusinessUsers = async () => {
    const response = await BusinessUsers();
    if (response.status === 200) {
      setUsers(response.data);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleImageClick = (imageUrl) => {
    setFullscreenImage(imageUrl);
    setShowImageModal(true);
  };

  return (
    <>
      <AdminHeader />
      <div className="business-users-container">
        <h2 className="title">All Business Users</h2>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Business Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.businessname}</td>
                    <td>
                      <span className={`status-badge ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleUserClick(user)}
                        className="view-details-btn"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="user-details">
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Business Name:</strong> {selectedUser.businessname}</p>
              <p><strong>License No:</strong> {selectedUser.LicenseNo}</p>
              <p><strong>Business Type:</strong> {selectedUser.BusinessType}</p>
              <p><strong>GST No:</strong> {selectedUser.GSTNo}</p>
              <p><strong>PAN Name:</strong> {selectedUser.PanName}</p>
              <p><strong>PAN Card No:</strong> {selectedUser.PanCardNo}</p>
              <p><strong>Location:</strong> {selectedUser.Location}</p>
              <p><strong>Address:</strong> {selectedUser.address}</p>

              <h3 className="doc-title">Documents & Photos</h3>
              <div className="image-gallery">
                {selectedUser.LicenseImg && (
                  <img
                    src={`${url}/upload/${selectedUser.LicenseImg}`}
                    alt="License"
                    onClick={() => handleImageClick(`${url}/upload/${selectedUser.LicenseImg}`)}
                  />
                )}
                {selectedUser.PancardImg && (
                  <img
                    src={`${url}/upload/${selectedUser.PancardImg}`}
                    alt="PAN Card"
                    onClick={() => handleImageClick(`${url}/upload/${selectedUser.PancardImg}`)}
                  />
                )}
                {selectedUser.photo && (
                  <img
                    src={`${url}/upload/${selectedUser.photo}`}
                    alt="User"
                    onClick={() => handleImageClick(`${url}/upload/${selectedUser.photo}`)}
                  />
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Fullscreen Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered>
        <Modal.Body className="fullscreen-modal-body">
          {fullscreenImage && <img src={fullscreenImage} alt="Fullscreen" />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BusinessUsersPage;
