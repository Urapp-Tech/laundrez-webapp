/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { mockAxios, setupAxios } from "./_metronic";
import store from "./app/store/store";
import App from "./App";
import 'react-circular-progressbar/dist/styles.css';
import "./index.scss"; // Standard version
import "@fortawesome/fontawesome-free/css/all.min.css";
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/* const mock = */ mockAxios(axios);

/**
 * Inject metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios, store);

ReactDOM.render(
  <App
    store={store}
    // persistor={persistor}
    basename={PUBLIC_URL}
  />,
  document.getElementById("root")
);
