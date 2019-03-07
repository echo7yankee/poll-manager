import React from "react";

import PollQuestionChoices from "./PollQuestions/PollQuestionChoices";

import { YES_NO, YES, NO } from "./types";
import { BtnDelete } from "./reusableComponents/buttonIcons";

import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import RadioInput from "./reusableComponents/RadioInput";

const Question = ({
  deleteErrorMessage,
  question,
  showError,
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
      {question.required === true ? (
        <div className="questions__show-message questions__show-message--col2">
          {question.showError && (
            <span className="question__show-message-error">
              <BtnDelete
                imgClassName={"button-icon--sm"}
                onClick={() => deleteErrorMessage(question.id)}
              />
              This question is required
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Question;
