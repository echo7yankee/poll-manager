import React from "react";
import "../polls.css";

const PollResultItem = ({ answers, PollResultSelected }) => {
  const renderPollResultSelected = (id, value) => {
    if (PollResultSelected === "radio-2") {
      return (
        <li key={id}>
          {value === "" ? null : (
            <label>
              <input type="checkbox" /> {value}
            </label>
          )}
        </li>
      );
    } else if (PollResultSelected === "radio-3") {
      return (
        <li key={id}>
          {value === "" ? null : (
            <label>
              <input type="radio" /> {value}
            </label>
          )}
        </li>
      );
    }
  };

  return (
    <ul className="polls-list">
      {answers.map(answer => {
        return renderPollResultSelected(answer.id, answer.value);
      })}
    </ul>
  );
};

export default PollResultItem;
