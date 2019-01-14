import React from "react";
import "../polls.css";
import "./pollsResults.css";

const PollResults = ({ value }) => {
  return (
    <div className="polls__results-container">
      <div className="polls__results">
        <label className="polls-label">Question:</label>
        <div className="polls-text-container">
          <p className="polls-text">{value}</p>
        </div>
      </div>
      <div className="polls__inputs-container">
        <label className="polls-label">Answers:</label>
      </div>
    </div>
  );
};

export default PollResults;
