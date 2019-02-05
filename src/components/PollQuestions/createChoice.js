import uuid from "uuid";

export default function createChoice() {
  return {
    id: uuid(),
    value: ""
  };
}
