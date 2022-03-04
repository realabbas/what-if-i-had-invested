import axios from 'axios';
import { useSelector } from 'react-redux';

const Intercept = () => {

    const { currency } = useSelector((state) => state.app)
    console.log("currencycurrency", currency)

    const BASE_URL = `/api/${process.env.REACT_APP_SERVER_API_VERSION}`
    axios.defaults.baseURL = BASE_URL

    // Interceptor to modify URL before sending request
    axios.interceptors.request.use(function (config) {

        console.log("config before", config)

        // Add currency parameter in the URL
        if (config.url.includes('/coins/market')) {
            config.url += `&vs_currency=${currency}`
        }
        else if (!config.url.includes('/supported_vs_currencies')) {
            config.url += `&vs_currencies=${currency}`
        }

        console.log("config after", config)

        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    return null;
}
export default Intercept;