// import React from 'react';
// import PropTypes from 'prop-types';
// import '../styles/ProgressBar.css'; // Assuming you keep your styles in a separate CSS file

// const ProgressBar = ({ currentStep, titles }) => {
//   // Calculate progress percentage based on the total number of steps
//   const progressPercentage = ((currentStep) / (titles.length)) * 100;

//   return (
//     <div className="progressbar">
//       <div
//         className="progress"
//         style={{ width: `${progressPercentage}%` }}
//       >
//         <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
//       </div>
      
//     </div>
//   );
// };

// ProgressBar.propTypes = {
//   currentStep: PropTypes.number.isRequired,
//   titles: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default ProgressBar;

// ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress }) => {
    // Ensure that the progress is a number between 0 and 100
    const normalizedProgress = Math.max(0, Math.min(progress || 0, 100)); // Fallback to 0 if progress is undefined

    return (
        <div style={{ width: '100%', backgroundColor: '#e0e0df' }}>
            <div
                style={{
                    height: '20px',
                    width: `${normalizedProgress}%`,
                    backgroundColor: '#3b5998', // Adjust as needed
                    transition: 'width 0.5s ease',
                }}
            />
        </div>
    );
};

export default ProgressBar;
