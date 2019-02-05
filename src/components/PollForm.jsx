import React, { Component } from "react";
import "./polls.css";

import Choices from "./CreateNewChoices/Choices.jsx";
import uuid from "uuid";

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
      answers: props.results.answers,
      type: props.results.type,
      results: props.results,
      renderError: false,
      value: props.results.value
    };
  }

  addNewChoice = () => {
    const { answers } = this.state;

    const updatedChoices = [...answers, createChoice()];
    this.setState({
      answers: updatedChoices
    });
  };

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

  submitResult = e => {
    e.preventDefault();

    const { type, answers, value } = this.state;
    const { handleSubmit, results } = this.props;

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
        const updatedNewResults = {
          ...results,
          value: value,
          answers: [createChoice(), createChoice()],
          type
        };

        this.setState({
          results: updatedNewResults,
          answers: [createChoice(), createChoice()]
        });

        handleSubmit(updatedNewResults);
      } else if (type === "MULTIPLE_CHOICE") {
        answers.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedNewResults = {
              ...results,
              value: value,
              answers: answers,
              type
            };

            this.setState({
              results: updatedNewResults,
              answers: [createChoice(), createChoice()]
            });

            handleSubmit(updatedNewResults);
          }
        });
      } else if (type === "SINGLE_CHOICE") {
        answers.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedNewResults = {
              ...results,
              value: value,
              answers: answers,
              type
            };

            this.setState({
              results: updatedNewResults,
              answers: [createChoice(), createChoice()]
            });

            handleSubmit(updatedNewResults);
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
    const { type, answers, results } = this.state;

    if (type === "MULTIPLE_CHOICE" || type === "SINGLE_CHOICE") {
      return (
        <Choices
          results={results}
          answers={answers}
          deleteNewChoice={this.deleteNewChoice}
          clearAllChoices={this.clearAllChoices}
          addNewChoice={this.addNewChoice}
          handleChoiceInput={this.handleChoiceInput}
        />
      );
    } else if (type === "YES_NO") {
      return null;
    }
  };

  render() {
    const { newResults, toggleEditable, clearAllResults, isEdit } = this.props;
    const { type, renderError, value } = this.state;

    return (
      <>
        <div className="polls-container">
          {isEdit === false ? (
            <h1 className="polls-header">ADD POLLS</h1>
          ) : null}

          <form className="polls-form" onSubmit={this.submitResult}>
            <div className="polls__inputs-container">
              {newResults >= 0 ? null : (
                <span className="polls-header-counter">
                  {newResults.length}
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
                  onClick={clearAllResults}
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
