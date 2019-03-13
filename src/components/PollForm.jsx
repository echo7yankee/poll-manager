import React, { Component } from "react";

import Choices from "./CreateNewChoices/Choices.jsx";
import { createChoice, YES_NO, MULTIPLE_CHOICE, SINGLE_CHOICE } from "./types";
import RadioInput from "./reusableComponents/RadioInput";
import Modal from "./reusableComponents/Modal";

import "./polls.css";

class PollForm extends Component {
  state = {
    question: this.props.question,
    required: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.question.id === state.question.id) {
      return null;
    }

    return {
      question: props.question
    };
  }

  handleQuestionInput = e => {
    const { question } = this.state;
    this.setState({
      question: {
        ...question,
        value: e.target.value
      }
    });
  };

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
          answers: answers.filter(answer => {
            return answer.id !== id;
          })
        }
      });
    }
  };

  clearChoices = () => {
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

    answers.map(answer => {
      if (answer.id === id) {
        answer.value = value;
      }

      return answer.value;
    });

    this.setState({
      question: { ...question, answers }
    });
  };

  handleCheckboxInput = () => {
    this.setState({
      required: !this.state.required
    });
  };

  handleRadioInput = e => {
    this.setState({
      question: {
        ...this.state.question,
        type: e.target.value
      }
    });
  };

  renderChoicesComponent = () => {
    const { answers } = this.state.question;
    const { type } = this.state.question;

    if (type === YES_NO) {
      return null;
    }

    return (
      <Choices
        answers={answers}
        deleteChoice={this.deleteChoice}
        clearChoices={this.clearChoices}
        addChoice={this.addChoice}
        handleChoiceInput={this.handleChoiceInput}
      />
    );
  };

  submitQuestion = e => {
    e.preventDefault();

    const { type, answers, value } = this.state.question;
    const { onSubmit } = this.props;

    let question;

    if (value === "") {
      return;
    }

    if (type === YES_NO) {
      question = {
        ...this.state.question,
        required: this.state.required,
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
        required: this.state.required,
        answers: filledInAnswers
      };
    }

    onSubmit(question);
  };

  render() {
    const {
      toggleEditable,
      clearQuestions,
      isEdit,
      isOpen,
      toggleModal,
      questions
    } = this.props;

    const { value, type, id } = this.state.question;

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
              name={id}
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
            <label className="radio__label-input  radio__label-input--mt">
              <input
                type="checkbox"
                className="radio__label-input--mr"
                onChange={this.handleCheckboxInput}
              />
              Required
            </label>
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
                clearQuestions={clearQuestions}
              />
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default PollForm;
