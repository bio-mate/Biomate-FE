import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RadioGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  margin: 10px 0;
  border: ${({ isSelected }) => (isSelected ? "2px solid blue" : "1px solid gray")};
  border-radius: 5px;
  width: 100%;
  transition: border-color 0.3s;
  background-color: ${({ isSelected }) => (isSelected ? "#f0f8ff" : "transparent")};

  img {
    width: 50px;
    margin-right: 10px;
  }

  input {
    display: none; // Hide the default radio button appearance
  }

  span {
    font-size: 18px;
  }
`;

const IconRadioGroup = ({ label, options, selectedValue, onChange, error }) => {
  return (
    <RadioGroupContainer>
      <h3>{label}</h3>
      {options.map((option) => (
        <RadioOption
          key={option.value}
          isSelected={selectedValue === option.value}
        >
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.icon && <img src={option.icon} alt={option.label} />}
          <span>{option.label}</span>
        </RadioOption>
      ))}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </RadioGroupContainer>
  );
};

IconRadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
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
