import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  icon,
}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label d-flex align-items-center">
      {icon && <span className="me-2">{icon}</span>}
      {label}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`form-control ${error ? "is-invalid" : ""}`}
      aria-required={required}
      aria-invalid={!!error}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  icon: PropTypes.element,
};

TextInput.defaultProps = {
  type: "text",
  required: false,
  error: "",
  icon: null,
};

export default React.memo(TextInput);
