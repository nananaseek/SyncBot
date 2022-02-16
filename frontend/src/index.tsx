import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./index.less";

const root = window.document.getElementById("root");

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
