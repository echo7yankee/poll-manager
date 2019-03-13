import React, { Component } from "react";

import PollQuestion from "./PollQuestions/PollQuestion";
import { createQuestion } from "./types";
import PollForm from "./PollForm";
import { connect } from "react-redux";
import {
  addQuestion,
  editQuestion,
  toggleEditable,
  deleteQuestion,
  clearQuestions
} from "../actions/questions";

import "./polls.css";

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  clearQuestions = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });

    this.props.clearQuestions();
  };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { questions } = this.props;

    return (
      <div className="container">
        <div className="polls__form-container">
          <h1 className="polls__container-header">ADD POLLS</h1>
          <span className="polls__counter">{questions.length + 1}</span>
          <PollForm
            question={createQuestion()}
            onSubmit={this.props.addQuestion}
            toggleEditable={this.toggleEditable}
            clearQuestions={this.clearQuestions}
            isEdit={createQuestion().isEdit}
            toggleModal={this.toggleModal}
            isOpen={this.state.isOpen}
            questions={questions}
          />
        </div>
        {questions.map((question, index) => {
          return question.isEdit === false ? (
            <div className="polls__container-question" key={question.id}>
              <span className="polls__counter polls__counter--question">
                {index + 1}
              </span>
              <PollQuestion
                toggleEditable={() => this.props.toggleEditable(question.id)}
                question={question}
                deleteQuestion={() => this.props.deleteQuestion(question.id)}
                index={index + 1}
                inputDisabled={true}
                required={question.required}
              />
            </div>
          ) : (
            <div className="polls__form-container" key={question.id}>
              <span className="polls__counter  polls__counter--edit">
                {index + 1}
              </span>
              <PollForm
                onSubmit={this.props.editQuestion}
                question={question}
                toggleEditable={() => this.props.toggleEditable(question.id)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questionsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuestion: payload => dispatch(addQuestion(payload)),
    deleteQuestion: id => dispatch(deleteQuestion(id)),
    clearQuestions: () => dispatch(clearQuestions()),
    toggleEditable: id => dispatch(toggleEditable(id)),
    editQuestion: payload => dispatch(editQuestion(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollCreator);
