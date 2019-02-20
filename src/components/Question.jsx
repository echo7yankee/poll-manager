import React, { Component } from "react";

import PollQuestionChoices from "./PollQuestions/PollQuestionChoices";
//import RadioInput from "./reusableComponents/RadioInput";

import { YES_NO, YES, NO } from "./types";

import "./polls.css";
import "./PollQuestions/pollsQuestion.css";

class Question extends Component {
  state = {
    question: this.props.question,
    isRadioChecked: "",
    checked: new Set()
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleRadioChange = value => {
    this.setState({
      isRadioChecked: value
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
    console.log(this.state.question);

    if (type === YES_NO) {
      return (
        <div className="polls__answers-yesNo">
          <label className="radio__label-input">
            <input
              type="radio"
              name="YES/NO"
              className="polls-radio"
              value={YES}
              checked={this.state.isRadioChecked === YES}
              onChange={e => this.handleRadioChange(e.target.value)}
            />
            Yes
            {/* <RadioInput text={"Yes"} value={YES} type={question.type === YES} /> */}
          </label>
          <label className="radio__label-input">
            <input
              type="radio"
              name="YES/NO"
              className="polls-radio polls-radio-ml"
              value={NO}
              checked={this.state.isRadioChecked === NO}
              onChange={e => this.handleRadioChange(e.target.value)}
            />
            No
            {/* <RadioInput text={"No"} value={NO} type={question.type === NO} /> */}
          </label>
        </div>
      );
    } else {
      return (
        <PollQuestionChoices
          type={type}
          answers={answers}
          handleRadioChange={this.handleRadioChange}
          handleCheckboxChange={this.handleCheckboxChange}
          isRadioChecked={this.state.isRadioChecked}
          checked={this.state.checked}
        />
      );
    }
  };

  render() {
    const { value } = this.state.question;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="polls__question">
          <label className="polls-label">Question:</label>
          <p className="polls-text">{value}</p>

          <label className="polls-label polls-label--top">Answers:</label>
          <div className="polls__questions">{this.renderAnswers()}</div>
        </div>
        {/* <button className="polls-button submit-questions poll-button--hover">
          Submit
        </button> */}
      </form>
    );
  }
}

export default Question;
