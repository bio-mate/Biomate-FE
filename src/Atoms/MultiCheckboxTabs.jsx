import React from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
`;

const Tab = styled.div`
  border: 2px solid red;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "red" : "transparent")};
  color: ${(props) => (props.selected ? "white" : "black")};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "darkred" : "rgba(255, 0, 0, 0.1)")};
  }
`;

const MultiCheckboxTabs = ({ options, selectedOptions, onChange, maxSelection }) => {
  const handleTabClick = (option) => {
    if (selectedOptions.includes(option)) {
      // Remove the option if already selected
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      // Add the option if not selected and within the limit
      if (selectedOptions.length < maxSelection) {
        onChange([...selectedOptions, option]);
      } else {
        alert(`You can select up to ${maxSelection} options only.`);
      }
    }
  };

  return (
    <TabsContainer>
      {options.map((option) => (
        <Tab
          key={option}
          selected={selectedOptions.includes(option)}
          onClick={() => handleTabClick(option)}
        >
          {option}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default MultiCheckboxTabs;
