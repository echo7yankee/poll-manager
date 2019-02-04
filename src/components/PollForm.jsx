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
      answers: props.choices,
      type: props.results.type,
      results: props.results,
      renderError: false,
      valueQ: props.results.value
    };
  }

  ///////////////////////////////
  // New choices methods
  addNewChoice = () => {
    const updatedChoices = [...this.state.answers, createChoice()];
    this.setState({
      answers: updatedChoices
    });
  };

  deleteNewChoice = id => {
    if (this.state.answers.length > 2) {
      const filteredChoices = this.state.answers.filter(newChoice => {
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

  //getInputValue = (value, id, prevState) => {};

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

  ///////////////////////////////
  // New choices methods

  handleQuestionInput = e => {
    this.setState({
      valueQ: e.target.value
    });
  };

  submitResult = e => {
    e.preventDefault();

    const { type } = this.state;
    const { handleSubmit } = this.props;

    if (this.state.valueQ === "") {
      this.setState({
        renderError: true
      });
    } else {
      this.setState({
        renderError: false,
        valueQ: ""
      });

      if (type === "YES_NO") {
        const updatedNewResults = {
          ...this.props.results,
          value: this.state.valueQ,
          answers: [createChoice(), createChoice()],
          type
        };

        this.setState({
          results: updatedNewResults,
          answers: [createChoice(), createChoice()]
        });

        handleSubmit(updatedNewResults);
      } else if (type === "MULTIPLE_CHOICE") {
        this.state.answers.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedNewResults = {
              ...this.props.results,
              value: this.state.valueQ,
              answers: this.state.answers,
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
        this.state.answers.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedNewResults = {
              ...this.props.results,
              value: this.state.valueQ,
              answers: this.state.answers,
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
    const { type } = this.state;

    if (type === "MULTIPLE_CHOICE" || type === "SINGLE_CHOICE") {
      return (
        <Choices
          results={this.state.results}
          answers={this.state.answers}
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
    // console.log(this.props.choices, "from props");
    // console.log(this.state.answers, "from state");

    const {
      newResults,
      toggleEditable,
      clearAllResults,
      toggleEdit
    } = this.props;
    const { type, renderError, valueQ } = this.state;

    return (
      <>
        <div className="polls-container">
          {toggleEdit === false ? (
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
                value={valueQ}
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
                      checked={this.state.type === "MULTIPLE_CHOICE"}
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
              {toggleEdit === false ? (
                <button className="add-poll" type="submit">
                  Add Poll
                </button>
              ) : (
                <button className="add-poll edit-poll" type="submit">
                  Edit Poll
                </button>
              )}
              {toggleEdit === false ? (
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
