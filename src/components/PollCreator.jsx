import React, { Component } from "react";
import "./polls.css";

import Choices from "./CreateNewChoices/Choices.jsx";
import PollResult from "./PollResults/PollResult";
import uuid from "uuid";

function createResult() {
  return {
    id: uuid(),
    valueQuestion: "",
    valueAnswers: ""
  };
}

function createChoice() {
  return { id: uuid(), value: "" };
}

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.question = React.createRef();
    this.state = {
      newChoices: [createChoice(), createChoice()],
      newResults: [],
      renderError: false,
      selected: "radio-1",
      id: uuid()
    };
  }

  //////////////////////////////
  // Methods for the Poll Components

  createNewResult = () => {
    const { newResults } = this.state;

    if (this.state.selected === "radio-1") {
      const updatedCreatedResult = {
        ...createResult(),
        valueQuestion: this.question.current.value,
        valueAnswers: "This will be an Yes/No"
      };

      const updatedNewResults = [...newResults, updatedCreatedResult];

      this.setState({
        newResults: updatedNewResults
      });
    } else if (this.state.selected === "radio-2") {
      const updatedCreatedResult = {
        ...createResult(),
        valueQuestion: this.question.current.value,
        valueAnswers: this.state.newChoices
      };

      const updatedNewResults = [...newResults, updatedCreatedResult];

      this.setState({
        newChoices: [createChoice(), createChoice()],
        newResults: updatedNewResults
      });
    } else if (this.state.selected === "radio-3") {
      const updatedCreatedResult = {
        ...createResult(),
        valueQuestion: this.question.current.value,
        valueAnswers: this.state.newChoices
      };

      const updatedNewResults = [...newResults, updatedCreatedResult];

      this.setState({
        newChoices: [createChoice(), createChoice()],
        newResults: updatedNewResults
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.question.current.value === "") {
      this.setState({
        renderError: true
      });
    } else {
      this.setState({
        renderError: false
      });
      this.createNewResult();
    }

    this.question.current.value = "";
  };

  handleRadioChange = e => {
    // this.setState({
    //   invisible: !this.state.invisible,
    //   singleChoice: !this.state.singleChoice,
    //   visible: !this.state.visible
    // });

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
    console.log(this.state.newResults);
    const { newResults } = this.state;

    return (
      <>
        <div className="polls-container">
          <h1 className="polls-header">ADD POLLS</h1>

          <form className="polls-form" onSubmit={this.handleSubmit}>
            <div className="polls__inputs-container">
              <label className="polls-label">Question:</label>
              <input className="polls-input" type="text" ref={this.question} />
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
          return (
            <PollResult
              key={result.id}
              question={result.valueQuestion}
              answers={result.valueAnswers}
              PollResultSelected={this.state.selected}
              handleDeleteResult={() => this.handleDeleteResult(result.id)}
              index={index + 1}
            />
          );
        })}
      </>
    );
  }
}

export default PollCreator;
