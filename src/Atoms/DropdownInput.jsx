import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DropdownContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const RequiredIndicator = styled.span`
  color: red;
  margin-left: 5px;
`;

const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ccc")};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const DropdownInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  error, 
  required = false 
}) => (
  <DropdownContainer>
    <Label htmlFor={name}>
      {label}
      {required && <RequiredIndicator>*</RequiredIndicator>}
    </Label>
    <StyledSelect
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      hasError={!!error}
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </DropdownContainer>
);

DropdownInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default DropdownInput;
