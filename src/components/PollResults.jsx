import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("questions") !== null) {
      this.state = {
        questions: JSON.parse(localStorage.getItem("questionsResults")),
        user: JSON.parse(localStorage.getItem("user")),
        toggle: false
      };
    } else {
      this.state = {
        questions: [],
        user: {}
      };
    }
  }

  toggleQuestions = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  render() {
    return (
      <div className="container">
        <div
          className="polls__container-question polls__container-question--date"
          onClick={this.toggleQuestions}
        >
          <p>Name: {this.state.user.name}</p>
          <p className="polls-row--2">Date: {this.state.user.date}</p>
        </div>
        <div
          className={
            this.state.toggle
              ? "questions__results--show"
              : "questions__results--hide"
          }
        >
          {this.state.questions.map(question => {
            return (
              <div key={question.id} className="polls__container-question">
                <div className="polls__question">
                  <span>{question.value}</span>

                  <ul className="poll-items">
                    {question.checked.map(check => {
                      return check.checkedValue === "" ? null : (
                        <li key={check.id} className="poll-item">
                          {check.checkedValue}
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="poll-items">
                    {question.selected === "" ? null : (
                      <li className="poll-item"> {question.selected}</li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PollResults;
