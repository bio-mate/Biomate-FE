import React from "react";
import { colors } from "../theme/theme";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate(`/landingPage`)
  }
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 shadow-lg z-50 mt-5"
      style={{ background: colors.Red }}
    >
      <div
        className="flex flex-col items-center cursor-pointer"
        style={{ color: "white", fontSize: "20px", textAlign: "center" }}
      >
        <span>Create Your Bio with US</span>
        <span style={{ marginLeft: "10px", textDecoration: "underline" }} onClick={handleClick}>
          {" "}
          Click here
        </span>
      </div>
    </div>
  );
};

export default Footer;
