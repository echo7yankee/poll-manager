import React from "react";
import PollQuestionChoices from "./PollQuestionChoices";

import { YES_NO } from "./types";
import { BtnEdit, BtnDelete } from "../reusableComponents/buttons";

import "../polls.css";
import "./pollsQuestion.css";
import "../reusableStyle.css";

const PollQuestion = ({
  index,
  toggleEditable,
  handleDeleteQuestion,
  question
}) => {
  const { answers, type, value } = question;

  const renderAnswers = () => {
    if (type === YES_NO) {
      return (
        <div className="polls__answers-yesNo">
          <label>
            <input type="radio" className="polls-radio" disabled /> Yes
          </label>
          <label>
            <input
              type="radio"
              className="polls-radio polls-radio-ml"
              disabled
            />{" "}
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
        <div className="polls__questions polls__questions-mt">
          <label className="polls-label">Question:</label>
          <p className="polls-text">{value}</p>
        </div>
        <div className="polls__questions">
          <label className="polls-label">Answers:</label>
          {renderAnswers()}
        </div>
        <div className="btn-icons">
          <BtnEdit onClick={toggleEditable} spanClassName={"btn-edit"} />
          <BtnDelete
            onClick={handleDeleteQuestion}
            imgClassName={"btn-delete"}
          />
        </div>
      </form>
    </>
  );
};

export default PollQuestion;
