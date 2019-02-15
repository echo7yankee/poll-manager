import React from "react";

import { BtnDelete } from "../reusableComponents/buttons";

import "../buttons.css";

const ChoiceItem = ({ deleteChoice, handleChoiceInput, inputValue, index }) => {
  return (
    <>
      <label className="polls__answer-label">Choice # {index}</label>
      <input
        className="polls__answer-input"
        type="text"
        value={inputValue}
        onChange={handleChoiceInput}
        placeholder={index === 1 ? "Enter a choice" : null}
      />
      {index >= 3 ? (
        <BtnDelete onClick={deleteChoice} imgClassName={"button-icon"} />
      ) : null}
    </>
  );
};

export default ChoiceItem;
