import React from "react";
import { MULTIPLE_CHOICE } from "../types";
import "../polls.css";

const PollQuestionChoices = ({
  type,
  answers,
  handleRadioChange,
  handleCheckboxChange,
  selected,
  checked,
  id
}) => {
  return (
    <ul>
      {answers.map(answer => {
        return (
          <li key={answer.id} className="radio__label-input--mt">
            <label className="polls__question-choices">
              <input
                type={type === MULTIPLE_CHOICE ? "checkbox" : "radio"}
                name={id}
                className="polls-radio"
                value={answer.value}
                checked={
                  type === MULTIPLE_CHOICE ? null : selected === answer.value
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
