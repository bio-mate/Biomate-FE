import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profileData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === profileData.profileImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? profileData.profileImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleBack = () => {
    navigate(`/profile`);
  };

  if (!profileData) {
    return <div>No profile data found.</div>;
  }

  const {
    personalDetails,
    contactDetails,
    religiousDetails,
    astroDetails,
    familyDetails,
    educationDetails,
    employmentDetails,
    socialMedia,
    profileImages,
    address,
  } = profileData;

  return (
    <div className="text-white mb-4" style={{ width: "100%", height: "100vh" }}>
      <div style={{ display: "flex", float: "left", margin: "20px" }}>
        <img
          src="/back.png"
          width={"40px"}
          height={"40px"}
          style={{ marginRight: "10px", zIndex: "1" }}
          alt="Back"
          onClick={handleBack}
        />
      </div>

      {profileImages.length > 0 && (
        <div>
          {/* Image Slider */}
          <div
            style={{
              backgroundImage: `url(${profileImages[currentIndex].name})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100vh",
              position: "relative",
              transition: "background-image 1s",
            }}
          >
            {/* Profile Details */}
            <div
              className="d-flex flex-column justify-content-center p-3 bg-dark bg-opacity-75"
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
              }}
            >
              <h2 className="card-title mb-1">
                {personalDetails.first_name} {personalDetails.last_name},{" "}
                {personalDetails.age}
              </h2>
              {/* {isUser ? (
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
                )} */}
              {/* <p className="card-text mb-1">
                <img
                  src="../religion.png"
                  width={"20px"}
                  height={"20px"}
                  style={{ margin: "5px" }}
                  alt="location"
                />
                {religiousDetails.religion}
              </p> */}
              <p className="card-text">
                <img
                  src="../office.png"
                  width={"20px"}
                  height={"20px"}
                  style={{ margin: "5px" }}
                  alt="location"
                />
                {employmentDetails.designation} at{" "}
                {employmentDetails.companyName}
              </p>
              <p>
                <img
                  src="../placeholder.png"
                  width={"20px"}
                  height={"20px"}
                  style={{ margin: "5px" }}
                  alt="location"
                />
                {address.residential.district}, {address.residential.state}
              </p>

              <div className="d-flex">
                {socialMedia.instagram && (
                  <img
                    src="../instagram.png"
                    width={"40px"}
                    height={"40px"}
                    style={{ marginRight: "10px" }}
                    alt="Instagram"
                    onClick={() => window.open(socialMedia.instagram, "_blank")}
                  />
                )}
                {socialMedia.facebook && (
                  <img
                    src="../facebook.png"
                    width={"40px"}
                    height={"40px"}
                    style={{ marginRight: "10px" }}
                    alt="Facebook"
                    onClick={() => window.open(socialMedia.facebook, "_blank")}
                  />
                )}
                {socialMedia.linkedin && (
                  <img
                    src="../linkedin.png"
                    width={"40px"}
                    height={"40px"}
                    style={{ marginRight: "10px" }}
                    alt="LinkedIn"
                    onClick={() => window.open(socialMedia.linkedin, "_blank")}
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
              {profileImages.map((_, index) => (
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
