import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { colors } from "../theme/theme"; // Ensure your colors are defined in your theme file

const Navbar = ({ title, isBack = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({}); // State for user profile
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // Decode JWT and set user profile
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        setUserProfile({
          name: decodedToken.name || "User",
          email: decodedToken.email || "No email provided",
          mobile: decodedToken.mobile || "No mobile provided",
          initial: getInitials(decodedToken.name),
        });
      } catch (error) {
        console.error("Invalid token", error);
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
  }, [token]);
  console.log("userProfile", token);
  // Toggle Sidebar (if required)
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Get initials from user's name
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "U"; // Default to "U" for User
    const nameParts = name.trim().split(" ");
    return nameParts.length > 1
      ? nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
      : nameParts[0][0].toUpperCase();
  };

  // Handle Back Navigation
  const handleBack = () => {
    navigate(`/home`); // Adjust the path if necessary
  };

  return (
    <div
      className="text-dark p-2 d-flex justify-content-between align-items-center sticky-top"
      style={{ background: "#ff4d4f" }}
    >
      {isBack && (
        <button
          className="btn btn-link text-dark"
          onClick={handleBack}
          style={{ fontSize: "1.2rem" }}
        >
          <FaTimes /> Back
        </button>
      )}
      <h3 className="fs-4 fw-semibold text-dark mb-0">{title}</h3>
      {userProfile ? (
        <div
          className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center"
          style={{
            fontSize: "15px",
            background: colors.White,
            width: "2rem",
            height: "2rem",
          }}
          title={`${userProfile.name} (${userProfile.email})`}
        >
          {userProfile.initial}
        </div>
      ) : (
        <div
          className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center"
          style={{
            fontSize: "15px",
            background: colors.White,
            width: "2rem",
            height: "2rem",
          }}
          title="Guest User"
        >
          U
        </div>
      )}
    </div>
  );
};

export default Navbar;
