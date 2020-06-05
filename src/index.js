import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./store/storeConfig";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
