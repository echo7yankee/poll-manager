import React, { Component } from "react";

class Summary extends Component {
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

  toggleResults = (resultId, resultAnswerId) => {
    const newResults = this.state.results.map(result => {
      const newResultAnswers = result.resultAnswers.map(resultAnswer => {
        if (resultAnswer.id === resultAnswerId) {
          resultAnswer = {
            ...resultAnswer,
            toggleAnswers: !resultAnswer.toggleAnswers
          };
        }
        return resultAnswer;
      });
      if (result.id === resultId) {
        result = {
          ...result,
          resultAnswers: newResultAnswers
        };
      }
      return result;
    });

    this.setState({
      results: newResults
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.results.map(result => {
          return (
            <div key={result.id} className="">
              {result.resultAnswers.map(resultAnswer => {
                return (
                  <div key={resultAnswer.id}>
                    <div
                      key={resultAnswer.id}
                      className="polls__container-question polls__container-question--date"
                      onClick={() =>
                        this.toggleResults(result.id, resultAnswer.id)
                      }
                    >
                      <p>{resultAnswer.value}</p>
                    </div>

                    <div
                      className={
                        resultAnswer.toggleAnswers
                          ? "questions__results--show"
                          : "questions__results--hide"
                      }
                    >
                      <ul className="poll-items">
                        {resultAnswer.checked.map(check => {
                          return check.checkedValue === "" ? null : (
                            <li key={check.id} className="poll-item">
                              {check.checkedValue}
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="poll-items">
                        {resultAnswer.selected === "" ? null : (
                          <li className="poll-item">{resultAnswer.selected}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Summary;
