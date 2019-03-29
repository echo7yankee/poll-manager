import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import reducers from "./store/reducers";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./firebaseConfig/fbConfig";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      reduxThunk.withExtraArgument({
        getFirebase,
        getFirestore
      })
    ),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      userFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    })
  )
);

store.firebaseAuthIsReady.then(() => {
  const app = (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );

  ReactDOM.render(app, document.getElementById("root"));
});
