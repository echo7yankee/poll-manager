import React, { Component } from "react";

import PollQuestionChoices from "./PollQuestions/PollQuestionChoices";
//import RadioInput from "./reusableComponents/RadioInput";

import { YES_NO, YES, NO } from "./types";

import "./polls.css";
import "./PollQuestions/pollsQuestion.css";

class Question extends Component {
  state = {
    question: this.props.question,
    selected: "",
    checked: new Set()
  };

  handleRadioChange = value => {
    this.setState({
      selected: value
    });
  };

  handleCheckboxChange = value => {
    if (this.state.checked.has(value)) {
      this.state.checked.delete(value);
    } else {
      this.state.checked.add(value);
    }
    this.setState({ checked: new Set([...this.state.checked]) });
  };

  renderAnswers = () => {
    const { type, answers } = this.state.question;
    const { question, selected } = this.state;

    if (type === YES_NO) {
      return (
        <div className="polls__answers-yesNo">
          <label className="radio__label-input">
            <input
              type="radio"
              name={question.id}
              className="polls-radio"
              value={YES}
              checked={selected === YES}
              onChange={e => this.handleRadioChange(e.target.value)}
            />
            Yes
          </label>
          <label className="radio__label-input">
            <input
              type="radio"
              name={question.id}
              className="polls-radio polls-radio-ml"
              value={NO}
              checked={selected === NO}
              onChange={e => this.handleRadioChange(e.target.value)}
            />
            No
          </label>
        </div>
      );
    } else {
      return (
        <PollQuestionChoices
          id={this.state.question.id}
          type={type}
          answers={answers}
          handleRadioChange={this.handleRadioChange}
          handleCheckboxChange={this.handleCheckboxChange}
          selected={this.state.selected}
          checked={this.state.checked}
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

        <label className="polls-label polls-label--top">Answers:</label>
        <div className="polls__questions">{this.renderAnswers()}</div>
      </div>
    );
  }
}

export default Question;
