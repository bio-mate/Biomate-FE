import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../theme/theme"; // Ensure your colors are defined in your theme file

const Navbar = ({ title, isBack = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Uncomment and use your user context as needed
  // const { currentUser } = useContext(UserAuthContext);
  // const user = currentUser;

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase(); // First initial
    }
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[1].charAt(0).toUpperCase() // Initials from first and last name
    );
  };

  // Uncomment and use your user profile logic
  // const userProfile = {
  //   name: user?.displayName || "User",
  //   email: user?.email,
  //   mobile: user?.mobile || "No mobile provided",
  //   initial: getInitials(user?.displayName),
  // };

  const handleBack = () => {
    navigate(`/home`);
  };

  return (
    <>
      <div
        className="bg-white text-dark p-2 d-flex justify-content-between align-items-center sticky-top"
        style={{ background: colors.Orange }}
      >
       
        <h3 className="fs-4 fw-semibold text-dark">{title}</h3>
        <div
          className="bg-white text-white rounded-circle d-flex align-items-center justify-content-center"
          style={{
            fontSize: "15px",
            background: colors.White,
            width: "2rem",
            height: "2rem",
          }}
        >
          {/* {userProfile.initial} */}
          {/* Uncomment when userProfile is available */}
        </div>
      </div>

    
    </>
  );
};

export default Navbar;
