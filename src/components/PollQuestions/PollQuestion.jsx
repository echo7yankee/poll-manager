import React from "react";

import PollQuestionChoices from "./PollQuestionChoices";
import { YES_NO } from "./types";
import { BtnEdit, BtnDelete } from "../reusableComponents/buttons";

import "./pollsQuestion.css";
import "../buttons.css";

const PollQuestion = ({ toggleEditable, handleDeleteQuestion, question }) => {
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
      return <PollQuestionChoices type={type} answers={answers} />;
    }
  };

  return (
    <>
      <form className="polls-form" onSubmit={e => e.preventDefault()}>
        <div className="polls__questions-container">
          <div className="polls__questions polls__questions-mt">
            <label className="polls-label">Question:</label>
            <p className="polls-text">{value}</p>
          </div>
          <div className="buttons__icon-container">
            <BtnEdit onClick={toggleEditable} spanClassName={"button-icon"} />
            <BtnDelete
              onClick={handleDeleteQuestion}
              imgClassName={"button-icon"}
            />
          </div>
        </div>
        <div className="polls__questions">
          <label className="polls-label">Answers:</label>
          {renderAnswers()}
        </div>
      </form>
    </>
  );
};

export default PollQuestion;
