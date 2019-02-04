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

// @todo rename function (should be verb)
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

  //@todo rename func to addQuestion
  addQuestion = updatedResults => {
    const updatedCreatedResult = {
      ...updatedResults
    };

    const updatedNewResults = [...this.state.newResults, updatedCreatedResult];

    this.setState({
      newResults: updatedNewResults
    });

    // console.log(updatedResults, "from poll creator");
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

  // @todo rename func to editQuestion
  editQuestion = updatedResults => {
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

      return { newResults };
    });
  };

  render() {
    const { newResults } = this.state;

    // @todo remove unused props
    // @todo reduce number of sent props (only result)

    return (
      <>
        <PollForm
          choices={createQuestion().answers}
          results={createQuestion()}
          handleSubmit={this.addQuestion}
          renderError={this.state.renderError}
          newResults={this.state.newResults}
          toggleEditable={this.toggleEditable}
          handleDeleteResult={this.handleDeleteResult}
          clearAllResults={this.clearAllResults}
          toggleEdit={false}
        />
        {newResults.map((result, index) => {
          return result.isEdit === false ? (
            <PollResult
              key={result.id}
              toggleEditable={() => this.toggleEditable(result.id)}
              value={result.value}
              type={result.type}
              answers={result.answers}
              answersYN={result.answersYN}
              answersMultiple={result.answersMultiple}
              answersSingle={result.answersSingle}
              handleDeleteResult={() => this.handleDeleteResult(result.id)}
              index={index + 1}
            />
          ) : (
            <PollForm
              key={result.id}
              handleSubmit={this.editQuestion}
              newResults={this.state.newResults}
              choices={result.answers}
              results={result}
              value={result.value}
              toggleEditable={() => this.toggleEditable(result.id)}
            />
          );
        })}
      </>
    );
  }
}

export default PollCreator;
