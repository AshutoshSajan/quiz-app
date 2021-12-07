import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "bulma/css/bulma.css";
import "./stylesheets/index.css";
import { store } from "./reducers/index";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
