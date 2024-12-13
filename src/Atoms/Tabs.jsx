import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Tabs = ({ label }) => {
  return (
    <button
      type="button"
      className="btn btn-danger rounded-pill px-4 py-2 mx-1"
    >
      {label}
    </button>
  );
};

export default Tabs;
