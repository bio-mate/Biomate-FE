import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profileData, userId, isUser }) => {
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

  const handleShare = () => {
    const shareData = {
      img: `${profileData.profileImages?.imageUrl || []}`,
      title: "Check out this profile!",
      text: `${profileData.personalDetails.first_name} ${profileData.personalDetails.last_name}'s profile`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Profile shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
    console.log("shareData", shareData);
  };

  const handleEdit = () => {
    navigate(`/update-profile/${userId}`);
  };

  if (!profileData) {
    return <div>No profile data found.</div>;
  }

  const {
    personalDetails,
    religiousDetails,
    employmentDetails,
    socialMedia,
    profileImages,
    address,
  } = profileData;

  return (
    <div className="text-white mb-4" style={{ width: "100%", height: "100vh" }}>
      {/* Back Button */}
      <div
        style={{ position: "absolute", top: "20px", left: "20px", zIndex: "1" }}
      >
        <img
          src="/back.png"
          width={"40px"}
          height={"40px"}
          alt="Back"
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Share Button */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: "1",
        }}
      >
        <img
          src="/share.png"
          width={"40px"}
          height={"40px"}
          alt="Share"
          onClick={handleShare}
          style={{ cursor: "pointer" }}
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
              transition: "background-image 0.5s ease-in-out",
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
              {isUser && (
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: "1",
                  }}
                >
                  <img
                    src="/edit.png"
                    width={"50px"}
                    height={"50px"}
                    alt="Edit"
                    onClick={handleEdit}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
              <p className="card-text mb-1">
                <img
                  src="../pray.png"
                  width={"20px"}
                  height={"20px"}
                  alt="Religion"
                  style={{ margin: "5px" }}
                />
                {religiousDetails.religion} - {religiousDetails.caste}
              </p>
              <p className="card-text mb-1">
                <img
                  src="../office.png"
                  width={"20px"}
                  height={"20px"}
                  alt="Employment"
                  style={{ margin: "5px" }}
                />
                {employmentDetails.designation} at{" "}
                {employmentDetails.companyName}
              </p>
              <p>
                <img
                  src="../placeholder.png"
                  width={"20px"}
                  height={"20px"}
                  alt="Location"
                  style={{ margin: "5px" }}
                />
                {address.residential.district}, {address.residential.state}
              </p>

              {/* Social Media Links */}
              <div className="d-flex">
                {socialMedia.instagram && (
                  <img
                    src="../instagram.png"
                    width={"40px"}
                    height={"40px"}
                    alt="Instagram"
                    onClick={() => window.open(socialMedia.instagram, "_blank")}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                )}
                {socialMedia.facebook && (
                  <img
                    src="../facebook.png"
                    width={"40px"}
                    height={"40px"}
                    alt="Facebook"
                    onClick={() => window.open(socialMedia.facebook, "_blank")}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                )}
                {socialMedia.linkedin && (
                  <img
                    src="../linkedin.png"
                    width={"40px"}
                    height={"40px"}
                    alt="LinkedIn"
                    onClick={() => window.open(socialMedia.linkedin, "_blank")}
                    style={{ cursor: "pointer", marginRight: "10px" }}
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

            {/* Dots for Navigation */}
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
