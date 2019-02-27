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
        name: "",
        results: [],
        user: {}
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

    const { name } = this.state;
    const date = new Date().toLocaleString();

    if (name === "") {
      return;
    }

    this.setState(
      {
        questions: [...this.state.questions],
        user: { name: name, date: date }
      },
      () => {
        const updatedQuestionsStringify = JSON.stringify(this.state.questions);
        localStorage.setItem("questionsResults", updatedQuestionsStringify);

        const updatedUserStringify = JSON.stringify(this.state.user);
        localStorage.setItem("user", updatedUserStringify);
      }
    );

    console.log(this.state.questions);
  };

  setRadio = (value, id) => {
    const { questions } = this.state;

    const indexQuestion = questions.findIndex(question => {
      return question.id === id;
    });

    questions[indexQuestion] = {
      ...questions[indexQuestion],
      selected: value
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
        ]
      };
    } else {
      const selectedValueIndex = questions[indexQuestion].checked.indexOf(
        selectedValue
      );

      questions[indexQuestion].checked.splice(selectedValueIndex, 1);

      questions[indexQuestion] = {
        ...questions[indexQuestion],
        checked: questions[indexQuestion].checked
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
          <div className="container-center ">
            <input
              type="text"
              className="polls-input polls-input--questions"
              placeholder="Name"
              onChange={e => this.handleInputChange(e.target.value)}
            />
          </div>
          <div className="container">
            {questions.map(question => {
              return (
                <div
                  key={question.id}
                  className="polls__container-question
                polls__container-question-gap"
                >
                  <Question
                    handleSubmit={this.handleSubmit}
                    question={question}
                    handleRadioChange={this.handleRadioChange}
                    handleCheckboxChange={this.handleCheckboxChange}
                    setRadio={this.setRadio}
                    setCheckbox={this.setCheckbox}
                    selected={question.selected}
                    checked={question.checked}
                  />
                </div>
              );
            })}
          </div>
          <div className="container-center">
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
