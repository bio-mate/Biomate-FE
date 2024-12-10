import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputContainer = styled.div`
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

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const IconWrapper = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
  font-size: 20px; /* Adjust the size of the icon as needed */
`;

const TextInput = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  error, 
  required = false ,
  icon
}) => (
  <InputContainer>
  <LabelContainer>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Label htmlFor={name}>
        {label}
        {required && <RequiredIndicator>*</RequiredIndicator>}
      </Label>
    </LabelContainer>
   
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
