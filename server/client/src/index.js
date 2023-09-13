// import css
import "materialize-css/dist/css/materialize.min.css";
// Data layer control: boot up, Redux service
import React from "react";
import ReactDOM from "react-dom";
// import redux services
// React component that can read changes to state / store. changes will cascade to children components
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import reducers from "./reducers";

// create a store for state
const store = createStore(() => [], {}, applyMiddleware());

// video 93. current user api
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
