import React, {Suspense} from 'react';
import { render } from "react-dom";
import App from './App';
import store from "./store";
import { Provider } from "react-redux";
import './index.scss'
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

render(
  <Suspense fallback={<div></div>}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
