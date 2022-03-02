import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './containers/home';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './utils/store';

const BASE_URL = `/api/${process.env.REACT_APP_SERVER_API_VERSION}`
axios.defaults.baseURL = BASE_URL

// Interceptor to modify URL before sending request
axios.interceptors.request.use(function (config) {

  // Add currency parameter in the URL
  const currency = "usd"
  config.url += `&vs_currencies=${currency}`
  
  return config;
}, function (error) {
  return Promise.reject(error);
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
