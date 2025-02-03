import React, { useEffect, useState } from "react";
import LocationPicker from "./LocationPicker";
import "./LocationModel.css";
import { Savelocation } from "../service/allApi";
import { useNavigate } from "react-router-dom";
function LocationModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [savedlocation, setSavedLocation] = useState("");
  const[location, setLocation] = useState("")
  console.log(location);
  
  const Navigate =useNavigate()
  // Save function to store latitude, longitude, and address
  const handleSave = async (position, address) => {
    if (sessionStorage.getItem("userdetails")) {
      const locationData = {
        lat: position[0],
        lon: position[1],
        address: address,
      };
      console.log(locationData);
      const reqBody = locationData;
      console.log(reqBody);

      setSelectedLocation(position);
      setAddress(address);
      setIsModalOpen(false);

      // Save to local storage or send to backend
      sessionStorage.setItem("savedLocation", JSON.stringify(locationData));

      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // No need for Content-Type with FormData
      };

      const result = await Savelocation(reqBody, reqHeader);
      console.log(result);
    } else {
      alert("Please Login First");
      Navigate('/login');
    }
  };


  useEffect(() => {
    if (sessionStorage.getItem("savedLocation")) {
      setIsModalOpen(false);
      const userdetails = sessionStorage.getItem("userdetails");
      
      if (userdetails) {
        const parsedUserDetails = JSON.parse(userdetails);
        setLocation(parsedUserDetails.location || "Location not set"); 
      } else {
        setLocation("Location not set"); 
      }
    } else {
      setIsModalOpen(true);
    }
  }, [savedlocation]); 
 
  return (
    <div>
      <LocationPicker
        location={location}
        isOpen={isModalOpen}
        setSavedLocation={setSavedLocation}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave} // Pass save function
      />
    </div>
  );
}

export default LocationModal;
