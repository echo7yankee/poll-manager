import React from "react";
import "../polls.css";

const RadioType = ({ typeChoice, text, type, handleRadioInput }) => {
  return (
    <div className="radio__label-container">
      <label className="mt-2">
        <input
          className="polls-radio"
          type="radio"
          value={typeChoice}
          checked={type === typeChoice}
          onChange={handleRadioInput}
        />
        {text}
      </label>
    </div>
  );
};

export default RadioType;
