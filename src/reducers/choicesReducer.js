import { ADD_CHOICE, DELETE_CHOICE } from "../actions/types";
import { createChoice } from "../components/types";
import uuid from "uuid";

const initialState = {
  answers: [createChoice(), createChoice()]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHOICE:
      return [...state.answers, createChoice()];
  }
};
