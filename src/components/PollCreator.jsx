import React, { Component } from "react";
import "./polls.css";

import Choices from "./CreateNewChoices/Choices.jsx";
import PollResult from "./PollResults/PollResult";
import uuid from "uuid";
import PollResultEdit from "./PollResults/PollResultEdit";

function createResult() {
  return {
    id: uuid(),
    valueQuestion: "",
    answersYN: "",
    answersMultiple: "",
    answersSingle: "",
    isEdit: false
  };
}

function createChoice() {
  return {
    id: uuid(),
    value: ""
  };
}

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newChoices: [createChoice(), createChoice()],
      newResults: [],
      renderError: false,
      selected: "radio-1",
      id: uuid(),
      value: ""
    };
  }

  //////////////////////////////
  // Methods for the Poll Components

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  createNewResult = () => {
    const { newResults } = this.state;

    if (this.state.selected === "radio-1") {
      const updatedCreatedResult = {
        ...createResult(),
        valueQuestion: this.state.value,
        answersYN: "This will be an Yes/No"
      };

      const updatedNewResults = [...newResults, updatedCreatedResult];

      this.setState({
        newChoices: [createChoice(), createChoice()],
        newResults: updatedNewResults
      });
    } else if (this.state.selected === "radio-2") {
      this.state.newChoices.forEach(choice => {
        if (choice.value === "") {
          alert("Choices Value is empty");
        } else {
          const updatedCreatedResult = {
            ...createResult(),
            valueQuestion: this.state.value,
            answersMultiple: this.state.newChoices
          };

          const updatedNewResults = [...newResults, updatedCreatedResult];

          this.setState({
            newChoices: [createChoice(), createChoice()],
            newResults: updatedNewResults
          });
        }
      });
    } else if (this.state.selected === "radio-3") {
      this.state.newChoices.forEach(choice => {
        if (choice.value === "") {
          alert("Choices Value is empty");
        } else {
          const updatedCreatedResult = {
            ...createResult(),
            valueQuestion: this.state.value,
            answersSingle: this.state.newChoices
          };

          const updatedNewResults = [...newResults, updatedCreatedResult];

          this.setState({
            newChoices: [createChoice(), createChoice()],
            newResults: updatedNewResults
          });
        }
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.value === "") {
      this.setState({
        renderError: true
      });
    } else {
      this.setState({
        renderError: false,
        value: ""
      });
      this.createNewResult();
    }
  };

  handleRadioChange = e => {
    this.setState({
      selected: e.target.value
    });
  };

  handleDeleteResult = id => {
    const { newResults } = this.state;
    const filteredResults = newResults.filter(result => {
      return result.id !== id;
    });

    this.setState({
      newResults: filteredResults
    });
  };

  clearAllPolls = () => {
    this.setState({
      newResults: []
    });
  };

  //////////////////////////////
  // Methods for the Poll Components

  //-----------------------------------//

  ////////////////////////////////////////
  //Edit Component

  isEditable = id => {
    this.setState(prevState => {
      const newResults = [...prevState.newResults];
      const indexResults = newResults.findIndex((result, index) => {
        return result.id === id;
      });

      newResults[indexResults] = {
        ...newResults[indexResults],
        isEdit: !newResults[indexResults].isEdit
      };

      return { newResults };
    });
  };

  handleSubmitEdit = (e, id) => {
    e.preventDefault();

    this.setState(prevState => {
      const newResults = [...prevState.newResults];
      const indexResults = newResults.findIndex((result, index) => {
        return result.id === id;
      });

      newResults[indexResults] = {
        ...newResults[indexResults],
        valueQuestion: this.question.current.value,
        isEdit: false
      };

      console.log(newResults[indexResults]);

      return { newResults };
    });
  };

  ////////////////////////////////////////
  //Edit Component

  //-------------------------------------//

  //////////////////////////////
  // Methods for the Choices Components

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

  //////////////////////////////
  // Methods for the Choices Components

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
    const { newResults } = this.state;

    return (
      <>
        <div className="polls-container">
          <h1 className="polls-header">ADD POLLS</h1>

          <form className="polls-form" onSubmit={this.handleSubmit}>
            <div className="polls__inputs-container">
              {this.state.newResults >= 0 ? null : (
                <span className="polls-header-counter">
                  {this.state.newResults.length}
                </span>
              )}

              <label className="polls-label">Question:</label>
              <input
                className="polls-input"
                type="text"
                placeholder="Enter a question"
                //ref={this.question}
                value={this.state.value}
                onChange={this.handleInputChange}
              />
            </div>
            {this.state.renderError && <p>Please insert a value</p>}
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
              <button className="add-poll" type="submit">
                Add Poll
              </button>
              <button
                className="add-poll delete-poll"
                type="button"
                onClick={this.clearAllPolls}
              >
                Clear Posts
              </button>
            </div>
          </form>
        </div>
        {newResults.map((result, index) => {
          return result.isEdit === false ? (
            <PollResult
              key={result.id}
              isEditable={() => this.isEditable(result.id)}
              question={result.valueQuestion}
              answersYN={result.answersYN}
              answersMultiple={result.answersMultiple}
              answersSingle={result.answersSingle}
              handleDeleteResult={() => this.handleDeleteResult(result.id)}
              index={index + 1}
            />
          ) : (
            <PollResultEdit
              key={result.id}
              handleSubmitEdit={e => this.handleSubmitEdit(e, result.id)}
              question={result.valueQuestion}
              isEditable={() => this.isEditable(result.id)}
            />
          );
        })}
      </>
    );
  }
}

export default PollCreator;
