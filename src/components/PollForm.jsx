import React, { Component } from "react";

import Choices from "./CreateNewChoices/Choices.jsx";
import {
  createChoice,
  YES_NO,
  MULTIPLE_CHOICE,
  SINGLE_CHOICE
} from "./PollQuestions/types";
import RadioInput from "./reusableComponents/RadioInput";
import Modal from "./reusableComponents/Modal";

import "./polls.css";

class PollForm extends Component {
  state = {
    question: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.question.id === state.question.id) {
      return null;
    }

    return {
      question: props.question
    };
  }

  addChoice = () => {
    const { question } = this.state;
    const { answers } = this.state.question;

    this.setState({
      question: {
        ...question,
        answers: [...answers, createChoice()]
      }
    });
  };

  deleteChoice = id => {
    const { question } = this.state;
    const { answers } = this.state.question;

    if (answers.length > 2) {
      this.setState({
        question: {
          ...question,
          answers: answers.filter(newAnswer => {
            return newAnswer.id !== id;
          })
        }
      });
    }
  };

  clearAllChoices = () => {
    const { question } = this.state;

    this.setState({
      question: {
        ...question,
        answers: [createChoice(), createChoice()]
      }
    });
  };

  handleChoiceInput = (value, id) => {
    const { question } = this.state;
    const { answers } = this.state.question;

    const indexAnswers = answers.findIndex(answer => {
      return answer.id === id;
    });

    answers[indexAnswers] = {
      ...answers[indexAnswers],
      value: value
    };

    this.setState({
      question: {
        ...question,
        answers: answers
      }
    });
  };

  handleQuestionInput = e => {
    const { question } = this.state;

    this.setState({
      question: {
        ...question,
        value: e.target.value
      }
    });
  };

  submitQuestion = e => {
    e.preventDefault();

    const { type, answers, value } = this.state.question;
    const { onSubmit } = this.props;
    let question;

    if (value === "") {
      this.setState({
        renderError: true
      });
      return;
    }

    if (type === YES_NO) {
      question = {
        ...this.state.question,
        answers: [createChoice(), createChoice()]
      };
    } else {
      const filledInAnswers = answers.filter(answer => {
        return answer.value !== "";
      });

      if (filledInAnswers.length < 2) {
        return alert("You need at least two choices");
      }

      question = {
        ...this.state.question,
        answers: filledInAnswers
      };
    }

    onSubmit(question);
  };

  handleRadioInput = e => {
    const { question } = this.state;

    this.setState({
      question: {
        ...question,
        type: e.target.value
      }
    });
  };

  renderChoicesComponent = () => {
    const { type, answers } = this.state.question;

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
      toggleEditable,
      clearAllQuestions,
      isEdit,
      isOpen,
      toggleModal,
      questions
    } = this.props;
    const { type, value } = this.state.question;

    console.log(this.state.isOpen);

    return (
      <form className="polls__form" onSubmit={this.submitQuestion}>
        <label className="polls-label" htmlFor="question">
          Question:
        </label>
        <div className="polls__container-input">
          <input
            id="question"
            className="polls-input"
            type="text"
            placeholder="Enter a question"
            value={value}
            onChange={this.handleQuestionInput}
            required
          />
        </div>
        <span className="polls-label polls-label--top">Answers:</span>
        <div className="polls__container-input">
          <div className="polls__container-radio">
            <RadioInput
              text={"Yes/No Form"}
              value={YES_NO}
              type={type === YES_NO}
              onChange={this.handleRadioInput}
            />
            <RadioInput
              text={"Multiple choice form"}
              value={MULTIPLE_CHOICE}
              type={type === MULTIPLE_CHOICE}
              onChange={this.handleRadioInput}
            />
            <RadioInput
              text={"Single choice"}
              value={SINGLE_CHOICE}
              type={type === SINGLE_CHOICE}
              onChange={this.handleRadioInput}
            />
          </div>
          <div className="polls__answers-container">
            {this.renderChoicesComponent()}
          </div>
          <div className="polls__container-buttons">
            {isEdit === false ? (
              <>
                <button
                  className="polls-button add-poll poll-button--hover"
                  type="submit"
                >
                  Add Poll
                </button>

                <button
                  className="polls-button clear-polls"
                  type="button"
                  onClick={questions.length > 0 ? toggleModal : null}
                >
                  Clear Questions
                </button>
              </>
            ) : (
              <>
                <button
                  className="polls-button edit-poll poll-button--hover"
                  type="submit"
                >
                  Edit Poll
                </button>
                <button
                  className="polls-button cancel-poll"
                  type="button"
                  onClick={toggleEditable}
                >
                  Cancel
                </button>
              </>
            )}
            {isOpen && (
              <Modal
                toggleModal={toggleModal}
                clearAllQuestions={clearAllQuestions}
              />
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default PollForm;
