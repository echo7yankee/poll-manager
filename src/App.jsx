import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Questions from "./components/Questions";
import PollCreator from "./components/PollCreator";
import PollResults from "./components/PollResults";
import Summary from "./components/Summary";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Questions} exact />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/create" component={PollCreator} />
          <Route path="/results" component={PollResults} />
          <Route path="/summary" component={Summary} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    );
  }
}

export default App;
