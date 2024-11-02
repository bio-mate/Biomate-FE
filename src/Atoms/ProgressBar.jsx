import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressBar.css'; // Assuming you keep your styles in a separate CSS file

const ProgressBar = ({ currentStep, titles }) => {
  // Calculate progress percentage based on the total number of steps
  const progressPercentage = ((currentStep) / (titles.length)) * 100;

  return (
    <div className="progressbar">
      <div
        className="progress"
        style={{ width: `${progressPercentage}%` }}
      >
        <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
      </div>
      
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProgressBar;