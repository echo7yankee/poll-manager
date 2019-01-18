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
      {answersMultiple.map(answer => {
        return (
          <li key={answer.id}>
            {answer.value === "" ? null : (
              <label>
                <input type="checkbox" /> {answer.value}
              </label>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PollResultItemMultiple;
