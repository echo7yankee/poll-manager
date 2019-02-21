import React, { Component } from "react";
import Question from "./Question";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import "./buttons.css";

class Questions extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("questions") !== null) {
      this.state = {
        questions: JSON.parse(localStorage.getItem("questions"))
      };
    } else {
      this.state = {
        questions: []
      };
    }
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { questions } = this.state;

    return (
      <div className="questions__container">
        <form onSubmit={this.handleSubmit}>
          {questions.map(question => {
            return (
              <div
                key={question.id}
                className="polls__container-question
                polls__container-question-gap"
              >
                <Question
                  question={question}
                  handleRadioChange={this.handleRadioChange}
                  handleCheckboxChange={this.handleCheckboxChange}
                  checked={this.state.checked}
                  isRadioChecked={this.state.isRadioChecked}
                />
              </div>
            );
          })}
          <div className="question__container-button">
            <button className="polls-button submit-questions poll-button--hover">
              Submit
            </button>
          </div>
        </form>
        <div className="question__container-button" />
      </div>
    );
  }
}

export default Questions;
