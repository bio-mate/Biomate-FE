import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const MultiCheckboxTabs = ({ options, selectedOptions, onChange, maxSelection }) => {
  const handleTabClick = (option) => {
    if (selectedOptions.includes(option)) {
      // Remove the option if already selected
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      // Add the option if not selected and within the limit
      if (selectedOptions.length < maxSelection) {
        onChange([...selectedOptions, option]);
      } else {
        // Replace with a toast or non-blocking feedback in production
        alert(`You can select up to ${maxSelection} options only.`);
      }
    }
  };

  return (
    <div className="d-flex flex-wrap gap-2 mt-2 mb-3" role="tablist">
      {options.map((option) => (
        <button
          key={option}
          role="tab"
          aria-selected={selectedOptions.includes(option)}
          className={`btn ${selectedOptions.includes(option) ? "btn-danger text-white" : "btn-outline-danger"}`}
          onClick={() => handleTabClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

MultiCheckboxTabs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  maxSelection: PropTypes.number.isRequired,
};

export default MultiCheckboxTabs;
