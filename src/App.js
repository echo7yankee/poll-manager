import React from "react";

import { Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Polls from "./components/Polls";

import ProtectedRoute from "./ProtectedRoute.route";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Navbar} exact />
        <ProtectedRoute path="/polls" component={Polls} exact />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
};

export default App;
