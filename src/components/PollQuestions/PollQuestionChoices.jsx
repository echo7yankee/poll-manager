import React from "react";
import { MULTIPLE_CHOICE } from "../types";
import "../polls.css";

const PollQuestionChoices = ({
  question,
  type,
  answers,
  setRadio,
  setCheckbox,
  selected,
  id,
  inputDisabled
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
                required={
                  type === MULTIPLE_CHOICE
                    ? null
                    : question.required
                    ? true
                    : false
                }
                checked={
                  type === MULTIPLE_CHOICE ? null : selected === answer.value
                }
                disabled={inputDisabled}
                onChange={
                  type === MULTIPLE_CHOICE
                    ? e => setCheckbox(e, id)
                    : e => setRadio(e.target.value, id)
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
