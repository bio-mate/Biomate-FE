import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const RequiredIndicator = styled.span`
  color: red;
  margin-left: 5px;
`;

const StyledInput = styled.input`
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

const TextInput = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  error, 
  required = false 
}) => (
  <InputContainer>
    <Label htmlFor={name}>
      {label}
      {required && <RequiredIndicator>*</RequiredIndicator>}
    </Label>
    <StyledInput
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      hasError={!!error}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </InputContainer>
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default TextInput;
