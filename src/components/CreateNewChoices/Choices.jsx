import ChoiceItem from "./ChoiceItem.jsx";
import "./choices.css";

const Choices = ({
  answers,
  handleChoiceInput,
  deleteChoice,
  addChoice,
  clearAllChoices
}) => {
  return (
    <>
      <div className="polls__answer">
        {answers.map((choice, index) => {
          return (
            <ChoiceItem
              key={choice.id}
              inputValue={choice.value}
              handleChoiceInput={e =>
                handleChoiceInput(e.target.value, choice.id)
              }
              deleteChoice={() => deleteChoice(choice.id, index)}
              index={index + 1}
            />
          );
        })}
      </div>

      <div className="polls__answers-buttons">
        <button className="button-answer" onClick={addChoice} type="button">
          + Add new choice
        </button>
        {answers.length > 2 && (
          <button className="button-answer" onClick={clearAllChoices}>
            Clear Choices
          </button>

export default Choices;
