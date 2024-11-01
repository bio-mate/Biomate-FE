import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ViewProfile from "./ViewProfile";

const UserPreviewPage = () => {
  const [showPreview, setShowPreview] = useState(true);
  
  const demoPage = "https://rzp.io/rzp/90tjveeR";
  const navigate = useNavigate();

  const handlePayment = () => {
    // Redirect user to the Razorpay payment URL
    window.location.href = demoPage;
    console.log("clicked");
  };

  

  return (
    <>
      {/* Render the iframe for preview */}
      {showPreview && (
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
        

          {/* Watermark Overlay */}
          <div
            className="watermark position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              pointerEvents: "none", // Ensure it's not interactable
              zIndex: 2, // Overlay over the iframe
              fontSize: "2rem",
              color: "white", // Light gray watermark
              textAlign: "center",
              userSelect: "none", // Prevent text selection
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ background: "red", padding: "10px", width: "100%" }}>
              Biomate
            </span>
          </div>

          {/* Main Preview Component */}
          <div style={{ flexGrow: 1, overflow: "auto" }}>
            <ViewProfile isPreviewPage={true} />
          </div>

          {/* Footer with Button */}
          <div className="text-center mt-auto" style={{ padding: "20px" }}>
            <button
              onClick={handlePayment}
              style={{
                zIndex: 1000,
                width: "100%", // Full-width button at the bottom
                padding: "10px",
                fontSize: "1.25rem",
              }}
            >
              Pay 199
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPreviewPage;

