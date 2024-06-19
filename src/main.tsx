import React, { Suspense } from "react";
import { render } from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import "./index.scss";
export default function renderApp(App) {
  render(
    <Suspense fallback={<div></div>}>
      <App />
    </Suspense>,
    document.getElementById("amisRoot")
  );
}

renderApp(App);
