import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("results") !== null) {
      this.state = {
        results: JSON.parse(localStorage.getItem("results")),
        personalData: JSON.parse(localStorage.getItem("personalData"))
      };
    } else {
      this.state = {
        results: [],
        personalData: {}
      };
    }
  }

  render() {
    console.log(this.state.personalData);

    return (
      <div className="questions__container">
        Name: <span>{this.state.personalData.name}</span>
        <div className="polls-date">
          Date:
          {this.state.personalData.date.map((date, index) => {
            return (
              <div key={index}>
                <span>{date.day}</span>
                <span>{date.month}</span>
                <span>{date.year}</span>
                <span>{date.hour}</span>
                <span>{date.minute}</span>
              </div>
            );
          })}
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
