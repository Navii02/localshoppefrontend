import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import AdminHeader from "../../components/AdminHeader";
import { fetchusersApi } from "../../service/allApi";
import "./UserPage.css"; // Importing CSS file

function Userpage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const result = await fetchusersApi();
    if (result.status === 200) {
      setUsers(result.data);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  return (
    <>
      <AdminHeader />
      <div className="user-container">
        <h2 className="user-title">User Management</h2>

        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} onClick={() => handleUserClick(user)}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo || "N/A"}</td>
                  <td>{user.location?.address || "N/A"}</td>
                  <td>
                    <button className="view-button">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title> User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {selectedUser && (
            <div>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Mobile No:</strong> {selectedUser.mobileNo || "N/A"}</p>
              <p><strong>Location:</strong> {selectedUser.location?.address || "N/A"}</p>
              {selectedUser.location && (
                <p><strong>Coordinates:</strong> {selectedUser.location.lat}, {selectedUser.location.lon}</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="close-button" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Userpage;
