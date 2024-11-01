import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { Spinner } from "react-bootstrap"; 
import axios from "axios";

const KundaliCard = ({ userId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/viewProfile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  useEffect(() => {
    const loadImages = async () => {
      if (profileData && profileData.profileImages.length > 0) {
        const promises = profileData.profileImages.map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = `http://localhost:4000/${image.imageUrl}`; 
            img.onload = () => resolve(img.src);
            img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
          });
        });

        try {
          const loadedImages = await Promise.all(promises);
          setPreloadedImages(loadedImages);
        } catch (error) {
          console.error("Error loading images:", error);
        }
      }
    };

    loadImages();
  }, [profileData]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if ( preloadedImages.length === 0) {
    return <div>No images found.</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === preloadedImages.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? preloadedImages.length - 1 : prevIndex - 1));
  };

  return (
    <div className="text-white" style={{ width: "100%", height: "100vh", position: "relative" }}>
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
        {/* Navigation Buttons */}
        <div className="position-absolute" style={{ top: "50%", right: "10px", fontSize: "30px", cursor: "pointer" }} onClick={handleNext}>
          <IoIosArrowDroprightCircle />
        </div>
        <div className="position-absolute" style={{ top: "50%", left: "10px", fontSize: "30px", cursor: "pointer" }} onClick={handlePrev}>
          <IoIosArrowDropleftCircle />
        </div>
      </div>
    </div>
  );
};

export default KundaliCard;
