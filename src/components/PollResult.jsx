import React from "react";

const PollResult = ({ result }) => {
  return (
    <div className="polls__question">
      <span>{result.value}</span>

      <ul className="poll-items">
        {result.checked.map(check => {
          return check.checkedValue === "" ? null : (
            <li key={check.id} className="poll-item">
              {check.checkedValue}
            </li>
          );
        })}
      </ul>
      <ul className="poll-items">
        {result.selected === "" ? null : (
          <li className="poll-item"> {result.selected}</li>
        )}
      </ul>
    </div>
  );
};

export default PollResult;
