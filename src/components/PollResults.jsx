import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("results") !== null) {
      this.state = {
        results: JSON.parse(localStorage.getItem("results"))
      };
    } else {
      this.state = {
        results: []
      };
    }
  }

  render() {
    console.log(this.state.results);

    return (
      <div className="questions__container">
        {this.state.results.map(result => {
          return (
            <div
              key={result.id}
              className="polls__container-question
            polls__container-question-gap"
            >
              <span>Question: {result.questionValue}</span>
              <span>Answers: </span>
              <ul>
                {result.checked.map(check => {
                  return check.checkedValue === "" ? null : (
                    <li key={check.id}>{check.checkedValue}</li>
                  );
                })}
              </ul>
              <ul>
                {result.selected === "" ? null : <li> {result.selected}</li>}
                {result.selectedYesNo === "" ? null : (
                  <li>{result.selectedYesNo}</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PollResults;
