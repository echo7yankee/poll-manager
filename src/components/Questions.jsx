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
        results: []
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

  handleSubmit = results => {
    const { name } = this.state;

    this.setState(
      {
        results: [...this.state.results, { ...results, id: uuid() }]
      },
      () => {
        let updatedResultsStringify = JSON.stringify(this.state.results);
        localStorage.setItem("results", updatedResultsStringify);
      }
    );

    // if (name === "") {
    //   console.log("Name input is empty");
    //   return;
    // }
  };

  render() {
    const { questions } = this.state;
    console.log(this.state.results);

    return (
      <div className="questions__container">
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="container-center">
          <input
            type="text"
            className="polls-input polls-input--questions"
            placeholder="Name"
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
                handleSubmit={this.handleSubmit}
                question={question}
                handleRadioChange={this.handleRadioChange}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            </div>
          );
        })}
        <div className="container-center">
          {/* <button
            onClick={this.handleSubmit}
            className="polls-button submit-questions poll-button--hover"
          >
            Submit
          </button> */}
        </div>
        {/* </form> */}
        <div className="question__container-button" />
      </div>
    );
  }
}

export default Questions;
