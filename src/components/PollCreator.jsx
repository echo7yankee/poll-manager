import React, { Component } from "react";
import "./polls.css";

import uuid from "uuid";
import PollResult from "./PollResults/PollResult";
import PollForm from "./PollForm";

function createChoice() {
  return {
    id: uuid(),
    value: ""
  };
}

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

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newChoices: [createChoice(), createChoice()],
      newResults: [],
      renderError: false,
      selected: "radio-1",
      id: uuid(),
      value: "",
      toggleEdit: false
    };
  }

  ////////////////////////////
  //
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
  ///////////////////////////
  //

  //////////////////////////////
  // Methods for the Poll Components

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleAddSubmit = (e, selected) => {
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
      const { newResults } = this.state;

      if (selected === "radio-1") {
        const updatedCreatedResult = {
          ...createResult(),
          valueQuestion: this.state.value,
          answersYN: "This will be an Yes/No"
        };

        const updatedNewResults = [...newResults, updatedCreatedResult];

        this.setState({
          newResults: updatedNewResults,
          newChoices: [createChoice(), createChoice()]
        });
      } else if (selected === "radio-2") {
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
              newResults: updatedNewResults,
              newChoices: [createChoice(), createChoice()]
            });
          }
        });
      } else if (selected === "radio-3") {
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
              newResults: updatedNewResults,
              newChoices: [createChoice(), createChoice()]
            });
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
  //Edit Methods

  toggleEditable = id => {
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

  handleSubmitEdit = updatedResults => {
    this.setState(prevState => {
      const newResults = [...prevState.newResults];
      const indexResults = newResults.findIndex((result, index) => {
        return result.id === updatedResults.id;
      });

      newResults[indexResults] = {
        ...updatedResults,
        isEdit: false
      };
      console.log(updatedResults);

      return { newResults };
    });
  };

  ////////////////////////////////////////
  //Edit methods

  render() {
    const { newResults } = this.state;

    return (
      <>
        <PollForm
          handleAddSubmit={this.handleAddSubmit}
          renderError={this.state.renderError}
          handleInputChange={this.handleInputChange}
          handleChoiceInput={this.handleChoiceInput}
          addNewChoice={this.addNewChoice}
          deleteNewChoice={this.deleteNewChoice}
          clearNewChoices={this.clearNewChoices}
          newResults={this.state.newResults}
          newChoices={this.state.newChoices}
          toggleEditable={this.toggleEditable}
          handleDeleteResult={this.handleDeleteResult}
          clearAllPolls={this.clearAllPolls}
          toggleEdit={this.state.toggleEdit}
          value={this.state.value}
        />
        {newResults.map((result, index) => {
          return result.isEdit === false ? (
            <PollResult
              key={result.id}
              toggleEditable={() => this.toggleEditable(result.id)}
              valueQuestion={result.valueQuestion}
              answersYN={result.answersYN}
              answersMultiple={result.answersMultiple}
              answersSingle={result.answersSingle}
              handleDeleteResult={() => this.handleDeleteResult(result.id)}
              index={index + 1}
            />
          ) : (
            <PollForm
              handleSubmitEdit={this.handleSubmitEdit}
              newResults={this.state.newResults}
              newChoices={this.state.newChoices}
              updatedResults={result}
              key={result.id}
              value={result.valueQuestion}
              handleInputChange={this.handleInputChange}
              handleChoiceInput={this.handleChoiceInput}
              addNewChoice={this.addNewChoice}
              deleteNewChoice={this.deleteNewChoice}
              clearNewChoices={this.clearNewChoices}
              toggleEditable={() => this.toggleEditable(result.id)}
              // renderError={this.state.renderError}
            />
          );
        })}
      </>
    );
  }
}

export default PollCreator;
