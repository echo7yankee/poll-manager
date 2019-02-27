import React, { Component } from "react";

import PollQuestion from "./PollQuestions/PollQuestion";
import { createQuestion } from "./types";
import PollForm from "./PollForm";

import "./polls.css";

class PollCreator extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("questions") !== null) {
      this.state = {
        questions: JSON.parse(localStorage.getItem("questions"))
      };
    } else {
      this.state = {
        questions: [],
        isOpen: false
      };
    }
  }

  addQuestion = newQuestion => {
    this.setState(
      {
        questions: [...this.state.questions, { ...newQuestion }]
      },
      () => {
        let questionsStringify = JSON.stringify(this.state.questions);
        localStorage.setItem("questions", questionsStringify);
      }
    );
  };

  handleDeleteQuestion = id => {
    this.setState(
      {
        questions: this.state.questions.filter(question => question.id !== id)
      },
      () => {
        console.log(this.state.questions);
        let questionsStringify = JSON.stringify(this.state.questions);
        localStorage.setItem("questions", questionsStringify);
      }
    );
  };

  clearAllQuestions = () => {
    this.setState({
      questions: [],
      isOpen: !this.state.isOpen
    });

    localStorage.clear();
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

    this.setState(
      {
        questions
      },
      () => {
        let updatedQuestionStringify = JSON.stringify(questions);
        localStorage.setItem("questions", updatedQuestionStringify);
      }
    );
  };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { questions } = this.state;

    return (
      <div className="container">
        <div className="polls__form-container">
          <h1 className="polls__container-header">ADD POLLS</h1>
          <span className="polls__counter">{questions.length + 1}</span>
          <PollForm
            question={createQuestion()}
            onSubmit={this.addQuestion}
            toggleEditable={this.toggleEditable}
            clearAllQuestions={this.clearAllQuestions}
            isEdit={createQuestion().isEdit}
            toggleModal={this.toggleModal}
            isOpen={this.state.isOpen}
            questions={this.state.questions}
          />
        </div>
        {questions.map((question, index) => {
          return question.isEdit === false ? (
            <div className="polls__container-question" key={question.id}>
              <span className="polls__counter polls__counter--question">
                {index + 1}
              </span>
              <PollQuestion
                toggleEditable={() => this.toggleEditable(question.id)}
                question={question}
                handleDeleteQuestion={() =>
                  this.handleDeleteQuestion(question.id)
                }
                index={index + 1}
                inputDisabled={question.inputDisabled}
              />
            </div>
          ) : (
            <div className="polls__form-container" key={question.id}>
              <span className="polls__counter  polls__counter--edit">
                {index + 1}
              </span>
              <PollForm
                onSubmit={this.editQuestion}
                question={question}
                toggleEditable={() => this.toggleEditable(question.id)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default PollCreator;
