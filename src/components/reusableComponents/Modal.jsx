import React from "react";
import "../buttons.css";
import "../polls.css";

const Modal = ({ clearAllQuestions, toggleModal }) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <p>Are you sure you want to clear these questions?</p>
        <div className="polls-buttons">
          <button
            className="polls-button yes-poll poll-button--hover"
            onClick={clearAllQuestions}
          >
            Yes
          </button>
          <button
            className="polls-button no-poll poll-button--hover"
            onClick={toggleModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
