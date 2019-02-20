import React, { Component } from "react";
import Question from "./Question";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import "./buttons.css";

class Polls extends Component {
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

  render() {
    const { questions } = this.state;

    return (
      <div className="questions__container">
        {questions.map(question => {
          return (
            <div
              key={question.id}
              className="polls__container-question
                polls__container-question-gap"
            >
              <Question question={question} />
            </div>
          );
        })}
        <div className="question__container-button" />
      </div>
    );
  }
}

export default Polls;
