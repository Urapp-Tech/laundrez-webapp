/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { Routes } from './app/router/Routes';

export default function App({ store, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Override `basename` (e.g: `homepage` in `package.json`) */}
      <BrowserRouter basename={basename}>
        {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
        <LastLocationProvider>
          <Routes />
        </LastLocationProvider>
      </BrowserRouter>
    </Provider>
  );
}
