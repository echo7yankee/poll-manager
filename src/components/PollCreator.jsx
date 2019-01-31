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
    selected: "radio-1",
    isEdit: false
  };
}

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newResults: []
    };
  }

  //////////////////////////////
  // Methods for the PollResult Component

  handleAddSubmit = updatedResults => {
    const updatedCreatedResult = {
      ...updatedResults
    };

    const updatedNewResults = [...this.state.newResults, updatedCreatedResult];

    this.setState({
      newResults: updatedNewResults
    });

    console.log(updatedResults, "from poll creator");
    console.log("From poll creator", updatedNewResults);
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
  // Methods for the PollResult Component

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

  handleEditSubmit = updatedResults => {
    console.log("From edit submit", updatedResults);
    this.setState(prevState => {
      const newResults = [...prevState.newResults];
      const indexResults = newResults.findIndex((result, index) => {
        return result.id === updatedResults.id;
      });

      newResults[indexResults] = {
        ...updatedResults,
        isEdit: false
      };

      //console.log(updatedResults);

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
          results={createResult()}
          handleSubmit={this.handleAddSubmit}
          renderError={this.state.renderError}
          newResults={this.state.newResults}
          toggleEditable={this.toggleEditable}
          handleDeleteResult={this.handleDeleteResult}
          clearAllPolls={this.clearAllPolls}
          toggleEdit={false}
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
              key={result.id}
              handleSubmit={this.handleEditSubmit}
              newResults={this.state.newResults}
              results={result}
              value={result.valueQuestion}
              toggleEditable={() => this.toggleEditable(result.id)}
            />
          );
        })}
      </>
    );
  }
}

export default PollCreator;
