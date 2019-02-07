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
      questions: []
    };
  }

  addQuestion = newQuestion => {
    this.setState({
      questions: [...this.state.questions, { ...newQuestion }]
    });
  };

  handleDeleteQuestion = id => {
    const { questions } = this.state;

    this.setState({
      questions: questions.filter(question => question.id !== id)
    });
  };

  clearAllQuestions = () => {
    this.setState({
      questions: []
    });
  };

  toggleEditable = id => {
    const { questions } = this.state;
    const indexQuestion = questions.findIndex(question => {
      return question.id === id;
    });

    questions[indexQuestion] = {
      ...questions[indexQuestion],
      isEdit: !questions[indexQuestion].isEdit
    };

    this.setState({
      questions
    });
  };

  editQuestion = updatedQuestion => {
    const { questions } = this.state;
    const indexQuestion = questions.findIndex(question => {
      return question.id === updatedQuestion.id;
    });

    questions[indexQuestion] = {
      ...updatedQuestion,
      isEdit: false
    };

    this.setState({
      questions
    });
  };

  render() {
    const { questions } = this.state;

    return (
      <>
        <div className="polls">
          <h1 className="polls-header">ADD POLLS</h1>
          {questions >= 0 ? null : (
            <span className="polls-header-counter">{questions.length}</span>
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
        {questions.map((question, index) => {
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
