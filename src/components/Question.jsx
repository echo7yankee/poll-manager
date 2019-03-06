import React from "react";

import PollQuestionChoices from "./PollQuestions/PollQuestionChoices";

import { YES_NO, YES, NO } from "./types";

import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import RadioInput from "./reusableComponents/RadioInput";

const Question = ({
  question,
  setRadio,
  setCheckbox,
  selected,
  inputDisabled
}) => {
  const renderAnswers = () => {
    if (question.type === YES_NO) {
      return (
        <div className="polls__answers-yesNo">
          <RadioInput
            name={question.id}
            value={YES}
            type={selected === YES}
            onChange={e => setRadio(e.target.value, question.id)}
            required={question.required ? true : false}
            text={"Yes"}
            inputDisabled={inputDisabled}
          />
          <RadioInput
            name={question.id}
            value={NO}
            type={selected === NO}
            onChange={e => setRadio(e.target.value, question.id)}
            inputDisabled={inputDisabled}
            text={"No"}
          />
        </div>
      );
    } else {
      return (
        <PollQuestionChoices
          question={question}
          setRadio={setRadio}
          setCheckbox={setCheckbox}
          inputDisabled={inputDisabled}
          selected={selected}
        />
      );
    }
  };

  return (
    <div className="polls__question">
      <label className="polls-label">
        {question.required ? "*Question:" : "Question:"}
      </label>
      <p className="polls-text">{question.value}</p>

      <div className="polls__questions polls__question--colstart2">
        {renderAnswers()}
      </div>
    </div>
  );
};

export default Question;
