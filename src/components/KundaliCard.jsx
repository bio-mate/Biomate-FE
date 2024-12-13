// In your component
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useFetchProfileDataQuery } from '../services/profileApi';

const KundaliCard = ({ userId }) => {
  const { data: kundaliImages, error, isLoading } = useFetchProfileDataQuery(userId);
  

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return <Spinner animation="border" variant="light" />;
  }

  if (error) {
    return <div className="text-danger">{error.message}</div>;
  }

  if (!kundaliImages?.length) {
    return <div>No Kundali images found.</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === kundaliImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? kundaliImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div
        style={{
          backgroundImage: `url(${kundaliImages[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        {/* Image Navigation */}
        <div
          className="position-absolute"
          style={{ top: "50%", right: "10px", fontSize: "30px", cursor: "pointer" }}
          onClick={handleNext}
        >
          <i className="bi bi-arrow-right-circle" />
        </div>
        <div
          className="position-absolute"
          style={{ top: "50%", left: "10px", fontSize: "30px", cursor: "pointer" }}
          onClick={handlePrev}
        >
          <i className="bi bi-arrow-left-circle" />
        </div>
      </div>
    </div>
  );
};

export default KundaliCard;
