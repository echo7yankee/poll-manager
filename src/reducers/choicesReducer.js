import { GET_NEW_CHOICES, DELETE_CHOICE } from "../actions/types";
import uuid from "uuid";

const initialState = {
  newChoices: [],
  choiceInput: "",
  id: uuid()
};

export default (state = initialState, action) => {
  switch (action.type) {
  }
};
