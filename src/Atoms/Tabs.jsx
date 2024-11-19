import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 20px; /* Rounded corners */
  border: 2px solid transparent;
  cursor: pointer;
  width: max-content;
margin:5px;
  /* Primary button styling */
  background-color: #ff4d4f;
  color: #ffffff;
  border-color: transparent;
`;

const Tabs = ({ label }) => {
  return <StyledButton type="button">{label}</StyledButton>;
};

export default Tabs;
