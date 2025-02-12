import { useState, useEffect } from "react";
//import axios from "axios";
import { businessuserapproval, pendingusersapi } from "../../service/allApi";
import { url } from "../../service/ServiceUrl";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AdminHeader from "../../components/AdminHeader";
import './Approval.css'

export function Approval() {
  const [users, setUsers] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const handleClose = () => {
    setShow(false);
    setFullscreenImage(null);
  };

  const pendingUsers = async () => {
    const result = await pendingusersapi();
    if (result.status === 200) {
      setUsers(result.data);
    }
  };

  useEffect(() => {
    pendingUsers();
  }, [status]);

  const handleApproval = async (id, status) => {
    const reqBody = { status };
    const result = await businessuserapproval(id, reqBody);
    if (result.status === 200) {
      alert(`The User is ${status} successfully`);
      setStatus(result);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="approval-container">
        <h2 className="approval-title">Business User Approvals</h2>
        <div className="table-wrapper">
          <table className="approval-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Business Name</th>
                <th>License No</th>
                <th>License Image</th>
                <th>PAN Card Image</th>
                <th>Business Type</th>
                <th>GST No</th>
                <th>Bank Details</th>
                <th>PAN Name</th>
                <th>PAN Card No</th>
                <th>Photo</th>
                <th>Location</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.businessname}</td>
                  <td>{user.LicenseNo}</td>
                  <td>
                    {user.LicenseImg && (
                      <img
                        src={`${url}/upload/${user.LicenseImg}`}
                        alt="License"
                        className="thumbnail"
                        onClick={() => {
                          setFullscreenImage(`${url}/upload/${user.LicenseImg}`);
                          setShow(true);
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {user.PancardImg && (
                      <img
                        src={`${url}/upload/${user.PancardImg}`}
                        alt="PAN Card"
                        className="thumbnail"
                        onClick={() => {
                          setFullscreenImage(`${url}/upload/${user.PancardImg}`);
                          setShow(true);
                        }}
                      />
                    )}
                  </td>
                  <td>{user.BusinessType}</td>
                  <td>{user.GSTNo}</td>
                  <td>
                    {user.BankDetails?.Name} <br />
                    {user.BankDetails?.AccountNo} <br />
                    {user.BankDetails?.IFSCode}
                  </td>
                  <td>{user.PanName}</td>
                  <td>{user.PanCardNo}</td>
                  <td>
                    {user.photo && (
                      <img
                        src={`${url}/upload/${user.photo}`}
                        alt="User"
                        className="user-photo"
                        onClick={() => {
                          setFullscreenImage(`${url}/upload/${user.photo}`);
                          setShow(true);
                        }}
                      />
                    )}
                  </td>
                  <td>{user.Location}</td>
                  <td>{user.address}</td>
                  <td className="actions">
                    <button
                      className="approve-btn"
                      onClick={() => handleApproval(user._id, "approved")}
                    >
                     Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleApproval(user._id, "rejected")}
                    >
                     Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Image Modal */}
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton />
          <Modal.Body className="modal-body">
            <img src={fullscreenImage} alt="Fullscreen" className="fullscreen-image" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Approval;
