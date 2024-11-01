import React, { useState } from 'react';
import '../styles/InputField.css';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  required = false, 
  placeholder = '', 
  type = 'text', 
  errorMessage = 'This field is required.', 
  successMessage = 'Looks good!', 
  errorIcon = '❌', 
  successIcon = '✔️' 
}) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateInput = (value) => {
    if (required && !value) {
      setError(errorMessage);
      setIsValid(false);
    } else {
      setError('');
      setIsValid(true);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
    validateInput(value);
  };

  return (
    <div className={`input-container ${error ? 'error' : isValid ? 'valid' : ''}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={() => validateInput(value)}
      />
      {error && (
        <span className="error-message">
          {errorIcon} {error}
        </span>
      )}
      {isValid && (
        <span className="valid-icon">
          {successIcon} {successMessage}
        </span>
      )}
    </div>
  );
};

export default InputField;
