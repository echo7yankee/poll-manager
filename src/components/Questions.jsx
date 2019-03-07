import React, { Component } from "react";
import Question from "./Question";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import "./buttons.css";

import uuid from "uuid";

class Questions extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("questions") !== null) {
      this.state = {
        questions: JSON.parse(localStorage.getItem("questions")),
        results: [],
        name: "",
        showMessage: false,
        showError: false,
        inputDisabled: false
      };
    } else {
      this.state = {
        questions: []
      };
    }
  }

  handleInputChange = value => {
    this.setState({
      name: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let formHasErrors;

    formHasErrors = this.state.questions.some(question => {
      return question.required === true && question.isChecked === false;
    });

    if (formHasErrors === true) {
      this.setState({
        showError: true
      });
      return;
    }

    const { name } = this.state;
    const date = new Date().toLocaleString();

    if (name === "") {
      return;
    }

    const resultAnswers = this.state.questions.map(question => {
      const results = {
        value: question.value,
        checked: question.checked,
        selected: question.selected,
        required: question.required,
        id: uuid()
      };

      return results;
    });

    const users = {
      name,
      date,
      id: uuid()
    };

    this.setState(
      {
        results: {
          resultAnswers,
          users,
          id: uuid(),
          toggle: false
        },
        name: "",
        showMessage: true,
        showError: false,
        inputDisabled: true
      },
      () => {
        let retrievedResults = localStorage.getItem("results");
        if (retrievedResults === null) {
          retrievedResults = [];
        } else {
          retrievedResults = JSON.parse(retrievedResults);
        }
        let resultsArr = retrievedResults.concat(this.state.results);
        localStorage.setItem("results", JSON.stringify(resultsArr));
      }
    );
  };

  setRadio = (value, id) => {
    const { questions } = this.state;

    const indexQuestion = questions.findIndex(question => {
      return question.id === id;
    });

    questions[indexQuestion] = {
      ...questions[indexQuestion],
      selected: value,
      isChecked: true
    };

    this.setState({
      questions
    });
  };

  setCheckbox = (e, id) => {
    const { questions } = this.state;
    const selectedValue = e.target.value;

    const indexQuestion = questions.findIndex(question => {
      return question.id === id;
    });

    if (e.target.checked === true) {
      questions[indexQuestion] = {
        ...questions[indexQuestion],
        checked: [
          ...questions[indexQuestion].checked,
          { id: uuid(), checkedValue: selectedValue }
        ],
        isChecked: true
      };
    } else {
      const selectedValueIndex = questions[indexQuestion].checked.indexOf(
        selectedValue
      );

      questions[indexQuestion].checked.splice(selectedValueIndex, 1);

      questions[indexQuestion] = {
        ...questions[indexQuestion],
        checked: questions[indexQuestion].checked,
        isChecked: false
      };
    }

    this.setState({
      questions
    });
  };

  render() {
    const { questions } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="container-center container-center--border">
              <input
                type="text"
                className="polls-input polls-input--questions"
                placeholder="Name"
                required
                onChange={e => this.handleInputChange(e.target.value)}
              />
            </div>
            {questions.map(question => {
              return (
                <div
                  key={question.id}
                  className="polls__container-question
                polls__container-question-gap"
                >
                  <Question
                    showError={this.state.showError}
                    question={question}
                    setRadio={this.setRadio}
                    setCheckbox={this.setCheckbox}
                    selected={question.selected}
                    inputDisabled={this.state.inputDisabled}
                  />
                </div>
              );
            })}
            <div className="container-center">
              <div className="questions__show-message">
                {this.state.showMessage && (
                  <span>Thank you! Your form has been submitted</span>
                )}
              </div>
              {/* <div className="questions__show-message">
                {this.state.showError && (
                  <span>
                    You need to complete all the questions that are required
                  </span>
                )}
              </div> */}
              <button
                className={
                  this.state.inputDisabled
                    ? "polls-button submit-questions--disabled"
                    : "polls-button submit-questions poll-button--hover"
                }
                disabled={this.state.inputDisabled}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="question__container-button" />
      </div>
    );
  }
}

export default Questions;
