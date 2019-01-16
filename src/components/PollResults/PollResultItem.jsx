import React from "react";
import "../polls.css";

const PollResultItem = ({ answers }) => {
  return (
    <ul className="polls-list">
      {answers.map(answer => {
        return (
          <li key={answer.id}>
            <label>
              <input type="checkbox" /> {answer.value}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default PollResultItem;
