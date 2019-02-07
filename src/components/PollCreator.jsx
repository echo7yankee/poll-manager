import React, { Component } from "react";

import "./polls.css";

import PollQuestion from "./PollQuestions/PollQuestion";
import { createQuestion } from "./PollQuestions/types";
import PollForm from "./PollForm";

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // @todo rename to questions
      newQuestions: []
    };
  }

  addQuestion = newQuestion => {
    this.setState({
      newQuestions: [...this.state.newQuestions, { ...newQuestion }]
    });
  };

  handleDeleteQuestion = id => {
    const { newQuestions } = this.state;

    this.setState({
      newQuestions: newQuestions.filter(question => question.id !== id)
    });
  };

  clearAllQuestions = () => {
    this.setState({
      newQuestions: []
    });
  };

  toggleEditable = id => {
    const { newQuestions } = this.state;
    const indexQuestions = newQuestions.findIndex(question => {
      return question.id === id;
    });

    newQuestions[indexQuestions] = {
      ...newQuestions[indexQuestions],
      isEdit: !newQuestions[indexQuestions].isEdit
    };

    this.setState({
      newQuestions
    });
  };

  editQuestion = updatedQuestion => {
    const { newQuestions } = this.state;
    const indexQuestions = newQuestions.findIndex(question => {
      return question.id === updatedQuestion.id;
    });

    newQuestions[indexQuestions] = {
      ...updatedQuestion,
      isEdit: false
    };

    this.setState({
      newQuestions
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
            // @todo rename to onSubmit
            handleSubmit={this.addQuestion}
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
            <div className="polls" key={question.id}>
              <PollForm
                handleSubmit={this.editQuestion}
                question={question}
                toggleEditable={() => this.toggleEditable(question.id)}
              />
            </div>
          );
        })}
      </>
    );
  }
}

export default PollCreator;
