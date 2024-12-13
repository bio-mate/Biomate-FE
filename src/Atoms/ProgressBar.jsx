import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const ProgressBar = ({ currentStep, titles }) => {
  const progressPercentage = useMemo(() => {
    const percentage = (currentStep / titles.length) * 100;
    return Math.min(Math.max(percentage, 0), 100); // Clamp percentage between 0 and 100
  }, [currentStep, titles.length]);

  return (
    <div className="d-flex flex-column align-items-end my-2">
      <span className="text-muted small mb-1">
        {Math.round(progressPercentage)}% Completed
      </span>
      <div className="progress" style={{ width: "100%", height: "5px" }}>
        <div
          className="progress-bar bg-danger"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={Math.round(progressPercentage)}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProgressBar;
