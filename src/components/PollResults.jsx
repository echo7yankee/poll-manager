import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("questionsResults") !== null) {
      this.state = {
        questions: JSON.parse(localStorage.getItem("questionsResults")),
        users: JSON.parse(localStorage.getItem("users")),
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
    console.log(this.state.users);

    return (
      <div className="container">
        <div
          className="polls__container-question polls__container-question--date"
          onClick={this.toggleQuestions}
        >
          {this.state.users.map(user => {
            return (
              <div key={user.id}>
                <p>Name: {user.name}</p>
                <p className="polls-row--2">Date: {user.date}</p>
              </div>
            );
          })}
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
