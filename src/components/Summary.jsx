import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Summary extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("results") !== null) {
      this.state = {
        results: JSON.parse(localStorage.getItem("results")),
        questions: this.props.questions
      };
    } else {
      this.state = {
        results: []
      };
    }
  }

  componentWillReceiveProps = nextProps => {
    console.log(nextProps);

    if (nextProps.questions !== undefined) {
      this.setState({
        questions: nextProps.questions
      });
    }
  };

  handleToggle = id => {
    const newQuestions = this.state.questions.map(question => {
      if (question.id === id) {
        question = {
          ...question,
          toggle: !question.toggle
        };
      }
      return question;
    });

    this.setState({
      questions: newQuestions
    });
  };

  render() {
    const { auth } = this.props;
    const { questions = [] } = this.state;

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <>
        {this.state.results.length === 0 && questions.length === 0 && (
          <div className="container-center container-center--transparent">
            <div className="questions__show-message">
              <span>Summary list is empty</span>
            </div>
          </div>
        )}
        <div className="container">
          {questions.map((question, index) => {
            return (
              <div key={question.id}>
                <div
                  className="polls__container-question polls__container-question--date"
                  onClick={() => this.handleToggle(question.id)}
                >
                  <span>{question.value}</span>
                </div>
                <div
                  className={
                    question.toggle
                      ? "questions__results--show"
                      : "questions__results--hide"
                  }
                >
                  {this.state.results.map(result => {
                    return (
                      <div
                        key={result.id}
                        className="polls__question polls__container-question"
                      >
                        <ul className="poll-items">
                          <li className="poll-item">
                            {result.users.name}:
                            {result.resultAnswers[index].selected}
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
    questions: state.firestore.ordered.questions,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([
    {
      collection: "questions",
      orderBy: ["createdAt"]
    }
  ])
)(Summary);
