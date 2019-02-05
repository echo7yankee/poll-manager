import React, { Component } from "react";
import "./polls.css";

import uuid from "uuid";

import PollResult from "./PollResults/PollResult";
import PollForm from "./PollForm";

// @todo extract function
function createChoice() {
  return {
    id: uuid(),
    value: ""
  };
}

function createQuestion() {
  return {
    id: uuid(),
    value: "",
    answers: [createChoice(), createChoice()],
    type: "YES_NO",
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

  addQuestion = updatedResults => {
    const updatedCreatedResult = {
      ...updatedResults
    };

    const updatedNewResults = [...this.state.newResults, updatedCreatedResult];

    this.setState({
      newResults: updatedNewResults
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

  clearAllResults = () => {
    this.setState({
      newResults: []
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

  editQuestion = updatedResults => {
    this.setState(prevState => {
      const newResults = [...prevState.newResults];
      const indexResults = newResults.findIndex((result, index) => {
        return result.id === updatedResults.id;
      });

      newResults[indexResults] = {
        ...updatedResults,
        isEdit: false
      };

      return { newResults };
    });
  };

  render() {
    const { newResults } = this.state;

    return (
      <>
        <PollForm
          //@todo just one result, and delete newResults
          results={createQuestion()}
          handleSubmit={this.addQuestion}
          // @todo remove newResults, display index number outside PollForm
          newResults={this.state.newResults}
          toggleEditable={this.toggleEditable}
          clearAllResults={this.clearAllResults}
          isEdit={createQuestion().isEdit}
        />
        {newResults.map((result, index) => {
          return result.isEdit === false ? (
            <PollResult
              key={result.id}
              toggleEditable={() => this.toggleEditable(result.id)}
              results={result}
              handleDeleteResult={() => this.handleDeleteResult(result.id)}
              index={index + 1}
            />
          ) : (
            <PollForm
              key={result.id}
              handleSubmit={this.editQuestion}
              newResults={this.state.newResults}
              results={result}
              toggleEditable={() => this.toggleEditable(result.id)}
            />
          );
        })}
      </>
    );
  }
}

export default PollCreator;
