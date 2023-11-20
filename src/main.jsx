import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// all css
import "./assets/css/index.css";
import "./assets/css/icon.css";
import "./assets/css/theme.css";
import "./assets/css/table.css";

import Loading from "./Components/Loading/Loading";

import server from "./server";

import { Provider } from "react-redux";
import store from "./Redux/store";

// Call the function to set up the mock server
server();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
