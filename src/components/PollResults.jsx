import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("results") !== null) {
      this.state = {
        results: JSON.parse(localStorage.getItem("results")),
        user: JSON.parse(localStorage.getItem("user"))
      };
    } else {
      this.state = {
        results: [],
        user: {}
      };
    }
  }

  render() {
    console.log(this.state.user);

    return (
      <div className="questions__container">
        <div className="polls-user">
          <span>Name: {this.state.user.name}</span>
          <span>Date: {this.state.user.date}</span>
        </div>
        {this.state.results.map(result => {
          return (
            <div key={result.id} className="polls__container-question">
              <div className="polls__question">
                <span>{result.questionValue}</span>

                <ul className="poll-items">
                  {result.checked.map(check => {
                    return check.checkedValue === "" ? null : (
                      <li key={check.id} className="poll-item">
                        {check.checkedValue}
                      </li>
                    );
                  })}
                </ul>
                <ul className="poll-items">
                  {result.selected === "" ? null : (
                    <li className="poll-item"> {result.selected}</li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PollResults;
