import React from "react";
import { MULTIPLE_CHOICE } from "../types";
import "../polls.css";

const PollQuestionChoices = ({
  question,
  setRadio,
  setCheckbox,
  selected,
  inputDisabled
}) => {
  return (
    <ul>
      {question.answers.map(answer => {
        const required =
          question.type === MULTIPLE_CHOICE
            ? null
            : question.required
            ? true
            : false;

        const checked =
          question.type === MULTIPLE_CHOICE ? null : selected === answer.value;

        const onChange =
          question.type === MULTIPLE_CHOICE
            ? e => setCheckbox(e, question.id)
            : e => setRadio(e.target.value, question.id);

        return (
          <li key={answer.id} className="radio__label-input--mt">
            <label className="polls__question-choices">
              <input
                type={question.type === MULTIPLE_CHOICE ? "checkbox" : "radio"}
                name={question.id}
                className="polls-radio"
                value={answer.value}
                required={required}
                checked={checked}
                disabled={inputDisabled}
                onChange={onChange}
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
