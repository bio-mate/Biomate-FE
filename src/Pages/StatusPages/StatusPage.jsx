import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.titleColor || "#e74c3c"};
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => props.buttonColor || "#e74c3c"};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#c0392b"};
  }
`;

const StatusPage = ({ title, message, buttonText, redirectUrl, titleColor, buttonColor, hoverColor }) => {
  const navigate = useNavigate(``)
 
    const handleRedirect = () => {
        navigate(`${redirectUrl}`)  ;
  };

  return (
    <StatusContainer>
      <Title titleColor={titleColor}>{title}</Title>
      <Message>{message}</Message>
      <Button buttonColor={buttonColor} hoverColor={hoverColor} onClick={handleRedirect}>
        {buttonText}
      </Button>
    </StatusContainer>
  );
};

export default StatusPage;
