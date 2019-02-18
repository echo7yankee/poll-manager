import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar.jsx";
import Polls from "./components/Polls";
import PollCreatorLink from "./components/PollCreatorLink.jsx";
import PollCreator from "./components/PollCreator";
import PrivateRoute from "./PrivateRoute.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Polls} exact />
          <PrivateRoute path="/pollCreatorLink" component={PollCreatorLink} />
          <PrivateRoute path="/pollCreator" component={PollCreator} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    );
  }
}

export default App;
