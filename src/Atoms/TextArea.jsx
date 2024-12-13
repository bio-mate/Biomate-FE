import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const TextArea = ({
  label,
  value,
  onChange,
  maxWords = 1000,
  placeholder,
  error,
  icon,
}) => {
  const calculateWordCount = (text) => {
    if (!text) return 0; // Handle empty string
    return text.trim().split(/\s+/).length;
  };

  const wordCount = calculateWordCount(value);
  const exceedLimit = wordCount > maxWords;

  const handleInputChange = (e) => {
    const newText = e.target.value;
    if (!exceedLimit || calculateWordCount(newText) <= maxWords) {
      onChange(newText);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label d-flex align-items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </label>
      <textarea
        className={`form-control ${exceedLimit || error ? "is-invalid" : ""}`}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        aria-invalid={error || exceedLimit}
      ></textarea>
      <div className="form-text">
        {exceedLimit
          ? `Exceeded word limit by ${wordCount - maxWords} words.`
          : `${maxWords - wordCount} words remaining.`}
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxWords: PropTypes.number,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.element,
};

export default TextArea;
