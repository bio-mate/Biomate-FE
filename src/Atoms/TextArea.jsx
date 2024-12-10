import React, { useState } from "react";
import styled from "styled-components";

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid ${(props) => (props.error ? "red" : "#ccc")};
  border-radius: 5px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${(props) => (props.error ? "red" : "blue")};
    box-shadow: 0 0 5px ${(props) => (props.error ? "red" : "blue")};
  }
`;

const WordCount = styled.p`
  font-size: 12px;
  color: ${(props) => (props.exceedLimit ? "red" : "gray")};
  margin: 0;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
  margin: 0;
`;

const TextArea = ({ label, value, onChange, maxWords = 1000, placeholder, error, icon }) => {
  const wordCount = value.trim().split(/\s+/).filter((word) => word).length;
  const exceedLimit = wordCount > maxWords;

  return (
    <TextAreaWrapper>
      <LabelWrapper>
        {icon && <span>{icon}</span>}
        <label>{label}</label>
      </LabelWrapper>
      <StyledTextArea
        value={value}
        onChange={(e) => {
          if (!exceedLimit || e.target.value.trim().split(/\s+/).length <= maxWords) {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder}
        error={error || exceedLimit}
      />
      <WordCount exceedLimit={exceedLimit}>
        {exceedLimit
          ? `You have exceeded the word limit by ${wordCount - maxWords} words.`
          : `${maxWords - wordCount} words remaining.`}
      </WordCount>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TextAreaWrapper>
  );
};

export default TextArea;
