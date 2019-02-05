import React, { Component } from "react";
import "./polls.css";

import Choices from "./CreateNewChoices/Choices.jsx";
import uuid from "uuid";

// @todo extract function
function createChoice() {
  return {
    id: uuid(),
    value: ""
  };
}

class PollForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: props.questions.answers,
      type: props.questions.type,
      questions: props.questions,
      renderError: false,
      value: props.questions.value
    };
  }

  // @todo remove "new"
  addNewChoice = () => {
    const { answers } = this.state;

    const updatedChoices = [...answers, createChoice()];
    this.setState({
      answers: updatedChoices
    });
  };

  // @todo remove "new"
  deleteNewChoice = id => {
    const { answers } = this.state;

    if (answers.length > 2) {
      const filteredChoices = answers.filter(newChoice => {
        return newChoice.id !== id;
      });

      this.setState({
        answers: filteredChoices
      });
    }
  };

  clearAllChoices = () => {
    this.setState({
      answers: [createChoice(), createChoice()]
    });
  };

  handleChoiceInput = (value, id) => {
    this.setState(prevState => {
      const answers = [...prevState.answers];
      const indexChoices = answers.findIndex((choice, index) => {
        return choice.id === id;
      });

      answers[indexChoices] = {
        ...answers[indexChoices],
        value: value
      };

      return { answers };
    });
  };

  handleQuestionInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  submitQuestion = e => {
    e.preventDefault();

    const { type, answers, value } = this.state;
    const { handleSubmit, questions } = this.props;

    if (value === "") {
      this.setState({
        renderError: true
      });
    } else {
      this.setState({
        renderError: false,
        value: ""
      });

      if (type === "YES_NO") {
        const updatedNewQuestions = {
          ...questions,
          value: value,
          answers: [createChoice(), createChoice()],
          type
        };

        this.setState({
          questions: updatedNewQuestions,
          answers: [createChoice(), createChoice()]
        });

        handleSubmit(updatedNewQuestions);
      } else if (type === "MULTIPLE_CHOICE") {
        answers.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedNewQuestions = {
              ...questions,
              value: value,
              answers: answers,
              type
            };

            this.setState({
              questions: updatedNewQuestions,
              answers: [createChoice(), createChoice()]
            });

            handleSubmit(updatedNewQuestions);
          }
        });
      } else if (type === "SINGLE_CHOICE") {
        answers.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedNewQuestions = {
              ...questions,
              value: value,
              answers: answers,
              type
            };

            this.setState({
              questions: updatedNewQuestions,
              answers: [createChoice(), createChoice()]
            });

            handleSubmit(updatedNewQuestions);
          }
        });
      }
    }
  };

  handleRadioInput = e => {
    this.setState({
      type: e.target.value
    });
  };

  renderChoicesComponent = () => {
    const { type, answers } = this.state;

    if (type === "YES_NO") {
      return null;
    }

    return (
      <Choices
        answers={answers}
        deleteNewChoice={this.deleteNewChoice}
        clearAllChoices={this.clearAllChoices}
        addNewChoice={this.addNewChoice}
        handleChoiceInput={this.handleChoiceInput}
      />
    );
  };

  render() {
    const {
      newQuestions,
      toggleEditable,
      clearAllQuestions,
      isEdit
    } = this.props;
    const { type, renderError, value } = this.state;

    return (
      <>
        <div className="polls-container">
          {isEdit === false ? (
            <h1 className="polls-header">ADD POLLS</h1>
          ) : null}

          <form className="polls-form" onSubmit={this.submitQuestion}>
            <div className="polls__inputs-container">
              {newQuestions >= 0 ? null : (
                <span className="polls-header-counter">
                  {newQuestions.length}
                </span>
              )}

              <label className="polls-label">Question:</label>
              <input
                className="polls-input"
                type="text"
                placeholder="Enter a question"
                value={value}
                onChange={this.handleQuestionInput}
              />
            </div>
            {renderError && <p>Please insert a value</p>}
            <div className="polls__inputs-container">
              <label className="polls-label">Answers:</label>
              <div className="polls__radio-container">
                <div className="radio__label-container">
                  <label className="mt-2">
                    <input
                      className="polls-radio"
                      type="radio"
                      value="YES_NO"
                      checked={type === "YES_NO"}
                      onChange={this.handleRadioInput}
                    />
                    Yes/No Form
                  </label>
                </div>

                <div className="radio__label-container">
                  <label className="mt-2">
                    <input
                      className="polls-radio"
                      type="radio"
                      value="MULTIPLE_CHOICE"
                      checked={type === "MULTIPLE_CHOICE"}
                      onChange={this.handleRadioInput}
                    />
                    Multiple choice form
                  </label>
                </div>

                <div className="radio__label-container">
                  <label className="mt-2">
                    <input
                      className="polls-radio"
                      type="radio"
                      value="SINGLE_CHOICE"
                      checked={type === "SINGLE_CHOICE"}
                      onChange={this.handleRadioInput}
                    />
                    Single choice
                  </label>
                </div>
              </div>
            </div>
            {this.renderChoicesComponent()}
            <div className="button-container">
              {isEdit === false ? (
                <button className="add-poll" type="submit">
                  Add Poll
                </button>
              ) : (
                <button className="add-poll edit-poll" type="submit">
                  Edit Poll
                </button>
              )}
              {isEdit === false ? (
                <button
                  className="add-poll delete-poll"
                  type="button"
                  onClick={clearAllQuestions}
                >
                  Clear Posts
                </button>
              ) : (
                <button
                  className="add-poll cancel-poll"
                  type="button"
                  onClick={toggleEditable}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default PollForm;
