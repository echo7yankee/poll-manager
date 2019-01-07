import React from "react";

import { Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Polls from "./components/Polls.jsx";

import ProtectedRoute from "./ProtectedRoute.route.jsx";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Navbar} exact />
        <ProtectedRoute path="/createPolls" component={Polls} exact />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
};

export default App;
