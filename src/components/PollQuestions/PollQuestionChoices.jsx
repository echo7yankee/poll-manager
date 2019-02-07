import React from "react";
import { MULTIPLE_CHOICE } from "./types";
import "../polls.css";

const PollQuestionChoices = ({ type, answers }) => {
  return (
    <ul className="polls-list">
      {answers.map(answer => {
        return (
          <li key={answer.id}>
            <label>
              <input
                type={type === MULTIPLE_CHOICE ? "checkbox" : "radio"}
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
