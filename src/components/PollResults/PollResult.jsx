import React from "react";
import PollResultItem from "./PollResultItem";

import "../polls.css";
import "./pollsResult.css";
import "../reusableStyle.css";

const PollResult = ({ question, answers, index, handleDeleteResult }) => {
  console.log(answers);

  const renderAnswers = () => {
    if (typeof answers === "string") {
      return (
        <div>
          <label>
            <input type="radio" /> Yes
          </label>
          <label>
            <input type="radio" /> No
          </label>
        </div>
      );
    } else {
      return (
        <div className="polls-list-container">
          <PollResultItem answers={answers} />
        </div>
      );
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
          <p className="polls-text">{question}</p>
        </div>
      </div>
      <div className="polls__inputs-container">
        <label className="polls-label">Answers:{renderAnswers()}</label>
      </div>

      <div className="btn-icons">
        <span className="btn-edit">
          <i className="fas fa-pencil-alt pencil-size" />
        </span>

        <span className="btn-delete" onClick={handleDeleteResult}>
          <i className="fas fa-times" />
        </span>
      </div>
    </div>
  );
};

export default PollResult;
