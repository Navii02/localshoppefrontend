import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddProduct } from '../service/allApi';
import { FaPlus } from 'react-icons/fa';
import { TbCategory } from 'react-icons/tb';

function AddProject() {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const [ProductData, setProductData] = useState({
    productName: '',
    productQuantity: '',
    actualPrice: '',
    price: '',
    expiryDate: '',
    description: '',
    address:'',
    longitude:'',
    latitude:'',
    Category:''
  });

  const handleClose = () =>{
    setProductData({
      productName: '',
      productQuantity: '',
      actualPrice: '',
      price: '',
      expiryDate: '',
      description: '',
        Category:''
    })
    setImages([])

    setShow(false)};
  const handleShow = () => setShow(true);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file, 
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]); 
  };

  const handleImageRemove = (index) => {
    const imageToRemove = images[index];
    URL.revokeObjectURL(imageToRemove.preview); 
    setImages(images.filter((_, i) => i !== index)); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async () => {
    const userDetails=JSON.parse(sessionStorage.getItem('userdetails'));
   

    const data = new FormData();
    data.append('productName', ProductData.productName);
    data.append('productQuantity', ProductData.productQuantity);
    data.append('actualPrice', ProductData.actualPrice);
    data.append('price', ProductData.price);
    data.append('expiryDate', ProductData.expiryDate);
    data.append('description', ProductData.description);
    data.append(' Category', ProductData.Category);
    data.append('address',userDetails.address);
    data.append('latitude',userDetails.latitude);
    data.append('longitude',userDetails.longitude)

    // Append actual File objects
    images.forEach(({ file }) => {
      data.append('images', file);
    });

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`, // No need for Content-Type with FormData
    };

    
      const result = await AddProduct(data, reqHeader);
      //console.log(result);
      if(result.status ==200){
        alert("product added successfully")
        handleClose();
      }else{
        alert("Something went wrong")
      }
    }


  return (
    <div>
     <Button
        
      style={{backgroundColor: 'transparent',outline: 'none', borderColor:"transparent"}}
        onClick={handleShow}
      >
        <FaPlus className="me-2" /> Add Product
      </Button>


      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <label
                  htmlFor="projectimages"
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <input
                    type="file"
                    id="projectimages"
                    className="d-none"
                    multiple // Enable multiple file uploads
                    onChange={handleImageChange}
                  />
                  <img
                    src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
                    alt="Upload Placeholder"
                    className="w-25"
                  />
                </label>
                <div className="mt-3 w-100">
                  {images.map((image, index) => (
                    <div key={index} className="d-flex align-items-center mt-2">
                      <img
                        src={image.preview} // Use the preview URL
                        alt={`Uploaded ${index}`}
                        className="img-thumbnail me-2"
                        style={{ width: '100px', height: '100px' }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleImageRemove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-3 w-100 form-control rounded">
                <input
                    type="text"
                    placeholder="Category"
                    name="Category"
                    className="form-control rounded mt-3"
                    value={ProductData.Category}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Product Name"
                    name="productName"
                    className="form-control rounded mt-3"
                    value={ProductData.productName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Product Quantity"
                    name="productQuantity"
                    className="form-control rounded mt-3"
                    value={ProductData.productQuantity}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Product Actual Price"
                    name="actualPrice"
                    className="form-control rounded mt-3"
                    value={ProductData.actualPrice}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Product Price"
                    name="price"
                    className="form-control rounded mt-3"
                    value={ProductData.price}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Product Expiry Date"
                    name="expiryDate"
                    className="form-control rounded mt-3"
                    value={ProductData.expiryDate}
                    onChange={handleInputChange}
                  />
                  <textarea
                    rows={6}
                    placeholder="Description"
                    name="description"
                    className="form-control rounded mt-3"
                    value={ProductData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProject;
