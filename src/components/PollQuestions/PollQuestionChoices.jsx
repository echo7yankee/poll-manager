import React from "react";
import { SINGLE_CHOICE } from "./types";
import "../polls.css";

const PollQuestionChoices = ({ type, answers }) => {
  return (
    <ul className="polls-list">
      {answers.map(answer => {
        return type === SINGLE_CHOICE ? (
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

export default PollQuestionChoices;
