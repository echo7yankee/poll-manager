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
  state = {
    newChoices: [createChoice(), createChoice()],
    selected: "radio-1",
    renderError: false,
    updatedResults: this.props.updatedResults
  };

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

  getInputValue = (value, id, prevState) => {
    const newChoices = [...prevState.newChoices];
    const indexChoices = newChoices.findIndex((choice, index) => {
      return choice.id === id;
    });

    newChoices[indexChoices] = {
      ...newChoices[indexChoices],
      value: value
    };

    return newChoices;
  };

  handleChoiceInput = (value, id) => {
    this.setState(prevState => ({
      newChoices: this.getInputValue(value, id, prevState)
    }));
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
    const {
      handleAddSubmit,
      handleInputChange,
      value,
      renderError,
      newResults,
      toggleEditable,
      handleSubmitEdit,
      clearAllPolls,
      isEdit,
      toggleEdit
    } = this.props;
    const { newChoices, selected } = this.state;

    console.log(this.state.updatedResults, " From PollForm");

    return (
      <>
        <div className="polls-container">
          {toggleEdit === false ? (
            <h1 className="polls-header">ADD POLLS</h1>
          ) : null}

          <form
            className="polls-form"
            onSubmit={e =>
              handleAddSubmit(e, createChoice(), newChoices, selected)
            }
          >
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
                onChange={handleInputChange}
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
                      checked={this.state.selected === "radio-1"}
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
                      checked={this.state.selected === "radio-3"}
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
                <button
                  className="add-poll edit-poll"
                  type="button"
                  onClick={() => handleSubmitEdit(this.state.updatedResults)}
                >
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
