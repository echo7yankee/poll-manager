import React from "react";
import { MULTIPLE_CHOICE } from "./types";
import "../polls.css";

const PollQuestionChoices = ({ type, answers }) => {
  return (
    <ul className="polls__radio-container polls__answers">
      {answers.map(answer => {
        return (
          <li key={answer.id}>
            <label>
              <input
                type={type === MULTIPLE_CHOICE ? "checkbox" : "radio"}
                className="polls-radio"
                disabled
              />
              {answer.value}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default PollQuestionChoices;
