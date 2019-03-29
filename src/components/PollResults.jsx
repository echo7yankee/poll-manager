import React, { Component } from "react";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class PollResults extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("results") !== null) {
      this.state = {
        results: JSON.parse(localStorage.getItem("results")),
        questions: this.props.questions
      };
    } else {
      this.state = {
        results: [],
        questions: []
      };
    }
  }

  handleToggle = id => {
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

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <>
        {this.state.results.length === 0 && this.state.questions.length === 0 && (
          <div className="container-center container-center--transparent">
            <div className="questions__show-message">
              <span>Poll results list is empty</span>
            </div>
          </div>
        )}
        <div className="container">
          {this.state.results.map(result => {
            return (
              <div key={result.id}>
                <div
                  className="polls__container-question polls__container-question--date"
                  onClick={() => this.handleToggle(result.id)}
                >
                  <span>{result.users.name}</span>
                  <span className="polls-row--2">{result.users.date}</span>
                </div>
                <div
                  className={
                    result.toggle
                      ? "questions__results--show"
                      : "questions__results--hide"
                  }
                >
                  {this.state.questions.map((question, index) => {
                    return (
                      <div
                        key={question.id}
                        className="polls__question polls__container-question"
                      >
                        <span>{question.value}</span>
                        <ul className="poll-items">
                          <li className="poll-item">
                            {result.resultAnswers[index].selected}
                          </li>
                          <li className="poll-item">
                            {result.resultAnswers[index].checked.map(check => {
                              return check.checkedValue + " ";
                            })}
                          </li>
                        </ul>
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

const mapStateToProps = state => {
  return {
    questions: state.questionsReducer,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(PollResults);
