import axios from 'axios';
import React from 'react';
import Progress from './components/progress';
import Home from './containers/home';

const App = () => {

  const [loading, setLoading] = React.useState(false)

  const BASE_URL = `${process.env.REACT_APP_SERVER_ENDPOINT}/api/${process.env.REACT_APP_SERVER_API_VERSION}`
  axios.defaults.baseURL = BASE_URL

  // Interceptor to modify URL before sending request
  axios.interceptors.request.use(function (config) {

    setLoading(true)
    console.log("Request going to url", config.url, window.appLoading)

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    setLoading(false)
    return response;
  }, function (error) {
    return Promise.reject(error);
  });


  return (
    <React.Fragment>
      {loading ? <Progress /> : null}
      <Home />
    </React.Fragment>
  )
}

export default App;