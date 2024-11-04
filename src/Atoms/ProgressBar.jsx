import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 10px;
  position: relative;
`;

const ProgressPercentage = styled.div`
  color: black;
  font-size: 12px;
  margin-bottom: 10px;
  position: relative;
`;

const ProgressBarWrapper = styled.div`
  width: 100px;
  height: 5px;
  background-color: #e0e0e0;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const Progress = styled.div`
  position: absolute;
  height: 100%;
  background-color: #ff4d4f;
  width: ${({ progressPercentage }) => `${progressPercentage}%`};
  transition: width 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 10px;
`;

const ProgressBar = ({ currentStep, titles }) => {
  // Calculate progress percentage based on the total number of steps
  const progressPercentage = (currentStep / titles.length) * 100;

  return (
    <ProgressBarContainer>
      <ProgressPercentage>{Math.round(progressPercentage)}% Completed</ProgressPercentage>
      <ProgressBarWrapper>
        <Progress progressPercentage={progressPercentage}></Progress>
      </ProgressBarWrapper>
    </ProgressBarContainer>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProgressBar;
