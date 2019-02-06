import uuid from "uuid";

// @todo named export
export const createChoice = () => {
  return {
    id: uuid(),
    value: ""
  };
};

export const createQuestion = () => {
  return {
    id: uuid(),
    value: "",
    answers: [createChoice(), createChoice()],
    type: "YES_NO",
    isEdit: false
  };
};
