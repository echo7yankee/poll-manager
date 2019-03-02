import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import PollResult from "./PollResult";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("questionsResults") !== null) {
      this.state = {
        questions: JSON.parse(localStorage.getItem("questionsResults")) || [],
        users: JSON.parse(localStorage.getItem("users")) || [],
        toggle: false
      };
    } else {
      this.state = {
        questions: [],
        users: []
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
        {this.state.users.map(user => {
          return (
            <div
              className="polls__container-question polls__container-question--date"
              onClick={this.toggleQuestions}
              key={user.id}
            >
              <p>Name: {user.name}</p>
              <p className="polls-row--2">Date: {user.date}</p>
            </div>
          );
        })}
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
                <PollResult question={question} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PollResults;
