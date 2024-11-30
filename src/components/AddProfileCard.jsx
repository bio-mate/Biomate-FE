import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa"; // Import edit and view icons
import { useNavigate } from "react-router-dom";

const AddProfileCard = ({
  userId,
  name,
  age,
  location,
  profession,
  company,
  id,
  profileImage
}) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState([]);
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `/mate/api/v1/profile/user-profile/${id}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // useEffect(() => {
  //   const loadImages = async () => {
  //     if (
  //       profileData &&
  //       profileData.profileImages &&
  //       profileData.profileImages.length > 0
  //     ) {
  //       const firstImageUrl = `http://localhost:4000/${profileData.profileImages[0].imageUrl}`;
  //       setPreloadedImages([firstImageUrl]); // Store only the first image
  //     }
  //   };

  //   loadImages();
  // }, [profileData]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/edit-profile/${id}`);
  };

  const handleView = () => {
    navigate(`/user-profile/${id}`);
  };

  return (
    <div className="mb-4" style={{ width: "80%", margin: "0 auto" }}>
      <div className="card shadow p-4" style={{ borderRadius: "10px" }}>
        <div className="text-center">
          {/* Profile Image */}
          {profileImage.length >= 0 && (
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}
          <h2 className="card-title mb-1">
            {name}, {age}
          </h2>
          <p className="card-text mb-1">
            <img
              src="../placeholder.png"
              width={"20px"}
              height={"20px"}
              style={{ margin: "5px" }}
              alt="location"
            />
            {location}
          </p>
          <p className="card-text">
            <img
              src="../office.png"
              width={"20px"}
              height={"20px"}
              style={{ margin: "5px" }}
              alt="profession"
            />
            {profession} at {company}
          </p>

          {/* Action Buttons */}
          <div className="mt-3 d-flex">
            <button className="btn btn-primary me-2" onClick={handleEdit}>
              <FaEdit />
            </button>
            <button className="btn btn-secondary" onClick={handleView}>
              <FaEye />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfileCard;
