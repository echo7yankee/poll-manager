import React from "react";
import { MULTIPLE_CHOICE } from "./types";
import "../polls.css";

const PollQuestionChoices = ({ type, answers }) => {
  return (
    <ul>
      {answers.map(answer => {
        return (
          <li key={answer.id}>
            <label className="polls__answers">
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
