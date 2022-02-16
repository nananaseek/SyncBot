import React, { useEffect } from "react";
import "./App.less";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import { fxInit } from "./models/users";
import { HOME } from "./api/urls";
import { useStore } from "effector-react";
import { $isAuth } from "./models/auth";

function App() {
  const IsAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    IsAuthenticated && fxInit();
  }, [IsAuthenticated]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {Boolean(IsAuthenticated) ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistrationPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
