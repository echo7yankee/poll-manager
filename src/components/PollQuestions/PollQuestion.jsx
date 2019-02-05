import React from "react";
import PollQuestionChoices from "./PollQuestionChoices";

import "../polls.css";
import "./pollsResult.css";
import "../reusableStyle.css";

const PollQuestion = ({
  index,
  toggleEditable,
  handleDeleteQuestion,
  questions
}) => {
  const { answers, type, value } = questions;

  const renderAnswers = () => {
    if (type === "YES_NO") {
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
    <div className="polls__results-container">
      <div className="polls__counter">
        <span className="polls__counter-item">{index}</span>
      </div>
      <div className="polls__results">
        <label className="polls-label">Question:</label>
        <div className="polls-text-container">
          <p className="polls-text">{value}</p>
        </div>
      </div>
      <div className="polls__inputs-container">
        <label className="polls-label">Answers:{renderAnswers()}</label>
      </div>

      <div className="btn-icons">
        <span className="btn-edit" onClick={toggleEditable}>
          <i className="fas fa-pencil-alt pencil-size" />
        </span>

        <span className="btn-delete" onClick={handleDeleteQuestion}>
          <i className="fas fa-times" />
        </span>
      </div>
    </div>
  );
};

export default PollQuestion;
