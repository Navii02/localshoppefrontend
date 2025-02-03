import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "./LocationPicker.css"; // For additional styling

const LocationPicker = ({ isOpen, onClose, onSave, location, setSavedLocation }) => {
  const [position, setPosition] = useState([10.8505, 76.2711]); // Default: Kerala
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState("");
  const Location  =location
  const Savedaddress=Location.address
  console.log(Location);
  
  // Fix for marker icon issue in Leaflet
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Function to recenter the map when a new location is selected
  const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(coords, 13); // Update map center
    }, [coords, map]);
    return null;
  };

  // Handle map click to set marker position and fetch address
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newPos = [e.latlng.lat, e.latlng.lng];
        setPosition(newPos);
        fetchAddress(newPos[0], newPos[1]); // Get address
      },
    });
    return null;
  };

  const useSavedLocation = () => {
    sessionStorage.setItem("savedLocation", JSON.stringify(location));
    setSavedLocation(location);
  };

  // Fetch address from coordinates
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      setAddress(response.data.display_name || "Address not found");
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Address not found");
    }
  };


  // Handle search input change
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Select a location from search results
  const handleSelectLocation = async (lat, lon) => {
    const newPos = [parseFloat(lat), parseFloat(lon)];
    setPosition(newPos);
    setSearchQuery("");
    setSuggestions([]);
    fetchAddress(newPos[0], newPos[1]); // Get address
  };

  // Don't render modal if it's closed
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Set Location</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((place) => (
              <li
                key={place.place_id}
                onClick={() => handleSelectLocation(place.lat, place.lon)}
                className="suggestion-item"
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}

        {/* Map */}
        <div className="map-container">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "400px", width: "100%", borderRadius: "8px" }}
            key={position.toString()} // Force re-render when position changes
          >
            <ChangeView coords={position} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={customIcon} />
            <MapClickHandler />
          </MapContainer>
        </div>

        {/* Address Field */}
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Allow manual edit
          className="address-input"
        />

        <p>
          <strong>Selected Location:</strong> {position[0]}, {position[1]}
        </p>
        
        {location ? (
          <div className="saved-location">
            <h3>Saved Location</h3>
            Address:{Savedaddress}
            <button className="btn use-btn" onClick={useSavedLocation}>
              Use Saved Location
            </button>
          </div>
        ) : (
          <p>No Saved Location</p>
        )}

        <div className="modal-buttons">
          <button className="btn close-btn" onClick={onClose}>
            Close
          </button>
          <button className="btn save-btn" onClick={() => onSave(position, address)}>
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
