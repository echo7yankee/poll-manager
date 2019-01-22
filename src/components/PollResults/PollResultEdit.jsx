import React from "react";

const PollResultEdit = ({ isEditable, handleSubmit }) => {
  return (
    <div className="polls-container polls-container-edit">
      <h1 className="polls-header">ADD POLLS</h1>

      <form className="polls-form" onSubmit={handleSubmit}>
        <div className="polls__inputs-container">
          <label className="polls-label">Question:</label>
          <input
            className="polls-input"
            type="text"
            placeholder="Enter a question"
          />
        </div>

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
            onClick={isEditable}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PollResultEdit;
