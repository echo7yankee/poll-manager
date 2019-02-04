import React from "react";
import PollResultItemMultiple from "./PollResultItemMultiple";
import PollResultItemSingle from "./PollResultItemSingle";

import "../polls.css";
import "./pollsResult.css";
import "../reusableStyle.css";

const PollResult = ({
  value,
  index,
  toggleEditable,
  handleDeleteResult,
  answersYN,
  answersMultiple,
  answersSingle
}) => {
  const renderAnswers = () => {
    if (answersYN) {
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
    } else if (answersMultiple) {
      return (
        <div className="polls-list-container">
          <PollResultItemMultiple answersMultiple={answersMultiple} />
        </div>
      );
    } else if (answersSingle) {
      return (
        <div className="polls-list-container">
          <PollResultItemSingle answersSingle={answersSingle} />
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

        <span className="btn-delete" onClick={handleDeleteResult}>
          <i className="fas fa-times" />
        </span>
      </div>
    </div>
  );
};

export default PollResult;
