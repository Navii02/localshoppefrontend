import  { useEffect, useState } from "react";
import { BusinessRegistration } from "../../service/allApi";
import { useNavigate } from "react-router-dom";

function BusinessRegisterationForm() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    businessname: "",
    LicenseNo: "",
    LicenseImg: null,
    PancardImg: null,
    BusinessType: "",
    GSTNo: "",
    BankDetails: {
      Name: "",
      AccountNo: "",
      IFSCode: "",
    },
    PanName: "",
    PanCardNo: "",
    photo: null,
    address: "",
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevState) => ({
            ...prevState,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("BankDetails.")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        BankDetails: { ...prevState.BankDetails, [field]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    // Convert formData to FormData object for API submission
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "BankDetails") {
        Object.keys(formData.BankDetails).forEach((field) =>
          submitData.append(`BankDetails.${field}`, formData.BankDetails[field])
        );
      } else {
        submitData.append(key, formData[key]);
      }
    });
    
    
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "multipart/form-data",
      "Authorization":` Bearer ${token}`
  }
  const result = await BusinessRegistration(formData, reqHeader)
  console.log(result);
  if(result.status == 200) {
    alert("Registration Successful And waiting for the Admin Approval")
    navigate("/business/login")
  }else{
    alert("something went wrong")
  }

    // API call logic here
  };

  useEffect(() => {
    const user = sessionStorage.getItem("userdetails");
    if (user) {
      const userData = JSON.parse(user);
      setFormData((prevState) => ({
        ...prevState,
        username: userData.username || "",
        password: userData.password || "",
        email: userData.email || "",
        businessname: userData.businessname || "",
      }));
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 mx-auto">
          <h2 className="d-flex justify-content-center align-items-center mt-5">
            Business Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Photo</label>
              <input
                type="file"
                className="form-control"
                name="photo"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Business Type</label>
              <input
                type="text"
                className="form-control"
                name="BusinessType"
                value={formData.BusinessType}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">License Number</label>
              <input
                type="text"
                className="form-control"
                name="LicenseNo"
                value={formData.LicenseNo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">License Image</label>
              <input
                type="file"
                className="form-control"
                name="LicenseImg"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">PAN Name</label>
              <input
                type="text"
                className="form-control"
                name="PanName"
                value={formData.PanName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">PAN Card Number</label>
              <input
                type="text"
                className="form-control"
                name="PanCardNo"
                value={formData.PanCardNo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">PAN Card Image</label>
              <input
                type="file"
                className="form-control"
                name="PancardImg"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">GST Number</label>
              <input
                type="text"
                className="form-control"
                name="GSTNo"
                value={formData.GSTNo}
                onChange={handleChange}
              />
            </div>
            <h5>Bank Details</h5>
            <div className="mb-3">
              <label className="form-label">Bank Name</label>
              <input
                type="text"
                className="form-control"
                name="BankDetails.Name"
                value={formData.BankDetails.Name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input
                type="text"
                className="form-control"
                name="BankDetails.AccountNo"
                value={formData.BankDetails.AccountNo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">IFSC Code</label>
              <input
                type="text"
                className="form-control"
                name="BankDetails.IFSCode"
                value={formData.BankDetails.IFSCode}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Latitude</label>
              <input
                type="text"
                className="form-control"
                name="latitude"
                value={formData.latitude}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Longitude</label>
              <input
                type="text"
                className="form-control"
                name="longitude"
                value={formData.longitude}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default BusinessRegisterationForm;
