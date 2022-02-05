import React from "react";
import "./App.less";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";

function App() {
  return (
    <Switch>
      <Route path="/files" exact component={HomePage} />
      <Route path="/files/login" component={LoginPage} />
      <Route path="/files/registration" component={RegistrationPage} />
    </Switch>
  );
}

export default App;
