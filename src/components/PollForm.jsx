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
      newChoices: props.choices,
      selected: props.results.selected,
      results: props.results,
      renderError: false,
      valueQ: props.results.valueQuestion
    };
  }

  ///////////////////////////////
  // New choices methods
  addNewChoice = () => {
    const updatedChoices = [...this.state.newChoices, createChoice()];
    this.setState({
      newChoices: updatedChoices
    });
  };

  deleteNewChoice = id => {
    if (this.state.newChoices.length > 2) {
      const filteredChoices = this.state.newChoices.filter(newChoice => {
        return newChoice.id !== id;
      });

      this.setState({
        newChoices: filteredChoices
      });
    }
  };

  clearNewChoices = () => {
    this.setState({
      newChoices: [createChoice(), createChoice()]
    });
  };

  //getInputValue = (value, id, prevState) => {};

  handleChoiceInput = (value, id) => {
    this.setState(prevState => {
      const newChoices = [...prevState.newChoices];
      const indexChoices = newChoices.findIndex((choice, index) => {
        return choice.id === id;
      });

      newChoices[indexChoices] = {
        ...newChoices[indexChoices],
        value: value
      };

      return { newChoices };
    });
  };

  ///////////////////////////////
  // New choices methods

  handleInputChange = e => {
    this.setState({
      valueQ: e.target.value
    });
  };

  submitResult = e => {
    e.preventDefault();

    const { selected } = this.state;
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

      if (selected === "radio-1") {
        const updatedNewResults = {
          ...this.props.results,
          valueQuestion: this.state.valueQ,
          answersYN: "Yes/No",
          answersMultiple: "",
          answersSingle: "",
          newChoices: [createChoice(), createChoice()],
          selected
        };

        this.setState({
          results: updatedNewResults,
          newChoices: [createChoice(), createChoice()]
        });

        handleSubmit(updatedNewResults);
      } else if (selected === "radio-2") {
        this.state.newChoices.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedNewResults = {
              ...this.props.results,
              valueQuestion: this.state.valueQ,
              answersMultiple: this.state.newChoices,
              answersSingle: "",
              answersYN: "",
              newChoices: this.state.newChoices,
              selected
            };

            this.setState({
              results: updatedNewResults,
              newChoices: [createChoice(), createChoice()]
            });

            handleSubmit(updatedNewResults);
          }
        });
      } else if (selected === "radio-3") {
        this.state.newChoices.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedNewResults = {
              ...this.props.results,
              valueQuestion: this.state.valueQ,
              answersSingle: this.state.newChoices,
              answersMultiple: "",
              answersYN: "",
              newChoices: this.state.newChoices,
              selected
            };

            this.setState({
              results: updatedNewResults,
              newChoices: [createChoice(), createChoice()]
            });

            handleSubmit(updatedNewResults);
          }
        });
      }
    }
  };

  handleRadioChange = e => {
    this.setState({
      selected: e.target.value
    });
  };

  renderChoicesComponent = () => {
    if (
      this.state.selected === "radio-2" ||
      this.state.selected === "radio-3"
    ) {
      return (
        <Choices
          results={this.state.results}
          newChoices={this.state.newChoices}
          deleteNewChoice={this.deleteNewChoice}
          clearNewChoices={this.clearNewChoices}
          addNewChoice={this.addNewChoice}
          handleChoiceInput={this.handleChoiceInput}
        />
      );
    } else if (this.state.selected === "radio-1") {
      return null;
    }
  };

  render() {
    // console.log(this.props.choices, "from props");
    // console.log(this.state.newChoices, "from state");

    const {
      newResults,
      toggleEditable,
      clearAllPolls,
      toggleEdit
    } = this.props;
    const { selected, renderError, valueQ } = this.state;

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
                onChange={this.handleInputChange}
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
                      value="radio-1"
                      checked={selected === "radio-1"}
                      onChange={this.handleRadioChange}
                    />
                    Yes/No Form
                  </label>
                </div>

                <div className="radio__label-container">
                  <label className="mt-2">
                    <input
                      className="polls-radio"
                      type="radio"
                      value="radio-2"
                      checked={this.state.selected === "radio-2"}
                      onChange={this.handleRadioChange}
                    />
                    Multiple choice form
                  </label>
                </div>

                <div className="radio__label-container">
                  <label className="mt-2">
                    <input
                      className="polls-radio"
                      type="radio"
                      value="radio-3"
                      checked={selected === "radio-3"}
                      onChange={this.handleRadioChange}
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
                  onClick={clearAllPolls}
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
