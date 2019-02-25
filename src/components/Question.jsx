import React, { Component } from "react";

import PollQuestionChoices from "./PollQuestions/PollQuestionChoices";
import uuid from "uuid";

import { YES_NO, YES, NO } from "./types";

import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import RadioInput from "./reusableComponents/RadioInput";

class Question extends Component {
  state = {
    question: this.props.question,
    selected: "",
    selectedYesNo: "",
    checked: []
  };

  setSingleRadio = value => {
    this.setState({
      selected: value
    });
  };

  setYesNoRadio = value => {
    this.setState({
      selectedYesNo: value
    });
  };

  setCheckbox = e => {
    const checkedArray = this.state.checked;
    const selectedValue = e.target.value;

    if (e.target.checked === true) {
      this.setState({
        checked: [...checkedArray, { id: uuid(), checkedValue: selectedValue }]
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
      selectedYesNo: this.state.selectedYesNo,
      checked: this.state.checked,
      questionValue: this.state.question.value
    };

    handleSubmit(results);
  };

  renderAnswers = () => {
    const { type, answers } = this.state.question;
    const { question, selectedYesNo } = this.state;

    if (type === YES_NO) {
      return (
        <div className="polls__answers-yesNo">
          <RadioInput
            name={question.id}
            value={YES}
            type={selectedYesNo === YES}
            onChange={e => this.setYesNoRadio(e.target.value)}
            text={"Yes"}
          />
          <RadioInput
            name={question.id}
            value={NO}
            type={selectedYesNo === NO}
            onChange={e => this.setSingleRadio(e.target.value)}
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
          setSingleRadio={this.setSingleRadio}
          setCheckbox={this.setCheckbox}
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
