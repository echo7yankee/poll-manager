import React from "react";
import "../polls.css";

const RadioInput = ({ value, text, type, onChange, name, inputDisabled }) => {
  return (
    <label className="radio__label-input radio__label-input--mt">
      <input
        name={name}
        className="polls-radio"
        type="radio"
        value={value}
        checked={type}
        onChange={onChange}
        disabled={inputDisabled}
      />
      {text}
    </label>
  );
};

export default RadioInput;
