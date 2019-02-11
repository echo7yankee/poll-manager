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
        <div>
          <label>
            <input type="radio" disabled /> Yes
          </label>
          <label>
            <input type="radio" disabled /> No
          </label>
        </div>
      );
    } else {
      return <PollQuestionChoices type={type} answers={answers} />;
    }
  };

  return (
    <div className="polls__questions-container">
      <div className="polls__counter">
        <span className="polls__counter-item">{index}</span>
      </div>
      <div className="polls__questions">
        <label className="polls-label">Question:</label>
        <div className="polls-text-container">
          <p className="polls-text">{value}</p>
        </div>
      </div>
      <div className="polls__inputs-container">
        <label className="polls-label">Answers:{renderAnswers()}</label>
      </div>
      <div className="btn-icons">
        <BtnEdit onClick={toggleEditable} />
        <BtnDelete onClick={handleDeleteQuestion} imgClassName={"btn-delete"} />
      </div>
    </div>
  );
};

export default PollQuestion;
