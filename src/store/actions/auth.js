import {
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGN_OUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED
} from "./types";

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName
          });
      })
      .then(() => {
        dispatch({
          type: SIGNUP_SUCCESS
        });
      })
      .catch(err => {
        dispatch({ type: SIGNUP_FAILED, err });
      });
  };
};

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: SIGNIN_SUCCESS });
      })
      .catch(err => {
        dispatch({
          type: SIGNIN_FAILED,
          err
        });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: SIGN_OUT
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
