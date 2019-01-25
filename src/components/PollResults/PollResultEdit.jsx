import React from "react";

class PollResultEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedResult: this.props.newResults
    };
  }

  handleInputChange = e => {
    const updatedNewResults = {
      ...this.state.updatedResult,
      valueQuestion: e.target.value
    };

    this.setState({
      updatedResult: updatedNewResults
    });
  };

  render() {
    const { toggleEditable, handleSubmitEdit } = this.props;
    console.log(this.state.updatedResult.valueQuestion);
    console.log(this.state.updatedResult);

    return (
      <div className="polls-container polls-container-edit">
        <form
          className="polls-form"
          onSubmit={e => handleSubmitEdit(e, this.state.updatedResult)}
        >
          <div className="polls__inputs-container">
            <label className="polls-label">Question:</label>
            <input
              className="polls-input"
              type="text"
              placeholder="Enter a question"
              value={this.state.updatedResult.valueQuestion}
              onChange={this.handleInputChange}
            />
          </div>
          {this.state.renderError && <p>Please insert a value</p>}
          <div className="polls__inputs-container">
            <label className="polls-label">Answers:</label>
            <div className="polls__radio-container">
              <div className="radio__label-container">
                <label className="mt-2">
                  <input className="polls-radio" type="radio" value="radio-1" />
                  Yes/No Form
                </label>
              </div>

              <div className="radio__label-container">
                <label className="mt-2">
                  <input className="polls-radio" type="radio" value="radio-2" />
                  Multiple choice form
                </label>
              </div>

              <div className="radio__label-container">
                <label className="mt-2">
                  <input className="polls-radio" type="radio" value="radio-3" />
                  Single choice
                </label>
              </div>
            </div>
          </div>

          <div className="button-container">
            <button className="add-poll edit-poll" type="submit">
              Edit Poll
            </button>
            <button
              className="add-poll cancel-poll"
              type="button"
              onClick={toggleEditable}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PollResultEdit;
