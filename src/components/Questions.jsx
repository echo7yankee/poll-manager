import React, { Component } from "react";
import Question from "./Question";
import "./polls.css";
import "./PollQuestions/pollsQuestion.css";
import "./buttons.css";

import uuid from "uuid";
import { connect } from "react-redux";

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: this.props.questions,
      results: [],
      name: "",
      showMessage: false,
      inputDisabled: false
    };
  }

  handleInputChange = value => {
    this.setState({
      name: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;

    let formHasErrors;

    formHasErrors = this.state.questions.some(question => {
      return question.required === true && question.isChecked === false;
    });

    if (formHasErrors === true || name === "") {
      const { questions } = this.state;

      questions.map(question => {
        const indexQuestions = questions.findIndex(questionId => {
          return questionId.id === question.id;
        });

        questions[indexQuestions] = {
          ...questions[indexQuestions],
          showError: true
        };

        this.setState({
          questions
        });

        return indexQuestions;
      });

      return;
    }

    const resultAnswers = this.state.questions.map(question => {
      const results = {
        value: question.value,
        checked: question.checked,
        selected: question.selected,
        required: question.required,
        id: uuid(),
        toggleAnswers: false
      };

      return results;
    });

    const date = new Date().toLocaleString();

    const users = {
      name,
      date,
      id: uuid()
    };

    this.setState(
      {
        results: {
          resultAnswers,
          users,
          id: uuid(),
          toggle: false
        },
        name: "",
        showMessage: true,
        inputDisabled: true
      },
      () => {
        let retrievedResults = localStorage.getItem("results");
        if (retrievedResults === null) {
          retrievedResults = [];
        } else {
          retrievedResults = JSON.parse(retrievedResults);
        }
        let resultsArr = retrievedResults.concat(this.state.results);
        localStorage.setItem("results", JSON.stringify(resultsArr));
      }
    );
  };

  setRadio = (value, id) => {
    const newQuestions = this.state.questions.map(question => {
      if (question.id === id) {
        question = {
          ...question,
          selected: value,
          isChecked: true
        };
      }

      return question;
    });

    this.setState({
      questions: newQuestions
    });
  };

  setCheckbox = (e, id) => {
    const selectedValue = e.target.value;

    const newQuestions = this.state.questions.map(question => {
      if (question.id === id) {
        if (e.target.checked === true) {
          question = {
            ...question,
            checked: [
              ...question.checked,
              { id: uuid(), checkedValue: selectedValue }
            ],
            isChecked: true
          };
        } else {
          const selectedValueIndex = question.checked.indexOf(selectedValue);

          question.checked.splice(selectedValueIndex, 1);

          question = {
            ...question,
            checked: question.checked,
            isChecked: true
          };
        }
      }

      return question;
    });

    this.setState({
      questions: newQuestions
    });
  };

  deleteErrorMessage = id => {
    const newQuestions = this.state.questions.map(question => {
      if (question.id === id) {
        question = {
          ...question,
          showError: false
        };
      }
      return question;
    });

    this.setState({
      questions: newQuestions
    });
  };

  render() {
    const { questions } = this.state;

    const questionsRequired = questions.filter(question => {
      return question.required === true;
    });
    const questionsChecked = questions.filter(question => {
      return question.required === true && question.isChecked === true;
    });

    return questions.length === 0 ? (
      <div className="container-center container-center--transparent">
        <span>Questions list is empty</span>
      </div>
    ) : (
      <div className="container">
        {questionsRequired.length === 0 ? null : (
          <div className="questions__status-container container-center--border">
            <span>
              You have {questionsChecked.length} out of{" "}
              {questionsRequired.length} questions to answer
            </span>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="container-center container-center--border">
              <input
                type="text"
                className="polls-input polls-input--questions"
                placeholder="Name"
                required
                onChange={e => this.handleInputChange(e.target.value)}
              />
            </div>
            {questions.map(question => {
              return (
                <div
                  key={question.id}
                  className="polls__container-question
              polls__container-question-gap"
                >
                  <Question
                    deleteErrorMessage={this.deleteErrorMessage}
                    question={question}
                    setRadio={this.setRadio}
                    setCheckbox={this.setCheckbox}
                    selected={question.selected}
                    inputDisabled={this.state.inputDisabled}
                  />
                </div>
              );
            })}
            <div className="container-center">
              <div className="questions__show-message">
                {this.state.showMessage && (
                  <span>Thank you! Your form has been submitted</span>
                )}
              </div>
              <button
                className={
                  this.state.inputDisabled
                    ? "polls-button submit-questions--disabled"
                    : "polls-button submit-questions poll-button--hover"
                }
                disabled={this.state.inputDisabled}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <div>Hint: All questions with * are required</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questionsReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(Questions);
