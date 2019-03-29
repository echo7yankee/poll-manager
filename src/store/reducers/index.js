import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import auth from "./authReducer";
import questionsReducer from "./questionsReducer";

export default combineReducers({
  auth: auth,
  questionsReducer: questionsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
