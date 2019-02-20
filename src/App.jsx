import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar.jsx";
import Questions from "./components/Questions";
import PollCreator from "./components/PollCreator";
import PrivateRoute from "./PrivateRoute.jsx";
import PollCreatorLink from "./components/PollCreatorLink";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Questions} exact />
          <PrivateRoute path="/pollCreator" component={PollCreator} />
          <PrivateRoute path="/pollCreatorLink" component={PollCreatorLink} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    );
  }
}

export default App;
