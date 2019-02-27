import React from "react";

import PollQuestionChoices from "./PollQuestions/PollQuestionChoices";

import { YES_NO, YES, NO } from "./types";

import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import RadioInput from "./reusableComponents/RadioInput";

const Question = ({ question, setRadio, setCheckbox, selected }) => {
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
          />
          <RadioInput
            name={question.id}
            value={NO}
            type={selected === NO}
            onChange={e => setRadio(e.target.value, question.id)}
            text={"No"}
          />
        </div>
      );
    } else {
      return (
        <PollQuestionChoices
          type={question.type}
          answers={question.answers}
          id={question.id}
          setRadio={setRadio}
          setCheckbox={setCheckbox}
          selected={selected}
        />
      );
    }
  };

  return (
    <div className="polls__question">
      <label className="polls-label">Question:</label>
      <p className="polls-text">{question.value}</p>

      <div className="polls__questions polls__question--colstart2">
        {renderAnswers()}
      </div>
    </div>
  );
};

export default Question;
