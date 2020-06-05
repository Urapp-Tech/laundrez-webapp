/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Routes } from './app/router/Routes';
import { history } from './app/router/RouterHistory';
export default function App({ store, }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      <Router history={history}>

        <Routes />

      </Router>
    </Provider>
  );
}
