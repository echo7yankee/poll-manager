import React from "react";
import "../polls.css";

const PollResultItemMultiple = ({ answersMultiple }) => {
  return (
    <ul className="polls-list">
      {answersMultiple.map(answer => {
        return (
          <li key={answer.id}>
            {answer.value === "" ? null : (
              <label>
                <input type="checkbox" disabled /> {answer.value}
              </label>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PollResultItemMultiple;
