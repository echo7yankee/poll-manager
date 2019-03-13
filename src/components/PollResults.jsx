import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import PollResult from "./PollResult";

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

  toggleResults = id => {
    const newResults = this.state.results.map(result => {
      if (result.id === id) {
        result = {
          ...result,
          toggle: !result.toggle
        };
      }
      return result;
    });

    this.setState({
      results: newResults
    });
  };

  // clearResults = () => {
  //   this.setState(
  //     {
  //       results: []
  //     },
  //     () => {
  //       const resultsStringify = JSON.stringify(this.state.results);
  //       localStorage.setItem("results", JSON.stringify(resultsStringify));
  //     }
  //   );
  // };

  render() {
    return (
      <>
        {this.state.results.length === 0 && (
          <div className="container-center container-center--transparent">
            <div className="questions__show-message">
              <span>Poll results is empty</span>
            </div>
          </div>
        )}
        <div className="container">
          {this.state.results.map(result => {
            return (
              <div key={result.users.id}>
                <PollResult
                  result={result}
                  toggleResults={this.toggleResults}
                />
              </div>
            );
          })}
          {/* <div className="container-center">
            <button
              className="polls-button submit-questions poll-button--hover"
              onClick={this.clearResults}
            >
              Clear
            </button>
          </div> */}
        </div>
      </>
    );
  }
}

export default PollResults;
