import React, { Component } from "react";
import "./polls.css";

import Choices from "./CreateNewChoices/Choices.jsx";
import {
  createChoice,
  YES_NO,
  MULTIPLE_CHOICE,
  SINGLE_CHOICE
} from "./PollQuestions/types";

class PollForm extends Component {
  state = {
    questions: [],
    renderError: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.questions.id === state.questions.id) {
      return null;
    }

    return {
      questions: props.questions,
      renderError: false
    };
  }

  addChoice = () => {
    const { questions } = this.state;
    const { answers } = this.state.questions;

    const updatedQuestions = {
      ...questions,
      answers: [...answers, createChoice()]
    };

    this.setState({
      questions: updatedQuestions
    });
  };

  deleteChoice = id => {
    const { questions } = this.state;
    const { answers } = this.state.questions;

    const updatedQuestions = {
      ...questions,
      answers: answers.filter(newChoice => {
        return newChoice.id !== id;
      })
    };

    if (answers.length > 2) {
      this.setState({
        questions: updatedQuestions
      });
    }
  };

  clearAllChoices = () => {
    const { questions } = this.state;

    const updatedQuestions = {
      ...questions,
      answers: [createChoice(), createChoice()]
    };

    this.setState({
      questions: updatedQuestions
    });
  };

  handleChoiceInput = (value, id) => {
    const { questions } = this.state;
    const { answers } = this.state.questions;

    const indexAnswers = answers.findIndex(answer => {
      return answer.id === id;
    });

    answers[indexAnswers] = {
      ...answers[indexAnswers],
      value: value
    };

    const updatedQuestions = {
      ...questions,
      answers: answers
    };

    this.setState({
      questions: updatedQuestions
    });
  };

  handleQuestionInput = e => {
    const { questions } = this.state;

    const updatedQuestions = {
      ...questions,
      value: e.target.value
    };

    this.setState({
      questions: updatedQuestions
    });
  };
  submitQuestion = e => {
    e.preventDefault();

    const { type, answers } = this.state.questions;
    const { handleSubmit } = this.props;
    let question;

    if (type === YES_NO) {
      question = {
        ...this.state.questions,
        answers: []
      };
    } else {
      const filledInAnswers = answers.filter(answer => {
        return answer.value !== "";
      });

      if (filledInAnswers.length < 2) {
        return alert("You need at least two choices");
      }

      question = {
        ...this.state.questions,
        answers: filledInAnswers
      };
    }

    handleSubmit(question);
  };

  handleRadioInput = e => {
    const { questions } = this.state;

    const updatedQuestions = {
      ...questions,
      type: e.target.value
    };

    this.setState({
      questions: updatedQuestions
    });
  };

  renderChoicesComponent = () => {
    const { type, answers } = this.state.questions;

    if (type === YES_NO) {
      return null;
    }

    return (
      <Choices
        answers={answers}
        deleteChoice={this.deleteChoice}
        clearAllChoices={this.clearAllChoices}
        addChoice={this.addChoice}
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
    const { type, value } = this.state.questions;
    const { renderError } = this.state;

    return (
      <>
        <div className="polls-container">
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
                      value={YES_NO}
                      checked={type === YES_NO}
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
                      value={MULTIPLE_CHOICE}
                      checked={type === MULTIPLE_CHOICE}
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
                      value={SINGLE_CHOICE}
                      checked={type === SINGLE_CHOICE}
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
                <>
                  <button className="add-poll" type="submit">
                    Add Poll
                  </button>

                  <button
                    className="add-poll delete-poll"
                    type="button"
                    onClick={clearAllQuestions}
                  >
                    Clear Posts
                  </button>
                </>
              ) : (
                <>
                  <button className="add-poll edit-poll" type="submit">
                    Edit Poll
                  </button>
                  <button
                    className="add-poll cancel-poll"
                    type="button"
                    onClick={toggleEditable}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default PollForm;
