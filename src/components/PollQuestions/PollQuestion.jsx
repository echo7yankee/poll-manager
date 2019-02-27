import React from "react";

import PollQuestionChoices from "./PollQuestionChoices";
import { YES_NO } from "../types";
import { BtnEdit, BtnDelete } from "../reusableComponents/buttonIcons";

import "./pollsQuestion.css";
import "../buttons.css";
import "../polls.css";

const PollQuestion = ({
  toggleEditable,
  handleDeleteQuestion,
  question,
  inputDisabled
}) => {
  const { answers, type, value } = question;

  const renderAnswers = () => {
    if (type === YES_NO) {
      return (
        <div className="polls__answers-yesNo">
          <label className="radio__label-input">
            <input type="radio" className="polls-radio" disabled /> Yes
          </label>
          <label className="radio__label-input">
            <input
              type="radio"
              className="polls-radio polls-radio-ml"
              disabled
            />
            No
          </label>
        </div>
      );
    } else {
      return (
        <PollQuestionChoices
          type={type}
          answers={answers}
          inputDisabled={inputDisabled}
        />
      );
    }
  };

  return (
    <div className="polls__question">
      <label className="polls-label">Question:</label>
      <p className="polls-text">{value}</p>
      <div className="buttons__container-icons">
        <BtnEdit onClick={toggleEditable} spanClassName={"button-icon"} />
        <BtnDelete
          onClick={handleDeleteQuestion}
          imgClassName={"button-icon"}
        />
      </div>
      <label className="polls-label polls-label--top">Answers:</label>
      <div className="polls__questions">{renderAnswers()}</div>
    </div>
  );
};

export default PollQuestion;
