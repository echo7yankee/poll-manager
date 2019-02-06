import React, { Component } from "react";

import "./polls.css";

import PollQuestion from "./PollQuestions/PollQuestion";
import { createQuestion } from "./PollQuestions/types";
import PollForm from "./PollForm";

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuestions: []
    };
  }

  addQuestion = updatedQuestions => {
    const updatedCreatedQuestions = {
      ...updatedQuestions
    };

    const updatedNewQuestions = [
      ...this.state.newQuestions,
      updatedCreatedQuestions
    ];

    this.setState({
      newQuestions: updatedNewQuestions
    });
  };

  handleDeleteQuestion = id => {
    const { newQuestions } = this.state;
    const filteredQuestions = newQuestions.filter(question => {
      return question.id !== id;
    });

    this.setState({
      newQuestions: filteredQuestions
    });
  };

  clearAllQuestions = () => {
    this.setState({
      newQuestions: []
    });
  };

  toggleEditable = id => {
    this.setState(prevState => {
      const newQuestions = [...prevState.newQuestions];
      const indexQuestions = newQuestions.findIndex((question, index) => {
        return question.id === id;
      });

      newQuestions[indexQuestions] = {
        ...newQuestions[indexQuestions],
        isEdit: !newQuestions[indexQuestions].isEdit
      };

      return { newQuestions };
    });
  };

  editQuestion = updatedQuestions => {
    this.setState(prevState => {
      const newQuestions = [...prevState.newQuestions];
      const indexQuestions = newQuestions.findIndex((question, index) => {
        return question.id === updatedQuestions.id;
      });

      newQuestions[indexQuestions] = {
        ...updatedQuestions,
        isEdit: false
      };

      return { newQuestions };
    });
  };

  render() {
    const { newQuestions } = this.state;

    return (
      <>
        <PollForm
          //@todo just one result, and delete newResults
          questions={createQuestion()}
          handleSubmit={this.addQuestion}
          // @todo remove newResults, display index number outside PollForm
          newQuestions={this.state.newQuestions}
          toggleEditable={this.toggleEditable}
          clearAllQuestions={this.clearAllQuestions}
          isEdit={createQuestion().isEdit}
        />
        {newQuestions.map((question, index) => {
          return question.isEdit === false ? (
            <PollQuestion
              key={question.id}
              toggleEditable={() => this.toggleEditable(question.id)}
              questions={question}
              handleDeleteQuestion={() =>
                this.handleDeleteQuestion(question.id)
              }
              index={index + 1}
            />
          ) : (
            <PollForm
              key={question.id}
              handleSubmit={this.editQuestion}
              newQuestions={this.state.newQuestions}
              questions={question}
              toggleEditable={() => this.toggleEditable(question.id)}
            />
          );
        })}
      </>
    );
  }
}

export default PollCreator;
