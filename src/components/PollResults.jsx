import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import PollResult from "./PollResult";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("results") !== null) {
      this.state = {
        results: JSON.parse(localStorage.getItem("results")) || []
      };
    } else {
      this.state = {
        results: []
      };
    }
  }

  toggleQuestions = id => {
    const { results } = this.state;
    const indexResults = results.findIndex(result => {
      return result.id === id;
    });

    results[indexResults] = {
      ...results[indexResults],
      toggle: !results[indexResults].toggle
    };

    this.setState({
      results
    });
  };

  render() {
    return (
      <>
        {this.state.results.length === 0 && (
          <div className="container-center container-center--results">
            <div className="questions__show-message">
              <span>Poll results is empty</span>
            </div>
          </div>
        )}
        <div className="container">
          {this.state.results.map(result => {
            return (
              <div key={result.users.id}>
                <div
                  className="polls__container-question polls__container-question--date"
                  onClick={() => this.toggleQuestions(result.id)}
                >
                  <p>Name: {result.users.name}</p>
                  <p className="polls-row--2">Date: {result.users.date}</p>
                </div>

                <div
                  className={
                    result.toggle
                      ? "questions__results--show"
                      : "questions__results--hide"
                  }
                >
                  {result.resultAnswers.map(result => {
                    return (
                      <div
                        key={result.id}
                        className="polls__container-question"
                      >
                        <PollResult result={result} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default PollResults;
