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
        <div className="polls">
          <h1 className="polls-header">ADD POLLS</h1>
          {newQuestions >= 0 ? null : (
            <span className="polls-header-counter">{newQuestions.length}</span>
          )}
          <PollForm
            question={createQuestion()}
            handleSubmit={this.addQuestion}
            newQuestions={this.state.newQuestions}
            toggleEditable={this.toggleEditable}
            clearAllQuestions={this.clearAllQuestions}
            isEdit={createQuestion().isEdit}
          />
        </div>
        {newQuestions.map((question, index) => {
          return question.isEdit === false ? (
            <div className="polls polls-questions" key={question.id}>
              <PollQuestion
                toggleEditable={() => this.toggleEditable(question.id)}
                question={question}
                handleDeleteQuestion={() =>
                  this.handleDeleteQuestion(question.id)
                }
                index={index + 1}
              />
            </div>
          ) : (
            <PollForm
              key={question.id}
              handleSubmit={this.editQuestion}
              newQuestions={this.state.newQuestions}
              question={question}
              toggleEditable={() => this.toggleEditable(question.id)}
            />
          );
        })}
      </>
    );
  }
}

export default PollCreator;
