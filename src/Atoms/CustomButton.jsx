import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/InputField.css'; // Optional custom styles

const CustomButton = ({ 
  label, 
  onClick, 
  type = 'secondary', // Default to secondary
  className = '' // Allow additional classes
}) => {
  const buttonClass = `btn ${type === 'primary' ? 'btn-success' : 'btn-danger'} ${className}`;

  return (
    <button type="button" className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
