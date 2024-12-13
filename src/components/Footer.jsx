import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/landingPage`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 py-3 shadow-lg bg-danger text-white z-50 mt-5">
      <div
        className="text-center cursor-pointer"
        style={{ fontSize: "20px" }}
      >
        <span>Create Your Bio with Us</span>
        <button
          className="mt-2 text-decoration-underline bg-transparent border-0 text-white"
          onClick={handleClick}
          aria-label="Click to create your bio"
        >
          Click here
        </button>
      </div>
    </div>
  );
};

export default memo(Footer);
