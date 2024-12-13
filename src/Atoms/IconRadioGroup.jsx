import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const IconRadioGroup = ({ options, selectedValue, onChange, error }) => {
  return (
    <div className="mb-3">
      <div className="row g-3">
        {options.map((option) => (
          <div className="col-6" key={option.value}>
            <label
              className={`d-flex align-items-center p-2 border rounded ${
                selectedValue === option.value ? "border-primary bg-light" : "border-secondary"
              }`}
              style={{ cursor: "pointer" }}
            >
              <input
                type="radio"
                name="radio-group"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
                className="d-none"
                aria-checked={selectedValue === option.value}
              />
              {option.icon && (
                <img
                  src={option.icon}
                  alt={option.label}
                  className="me-2"
                  style={{ width: "50px" }}
                  loading="lazy"
                />
              )}
              <span className="fs-5">{option.label}</span>
            </label>
          </div>
        ))}
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

IconRadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.string, // URL or path to icon image
    })
  ).isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default IconRadioGroup;
