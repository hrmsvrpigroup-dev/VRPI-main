import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import store from "./store/store";

// Clean up any corrupt userId stored in localStorage from previous crashes
const savedUserId = localStorage.getItem("userId");
if (savedUserId === "[object Object]" || (savedUserId && savedUserId.trim().startsWith("{"))) {
  localStorage.removeItem("userId");
  localStorage.setItem("isVRPIUserLoggedIn", "false");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
