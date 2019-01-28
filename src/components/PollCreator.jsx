import React, { Component } from "react";
import "./polls.css";

import uuid from "uuid";
import PollResult from "./PollResults/PollResult";
import PollForm from "./PollForm";

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
      newResults: [],
      renderError: false,
      selected: "radio-1",
      id: uuid(),
      value: "",
      toggleEdit: false
    };
  }

  //////////////////////////////
  // Methods for the Poll Components

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleAddSubmit = (e, createChoice, newChoices, selected) => {
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
          newChoices: [createChoice, createChoice],
          newResults: updatedNewResults
        });
      } else if (selected === "radio-2") {
        newChoices.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedCreatedResult = {
              ...createResult(),
              valueQuestion: this.state.value,
              answersMultiple: newChoices
            };

            const updatedNewResults = [...newResults, updatedCreatedResult];

            this.setState({
              newChoices: [createChoice, createChoice],
              newResults: updatedNewResults
            });
          }
        });
      } else if (selected === "radio-3") {
        newChoices.forEach(choice => {
          if (choice.value === "") {
            alert("Choices Value is empty");
          } else {
            const updatedCreatedResult = {
              ...createResult(),
              valueQuestion: this.state.value,
              answersSingle: newChoices
            };

            const updatedNewResults = [...newResults, updatedCreatedResult];

            this.setState({
              newChoices: [createChoice, createChoice],
              newResults: updatedNewResults
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

  toggleEdit = () => {
    this.setState({
      toggleEdit: !this.state.toggleEdit
    });
  };

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

  handleSubmitEdit = updatedResult => {
    this.setState(prevState => {
      const newResults = [...prevState.newResults];
      const indexResults = newResults.findIndex((result, index) => {
        return result.id === updatedResult.id;
      });

      newResults[indexResults] = {
        ...updatedResult,
        isEdit: false
      };

      // console.log(updatedResult, "from parent, but child parameter");
      // console.log(newResults[indexResults], "from parent");

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
          newResults={this.state.newResults}
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
              updatedResults={result}
              key={result.id}
              value={result.valueQuestion}
              handleInputChange={this.handleInputChange}
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
