import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../theme/theme"; // Ensure your colors are defined in your theme file
//import UserAuthContext from "../context/AuthContext";
import { useUserContext } from "../context/userContext";
const Navbar = ({ title, isBack = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  // const { currentUser } = useContext(UserAuthContext);
  const { user, clearUser } = useUserContext();
  console.log("-------------", user);
  console.log("token", token)
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

  // User Profile Data
  // const userProfile = {
  //   name: currentUser?.displayName || "User",
  //   email: currentUser?.email || "No email provided",
  //   mobile: currentUser?.mobile || "No mobile provided",
  //   initial: getInitials(currentUser?.displayName),
  // };

  // Handle Back Navigation
  const handleBack = () => {
    navigate(`/home`); // Adjust the path if necessary
  };

  return (
    <div
      className=" text-dark p-2 d-flex justify-content-between align-items-center sticky-top"
      style={{ background: '#ff4d4f' }}
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
      <div
        className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center"
        style={{
          fontSize: "15px",
          background: colors.White,
          width: "2rem",
          height: "2rem",
        }}
        // title={`${userProfile.name} (${userProfile.email})`}
      >
        {/* {userProfile.initial} */}
      </div>
    </div>
  );
};

export default Navbar;
