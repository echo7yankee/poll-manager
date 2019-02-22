import React, { Component } from "react";

import PollQuestionChoices from "./PollQuestions/PollQuestionChoices";
//import RadioInput from "./reusableComponents/RadioInput";

import { YES_NO, YES, NO } from "./types";

import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import RadioInput from "./reusableComponents/RadioInput";

class Question extends Component {
  state = {
    question: this.props.question,
    selected: "",
    checked: []
  };

  handleRadioChange = value => {
    this.setState({
      selected: value
    });
  };

  handleCheckboxChange = e => {
    const checkedArray = this.state.checked;
    const selectedValue = e.target.value;

    if (e.target.checked === true) {
      this.setState({
        checked: [...checkedArray, selectedValue]
      });
    } else {
      const selectedValueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(selectedValueIndex, 1);
      this.setState({
        checked: checkedArray
      });
    }
  };

  submitResults = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;

    const results = {
      selected: this.state.selected,
      checked: this.state.checked
    };

    handleSubmit(results);
  };

  renderAnswers = () => {
    const { type, answers } = this.state.question;
    const { question, selected } = this.state;

    if (type === YES_NO) {
      return (
        <div className="polls__answers-yesNo">
          <RadioInput
            name={question.id}
            value={YES}
            type={selected === YES}
            onChange={e => this.handleRadioChange(e.target.value)}
            text={"Yes"}
          />
          <RadioInput
            name={question.id}
            value={NO}
            type={selected === NO}
            onChange={e => this.handleRadioChange(e.target.value)}
            text={"No"}
          />
        </div>
      );
    } else {
      return (
        <PollQuestionChoices
          type={type}
          answers={answers}
          id={this.state.question.id}
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
    console.log(this.state.checked);

    return (
      <form onSubmit={this.submitResults}>
        <div className="polls__question">
          <label className="polls-label">Question:</label>
          <p className="polls-text">{value}</p>

          <div className="polls__questions polls__question--colstart2">
            {this.renderAnswers()}
          </div>

          <button
            type="submit"
            className="polls-button yes-poll poll-button--hover"
          >
            Check
          </button>
        </div>
      </form>
    );
  }
}

export default Question;
