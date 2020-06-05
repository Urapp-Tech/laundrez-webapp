/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './app/store/store';
import App from './App';
import 'react-circular-progressbar/dist/styles.css';
import './index.scss'; // Standard version
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-google-places-autocomplete/dist/index.min.css';
import 'react-datepicker/dist/react-datepicker.css';


ReactDOM.render(
  <App
    store={store}
  />,
  document.getElementById('root')
);
