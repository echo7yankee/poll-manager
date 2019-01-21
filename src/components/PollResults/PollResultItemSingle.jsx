import React from "react";
import "../polls.css";

const PollResultItemSingle = ({ answersSingle }) => {
  return (
    <ul className="polls-list">
      {answersSingle.map(answer => {
        return (
          <li key={answer.id}>
            {answer.value === "" ? null : (
              <label>
                <input type="radio" disabled /> {answer.value}
              </label>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PollResultItemSingle;
