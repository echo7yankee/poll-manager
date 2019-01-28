import React, { Component } from "react";
import "./polls.css";

import Choices from "./CreateNewChoices/Choices.jsx";

class PollForm extends Component {
  state = {
    selected: "radio-1",
    renderError: false,
    updatedResults: this.props.updatedResults
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
          newChoices={this.props.newChoices}
          deleteNewChoice={this.props.deleteNewChoice}
          clearNewChoices={this.props.clearNewChoices}
          addNewChoice={this.props.addNewChoice}
          handleChoiceInput={this.props.handleChoiceInput}
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
    const { selected } = this.state;

    console.log(this.state.updatedResults, " From PollForm");

    return (
      <>
        <div className="polls-container">
          {toggleEdit === false ? (
            <h1 className="polls-header">ADD POLLS</h1>
          ) : null}

          <form
            className="polls-form"
            onSubmit={e => handleAddSubmit(e, selected)}
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
