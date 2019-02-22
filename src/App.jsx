import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar.jsx";
import Questions from "./components/Questions";
import PollCreator from "./components/PollCreator";
import PrivateRoute from "./PrivateRoute.jsx";
import PollCreatorLink from "./components/PollCreatorLink";
import PollResults from "./components/PollResults";
import PollResultsLink from "./components/PollResultsLink";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Questions} exact />
          <PrivateRoute path="/pollCreator" component={PollCreator} />
          <PrivateRoute path="/pollCreatorLink" component={PollCreatorLink} />
          <PrivateRoute path="/pollResults" component={PollResults} />
          <PrivateRoute path="/pollResultsLink" component={PollResultsLink} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    );
  }
}

export default App;
