import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomButton = ({
  label,
  onClick,
  type = "secondary", 
  className = "", 
}) => {
  // Map the `type` prop to Bootstrap button classes
  const buttonClass =
    type === "primary" ? "btn btn-danger" : "btn btn-outline-danger";

  return (
    <button
      type="button"
      className={`${buttonClass} ${className} w-100`} // Add className for additional customization and make it full width
      onClick={onClick}
    >
      {label}
    </button>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
  className: PropTypes.string,
};

CustomButton.defaultProps = {
  type: "secondary",
  className: "",
};

export default CustomButton;
