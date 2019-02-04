import React from "react";
import "../polls.css";

const PollResultChoices = ({ type, answers }) => {
  return (
    <ul className="polls-list">
      {answers.map(answer => {
        return type === "MULTIPLE_CHOICE" ? (
          <li key={answer.id}>
            {answer.value === "" ? null : (
              <label>
                <input type="checkbox" disabled /> {answer.value}
              </label>
            )}
          </li>
        ) : (
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

export default PollResultChoices;
