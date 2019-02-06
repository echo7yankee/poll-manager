import uuid from "uuid";

// @todo named export
export const createChoice = () => {
  return {
    id: uuid(),
    value: ""
  };
}
