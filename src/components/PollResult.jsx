import React from "react";

const PollResult = ({ question }) => {
  return (
    <div className="polls__question">
      <span>{question.value}</span>

      <ul className="poll-items">
        {question.checked.map(check => {
          return check.checkedValue === "" ? null : (
            <li key={check.id} className="poll-item">
              {check.checkedValue}
            </li>
          );
        })}
      </ul>
      <ul className="poll-items">
        {question.selected === "" ? null : (
          <li className="poll-item"> {question.selected}</li>
        )}
      </ul>
    </div>
  );
};

export default PollResult;
