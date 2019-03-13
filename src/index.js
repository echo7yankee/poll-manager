import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";

import reducers from "./reducers";
import App from "./App.jsx";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(() => {
  saveState({
    questionsReducer: store.getState().questionsReducer
  });
});

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
