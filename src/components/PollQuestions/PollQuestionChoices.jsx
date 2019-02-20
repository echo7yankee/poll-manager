import React from "react";
import { MULTIPLE_CHOICE } from "../types";
import "../polls.css";

const PollQuestionChoices = ({
  type,
  answers,
  handleRadioChange,
  handleCheckboxChange,
  isRadioChecked,
  checked
}) => {
  return (
    <ul>
      {answers.map(answer => {
        return (
          <li key={answer.id}>
            <label>
              <input
                type={type === MULTIPLE_CHOICE ? "checkbox" : "radio"}
                name="answers"
                className="polls-radio"
                value={answer.value}
                checked={
                  type === MULTIPLE_CHOICE
                    ? checked.has(answer.value)
                    : isRadioChecked === answer.value
                }
                onChange={
                  type === MULTIPLE_CHOICE
                    ? e => handleCheckboxChange(e.target.value)
                    : e => handleRadioChange(e.target.value)
                }
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
