import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 20px; /* Rounded corners */
  border: 2px solid transparent;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  /* Primary button styling */
  background-color: ${({ typeProp }) => (typeProp === 'primary' ? '#ff4d4f' : '#ffffff')};
  color: ${({ typeProp }) => (typeProp === 'primary' ? '#ffffff' : '#ff4d4f')};
  border-color: ${({ typeProp }) => (typeProp === 'secondary' ? '#ff4d4f' : 'transparent')};

 
`;

const CustomButton = ({ 
  label, 
  onClick, 
  type = 'secondary', // Default type is secondary
  className = '' // Allow additional classes if needed
}) => {
  return (
    <StyledButton 
      type="button" 
      className={`btn ${className}`} 
      onClick={onClick} 
      typeProp={type} // Pass the type prop to StyledButton for dynamic styling
    >
      {label}
    </StyledButton>
  );
};

export default CustomButton;
