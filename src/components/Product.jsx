import React, { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Carousel from "react-bootstrap/Carousel";
import "./Product.css";
import { url } from "../service/ServiceUrl";
import EditProduct from "./EditProduct";
import { deletedResponseContext, editResponseContext } from "../context/ContextShare";
import { DeleteProduct } from "../service/allApi";
import { useState } from "react";

function Product({ product }) {
  const { setDeletestatus } = useContext(deletedResponseContext);
  const { editResponse } = useContext(editResponseContext);

  const {
    productName,
    description,
    price,
    actualPrice,
    images,
    productQuantity,
  } = product;

  const handleDelete = async (id) => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await DeleteProduct(id, reqHeader);
      if (result.status === 200) {
        alert("Product deleted successfully");
        setDeletestatus(result);
      } else {
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {}, [editResponse]);

  return (
    <Card className="product-card">
      {images && images.length > 0 ? (
        <Carousel className="product-carousel">
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="product-image"
                src={`${url}/${image}`}
                alt={`Product Image ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/150"
          alt="Default Product Image"
          className="product-image"
        />
      )}
      <Card.Body>
        <Card.Title className="product-title">{productName}</Card.Title>
        <Card.Text className="product-description">{description}</Card.Text>
        <ListGroup className="product-list">
          <ListGroup.Item><strong>Price:</strong> ₹{price}</ListGroup.Item>
          <ListGroup.Item><strong>Actual Price:</strong> ₹{actualPrice}</ListGroup.Item>
          <ListGroup.Item><strong>Quantity:</strong> {productQuantity}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Body className="product-buttons">
        <button className="edit-btn"><EditProduct productData={product} /></button>
        <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
      </Card.Body>
    </Card>
  );
}

export default Product;
