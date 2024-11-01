import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({
  userId,
  name,
  age,
  location,
  profession,
  company,
  facebookUrl,
  instagramUrl,
  linkedInUrl,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [isUser, setIsUser] = useState(true);
  const [isPreview, setIsPreview] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/profile/viewProfile/${userId}`
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

  useEffect(() => {
    const loadImages = async () => {
      if (
        profileData &&
        profileData.profileImages &&
        profileData.profileImages.length > 0
      ) {
        const promises = profileData.profileImages.map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = `http://localhost:4000/${image.imageUrl}`;
            img.onload = () => resolve(img.src);
            img.onerror = () =>
              reject(new Error(`Failed to load image: ${img.src}`));
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!profileData) {
    return <div>No profile data found.</div>;
  }

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

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleEdit = () => {
    console.log("clicked");
  };

  const handleBack =()=>{
    navigate(`/profile`)
  }

  return (
    <div className="text-white mb-4" style={{ width: "100%", height: "100vh" }}>
      <div style={{ display: "flex", float: "left", margin: "20px" }}>
        <img
          src="/back.png"
          width={"40px"}
          height={"40px"}
          style={{
            marginRight: "10px",
            // pointerEvents: "none",
            zIndex: "1",
          }}
          alt="LinkedIn"
          onClick={handleBack}
        />
      </div>

      <div style={{ display: "flex", float: "right", margin: "20px" }}>
        {isPreview ? (
          <img
            src="/share.png"
            width={"40px"}
            height={"40px"}
            style={{
              marginRight: "10px",
              //marginTop: "-570px",
              pointerEvents: "none",
              zIndex: "1",
            }}
            alt="LinkedIn"
            //onClick={handleShare}
          />
        ) : (
          <img
            src="/share.png"
            width={"40px"}
            height={"40px"}
            style={{ marginRight: "10px", marginBottom: "500px", zIndex: "1" }}
            alt="LinkedIn"
            //onClick={handleShare}
          />
        )}
      </div>

      {preloadedImages.length > 0 && (
        <div>
          {/* Image Slider */}

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
            {/* Overlay for text */}
            <div
              className="d-flex flex-column justify-content-center p-3 bg-dark bg-opacity-75"
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
              }}
            >
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <h2 className="card-title mb-1">
                  {name}, {age}
                </h2>

                {isUser ? (
                  <img
                    src="/edit.png"
                    width={"50px"}
                    height={"50px"}
                    style={{ zIndex: "1" }}
                    alt="LinkedIn"
                    onClick={handleEdit}
                  />
                ) : (
                  ""
                )}
              </div>
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
              <div className="d-flex">
                {instagramUrl && (
                  <img
                    src="../instagram.png"
                    width={"40px"}
                    height={"40px"}
                    style={{ marginRight: "10px" }}
                    alt="Instagram"
                    onClick={() => window.open(instagramUrl, "_blank")}
                  />
                )}
                {facebookUrl && (
                  <img
                    src="../facebook.png"
                    width={"40px"}
                    height={"40px"}
                    style={{ marginRight: "10px" }}
                    alt="Facebook"
                    onClick={() => window.open(facebookUrl, "_blank")}
                  />
                )}
                {linkedInUrl && (
                  <img
                    src="../linkedin.png"
                    width={"40px"}
                    height={"40px"}
                    style={{ marginRight: "10px" }}
                    alt="LinkedIn"
                    onClick={() => window.open(linkedInUrl, "_blank")}
                  />
                )}
              </div>
            </div>

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

            {/* Dots for navigation */}
            <div
              className="d-flex justify-content-center"
              style={{ position: "absolute", bottom: "10px", width: "100%" }}
            >
              {preloadedImages.map((_, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    height: "10px",
                    width: "10px",
                    margin: "0 5px",
                    backgroundColor: currentIndex === index ? "white" : "gray",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
