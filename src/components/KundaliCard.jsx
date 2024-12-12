import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const KundaliCard = ({ userId, token, preloadedImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [preloadedImages, setPreloadedImages] = useState([]);

  // Fetch the profile and extract Kundali images
  // useEffect(() => {
  //   const fetchKundaliImages = async () => {
  //     if (!userId ) {
  //       setError("Missing user ID or authentication token.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`/mate/api/v1/profile/user-profile/${userId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // Assuming Kundali images are stored in a specific key, e.g., `kundaliImages`
  //       const profile = response.data?.data?.profile;
  //       console.log("profileprofile",profile)
  //       if (profile && profile.kundaliImages) {
  //         setPreloadedImages(profile.kundaliImages);
  //       } else {
  //         setError("No Kundali images found.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //       setError(
  //         error.response?.data?.message ||
  //           "Could not fetch profile. Please try again later."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchKundaliImages();
  // }, [userId, token]);

  // Handle loading state
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

  // Handle error state
  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-danger"
        style={{ height: "100vh" }}
      >
        {error}
      </div>
    );
  }

  // Handle no images
  if (preloadedImages.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-warning"
        style={{ height: "100vh" }}
      >
        No Kundali images found.
      </div>
    );
  }

  // Handle navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === preloadedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? preloadedImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="text-white"
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <div
        style={{
          backgroundImage: `url(${preloadedImages[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          position: "relative",
          transition: "background-image 1s",
        }}
      >
        <img src={preloadedImages} alt={preloadedImages} />
        {/* Navigation Buttons */}
        <div
          className="position-absolute"
          style={{
            top: "50%",
            right: "10px",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={handleNext}
        >
          <IoIosArrowDroprightCircle />
        </div>
        <div
          className="position-absolute"
          style={{
            top: "50%",
            left: "10px",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={handlePrev}
        >
          <IoIosArrowDropleftCircle />
        </div>
      </div>
    </div>
  );
};

export default KundaliCard;
