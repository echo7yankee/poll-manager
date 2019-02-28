import { SIGN_IN, SIGN_OUT, DELETE_CHOICE, ADD_CHOICE } from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const addChoice = () => {
  return {
    type: ADD_CHOICE
  };
};

export const deleteChoice = id => {
  return {
    type: DELETE_CHOICE,
    payload: id
  };
};
