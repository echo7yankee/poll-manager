import React from "react";
import PollResultItem from "./PollResultItem";

const PollResult = ({ result, toggleResults }) => {
  return (
    <div>
      <div
        className="polls__container-question polls__container-question--date"
        onClick={() => toggleResults(result.id)}
      >
        <p>Name: {result.users.name}</p>
        <p className="polls-row--2">Date: {result.users.date}</p>
      </div>

      <div
        className={
          result.toggle
            ? "questions__results--show"
            : "questions__results--hide"
        }
      >
        {result.resultAnswers.map(result => {
          return (
            <div key={result.id}>
              <PollResultItem result={result} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResult;
