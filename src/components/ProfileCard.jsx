import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profileData, userId, isUser }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (profileData && profileData.profileImages && profileData.profileImages.length > 0) {
      setCurrentIndex(0);
    }
  }, [profileData]);

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
      img: profileData.profileImages?.[currentIndex]?.name || "",
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
      <div className="position-absolute top-0 start-0 p-2 z-1">
        <img
          src="/back.png"
          width="40"
          height="40"
          alt="Back"
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Share Button */}
      <div className="position-absolute top-0 end-0 p-2 z-1">
        <img
          src="/share.png"
          width="40"
          height="40"
          alt="Share"
          onClick={handleShare}
          style={{ cursor: "pointer" }}
        />
      </div>

      {profileImages.length > 0 && (
        <div
          className="carousel slide"
          data-bs-ride="carousel"
          style={{
            backgroundImage: `url(${profileImages[currentIndex].name})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
            position: "relative",
          }}
        >
          {/* Profile Details */}
          <div
            className="d-flex flex-column justify-content-center p-3 bg-dark bg-opacity-75 position-absolute bottom-0 start-0 w-100"
          >
            <h2 className="card-title mb-1">
              {personalDetails.first_name} {personalDetails.last_name}, {personalDetails.age}
            </h2>
            {isUser && (
              <div className="position-absolute top-0 end-0 p-2">
                <img
                  src="/edit.png"
                  width="50"
                  height="50"
                  alt="Edit"
                  onClick={handleEdit}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
            <p className="card-text mb-1">
              <img src="../pray.png" width="20" height="20" alt="Religion" style={{ margin: "5px" }} />
              {religiousDetails.religion} - {religiousDetails.caste}
            </p>
            <p className="card-text mb-1">
              <img src="../office.png" width="20" height="20" alt="Employment" style={{ margin: "5px" }} />
              {employmentDetails.designation} at {employmentDetails.companyName}
            </p>
            <p>
              <img
                src="../placeholder.png"
                width="20"
                height="20"
                alt="Location"
                style={{ margin: "5px" }}
              />
              {address.residential.district}, {address.residential.state}
            </p>

            {/* Social Media Links */}
            <div className="d-flex">
              {Object.keys(socialMedia).map((key) =>
                socialMedia[key] ? (
                  <img
                    key={key}
                    src={`../${key}.png`}
                    width="40"
                    height="40"
                    alt={key}
                    onClick={() => window.open(socialMedia[key], "_blank")}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                ) : null
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div
            className="position-absolute top-50 end-0 p-2"
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={handleNext}
          >
            <IoIosArrowDroprightCircle />
          </div>
          <div
            className="position-absolute top-50 start-0 p-2"
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={handlePrev}
          >
            <IoIosArrowDropleftCircle />
          </div>

          {/* Dots for Navigation */}
          <div className="d-flex justify-content-center position-absolute bottom-0 w-100 p-2">
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
      )}
    </div>
  );
};

export default ProfileCard;
