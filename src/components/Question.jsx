import React, { Component } from "react";

import PollQuestionChoices from "./PollQuestions/PollQuestionChoices";
import uuid from "uuid";

import { YES_NO, YES, NO } from "./types";

import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import RadioInput from "./reusableComponents/RadioInput";

class Question extends Component {
  state = {
    question: this.props.question
  };

  renderAnswers = () => {
    const { type, answers, selected } = this.state.question;
    const { question } = this.state;

    if (type === YES_NO) {
      return (
        <div className="polls__answers-yesNo">
          <RadioInput
            name={question.id}
            value={YES}
            type={this.props.selected === YES}
            onChange={e => this.props.setRadio(e.target.value, question.id)}
            text={"Yes"}
          />
          <RadioInput
            name={question.id}
            value={NO}
            type={this.props.selected === NO}
            onChange={e => this.props.setRadio(e.target.value, question.id)}
            text={"No"}
          />
        </div>
      );
    } else {
      return (
        <PollQuestionChoices
          question={question}
          type={type}
          answers={answers}
          id={this.state.question.id}
          setRadio={this.props.setRadio}
          setCheckbox={this.props.setCheckbox}
          selected={this.props.selected}
          checked={this.props.checked}
        />
      );
    }
  };

  render() {
    const { value } = this.state.question;

    return (
      <div className="polls__question">
        <label className="polls-label">Question:</label>
        <p className="polls-text">{value}</p>

        <div className="polls__questions polls__question--colstart2">
          {this.renderAnswers()}
        </div>
      </div>
    );
  }
}

export default Question;
